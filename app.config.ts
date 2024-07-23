import reactPlugin from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import { serverFunctions } from "@vinxi/server-functions/plugin";


export default createApp({
    routers: [
     
        {
            type: "spa",
            name: "client",
            handler: "./index.html",
            plugins: () => [reactPlugin() , serverFunctions.client()],
        },

        {
            type: "http",
            name: "api",
            handler: "./src/api.ts",
            base:'/api'
        },
    ],
});
