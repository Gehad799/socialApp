import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dropdown, DropdownItem } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditPostModal } from "../EditPostModal/EditPostModal";

const OptionsMenu = ({
  postId,
  commentId,
  isFromComment = false,
  setIsEditing,
  post,
}) => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const { mutate: deletePost } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["post-details", postId]);
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });
  async function handleDeletePost() {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const { mutate: deleteComment } = useMutation({
    mutationFn: handleDeleteComment,
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["post-details", postId]);
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });
  async function handleDeleteComment() {
    return axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <>
      <Dropdown inline label="">
        <DropdownItem
          onClick={
            isFromComment ? () => setIsEditing(true) : () => setOpenModal(true)
          }
        >
          Edit
        </DropdownItem>
        <DropdownItem onClick={isFromComment ? deleteComment : deletePost}>
          Delete
        </DropdownItem>
      </Dropdown>
      {openModal && (
        <EditPostModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          post={post}
        />
      )}
    </>
  );
};

export default OptionsMenu;
