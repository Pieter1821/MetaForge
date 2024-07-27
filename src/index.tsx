import React from "react";
import { Route, Link } from "wouter";
import { createRoot } from "react-dom/client";
import { Counter } from "./counter";
import TopStories from "./TopStories";

createRoot(document.getElementById("root")!).render(
  <>
    <img
      src="https://www.metamask.io/images/logo.png"
      width="200"
      height="200"
      alt="MetaMask Logo"
    />
    <nav>
      <Link to="/">Home</Link>
      <Link href="/stories">Stories</Link>
    </nav>
    <Route path="/">
      <h1>Hello, MetaForge!!!</h1>
      <Counter />
    </Route>
    <Route path="/stories">
      <TopStories />
    </Route>
  </>
);
