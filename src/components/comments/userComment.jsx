import { Avatar, Textarea } from "flowbite-react";
import { formatDate } from "../../utils/formatDate";
import OptionsMenu from "../shared/OptionsMenu/OptionsMenu";
import { useState } from "react";
import AppButton from "../shared/AppButton/appButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../Validation/schemas";
import ValidationError from "../shared/Validationerror/validationErrors";
import toast from "react-hot-toast";

const UserComment = ({ comments, userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(commentSchema),
  });
  console.log(comments);
  const {
    content: commentContent,
    createdAt,
    commentCreator: { name, photo, _id },
    _id: commentId,
  } = comments;
  const queryClient = useQueryClient();

  const { mutate: editComment ,isPending} = useMutation({
    mutationFn: (data) => handleEditComment(data),
    onSuccess: (res) => {
      toast.success("Comment edited successfully");
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Failed to edit comment");
    },
  });

  async function handleEditComment(data) {
    console.log(data);

    return await axios.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <div className="mt-4 p-2 border border-gray-200 rounded-lg ">
      <div className="flex flex-row gap-3 items-center  justify-between">
        <div className="flex flex-row gap-3 items-center">
          <Avatar
            img={
              !photo.includes("undefined")
                ? photo
                : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            alt={name}
            rounded
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
        {userData?._id === _id && (
          <OptionsMenu
            commentId={commentId}
            isFromComment={true}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
      <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        {commentContent}
      </h5>
      {isEditing && (
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit((data) => editComment(data))}
        >
          <Textarea
            defaultValue={commentContent}
            rows={2}
            {...register("content")}
          />
          {errors?.content && (
            <ValidationError error={errors.content.message} />
          )}
          <div className="flex  gap-4 mt-2">
            <AppButton
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            isLoading={isPending}
            disabled={isPending}
            >
              Update comment
            </AppButton>
            <AppButton
              type="reset"
              color="alternative"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => {
                setIsEditing(false)
                setValue("content",  commentContent)
              }

              }
            >
              Cancel
            </AppButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserComment;
