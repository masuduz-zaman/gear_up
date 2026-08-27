import { Button } from "@/components/ui/button";
import HeroSection from "./_components/Hero";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-center gap-4">
     <HeroSection/>
    </div>
  );
}
