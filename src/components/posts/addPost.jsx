import {
  Button,
  Card,
  Checkbox,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import AppButton from "../shared/AppButton/appButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../Validation/schemas";
import ValidationError from "../shared/Validationerror/validationErrors";
import { FiUploadCloud } from "react-icons/fi";
import { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  const fileRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(postSchema),
  });
  async function addPost(data) {
    // console.log(data);
    console.log(fileRef.current.files[0]);
    const formData = new FormData();
    formData.append("body", data.body);
    if(fileRef.current.files[0]){

      formData.append("image", fileRef.current.files[0]);
    }
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      if (data.message === "success") {
        toast.success("Post added successfully");
      } else {
        throw new Error("Failed to add post");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add post");
    }
  }
  return (
    <>
      <section className="max-w-2xl mx-auto my-10">
        <div className="flex flex-col gap-4">
          <Card>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(addPost)}
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
                  <input
                    {...register("image")}
                    type="file"
                    ref={fileRef}
                    className="hidden"
                    accept="image/*"
                  />
                  <FiUploadCloud
                    size={24}
                    className="cursor-pointer"
                    onClick={() => fileRef.current.click()}
                  />
                </div>

                {errors.body && <ValidationError error={errors.body.message} />}
              </div>

              <AppButton type="submit">Post</AppButton>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
