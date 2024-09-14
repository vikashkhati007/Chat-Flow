"use client";
import React, { FormEvent, useState } from "react";
import NoiseInput from "./NoiseInput";
import { Button } from "./ui/button";
import { Key, Mail, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.ok) {
        router.push("/chats");
      } else {
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
          <>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <UserRound className="text-white absolute mx-2" />
              <NoiseInput
                val={{
                  ...register("name", {
                    required: "name is Required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "name must be atleast 3 charater";
                      }
                    },
                  }),
                }}
                placeholder="Enter Your Full Name"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name}
                type="name"
                name="name"
              />
            </div>
          </>
        )}
        <div className="relative overflow-hidden rounded-md flex justify-start items-center">
          <Mail className="text-white absolute mx-2" />
          <NoiseInput
            val={{
              ...register("email", {
                required: "Email is Required",
                validate: (value) => {
                  if (value.length < 3) {
                    return "Email must be atleast 3 charater";
                  }
                },
              }),
            }}
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            name="email"
          />
        </div>
        <div className="relative overflow-hidden rounded-md flex justify-start items-center">
          <Key className="text-white absolute mx-2 " />
          <NoiseInput
            val={{
              ...register("password", {
                required: "Password is Required",
                validate: (value) => {
                  if (value.length < 3) {
                    return "Password must be atleast 3 charater";
                  }
                },
              }),
            }}
            placeholder="Enter your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            name="password"
          />
        </div>
        {type === "register" && (
          <>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <Key className="text-white absolute mx-2 " />
              <NoiseInput
                val={{
                  ...register("confirmpassword", {
                    required: "ConfirmPassword is Required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "ConfirmPassword must be atleast 3 charater";
                      }
                    },
                  }),
                }}
                placeholder="Confirm your Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmpassword}
                name="confirmpassword"
                type="password"
              />
            </div>
          </>
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
            className=" border-t border-white border-opacity-60 font-bold tracking-wider hover:border-b hover:border-t-0"
          >
            {type === "register" ? "Register" : "Login"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;
