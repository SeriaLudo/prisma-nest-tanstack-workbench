import { createFileRoute, redirect } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the authenticated area</p>
    </div>
  );
}
