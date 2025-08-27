import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  FileInput,
  Label,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import AppButton from "../AppButton/appButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { postSchema } from "../../../Validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../Validationerror/validationErrors";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function EditPostModal({ openModal, setOpenModal, post }) {
  const [showImage, setShowImage] = useState(true);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(postSchema),
  });
  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: handleUpdatePost,
    onSuccess: () => {
      toast.success("Post updated successfully");
      setOpenModal(false);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["post-details", post?._id]);
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });

  async function handleUpdatePost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (data.image && data.image.length > 0) {
      formData.append("image", watch("image")[0]);
    }

    return await axios.put(
      `https://linked-posts.routemisr.com/posts/${post?._id}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  const clearImage = () => {
    setValue("image", null);
    setShowImage(false);
    console.log(watch("image"));
  };

  useEffect(() => {
    if (post) {
      console.log("postData", post);
      setShowImage(!!post?.image);
    }
  }, [post]);

  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      popup
      dismissible
    >
      <ModalHeader />
      <ModalBody>
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Update Post
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(updatePost)}
          >
            <Textarea
              defaultValue={post?.body}
              rows={2}
              {...register("body")}
            />

            {showImage && post?.image ? (
              <div className="flex justify-center mt-4 relative">
                <img
                  src={post?.image}
                  alt={post?.body}
                  className="max-h-48 rounded-lg"
                />
                <MdClose
                  size={20}
                  className="cursor-pointer text-gray-500 absolute top-2 right-2"
                  onClick={clearImage}
                />
              </div>
            ) : (
              <div className="mt-4 text-left w-full">
                <Label htmlFor="image" value="Upload new image" />
                <FileInput
                  id="image"
                  accept="image/jpeg, image/png, image/jpg"
                  {...register("image")}
                />
              </div>
            )}

            {errors?.body && <ValidationError error={errors.body.message} />}
            {errors?.image && <ValidationError error={errors.image.message} />}

            <AppButton type="submit" disabled={isPending} isLoading={isPending}>
              Update post
            </AppButton>
          </form>
        </div>
        
      </ModalBody>

    </Modal>
  );
}
