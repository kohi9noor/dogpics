"use client";
import AboutTabContent from "@/components/about";
import { cn } from "@/lib/utils";
import { DownloadIcon, Github, Linkedin, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type HoveredLink = "resume" | "github" | "linkedin" | "x";
const hoveredLinkMap: Record<HoveredLink, string> = {
  resume: "resume, yes download it!",
  github: "scan me! ",
  linkedin: "fake professionalism",
  x: "let's chat!",
};
const Page = () => {
  const [hoveredLink, setHoveredLink] = useState<HoveredLink | null>(null);
  const [tab, setTab] = useState<"about" | "project-timeline">("about");
  return (
    <div className="max-w-5xl mx-auto h-full md:py-16 py-0 md:my-16 my-14 px-4 md:px-6 flex flex-col md:flex-row items-start bg-center pb-28 gap-8 md:gap-6">
      <div className="md:max-w-fit flex flex-col md:border-r border-b md:border-b-0 border-foreground/20 md:p-6 p-4 gap-2 w-full">
        <Image
          src="/zu-dogs.jpg"
          alt="Dogesh"
          className=" rounded-full"
          width={45}
          height={45}
        />

        <div>
          <h1 className="text-md">Kohinoor Nimes</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Just a weird engineer.
          </p>
          <div className="flex gap-2 mt-4">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              Dog Enthusiast
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              Full Stack Engineer
            </span>
          </div>

          <div className="flex gap-2 mt-4 items-center">
            <Link
              onMouseEnter={() => setHoveredLink("github")}
              onMouseLeave={() => setHoveredLink(null)}
              href="https://github.com/kohi9noor"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              aria-label="GitHub"
            >
              <Github size={16} className="text-zinc-700 dark:text-zinc-200" />
            </Link>
            <Link
              onMouseEnter={() => setHoveredLink("linkedin")}
              onMouseLeave={() => setHoveredLink(null)}
              href="https://www.linkedin.com/in/kohinoor-nimes-27b28435b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              aria-label="LinkedIn"
            >
              <Linkedin
                size={16}
                className="text-zinc-700 dark:text-zinc-200"
              />
            </Link>
            <Link
              onMouseEnter={() => setHoveredLink("x")}
              onMouseLeave={() => setHoveredLink(null)}
              href="https://x.com/kohinoornimes"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              aria-label="X"
            >
              <X size={16} className="text-zinc-700 dark:text-zinc-200" />
            </Link>
            <Link
              onMouseEnter={() => setHoveredLink("resume")}
              onMouseLeave={() => setHoveredLink(null)}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              aria-label="Download Resume"
            >
              <DownloadIcon
                size={16}
                className="text-zinc-700 dark:text-zinc-200"
              />
            </Link>
          </div>

          <div className=" flex gap-2 mt-4 ">
            <AnimatePresence>
              {hoveredLink && (
                <div className="">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 
          dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border 
          border-zinc-200 dark:border-zinc-700 shadow"
                  >
                    {hoveredLinkMap[hoveredLink]}
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col">
        <div className="max-w-fit bg-foreground/10 dark:bg-zinc-950/60 border border-foreground/20 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab("about")}
              className={cn(
                "px-3 py-1 rounded border text-xs font-medium transition",
                tab === "about"
                  ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  : "bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
              aria-pressed={tab === "about"}
            >
              About Me
            </button>
            <button
              onClick={() => setTab("project-timeline")}
              className={cn(
                "px-3 py-1 rounded border text-xs font-medium transition",
                tab === "project-timeline"
                  ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  : "bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
              aria-pressed={tab === "project-timeline"}
            >
              Project Timeline
            </button>
          </div>
        </div>

        <div className="mt-4 w-full bg-foreground/10 dark:bg-zinc-950/60 border border-foreground/20 rounded-2xl p-4">
          <AboutTabContent tab={tab} />
        </div>
      </div>
    </div>
  );
};

export default Page;
