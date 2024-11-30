import { useEffect, useState } from "react";

const Post = ({ setIsPostVisible }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/posts/", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h1>Race Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>
                <strong>Distance:</strong> {post.distance} km
              </p>
              <p>
                <strong>Elevation:</strong> {post.elevation} m
              </p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setIsPostVisible(false)}>Go Back to Form</button>
    </div>
  );
};

export default Post;
