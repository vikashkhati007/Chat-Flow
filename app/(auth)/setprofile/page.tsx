"use client"
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function ProfessionalAvatarSelection(param:any) {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const avatars = [
    "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg",
    "https://thumbs.dreamstime.com/b/female-user-profile-avatar-woman-character-screen-saver-happy-emotions-female-user-profile-avatar-199601144.jpg",
    "https://img.freepik.com/premium-vector/avatar-profile-vector-illustrations-website-social-networks-user-profile-icon_495897-224.jpg?w=360",
  ];

  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index);
  };

  const handleContinue = async () => {
    if (selectedAvatar !== null) {
      const data = {
        email: param.searchParams.email,
        avatarUrl: avatars[selectedAvatar],
      };
      const res = await fetch(`/api/updateavatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: "Profile Upated Successfully",
          description: "Profile picture has been successfully updated",
        });
        router.push("/");
      } else {
        toast({
          title: "Profile Update Failed",
          description: "Profile picture could not be updated",
        });
      }
    } else {
      alert("Please select an avatar before continuing.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Select Your Profile Picture
        </h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                selectedAvatar === index
                  ? "ring-2 ring-blue-500 shadow-md"
                  : "hover:shadow-md hover:scale-105"
              }`}
              onClick={() => handleAvatarSelect(index)}
            >
              <Image
                src={avatar}
                alt={`Professional avatar option ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
