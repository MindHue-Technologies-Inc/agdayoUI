export interface PaymongoRequestBody {
  amount: number;
  currency: string;
  description: string;
  remarks: string;
  successUrl: string;
  userId: string;
}

export interface PaymongoCheckoutSessionAttributes {
  checkout_url: string;
  client_key: string;
  status: string;
  payment_method_types: string[];
  line_items: Array<{
    currency: string;
    amount: number;
    name: string;
    quantity: number;
  }>;
  description: string;
  remarks?: string;
  success_url: string;
  metadata?: {
    userId?: string;
  };
}

export interface PaymongoResponseData {
  id: string;
  type: string;
  attributes: PaymongoCheckoutSessionAttributes;
}

export interface PaymongoCheckoutSessionResponse {
  data: PaymongoResponseData
}