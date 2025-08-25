import { Card, Textarea } from "flowbite-react";
import AppButton from "../shared/AppButton/appButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../Validation/schemas";
import ValidationError from "../shared/Validationerror/validationErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const AddComment = ({ post }) => {
    const querClient = useQueryClient();
  const {
    register,
    formState: { errors ,isValid},
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(commentSchema),
  });
  const { mutate: addNewComment,isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      toast.success("Comment added successfully");
      setValue("content", "");
      querClient.invalidateQueries["post-details", post]
      querClient.invalidateQueries(["all-posts"]);
      querClient.invalidateQueries(["user-posts"]);
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });
  async function addComment(data) {
    const payloadData = {
      content: data.content,
      post: post,
    };
    console.log(payloadData);
    
    return await axios.post(
      "https://linked-posts.routemisr.com/comments",
      payloadData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(addNewComment)}
    >
      <div className="flex items-center gap-4">
        <Textarea
          id="content"
          placeholder="Add a comment..."
          rows={2}
          {...register("content")}
        />
      </div>

      {errors.content && <ValidationError error={errors.content.message} />}

      <AppButton isLoading={isPending} disabled={!isValid || isPending} type="submit">Create comment</AppButton>
    </form>
  );
};

export default AddComment;
