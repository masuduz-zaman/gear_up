import { GearDetail } from "@/components/shared/gear/all_gear";

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <GearDetail id={id} />;
}
