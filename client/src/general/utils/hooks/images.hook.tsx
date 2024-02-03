import { useState, useMemo, ChangeEvent, useCallback } from "react";
import Image from "next/image";
import {
  PhotoIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useFetchImage from "./fetch-images.hook";
import Button from "@/app/ui/shared/button";

interface _IMultipleImage {
  file: File;
  index: number;
}
interface ImageUploaderProps {
  onChange?: (files: File[]) => void;
  onChangeSingle?: (file: File | null) => void;
  single?: boolean;
  initialImage?: string;
}

const useImageUploader = ({
  onChange,
  onChangeSingle,
  single,
  initialImage,
}: ImageUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const resfiles = event.target.files as unknown as File[];

      if (single && onChangeSingle && resfiles?.[0]) {
        setFile(resfiles[0]);
        onChangeSingle(resfiles[0]);
      } else if (
        !single &&
        onChange &&
        resfiles?.length &&
        files.length + resfiles.length <= 3
      ) {
        setFiles((prevFiles) => [...prevFiles, ...resfiles]);
        onChange([...files, ...resfiles]);
      } else {
        setFiles([...files]);
        onChange?.([...files]);
      }
    },
    [single, onChange, onChangeSingle, files]
  );

  const removeSingleFile = () => {
    if (onChangeSingle) {
      setFile(null);
      onChangeSingle(null);
    }
  };

  useFetchImage(setFiles, setLoading, setError, initialImage);

  const addFiles = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (onChange) {
      onChange([...files, ...newFiles]);
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

const MultipleImages = ({ file, index }: _IMultipleImage) => {
  return (
    <div key={index} className={`relative border border-transparent`}>
      <Image
        src={URL.createObjectURL(file)}
        alt={`File Preview`}
        width={500}
        height={350}
        className="w-full rounded-md h-[13rem] sm:h-[14rem] md:h-[15rem] object-cover"
      />
      <button
        className="absolute top-2 right-2 p-1 bg-white hover:bg-[#ffffff] rounded-full hover:scale-[1.04] transition-all duration-500"
        onClick={() => removeFile(index)}
      >
        <XMarkIcon className="h-5 w-5 text-red-600 font-extrabold" />
      </button>
    </div>
  );
};

  const RemoveAllBtn = () => (
    <>
      {!single && files.length >= 1 && (
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={removeAll}
        >
          Remove All
        </Button>
      )}
    </>
  );

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
        name="files"
        accept="image/*"
        multiple={!single}
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );

  return {
    file,
    files,
    singleImage,
    loading,
    error,
    MultipleImages,
    RemoveAllBtn,
    handleImageChange,
    ImageInput,
    removeSingleFile,
    removeFile,
    removeAll,
    setFiles,
    addFiles,
  };
};

export default useImageUploader;
