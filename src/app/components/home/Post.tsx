import Image from "next/image";
import React, { Suspense } from "react";
import Interaction from "./Interaction";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import Loader from "@/app/components/loadings/Loader";
import PostUserInteraction from "./PostUserInteraction";
import { auth } from "@clerk/nextjs/server";

type FeedPostType = PostType & {
  user: User;
  likes: { userId: string }[]; // Correctly defined as an array of objects
  _count: { comments: number };
};

const Post = async ({ post }: { post: FeedPostType }) => {
  const {userId} = auth()
  if (!userId) {
    return null;
  }
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="p-4 bg-white shadow-md flex flex-col gap-8 rounded-md mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between px-3 items-center">
             <PostUserInteraction post={post} userId={userId}/>
            
            </div>
            <div className="flex flex-col gap-4 relative">
              <p className="min-h-[1rem] overflow-visible">{post.desc}</p>
              {post.img ? (
                <div className="w-full h-64 relative">
                  <Image
                    src={post.img}
                    layout="fill"
                    className="object-cover rounded-md"
                    alt="postimage"
                  />
                </div>
              ) : null}
            </div>
            <Interaction
              postId={post.id}
              likes={post?.likes?.map((like) => like.userId)}
              commentNumber={post._count?.comments}
            />
            <Comments postId={post.id} />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Post;
