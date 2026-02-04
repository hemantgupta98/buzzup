/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/app";
import CreatePost from "../components/createpost";
import PostCard from "../components/postcard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const load = async () => {
    setPosts(await api("/posts"));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-4">
      <CreatePost reload={load} />

      {posts.map((p: any) => (
        <PostCard key={p._id} post={p} reload={load} />
      ))}
    </main>
  );
}
