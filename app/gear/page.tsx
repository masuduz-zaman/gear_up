import { GearMarketplace } from "@/components/shared/gear/all_gear";
import { getCategories, getGear } from "@/service/gear_service";


export default async function GearPage() {
  const [gear, categories] = await Promise.all([
    getGear(),
    getCategories(),
  ]);

  return (
    <GearMarketplace
      initialGear={gear}
      categories={categories}
    />
  );
}
