import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

import { LoginForm } from "@/components/login-form";

function RouteComponent() {
  return (
    <div className="flex min-h-[calc(100vh-40px)] w-full items-center justify-center p-6 md:p-10">
      <LoginForm />
    </div>
  );
}
