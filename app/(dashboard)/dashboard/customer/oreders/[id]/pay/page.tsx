import { CustomerPaymentPage } from "@/components/shared/customer/dashboard"

type Props = { params: Promise<{ id: string }> }

export default async function PaymentPage({ params }: Props) {
  const { id } = await params
  return <CustomerPaymentPage orderId={id} />
}
