"use client";
import NoiseInput from "@/components/NoiseInput";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
const Profile = () => {
  const [username, setUsername] = useState("");
  const { data: session } = useSession();
  const user = session?.user;
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadPhoto = (result: any) => {
    setValue("image", result?.info?.secureurl);
  };
  return (
    <section className="w-full h-full flex justify-center items-center text-background">
      <div className="editprofilecontainer max-w-[700px] flex flex-col justify-center items-center p-10 gap-5">
        <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
        <Image
          src={watch("image") || user?.image || "/user.jpeg"}
          className="rounded-full border-blue-500 border-2 border-opacity-25"
          width={100}
          height={100}
          alt="profile"
        />
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={uploadPhoto}
          uploadPreset="ktec1uio"
        >
          <p>Upload photo</p>
        </CldUploadButton>
        <div className="usereditcontainer flex justify-start items-center relative">
          <User className="absolute left-2" />
          <NoiseInput
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Username must be greater that 3 character";
                }
              },
            })}
            placeholder="Enter Your Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="username"
            name="username"
          />
        </div>
        <Button className="border-t border-opacity-20">Save Changes</Button>
      </div>
    </section>
  );
};

export default Profile;
