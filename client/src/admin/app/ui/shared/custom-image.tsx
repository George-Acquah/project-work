import { API } from "@/app/lib/data";
import Image, { ImageProps } from "next/image";

interface _Image extends ImageProps {
}
export default function MyImage({ src, alt, priority, width, height, className, fill, sizes }: _Image) {
  return (
    <Image
      src={ src ?
        `${API}/images/${"student-with-graduation-cap_57073.png"}` :
        "https://avatar.vercel.sh/leerob"
      }
      className={className}
      quality={80}
      sizes={sizes}
      fill={fill}
      alt={alt}
      width={width}
      height={height}
      priority={priority} // Preload the image
    />
  );
}
