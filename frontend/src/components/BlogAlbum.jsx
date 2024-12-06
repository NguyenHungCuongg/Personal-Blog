import { useEffect, useState } from "react";
import axios from "axios";
import Blogcard from "../components/Blogcard";
import "bootstrap/dist/css/bootstrap.min.css";

function BlogAlbum() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {posts.map((post) => (
        <div className="col" key={post.PostID}>
          <Blogcard post={post} />
        </div>
      ))}
      <div className="col">
        <Blogcard />
      </div>
    </div>
  );
}

export default BlogAlbum;
