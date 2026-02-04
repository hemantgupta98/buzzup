"use client";
import { useState } from "react";
import { api } from "../lib/app";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreatePost({ reload }: any) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const submit = async () => {
    if (!text && !image) return;
    await api("/posts", "POST", { text, image });
    setText("");
    setImage("");
    reload();
  };

  return (
    <div className="p-4 border rounded mb-4">
      <textarea
        placeholder="What's on your mind?"
        className="w-full border p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        placeholder="Image URL (optional)"
        className="w-full border p-2 mt-2"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={submit} className="bg-black text-white px-4 py-2 mt-2">
        Post
      </button>
    </div>
  );
}
