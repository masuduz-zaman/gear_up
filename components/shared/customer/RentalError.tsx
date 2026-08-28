type Props = {
  message?: string;
  onRetry: () => void;
};

export function RentalError({
  message,
  onRetry,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center">
      <h2 className="font-semibold">
        We couldn&apos;t load your rentals
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        {message ||
          "Please try again to load the latest activity."}
      </p>

      <button
        onClick={onRetry}
        className="mt-5 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
      >
        Try again
      </button>
    </div>
  );
}