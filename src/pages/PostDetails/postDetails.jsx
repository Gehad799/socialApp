import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PostsItem from "../../components/posts/postsItem";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";

const PostDetails = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading,isError } = useQuery({
    queryKey: ["post-details", postId],
    queryFn: getPostDetails,
  });
  // useEffect(() => {
  //   if (data) {
  //     console.log("post details", data?.data?.post);
  //   }
  // }, [data]);
//  useEffect(() => {
//   console.log(data);
  
//     if (data?.data?.post === null) {
//       navigate("/");
//     }
//   }, [data]);

  async function getPostDetails() {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  return (
    <>
      <section className="max-w-2xl mx-auto my-10">
        <div className="flex flex-col gap-4">
          {isLoading && (
            <Skeleton
              count={1}
              className="mb-4 h-96"
              baseColor="#374050"
              highlightColor="#1B242F"
            />
          )}
          {data && <PostsItem post={data?.data?.post} showAllComments={true} />}
        </div>
      </section>
    </>
  );
};

export default PostDetails;
