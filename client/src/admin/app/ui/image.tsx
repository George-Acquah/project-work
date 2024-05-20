'use client'
import React from "react";
import {
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Icon } from "@tremor/react";
import useImageUploader from "@/hooks/images.hook";

interface AddImageProps {
  onChange?: (files: File[]) => void;
  onChangeSingle?: (file: File | null) => void;
  single?: boolean;
}

const AddImage: React.FC<AddImageProps> = ({
  onChange,
  onChangeSingle,
  single,
}) => {
  const {
    files,
    file,
    ImageInput,
    removeFile,
    removeAll,
    singleImage,
  } = useImageUploader({ onChange, onChangeSingle, single });

  return (
    <div className="space-y-10">
      <div className="flex gap-x-2">
        <div
          className={`relative  border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden ${
            single ? "w-32 h-32" : "w-28 h-28"
          }`}
        >
          {single && file && singleImage}
          <ImageInput />
        </div>
        {!single && (
          <Icon
            icon={TrashIcon}
            size="lg"
            color="red"
            className="cursor-pointer"
            tooltip="This removes all selected images"
            onClick={removeAll}
          />
        )}
      </div>
      <div className="grid grid-cols-1 px-4 md:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file: File, index: number) => (
          <div
            key={index}
            className={`relative border rounded ${
              file.type === "application/pdf" && " bg-gray-300"
            }`}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={
                file.type === "application/pdf"
                  ? "PDF Preview"
                  : "Image Preview"
              }
              width={400}
              height={150}
              className="w-full h-[10rem] sm:h-[11rem] md:h-[12rem] object-cover"
            />
            <button
              className="absolute top-2 right-2 p-1 bg-white rounded-full"
              onClick={() => removeFile(index)}
            >
              <XMarkIcon className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddImage;
