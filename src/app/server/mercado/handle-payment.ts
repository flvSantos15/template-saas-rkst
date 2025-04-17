import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  // const metadata = paymentData.metadata;
  // const userEmail = metadata?.user_mail;
  // const testId = metadata?.test_id;

  console.log("PAGAMENTO COM SUCESSO", paymentData);
}
