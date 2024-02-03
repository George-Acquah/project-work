"use client";

import React, { useEffect, useState } from "react";
import AddImage from "./image";
import useImageUploader from "@/utils/hooks/images.hook";

export default function AddProfileImage () {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleProfilePictureChange = (selectedImage: File | null) => {
    setProfilePicture(selectedImage);
  };

  return <AddImage rounded="full" single onChangeSingle={handleProfilePictureChange} />;
};

export function AddParkingCenterImages({ center_image, custom_class }: { center_image?: string, custom_class?: boolean }) {

  const { addFiles } = useImageUploader({})

  return (
    <AddImage
      rounded="md"
      onChange={addFiles}
      imageUrl={center_image}
      custom_class = { custom_class }
    />
  );
};
