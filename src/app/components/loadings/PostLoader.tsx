"use client";
import React from "react";
import ContentLoader from "react-content-loader";

const PostLoader = () => {
  return (
    <div className="border border-gray-300 rounded-md py-2">
    <ContentLoader
      height={74}
      width={740}
      viewBox="0 0 520 48"
      backgroundColor="#d9d9d9"
      foregroundColor="#ecebeb"
    >

      <circle cx="27" cy="27" r="18" />
      <rect x="53" y="14" rx="3" ry="3" width="180" height="13" />
      <rect x="53" y="30" rx="3" ry="3" width="10" height="10" />
      <rect x="67" y="30" rx="3" ry="3" width="74" height="10" />
      <circle cx="305" cy="27" r="8" />
      <rect x="0" y="53" rx="0" ry="0" width="320" height="100" />
      <rect x="219" y="146" rx="0" ry="0" width="10" height="100" />
    </ContentLoader>
      </div>
  );
};

PostLoader.metadata = {
  name: "Marius Jørgensen",
  github: "marjorg",
  description: "A singular Snapchat conversation",
  filename: "SnapchatThread",
};

export default PostLoader;
