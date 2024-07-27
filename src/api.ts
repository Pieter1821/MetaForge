import { eventHandler } from "vinxi/http";
/**
 * Handles the API request and returns the response.
 * @param event - The event object containing the request details.
 * @returns The response object.
 */
export default eventHandler(async (event) => {
    const method = event.method; 
    const path = event.path;
  
    if (method === "GET" && path === "/stories") {
        try {
            const topStoriesRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    
            if (!topStoriesRes.ok) {
                return { error: true };
            }
            
            const storyIds = await topStoriesRes.json();

            const limitedStoryIds = storyIds.slice(0, 10);

            const storyPromises: Promise<any>[] = limitedStoryIds.map(async (storyId: number) => {
                const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
                console.log('server!!!');
                return storyRes.json();
            });

            const stories = await Promise.all(storyPromises);

            return stories.filter(story => story !== null);
        } catch (error) {
            return { error: true, message: error.toString() };
        }
    }
    
    return { test: 'on' };
});