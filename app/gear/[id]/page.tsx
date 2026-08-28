import { GearDetail } from "@/components/shared/gear/gear-detail";
import { getGearById } from "@/service/gear_service";
import { notFound } from "next/navigation";


interface GearDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GearDetailPage({
  params,
}: GearDetailPageProps) {
  const { id } = await params;

  const item = await getGearById(id);

  if (!item) {
    notFound();
  }

  return <GearDetail item={item} />;
}
