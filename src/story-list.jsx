import React, { useEffect, useState } from "react";

export default function StoryList() {
    const [stories, setStories] = useState([]);
    const [loading , setIsLoading] = useState(false)

    useEffect(() => {
        const fetchStories = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
                const storyIds = await response.json();
                const promises = storyIds.slice(0, 20).map(storyId =>
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then(res => res.json())
                );
                const stories = await Promise.all(promises);
                setStories(stories);
            } catch (error) {
                console.error("Failed to fetch stories", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStories();
    }, []);

    return (
        <>
            <h2>Top stories from Hacker News</h2>
            {loading ? (
                <p>Loading...</p>
            ):
            (
            <ul>
                {stories.map(story => (
                    <li key={story.id}>{story.title}</li>
                ))}
            </ul>
            )}
        </>

    );

}
