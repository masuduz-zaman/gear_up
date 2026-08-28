"use client";

import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@base-ui/react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="sticky top-0 z-10 min-h-[600px] w-full overflow-hidden border-b">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px]"
        style={{
          backgroundImage:
            "url('https://img.magnific.com/free-photo/close-up-person-doing-mountain-biking_23-2151850193.jpg?semt=ais_hybrid&w=740&q=80')",
        }}
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex min-h-[700px] items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-3xl text-center text-white">
          <Badge
            variant="secondary"
            className="mb-6 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md hover:bg-white/20"
          >
            Premium Gear Rental
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            Rent the gear.
            <span className="block">Enjoy the adventure.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            From cameras and camping equipment to adventure essentials, find
            everything you need without the cost of buying.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => router.push("/")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30"
            >
              Explore Gears
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2.5 backdrop-blur-md">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>

              <span className="text-sm font-medium text-white/90">
                Verified Equipment
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2.5 backdrop-blur-md">
                <Zap className="h-5 w-5 text-primary" />
              </div>

              <span className="text-sm font-medium text-white/90">
                Easy Booking
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  );
}
