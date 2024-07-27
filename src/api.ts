import { eventHandler } from "vinxi/http";

/**
 * Handles the API event and returns the appropriate response.
 * @param {object} event - The API event object.
 * @returns {Promise<object>} - The response object.
 */
export default eventHandler(async (event) => {
    const method = event.method;
    const path = event.path;

    if (method === "GET" && path === "/stories") {

        const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        if (!res.ok) {
            return { error: true };
        }
        const data = await res.json();

        return data;
    }
    return { test: 'on' };
});





