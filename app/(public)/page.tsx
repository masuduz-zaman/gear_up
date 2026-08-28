import HeroSection from "./_components/Hero";
import { getCategories, getGear } from "@/service/gear_service";
import { GearMarketplace } from "@/components/shared/gear/all_gear";

export default async function Home() {
  const [gear, categories] = await Promise.all([
      getGear(),
      getCategories(),
    ]);
  return (
    <div className="">
      <div className="flex flex-col min-h-svh items-center justify-center gap-4">
     <HeroSection/>
    </div>
     <GearMarketplace
           initialGear={gear}
           categories={categories}
         />
    </div>
  );
}
