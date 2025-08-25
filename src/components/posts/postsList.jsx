import { useContext, useEffect, useState } from "react";
import PostsItem from "./postsItem";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
const PostsList = ({ isHome = true }) => {
  const { userData } = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: isHome ? ["all-posts"] : ["user-posts"],
    queryFn: getAllPosts,
    enabled: !!userData,
  });

  async function getAllPosts() {
    return axios.get(
      isHome
        ? "https://linked-posts.routemisr.com/posts?limit=10&sort=-createdAt"
        : `https://linked-posts.routemisr.com/users/${userData._id}/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <>
      <section className="max-w-2xl mx-auto my-10">
        <div className="flex flex-col gap-4">
          {data?.data?.posts.map((post) => (
            <PostsItem key={post._id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PostsList;
