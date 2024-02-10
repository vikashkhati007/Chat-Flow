"use client";
import React, { useState } from "react";
import NoiseInput from "./NoiseInput";
import { Button } from "./ui/button";
import { Key, Mail, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Form = ({ type }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <form className="space-y-5 flex justify-center items-center flex-col">
        {type === "register" ? (
          <>
            <div className="content flex justify-center items-center text-white font-bold w-full">
              <Image src={"/chat.png"} width={50} height={50} alt="icon" />
              <h1 className="text-2xl">Chat Flow</h1>
            </div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <UserRound className="text-white absolute mx-2" />
              <NoiseInput
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="username"
                name="username"
              />
            </div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <Mail className="text-white absolute mx-2" />
              <NoiseInput
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                name="email"
              />
            </div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <Key className="text-white absolute mx-2 " />

              <NoiseInput
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                name="password"
              />
            </div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <Key className="text-white absolute mx-2 " />
              <NoiseInput
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
        ) : (
          <>
            <div className="content flex justify-center items-center text-white font-bold w-full">
              <Image src={"/chat.png"} width={50} height={50} alt="icon" />
              <h1 className="text-2xl">Chat Flow</h1>
            </div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <Mail className="text-white absolute mx-2" />

              <NoiseInput
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                name="email"
              />
            </div>
            <div className="relative overflow-hidden rounded-md flex justify-start items-center">
              <Key className="text-white absolute mx-2 " />

              <NoiseInput
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                name="password"
              />
            </div>
          </>
        )}
        <div className="bottomcontainer flex justify-between items-center w-full ">
          <Link
            href={type === "register" ? "/login" : "register"}
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
