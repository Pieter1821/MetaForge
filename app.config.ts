import reactPlugin from "@vitejs/plugin-react";
import { createApp } from "vinxi";


export default createApp({
    routers:[
        {
            type: 'spa',
            name: 'client',
            handler: './index.html',
            plugins: () => [reactPlugin()]
        }
    ]
});
