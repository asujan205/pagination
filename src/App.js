import "./App.css";
import React, { useState, useEffect } from "react";
import Pagination from './components/pagination.js';

import Post from "./components/post.js";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  
  useEffect(() => {
    fetch(url)
      .then((response) => response.body.getReader())
      .then((reader) => reader.read())
      .then((posts) => {
        let data = String.fromCharCode.apply(null, posts.value);
        let parsedData = JSON.parse(data);
        setPosts(parsedData.results);
       setNextUrl(parsedData.results.next);
       
       setPrevUrl(parsedData.results.previous);
      })
      .catch((error) => setError(error.message));
  }, []);
  console.log(posts);
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Posts"
            pageLimit={5}
            dataLimit={10}
            onNext={() => {
              setUrl(nextUrl);
            }}
            onPrevious={() => {
              setUrl(prevUrl);
            }}
          />
        </>
      ) : (
        <h1>No Posts to display</h1>
      )}
    </div>
  );
}