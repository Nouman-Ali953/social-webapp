import React from "react";
import Post from "./Post";
import { Post as PostType, User } from "@prisma/client";

// type FeedPostType = PostType  & { user: User } & {
//   likes: [{ userId: string }];
// } & {
//   _count: { comments: number };
// };

type FeedPostType = PostType & {
  user: User;
  likes: { userId: string }[]; // Correctly defined as an array of objects
  _count: { comments: number };
};

const Feed = async ({ posts }: { posts: FeedPostType[] }) => {
  
  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </>
  );
};

export default Feed;
