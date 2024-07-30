/**
 * Entry point of the application.
 * Renders the main React component and sets up routing.
 */
import React from "react";
import { Route, Link } from "wouter";
import { createRoot } from "react-dom/client";
import { Counter } from "./counter";

import { lazyRoute } from "@vinxi/react";
import { getManifest } from "vinxi/manifest";
import fileRoutes from "vinxi/routes";

const routes = fileRoutes.map((route) => ({
  ...route,
  component: lazyRoute(
    route.$component,
    getManifest("client"),
    getManifest("client")
  ),
}));

createRoot(document.getElementById("root")!).render(
  <>
    <img
      src="https://www.metamask.io/images/logo.png"
      width="200"
      height="200"
      alt="MetaMask Logo"
    />
    <nav>
      {routes.map((route) => (
        <Link to={route.path}>{route.path}</Link>
      ))}
      <Link to="/">Home</Link>
      <Link to="/Stories">Stories</Link>
    </nav>
    {routes.map((route) => (
      <Route path={route.path} component={route.component} />
    ))}
  </>
);
