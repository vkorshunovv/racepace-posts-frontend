import { useEffect, useState } from "react";
import "./Card.css";
import threads from "../assets/Threads.png";
import profile from "../assets/Profile.png";
import thread from "../assets/Thread.png";
import cups from "../assets/Cups.png";

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
    <>
      {posts.map((post) => (
        <div className="card_container" key={post.name}>
          <div className="ribbons">
            <div className="card">
              <div className="first_column">
                <img className="profile" src={profile}></img>
                <img className="thread" src={thread}></img>
                <img className="cups" src={cups}></img>
              </div>
              <div className="second_column">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <p>
                  <strong>Distance:</strong> {post.distance} km
                </p>
                <p>
                  <strong>Elevation:</strong> {post.elevation} m
                </p>
              </div>
              <img src={threads} className="third_column" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
  {
    /* <button onClick={() => setIsPostVisible(false)}>Go Back to Form</button> */
  }
};

export default Post;
