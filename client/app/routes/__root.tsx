// app/routes/__root.tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import React, { ReactNode } from "react";

import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
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
          <a href="/about">About</a>
          <a href="/ag-grid">Ag-Grid</a>
          <a href="/tanstack">TanStack</a>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
