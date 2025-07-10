require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// --- Debugging: Check if the API key is loaded ---
const apiKey = process.env.PAYMONGO_SECRET_KEY;
if (!apiKey) {
  console.error('FATAL ERROR: PAYMONGO_SECRET_KEY is not defined. Make sure you have a .env file with the correct key.');
  process.exit(1); // Stop the server if the key is missing
} else {
  console.log(`PayMongo API Key loaded successfully. Using key starting with: ${apiKey.substring(0, 11)}...`);
}
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // Configure for your frontend URL in production
app.use(express.json());

const paymongoApi = axios.create({
  baseURL: 'https://api.paymongo.com/v1',
  headers: {
    'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
    'Content-Type': 'application/json'
  }
});

// --- API Endpoints ---

/**
 * @route POST /create-checkout-session
 * @desc Creates a PayMongo checkout session.
 * @body { amount: number, currency: string, description: string, remarks: string }
 */
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency = 'PHP', description, remarks, successUrl, userId } = req.body;

    if (!amount || !description || !successUrl) {
      return res.status(400).json({ error: 'Amount, description, and successUrl are required.' });
    }

    const response = await paymongoApi.post('/checkout_sessions', {
      data: {
        attributes: {
          payment_method_types: ['card', 'gcash', 'paymaya'],
          line_items: [{
            currency,
            amount: amount * 100, // PayMongo expects amount in centavos
            name: description,
            quantity: 1
          }],
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          description,
          remarks,
          success_url: successUrl,
          metadata: {
            userId: userId // Pass your internal user ID here
          }
        }
      }
    });

    const checkoutSession = response.data.data;
    res.json({ checkout_url: checkoutSession.attributes.checkout_url });

  } catch (error) {
    console.error('Error creating PayMongo checkout session:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

/**
 * @route POST /paymongo-webhook
 * @desc Handles incoming webhooks from PayMongo.
 */
app.post('/paymongo-webhook', (req, res) => {
  // It's crucial to verify the webhook signature in a production environment!
  // This is a simplified example.
  const event = req.body.data.attributes.data;
  const eventType = req.body.data.attributes.type;

  console.log(`Received PayMongo webhook event: ${eventType}`);
  console.log('Event data:', JSON.stringify(event, null, 2));

  // Handle the event (e.g., update your database based on the event type)
  switch (eventType) {
    case 'checkout.session.payment.paid':
      // Payment was successful. Fulfill the order.
      const session = event.attributes;
      const userId = session.metadata ? session.metadata.userId : null;

      if (userId) {
        console.log(`✅ Payment successful for userId: ${userId}`);
        // TODO: Add your database logic here.
        // e.g., await db.users.update({ id: userId }, { subscriptionStatus: 'active' });
      } else {
        console.error('❌ Payment successful, but no userId found in metadata.');
      }
      break;
    // Add other event types to handle as needed (e.g., refunds, disputes)
    default:
      console.log(`Unhandled event type: ${eventType}`);
  }

  res.status(200).send(); // Respond to PayMongo to acknowledge receipt
});


app.listen(port, () => {
  console.log(`PayMongo microservice listening at http://localhost:${port}`);
});
