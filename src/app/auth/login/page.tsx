"use client";

import { SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { LoginFormSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { login, setUserDetails } from "@/redux/slices/auth/authSlice";
import Cookies from "js-cookie";
import { cookiesKey, localStorageKeys } from "@/constants/comman";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema),
    mode: "all",
    defaultValues: {
      email: "prashantj@opsfuse.com",
      password: "Demo123",
    },
  });

  const signInPressed = async () => {
    const { email, password } = getValues();
    try {
      const res = await dispatch(
        login({
          username: email,
          password: password,
        })
      ).unwrap();
      dispatch(setUserDetails(res));
      localStorage.setItem(localStorageKeys.userDetails, JSON.stringify(res));
      Cookies.set(cookiesKey.adminToken, res?.access_token, {
        secure: true,
        path: "/",
      });
      router.push("/workspace/dashboard");
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <motion.div
            className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <SparklesIcon className="w-8 h-8 text-indigo-600" />
          </motion.div>
          <h1 className="text-2xl font-bold mt-4">
            Welcome to <span className="text-indigo-600">RecruitSmartly</span>
          </h1>
          <p className="text-sm text-gray-500">
            Smart Hiring Starts Here – Powered by AI
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 pb-10 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Sign in to your account
          </h2>

          <div className="space-y-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={value}
                  onChange={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Password"
                  type="password"
                  placeholder="password"
                  value={value}
                  onChange={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              label="Sign in"
              onClick={handleSubmit(signInPressed)}
              loading={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
