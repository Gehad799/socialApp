import { useContext, useEffect, useState } from "react";
import PostsItem from "./postsItem";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import {  useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
const PostsList = ({ isHome = true }) => {
  const { userData } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
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
          {isLoading  && (
            <Skeleton
              count={5}
              className="mb-4 h-96"
              baseColor="#374050"
              highlightColor="#1B242F"
            />
          )}
          {data?.data?.posts.map((post) => (
            <PostsItem key={post._id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PostsList;
