import React, { useEffect, useState } from "react";
import { fetchTopStories } from "./fetchTopStories";

/**
 * Renders a component that displays a list of top stories.
 */
export default function TopStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Loads the top stories data asynchronously.
     */
    const loadStories = async () => {
      const storiesData = await fetchTopStories();
      setStories(storiesData);
      setIsLoading(false);
    };
    loadStories();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Top Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};



