import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-center gap-4">
      <div className="">
        <h3>Welcome to the App</h3>
      </div>

      <Button>Click me</Button>
    </div>
  );
}
