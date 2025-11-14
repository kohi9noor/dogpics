"use client";
import { Copy } from "lucide-react";
import { useState } from "react";

const AboutMe = () => {
  const email = "kohinoornimes.dev@gmail.com";

  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col space-y-4 ">
      <p className="text-sm leading-6.5">
        Hello, I&apos;m Kohinoor. A <strong>Software Engineer</strong>.
        You&apos;re probably thinking:{" "}
        <em>&quot;why the f*** did you build this site?&quot; </em>
        Honestly, I asked myself the same thing and never found a satisfying
        answer. But maybe that&apos;s the whole beauty of it, isn&apos;t it?
        <br />
        <br />I started this as a <strong>weekend project</strong>. After
        getting all the functionality working, I left it because I didn&apos;t
        want to deploy it—I didn&apos;t have the money to pay for{" "}
        <strong>AWS</strong>. But then I realised I couldn&apos;t just leave it
        unfinished for the public. One day, a <strong>holy dog</strong> appeared
        in my dream and said,{" "}
        <strong>
          You can&apos;t leave the project without deploying it for public use.
        </strong>
        <br /> <br />
        So right now, I&apos;m using an external API. but I plan to manage my
        own <strong>server</strong> this month—just learning and setting up some
        stuff for now. But hey, give me some credit—the{" "}
        <strong>site is still working!</strong>
      </p>
      <p className="text-sm leading-6.5">
        A little more about me: I&apos;m a 2nd-year B.Tech student, always
        curious about weird projects and random ideas. I like exploring new tech
        and building stuff that makes people smile (or say &quot;wtf&quot;).
      </p>
      <strong className="text-sm leading-6.5">
        Do you have any questions or want to collaborate on a project or hire
        me? Feel free to reach out!
      </strong>
      <div
        onClick={() => {
          navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="flex items-center cursor-pointer space-x-2 bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700  rounded px-3 py-1 w-fit text-sm select-none"
      >
        <button
          aria-label="Copy email"
          className="focus:outline-none"
          type="button"
        >
          <Copy
            size={16}
            className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
          />
        </button>
        <span className="font-mono">{email}</span>
        {copied && <span className="ml-2 text-green-600 text-xs">Copied!</span>}
      </div>
    </div>
  );
};

export default AboutMe;
