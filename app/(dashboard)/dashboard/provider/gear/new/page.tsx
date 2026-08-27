import AddGearForm from "@/components/shared/provider/gear/AddGearForm";
import ProviderShell from "@/components/shared/provider/ProviderShell";

export default function AddGearRoute() {
  return (
    <ProviderShell title="Add Gear">
      <div className="flex justify-center">
      <AddGearForm />
      </div>
    </ProviderShell>
  );
}
