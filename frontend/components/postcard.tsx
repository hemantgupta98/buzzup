"use client";
import { api } from "../lib/app";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostCard({ post, reload }: any) {
  return (
    <div className="border p-4 mb-3">
      <h3 className="font-bold">{post.user}</h3>
      {post.text && <p>{post.text}</p>}
      {post.image && <Image src={post.image} className="mt-2" alt="user pic" />}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => api(`/posts/${post._id}/like`, "POST").then(reload)}
        >
          ❤️ {post.likes.length}
        </button>
        <span>💬 {post.comments.length}</span>
      </div>
    </div>
  );
}
