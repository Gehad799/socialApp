import { Card, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import AppButton from "../shared/AppButton/appButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../Validation/schemas";
import ValidationError from "../shared/Validationerror/validationErrors";
import { FiUploadCloud } from "react-icons/fi";
import { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddPost() {
  const fileRef = useRef();
  const querClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(postSchema),
  });

  const { mutate: addNewPost, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      toast.success("Post added successfully");
      setValue("body", "");
      setValue("image", null);
      querClient.invalidateQueries(["all-posts"]);
      querClient.invalidateQueries(["user-posts"]);
    },
    onError: () => {
      toast.error("Failed to add post");
    },
  });
  async function addPost(data) {
    // console.log(data);
    console.log(fileRef.current.files[0]);
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileRef.current.files[0]) {
      formData.append("image", fileRef.current.files[0]);
    }
    return await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
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
          <Card>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(addNewPost)}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="body">Post something </Label>
                </div>
                <div className="flex items-center gap-4">
                  <Textarea
                    id="body"
                    placeholder="What's on your mind..."
                    rows={2}
                    {...register("body")}
                  />
                  {/* <input
                    {...register("image")}
                    type="file"
                    ref={fileRef}
                    className="hidden"
                    accept="image/*"
                  /> */}

                  <FileInput
                    {...register("image")}
                    ref={(el) => {
                      register("image").ref(el);
                      fileRef.current = el;
                    }}
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png, image/jpg"
                  />
                  <FiUploadCloud
                    size={24}
                    className="cursor-pointer"
                    onClick={() => fileRef.current.click()}
                  />
                </div>

                {errors.body && <ValidationError error={errors.body.message} />}
                {errors.image && (
                  <ValidationError error={errors.image.message} />
                )}
              </div>

              <AppButton
                isLoading={isPending}
                disabled={isPending}
                type="submit"
              >
                Create post
              </AppButton>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
