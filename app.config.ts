import reactPlugin from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import { serverFunctions } from "@vinxi/server-functions/plugin";
import { BaseFileSystemRouter, cleanPath } from "vinxi/fs-router";
import { resolve } from "vinxi";

class FileRouter extends BaseFileSystemRouter {
    toPath(src: any): string {
        const path = cleanPath(src, this.config)
            .slice(1)
            .replace('index', '')
            .replace(/\[([^\/]+)\]/g, (_, m) => {
                if (m.length > 3 && m.startsWith('...')) {
                    return `${m.slice(3)}`;
                }
                return `:${m}`;
            });
        return `/${path}`;
    }

    toRoute(src: any) {
        const path = this.toPath(src);
        return {
            $component: {
                src,
                pick: ['default' ]
            },
            path,
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
                dir: resolve.absolute('./src/pages', router.root!),
                extensions: ['tsx , ts , js , jsx '],
            },
                app,
                router,
            ),
        },
        {
            type: "http",
            name: "api",
            handler: "./src/api.ts",
            base: '/api',
        },
        serverFunctions.router(),
        {
            name: "static",
            type: "static",
            dir: "./public",

        },
    ],
});