"use server";

export async function getStories() {
    const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const storyIds = await response.json();
    const stories = await Promise.all(
        storyIds.slice(0, 20).map(async (storyId: number) => {
            const res = await fetch(
                `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
            );
            console.log('server!!!');
            return res.json();
        })
    );
    return stories;
}
