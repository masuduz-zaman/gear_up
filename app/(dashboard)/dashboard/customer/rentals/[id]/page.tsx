import { RentalDetails } from "@/components/shared/customer/RentalDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RentalDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <RentalDetails rentalId={id} />
  );
}