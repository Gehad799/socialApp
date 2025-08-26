import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import AppButton from "../shared/AppButton/appButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../Validation/schemas";
import ValidationError from "../shared/Validationerror/validationErrors";
import { useContext, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

export function ChangePasswordModal({ openModal, setOpenModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { setToken } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });
  function onCloseModal() {
    setOpenModal(false);
    setValue("password", "");
    setValue("newPassword", "");
  }
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: handleUpdatePassword,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      toast.success("Password updated successfully");
      onCloseModal();
    },
    onError: (err) => {
      // console.log(err.response.data.error);
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      }
    },
  });
  async function handleUpdatePassword(data) {
    console.log(data);

    const res = await axios.patch(
      `https://linked-posts.routemisr.com/users/change-password`,
      data,
      { headers: { token: localStorage.getItem("token") } }
    );
    return res.data;
  }

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        dismissible
      >
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(updatePassword)}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Update Password
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Your old password</Label>
                </div>
                <div className="relative">
                  <TextInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <HiEyeOff size={20} />
                    ) : (
                      <HiEye size={20} />
                    )}
                  </button>
                </div>

                {errors?.password && (
                  <ValidationError error={errors.password.message} />
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="newPassword">Your new password</Label>
                </div>
                <div className="relative">
                  <TextInput
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="**********"
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {showNewPassword ? (
                      <HiEyeOff size={20} />
                    ) : (
                      <HiEye size={20} />
                    )}
                  </button>
                </div>

                {errors?.newPassword && (
                  <ValidationError error={errors.newPassword.message} />
                )}
              </div>

              <div className="w-full">
                <AppButton type="submit">Update Password</AppButton>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
