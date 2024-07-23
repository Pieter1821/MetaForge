import React from "react";
import { Route, Link } from "wouter"
import { createRoot } from "react-dom/client";
import { Counter } from "./counter";
import StoryList from "./story-list";

createRoot(document.getElementById("root")!).render(
    <>
        <nav>
            <Link to="/">Home</Link>
            <Link href="/stories">Stories</Link>
        </nav>
        <Route path="/">
            <h1>Hello, MetaForge!!!</h1>
            <Counter />

        </Route>
        <Route path="/stories">

            <StoryList />
        </Route>
    </>
)
