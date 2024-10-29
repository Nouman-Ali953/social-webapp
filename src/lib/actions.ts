"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};


export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          recieverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            recieverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const followRequestAccept = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("user is not authenticated");
  }
  try {
    const existingRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        recieverId: currentUserId,
      },
    });

    if (existingRequest) {
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
      await prisma.followRequest.delete({
        where: {
          id: existingRequest.id,
        },
      });
    }
    function revalidateMultiplePaths(paths: string[]) {
      for (const path of paths) {
        revalidatePath(path);
      }
    }

    // Usage
    revalidateMultiplePaths(["/profile", "/"]);
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong in acc/dec request");
  }
};

export const followRequestDecline = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("user is not authenticated");
  }
  try {
    const existingRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        recieverId: currentUserId,
      },
    });

    if (existingRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingRequest.id,
        },
      });
    }
    function revalidateMultiplePaths(paths: string[]) {
      for (const path of paths) {
        revalidatePath(path);
      }
    }

    // Usage
    revalidateMultiplePaths(["/profile", "/"]);
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong in acc/dec request");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    revalidatePath("/profile");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const addUserPost = async (postImage: string, formData: FormData) => {
  try {
    const desc = formData.get("desc") as string;

    const Desc = z.string().min(1).max(255);

    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
      //TODO
      console.log("description is not valid");
      return;
    }
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img: postImage,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong adding the post");
  }
};

export const sendFollowRequest = async (userId: string) => {
  console.log(userId);
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    return null;
  }
  try {
    await prisma.followRequest.create({
      data: {
        senderId: currentUserId,
        recieverId: userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

export const addUserLike = async (postId: number) => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("user is not authenticated");
    }
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (error) {
    throw new Error("something went wrong in adding the like");
  }
};

export const addComment = async (postId: number, desc: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comments.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const addUserStory = async (img: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};


export const DeletePost = async (id:number) => {
  try {
      await prisma.post.delete({
        where:{
          id
        }
      })

      revalidatePath('/profile')
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}