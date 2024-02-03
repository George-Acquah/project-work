import { useEffect } from "react";

const useFetchImage = (
  setFiles: (files: File[]) => void,
  setLoading: (arg: boolean) => void,
  setError: (arg: string) => void,
  initialImage?: string,
) => {
useEffect(() => {
  if (initialImage) {
    const fetchImageAndCreateFile = async () => {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        const response = await fetch(initialImage);
        const blob = await response.blob();
        const newFile = new File([blob], "image.jpg", { type: "image/*" });
        setFiles([newFile]);
      } catch (error) {
        setError("Failed to fetch initial image");
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchImageAndCreateFile();
  }
}, [initialImage]);

};

export default useFetchImage;