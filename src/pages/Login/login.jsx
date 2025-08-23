import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, Label, TextInput, Radio } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginSchema } from "../../Validation/schemas";
import ValidationError from "../../components/shared/Validationerror/validationErrors";
import AppButton from "../../components/shared/AppButton/appButton";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {  useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {setToken}=useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const defaultVlaues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: defaultVlaues,
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  async function onSubmit(formData) {
    console.log(formData);
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        formData
      );
      console.log("Registration successful:", response);
      if (response?.message === "success") {
        toast.success("Login successful!");
        localStorage.setItem("token", response.token);
        setToken(response.token)
        setTimeout(() => {
          navigate("/posts");
        }, 1500);
      } else {
        throw new Error("Registration failed", response?.error);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error;
      toast.error(errorMsg);
    }
  }

  return (
    <>
      <section className="py-12">
        <div className="Container dark:bg-gray-800 mx-auto max-w-lg p-8 rounded-lg shadow-lg">
          <h1 className="text-center">Log In</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              {/* ********** email input ********** */}
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="gehad@gmail.com"
                {...register("email")}
              />
              {errors.email && <ValidationError error={errors.email.message} />}
            </div>

            {/* ********** password input ********** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your password</Label>
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
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>

              {errors.password && (
                <ValidationError error={errors.password.message} />
              )}
            </div>
            <AppButton
              type="submit"
              isLoading={isSubmitting}
              disabled={!isValid || isSubmitting}
            >
              Log In
            </AppButton>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
