import { Check, X } from "lucide-react";

type FeedbackProps = {
  message: string;
  error?: boolean;
};

export default function Feedback({
  message,
  error = false,
}: FeedbackProps) {
  return (
    <div
      role="status"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg ${
        error
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-primary/20 bg-primary/10 text-primary"
      }`}
    >
      {error ? (
        <X className="size-4" />
      ) : (
        <Check className="size-4" />
      )}

      {message}
    </div>
  );
}