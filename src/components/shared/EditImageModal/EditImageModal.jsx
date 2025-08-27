import {
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import AppButton from "../AppButton/appButton";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { editImageSchema } from "../../../Validation/schemas";
import ValidationError from "../Validationerror/validationErrors";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";

export function EditImageModal({ openEditImageModal, setOpenEditImageModal }) {
  const { getUserData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(editImageSchema),
  });

  const watchPhoto = watch("photo");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (watchPhoto && watchPhoto[0]) {
      const objectUrl = URL.createObjectURL(watchPhoto[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [watchPhoto]);

  const { mutate: editPhoto, isPending } = useMutation({
    mutationFn: handleEditPhoto,
    onSuccess: () => {
      toast.success("Image updated successfully");
      setOpenEditImageModal(false);
      setValue("photo", null);
      setPreview(null);
      getUserData(localStorage.getItem("token"));
    },
    onError: () => {
      toast.error("Failed to update image");
    },
  });

  async function handleEditPhoto(data) {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    return await axios.put(
      `https://linked-posts.routemisr.com/users/upload-photo`,
      formData,
      { headers: { token: localStorage.getItem("token") } }
    );
  }

  return (
    <Modal
      show={openEditImageModal}
      size="md"
      onClose={() => setOpenEditImageModal(false)}
      popup
      dismissible
    >
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <form onSubmit={handleSubmit(editPhoto)}>
            <div className="flex w-full items-center justify-center flex-col gap-4">
              <Label
                htmlFor="photo"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300  "
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <FileInput
                  id="photo"
                  className="hidden"
                  {...register("photo")}
                  accept="image/jpeg, image/png, image/jpg"
                />
              </Label>

              {/*  Preview the uploaded image */}
              {errors?.photo ? (
                <ValidationError error={errors.photo.message} />
              ) : (
                preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 rounded-lg border"
                  />
                )
              )}
              {!errors?.photo && preview && (
                <AppButton
                  type="submit"
                  disabled={isPending}
                  isLoading={isPending}
                >
                  Upload
                </AppButton>
              )}
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
