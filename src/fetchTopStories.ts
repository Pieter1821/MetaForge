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
    console.log("using the server !!!");

    // Fetch stories in batches to reduce the number of network requests
    const fetchStory = async (storyId: number) => {
        const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
        );
        return res.json();
    };

   
    const stories = await Promise.all(
        storyIds.slice(0, 40).map(fetchStory)
    );

    return stories;
}
