"use server";

/**
 * Fetches the top stories from the Hacker News API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of story objects.
 */
export async function fetchTopStories(): Promise<Array<object>> {
    const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const storyIds = await response.json();
    const stories = await Promise.all(
        storyIds.slice(0, 20).map(async (storyId: number) => {
            const res = await fetch(
                `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
            );
            console.log("using the server !!!")
            return res.json();
        })
    );
    return stories;
}

