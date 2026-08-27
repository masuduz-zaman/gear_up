export default function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-2.5 rounded-full ${color}`} />

      <span className="w-16 text-[#71817b]">{label}</span>

      <strong className="font-semibold text-[#3d534b]">{value}</strong>
    </div>
  );
}
