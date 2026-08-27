type LoadingRowsProps = {
  count?: number;
};

export default function LoadingRows({
  count = 4,
}: LoadingRowsProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map(
        (_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-xl bg-muted"
          />
        ),
      )}
    </div>
  );
}