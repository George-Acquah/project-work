import { SHARED_COLORS } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Image, ImageProps } from "react-native";

interface _ImageDP extends ImageProps {
  uri?: string;
  size?: number;
  fallbackUrl?: string;
  image?: boolean
}

const DPImage = ({
  uri = "https://randomuser.me/api/portraits/men/1.jpg",
  size = 100,
  fallbackUrl = "https://via.placeholder.com/150",
  image = false,
  ...rest
}: _ImageDP) => {
  const { } = rest;
  
  return (
    <Image
      source={{ uri: uri || fallbackUrl }}
      width={image ? 500 : 150}
      height={image ? 300 : 150}
      style={[
        styles.image,
        {
          width: image ? "100%" : size,
          height: image ? "100%" : size,
        },
        !image && {
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: SHARED_COLORS.gray200,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
  },
});

export default DPImage;
