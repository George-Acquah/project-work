"use client";

import React, { useState } from "react";
import AddImage from "./image";

const AddProfileImage = () => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleProfilePictureChange = (selectedImage: File | null) => {
    setProfilePicture(selectedImage);
  };

  return <AddImage single onChangeSingle={handleProfilePictureChange} />;
};

export default AddProfileImage;
