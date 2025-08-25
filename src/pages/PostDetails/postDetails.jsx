import axios from "axios";
import { useParams } from "react-router";
import PostsItem from "../../components/posts/postsItem";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const PostDetails = () => {
  const { id: postId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["post-details", postId],
    queryFn: getPostDetails,
  });
  // useEffect(() => {
  //   if (data) {
  //     console.log("post details", data?.data?.post);
  //   }
  // }, [data]);

  async function getPostDetails() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
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
