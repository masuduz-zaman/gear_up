import PaymentForm from "@/components/shared/payment/PaymentForm"

type Props = { params: Promise<{ id: string }> }

export default async function PaymentPage({ params }: Props) {
  const { id } = await params
  return <PaymentForm  />
}
