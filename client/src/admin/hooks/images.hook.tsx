import { useState, useMemo, ChangeEvent } from "react";
import Image from "next/image";
import { PhotoIcon, PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ImageUploaderProps {
  onChange?: (files: File[]) => void;
  onChangeSingle?: (file: File | null) => void;
  single?: boolean;
}

const useImageUploader = ({
  onChange,
  onChangeSingle,
  single,
}: ImageUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const resfiles = event.target.files as unknown as File[];

    if (single && onChangeSingle) {
      if (resfiles?.[0]) {
        setFile(resfiles[0]);
        onChangeSingle(resfiles[0]);
      }
    } else if (!single && onChange) {
      if (resfiles && files.length + resfiles.length <= 3) {
        setFiles((prevFiles) => [...prevFiles, ...resfiles]);
        onChange([...files, ...resfiles]);
      } else {
        setFiles([...files]);
        onChange([...files]);
      }
    }
  };

    const removeSingleFile = () => {
      if (onChangeSingle) {
        setFile(null);
        onChangeSingle(null);
      }
    };

    const removeFile = (index: number) => {
      if (onChange) {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        onChange(updatedFiles);
      }
    };

    const removeAll = () => {
      if (onChange) {
        setFiles([]);
        onChange([]);
      }
    };

  const singleImage = useMemo(() => {
    if (file)
      return (
        <>
          <Image
            src={URL.createObjectURL(file)}
            alt="Preview"
            width={400}
            height={150}
            className="object-cover w-full h-full hover:scale-105 transition-all duration-200"
          />
          <button
            className="absolute top-[40%] right-[40%] p-1 bg-white rounded-full group"
            onClick={removeSingleFile}
          >
            <XMarkIcon className="h-5 w-5 text-red-500 group-hover:font-extrabold" />
          </button>
        </>
      );
  }, [file?.name]);

  const ImageInput = () => (
    <>
      <label
        htmlFor="imageInput"
        className="flex items-center justify-center w-full h-full cursor-pointer"
      >
        <div className="relative">
          <PhotoIcon className="h-8 w-8 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
          <PlusSmallIcon
            className={`h-4 w-4 absolute top-0 left-7 text-red-500 hover:text-red-600`}
          />
        </div>
      </label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        multiple={!single}
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );

  return {
    handleImageChange,
    singleImage,
    ImageInput,
    removeSingleFile,
    removeFile,
    removeAll,
    file,
    files,
  };
};

export default useImageUploader;
