import type { Gear } from "@/lib/provider/types";

import GearRow from "./GearRow";

type GearListProps = {
  gear: Gear[];
};

export default function GearList({
  gear,
}: GearListProps) {
  return (
    <div className="divide-y divide-border">
      {gear.map((item) => (
        <GearRow
          key={item.id}
          gear={item}
        />
      ))}
    </div>
  );
}