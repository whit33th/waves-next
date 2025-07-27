"use client";
import type { LucideProps } from "lucide-react";
import { ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageInputProps {
  id: string;
  label?: string;
  LabelIcon?: React.ComponentType<LucideProps>;
  text?: string;
  MainIcon?: React.ComponentType<LucideProps>;
  required?: boolean;
  className?: string;
  onClick?: (file: File | null) => void;
}

export default function ImageInput({
  id,
  label = "Paste your image",
  LabelIcon = ImageIcon,
  text = "Click here!",
  MainIcon = Upload,
  required = false,
  className = "",
  onClick,
}: ImageInputProps) {
  const [img, setImg] = useState<string | null>("");
  return (
    <div className={className}>
      <label className="text-text-primary mb-2 block font-medium">
        <LabelIcon className="mr-2 inline h-4 w-4" />
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div>
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          id={id}
          required={required}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];

              if (file.size > 10 * 1024 * 1024) {
                alert("File size exceeds 10MB limit.");
                return;
              }

              const imgURL = URL.createObjectURL(file);
              setImg(imgURL);
              onClick?.(file);
            }
          }}
        />
        <label
          htmlFor={id}
          className="border-border/30 hover:border-primary bg-input-bg/90 block aspect-square cursor-pointer rounded-lg border-2 border-dashed backdrop-blur-md transition-all duration-300 hover:bg-black/20"
        >
          {img && (
            <Image
              src={img}
              alt="Cover Image"
              fill
              objectFit="cover"
              className="rounded-lg"
            />
          )}
          <div className="text-text-secondary flex h-full flex-col items-center justify-center">
            <MainIcon className="mb-2 h-8 w-8" />
            <span>{text}</span>
            <span className="mt-1 text-xs">PNG, JPG up to 10MB</span>
          </div>
        </label>
      </div>
    </div>
  );
}
