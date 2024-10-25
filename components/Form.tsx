"use client";
import React, { useState } from "react";
import NoiseInput from "./NoiseInput";
import { Button } from "./ui/button";
import { Key, Mail, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
};

const Form = ({ type }: any) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (type === "register") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        toast({
          title: "Registration Completed",
          description: "You have been successfully registered",
        });
        router.push("/");
      } else {
        toast({
          title: "Registration Failed",
          description: "Please check your credentials",
        });
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.ok) {
        toast({
          title: "Login Completed",
          description: "You have been successfully logged in",
        });
        router.push("/chats");
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials",
        });
        console.log(res?.error);
      }
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <form
        className="space-y-4 flex justify-center items-center flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="content flex justify-center items-center text-white font-bold w-full">
          <Image src={"/logo.png"} width={50} height={50} alt="icon" />
          <h1 className="text-2xl">Chat Flow</h1>
        </div>

        {type === "register" && (
          <div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <UserRound className="text-white absolute mx-2" />
              <NoiseInput
                val={{
                  ...register("name", {
                    required: "Name is Required",
                    validate: (value) =>
                      value.length >= 3 || "Name must be at least 3 characters",
                  }),
                }}
                placeholder="Enter Your Full Name"
                onChange={(e) => setname(e.target.value)}
                value={name}
                type="text"
                name="name"
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name.message}</span>
            )}
          </div>
        )}

        <div>
          <div className="relative overflow-hidden rounded-md flex justify-start items-center">
            <Mail className="text-white absolute mx-2" />
            <NoiseInput
              val={{
                ...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email must be a valid email address",
                  },
                }),
              }}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              name="email"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div>
          <div className="relative overflow-hidden rounded-md flex justify-start items-center">
            <Key className="text-white absolute mx-2" />
            <NoiseInput
              val={{
                ...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                    hasNumber: (value) =>
                      /[0-9]/.test(value) || "Password must contain at least one number",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*]/.test(value) || "Password must contain at least one special character (!@#$%^&*)"
                  }
                }),
              }}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}
        </div>

        {type === "register" && (
          <div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <Key className="text-white absolute mx-2" />
              <NoiseInput
                val={{
                  ...register("confirmpassword", {
                    required: "Confirm Password is Required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  }),
                }}
                placeholder="Confirm your Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmpassword}
                name="confirmpassword"
                type="password"
              />
            </div>
            {errors.confirmpassword && (
              <span className="text-red-500 text-xs">{errors.confirmpassword.message}</span>
            )}
          </div>
        )}

        <div className="bottomcontainer flex justify-between items-center w-full ">
          <Link
            href={type === "register" ? "/" : "/register"}
            className="text-muted-foreground text-sm hover:text-background cursor-pointer decoration-blue-500 hover:underline"
          >
            {type === "register"
              ? "Already Have an Account"
              : "Create New Account"}
          </Link>

          <Button
            size={"lg"}
            className="border-t border-white border-opacity-60 font-bold tracking-wider hover:border-b hover:border-t-0"
          >
            {type === "register" ? "Register" : "Login"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;