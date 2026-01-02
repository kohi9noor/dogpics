"use client";
import React, { useState, useRef } from "react";
import { motion as m } from "motion/react";
import { Camera, Upload, X, Check } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

const Page = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [breed, setBreed] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type.includes("image")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setBreed("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage || !breed) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      const response = await axios.post(
        "https://api.dogpix.lol/api/images/upload",
        formData
      );

      if (response.status === 201) {
        toast.success("Image submitted successfully!");
        setSubmitted(true);
      } else {
        toast.error("Failed to submit image. Please try again.");
      }

      setSubmitting(false);
      setTimeout(() => {
        setSubmitted(false);
        handleRemoveImage();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Upload failed!");
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full pt-8 px-4 md:px-0 flex flex-col items-center pb-24">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md backdrop-blur-md dark:bg-zinc-950/60 bg-foreground/10 border border-white/10 rounded-xl p-6"
      >
        <h1 className="text-xl font-bold text-[#582D1D] dark:text-[#F4DAD3] mb-4 text-center">
          Submit a Dog Picture
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!selectedImage ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-64 transition-colors
                ${
                  dragActive
                    ? "border-[#582D1D] bg-[#582D1D]/10 dark:border-[#F4DAD3] dark:bg-[#F4DAD3]/10"
                    : "border-[#582D1D]/30 hover:border-[#582D1D]/60 dark:border-[#F4DAD3]/30 dark:hover:border-[#F4DAD3]/60"
                }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <Camera
                size={40}
                className="text-[#582D1D]/70 dark:text-[#F4DAD3]/70 mb-4"
              />
              <p className="text-center text-sm text-[#582D1D]/80 dark:text-[#F4DAD3]/80 mb-2">
                Drag and drop your image here, or click to select
              </p>
              <p className="text-center text-xs text-[#582D1D]/50 dark:text-[#F4DAD3]/50">
                Supports: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden h-64">
              <Image
                src={selectedImage}
                alt="Selected dog"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Breed Input */}
          <div>
            <label
              htmlFor="breed"
              className="block text-sm font-medium text-[#582D1D] dark:text-[#F4DAD3] mb-1"
            >
              Dog Breed
            </label>
            <input
              type="text"
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="e.g., Golden Retriever"
              className="w-full px-3 py-2 bg-transparent border border-[#582D1D]/30 dark:border-[#F4DAD3]/30 rounded-md text-[#582D1D] dark:text-[#F4DAD3] focus:border-[#582D1D] dark:focus:border-[#F4DAD3] outline-none text-sm"
              disabled={!selectedImage || submitting || submitted}
            />
          </div>

          <m.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!selectedImage || !breed || submitting || submitted}
            type="submit"
            className={`mt-2 flex items-center justify-center gap-2 py-2 rounded-md transition-colors
              ${
                !selectedImage || !breed
                  ? "bg-[#582D1D]/10 text-[#582D1D]/50 dark:bg-[#F4DAD3]/10 dark:text-[#F4DAD3]/50 cursor-not-allowed"
                  : submitted
                  ? "bg-green-500/20 text-green-400 cursor-default"
                  : "bg-[#582D1D]/20 text-[#582D1D] dark:bg-[#F4DAD3]/20 dark:text-[#F4DAD3] hover:bg-[#582D1D]/30 dark:hover:bg-[#F4DAD3]/30"
              }`}
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-t-[#582D1D] dark:border-t-[#F4DAD3] border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
            ) : submitted ? (
              <>
                <Check size={18} />
                Submitted Successfully
              </>
            ) : (
              <>
                <Upload size={18} />
                Submit Picture
              </>
            )}
          </m.button>
        </form>
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md mt-6 dark:bg-zinc-950/60 bg-foreground/10 backdrop-blur-md border border-white/10 rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold text-[#582D1D] dark:text-[#F4DAD3] mb-4">
          Submission Guidelines
        </h2>
        <ul className="text-[#582D1D]/80 dark:text-[#F4DAD3]/80 text-sm space-y-2">
          <li>• Images must be of dogs only, No brainrot</li>
          <li>• Please provide the correct breed if known</li>
          <li>• Maximum file size: 5MB</li>
          <li>• Supported formats: JPG, PNG, GIF</li>
          <li>• No offensive or inappropriate content</li>
          <li>• Your submission will be reviewed before being added</li>
        </ul>
      </m.div>
    </div>
  );
};

export default Page;
