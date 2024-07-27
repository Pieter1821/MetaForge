import reactPlugin from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import { serverFunctions } from "@vinxi/server-functions/plugin";
import { BaseFileSystemRouter, cleanPath } from "vinxi/dist/types/lib/fs-router";
import { resolve } from "vinxi/dist/types/lib/path";

class FileRouter extends BaseFileSystemRouter {
    toPath(src: any): string {
        const path = cleanPath(src, this.config)
            .slice(1)
            .replace('index', '')
            .replace(/\[([^\/]+)\]/g, (_, m) => `:${m.replace(/^\.{3}/, '*')}`);

        return `/${path}`;
    }

    toRoute(src: any) {
        return {
            $component: { src, pick: ['default'] },
            path: this.toPath(src),
            filePath: src,
        };
    }
}

export default createApp({
    routers: [
        {
            name: "client",
            type: "spa",
            handler: "./index.html",
            plugins: () => [reactPlugin(), serverFunctions.client()],
            routes: (router, app) => new FileRouter({
            dir: resolve('./src/pages', router.root || ''),
            extensions: ['tsx']}, app, router),
            base: "/",
            
        },
        {
            type: "http",
            name: "api",
            handler:"./src/api.ts",
            base: '/api',
        },
        serverFunctions.router(),
        {
            name: "static",
            type: "static",
            dir: "./public",
            base: "/",
        },
    ],
});