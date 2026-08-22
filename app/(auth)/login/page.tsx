
import { LoginForm } from "@/app/(auth)/_components/LoginForm"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
    <div className="flex flex-1 items-center justify-center">
      <div
        className="
          relative w-full max-w-xs overflow-hidden rounded-3xl
          border border-white/20
          bg-white/[0.08]
          p-6
          shadow-2xl
          backdrop-blur-2xl
        "
      >
        <div
          className="
            pointer-events-none absolute -left-20 -top-20
            h-40 w-40 rounded-full
            bg-white/20 blur-3xl
          "
        />

        <div
          className="
            pointer-events-none absolute -bottom-24 -right-24
            h-48 w-48 rounded-full
           blur-3xl
          "
        />

        <div className="relative z-10">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}
