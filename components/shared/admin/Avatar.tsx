export default function Avatar({
  initials,
  large = false,
}: {
  initials: string;
  large?: boolean;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#dce9e4] font-semibold text-[#356557] ${
        large ? "size-14 text-lg" : "size-9 text-xs"
      }`}
    >
      {initials}
    </span>
  );
}
