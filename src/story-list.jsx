import React, {useEffect, useState}from "react";
 
 
export default function StoryList() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => response.json())
        .then(storyIds => {
            const promises = storyIds.slice(0, 10).map(async storyId => {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
                return await response.json();
            });
            Promise.all(promises).then(stories => {
                setStories(stories);
            });
        });
    }, []);
    return (
        <>
        <h2>Top stories from hackerrank</h2>

        <ul>
            {stories.map(story => (
                <li key={story.id}>{story.title}</li>
            )
            )}
        </ul>
        
        </>
    )
}
