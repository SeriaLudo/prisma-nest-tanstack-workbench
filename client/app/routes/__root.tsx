// app/routes/__root.tsx
import {
  Outlet,
  createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import React, { ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";

import appCss from "@/styles/app.css?url";
import { isLoggedIn } from "@/api/auth";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  // const isAuthenticated = isLoggedIn();
  const isAuthenticated = false;
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <div
          id="topbar"
          className="bg-gray-800 text-white p-4 h-10 flex gap-3 items-start justify-end"
        >
          <a href="/">Home</a>
          {isAuthenticated ? (
            <a href="/logout">Logout</a>
          ) : (
            <a href="/login">Login</a>
          )}
          <a href="/admin">Admin</a>

          <a href="/admin">Admin</a>
          <a href="/about">About</a>
          <a href="/ag-grid">Ag-Grid</a>
          <a href="/tanstack">TanStack</a>
          <a href="/address">Address</a>
          <a href="/address-aria">Address Aria</a>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
