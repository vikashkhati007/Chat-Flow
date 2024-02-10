"use client";
import React, { useState } from "react";
import NoiseInput from "./NoiseInput";
import { Button } from "./ui/button";
import { Key, Mail } from "lucide-react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <form className="space-y-5 flex justify-center items-center flex-col">
        <div className="relative overflow-hidden rounded-md flex justify-start items-center">
          <Mail className="text-white absolute mx-2" />
          <NoiseInput
            color="blue"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
        </div>
        <div className="relative overflow-hidden rounded-md flex justify-start items-center">
          <Key className="text-white absolute mx-2 " />

          <NoiseInput
            color="pink"
            placeholder="Enter your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
          />
        </div>

        <Button
          size={"lg"}
          className=" border-t border-white border-opacity-60 font-bold tracking-wider hover:border-b hover:border-t-0"
        >
          Log In
        </Button>
      </form>
    </section>
  );
};

export default Form;
