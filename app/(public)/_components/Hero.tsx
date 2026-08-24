// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden border-b bg-background">
//       <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">
        
//         {/* Left Content */}
//         <div className="max-w-xl">
//           <Badge
//             variant="secondary"
//             className="mb-6 rounded-full px-4 py-2 text-sm"
//           >
//             Premium Gear Rental
//           </Badge>

//           <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
//             Rent the gear.
//             <span className="block text-primary">
//               Enjoy the adventure.
//             </span>
//           </h1>

//           <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
//             From cameras and camping equipment to adventure essentials,
//             find everything you need without the cost of buying.
//           </p>

//           <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//             <Button asChild size="lg" className="rounded-full px-7">
//               <Link href="/gears">
//                 Explore Gears
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>

//             <Button
//               asChild
//               size="lg"
//               variant="outline"
//               className="rounded-full px-7"
//             >
//               <Link href="/how-it-works">
//                 How It Works
//               </Link>
//             </Button>
//           </div>

//           {/* Small Features */}
//           <div className="mt-10 flex flex-wrap gap-6">
//             <div className="flex items-center gap-2">
//               <div className="rounded-full bg-primary/10 p-2">
//                 <ShieldCheck className="h-4 w-4 text-primary" />
//               </div>

//               <span className="text-sm text-muted-foreground">
//                 Verified Equipment
//               </span>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="rounded-full bg-primary/10 p-2">
//                 <Zap className="h-4 w-4 text-primary" />
//               </div>

//               <span className="text-sm text-muted-foreground">
//                 Easy Booking
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="relative">
//           <div className="relative overflow-hidden rounded-3xl border bg-muted shadow-2xl">
//             <Image
//               src="/images/gear-hero.jpg"
//               alt="Adventure gear"
//               width={900}
//               height={700}
//               priority
//               className="h-[420px] w-full object-cover sm:h-[520px]"
//             />

//             {/* Floating Card */}
//             <div className="absolute bottom-5 left-5 rounded-2xl border bg-background/90 p-4 shadow-lg backdrop-blur-md">
//               <p className="text-sm font-medium text-foreground">
//                 Ready for your next adventure?
//               </p>

//               <p className="mt-1 text-xs text-muted-foreground">
//                 Quality gear. Flexible rental.
//               </p>
//             </div>
//           </div>

//           {/* Decorative element */}
//           <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
//         </div>
//       </div>
//     </section>
//   );
// }