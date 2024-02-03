'use client'
import React from "react";
import useImageUploader from "@/utils/hooks/images.hook";

const AddImage: React.FC<_IAddImageProps> = ({
  onChange,
  onChangeSingle,
  single,
  rounded,
  custom_class,
  imageUrl,
}) => {
  const {
    files,
    file,
    ImageInput,
    singleImage,
    MultipleImages,
    RemoveAllBtn,
  } = useImageUploader({ onChange, onChangeSingle, single, initialImage: imageUrl });

  return (
    <div className="space-y-10">
      <div className={`${custom_class && "lg:max-w-[50%] lg:mx-auto"}`}>
        <div className="flex gap-x-2">
          <div
            className={`relative border border-gray-300 dark:border-gray-600 rounded-${rounded} overflow-hidden ${
              single ? "w-32 h-32" : "w-40 h-40"
            }`}
          >
            {single && file && singleImage}
            <ImageInput />
          </div>
          <RemoveAllBtn />
        </div>
        {!single && (
          <h1 className="mt-4">You have {3 - files.length} files remaining</h1>
        )}
      </div>
      <div className="grid grid-cols-1 px-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols- gap-4">
        {files.map((file: File, index: number) => (
          <MultipleImages key={index} file={file} index={index}/>
        ))}
      </div>
    </div>
  );
};

export default AddImage;
