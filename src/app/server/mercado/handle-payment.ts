import { resend } from "@/app/lib/resend";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const userEmail = metadata?.user_mail;
  // const testId = metadata?.test_id;

  console.log("PAGAMENTO COM SUCESSO", paymentData);

  const { data, error } = await resend.emails.send({
    from: "Acme <flvsantos300@gmail.com>",
    to: userEmail,
    subject: "Assinatura ativada com sucesso",
    html: "<h1>Assinatura ativada com sucesso</h1>",
  });

  if (error) {
    console.log(error);
  }

  console.log(data);
}
