import React from "react";
import { createRoot } from "react-dom/client";
import {Counter} from "./counter";

createRoot(document.getElementById("root")!).render(
    <>
        <h1>Hello, MetaForge!!!</h1>
        <Counter/>
    </>
)
