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
            .replace(/\[([^\/]+)\]/g, (_, m) => {
                if (m.length > 3 && m.startsWith('...')) {
                    return `*${m.slice(3)}`;
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
                pick: ['default'],
            },
            path,
            filePath: src,
        };
    }
}

export default createApp({
    routers: [
        {
            type: "spa",
            name: "client",
            handler: "./index.html",
            plugins: () => [reactPlugin(), serverFunctions.client()],
            routes: (router, app) => {
                return new FileRouter(
                    { dir: resolve('./src/pages', router.root || ''), extensions: ['tsx'] }, app, router);
            }
        }
        },
    {
        type: "http",
        name: "api",
        handler: "./src/api.ts",
        base: '/api'
    },
    serverFunctions.router(),
    {
        type: "static",
        name: "static",
        dir: "./public",
    }

});