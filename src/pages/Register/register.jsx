import axios from "axios";
import { Label, TextInput, Radio, Datepicker } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../components/shared/Validationerror/validationErrors";
import { registerSchema } from "../../Validation/schemas";
import AppButton from "../../components/shared/AppButton/appButton";
import toast, {  } from "react-hot-toast";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const defaultVlaues = {
  email: "",
  name: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    defaultValues: defaultVlaues,
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const handleChangeDate = (date, field) => {
    if (date) {
      const formattedDate = new Date(date)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replaceAll("/", "-");
      field.onChange(formattedDate);
    }
  };
  async function onSubmit(formData) {
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        formData
      );

      if (response?.message === "success") {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong!";
      toast.error(errorMsg, { id: "register-error" });
    }
  }

  return (
    <>
      <section className="py-12">
        <div className="Container dark:bg-gray-800 mx-auto max-w-lg p-8 rounded-lg shadow-lg">
          <h1 className="text-center">Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col gap-4"
          >
            {/* ********** email input ********** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                type="text"
                placeholder="gehad@gmail.com"
                {...register("email")}
              />
              {errors.email && <ValidationError error={errors.email.message} />}
            </div>

            {/* ********** name input ********** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your name</Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Gehad Alaa"
                {...register("name")}
              />
              {errors.name && <ValidationError error={errors.name.message} />}
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

            {/* ********** confirm password input ********** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm your password</Label>
              </div>
              <div className="relative">
                <TextInput
                  id="rePassword"
                  type={showRePassword ? "text" : "password"}
                  placeholder="**********"
                  {...register("rePassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  {showRePassword ? (
                    <HiEyeOff size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
              </div>
              {errors.rePassword && (
                <ValidationError error={errors.rePassword.message} />
              )}
            </div>

            {/* ********** date of birth ********** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Date of birth</Label>
              </div>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Datepicker
                    {...field}
                    value={field.value || null}
                    placeholder="Select date"
                    onChange={(date) => handleChangeDate(date, field)}
                  />
                )}
              />
              {/* <TextInput
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              /> */}
              {errors.dateOfBirth && (
                <ValidationError error={errors.dateOfBirth.message} />
              )}
            </div>

            {/* ********** gender ********** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="gender">Gender</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="female"
                  name="gender"
                  value="female"
                  {...register("gender")}
                />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="male"
                  name="gender"
                  value="male"
                  {...register("gender")}
                />
                <Label htmlFor="male">Male</Label>
              </div>
              {errors.gender && (
                <ValidationError error={errors.gender.message} />
              )}
            </div>

            <AppButton
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Register
            </AppButton>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
