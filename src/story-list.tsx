import React, { useEffect, useState } from "react";

export default function StoryList() {
  const [stories, setStories] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    async function loadStories() {
      const response = await fetch("/api/stories");
      const stories = await response.json();
      setStories(stories);
    }
    loadStories();
  }, []);

  const loading = stories.length === 0;

  return (
    <>
      <h2>Top stories from Hacker News</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>{story.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
