// -- IMPORT TYPES
import type { PaymongoCheckoutSessionResponse, PaymongoRequestBody } from "@/core/types/paymongo-types.ts"
import { paymongoFetch } from "@/core/paymongo.ts"

export const prerender = false;

// -- MAIN POST FUNCTION
export async function POST({request}: {request:Request}): Promise<Response> {
  try {
    const { amount, currency = 'PHP', description, remarks, successUrl, userId }: PaymongoRequestBody = await request.json();

    // -- RETURN ERROR RESPONSE WHEN ABOVE VARS ARE MISSING
    if (!amount || !description || !successUrl) {
      return new Response(JSON.stringify({
        error: 'Amount, description, and successUrl are required.',
        details: '',
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    const response:any = await paymongoFetch('/checkout_sessions', {
      method: "POST",
      body: {
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
      }
    });

    return new Response(JSON.stringify({
      checkout_url: response.data.attributes.checkout_url
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (e:any) {
    return new Response(JSON.stringify({
      error: 'Payment Failed',
      details: `${e.message}`,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}