"use client";
import { Copy } from "lucide-react";
import { useState } from "react";

const AboutMe = () => {
  const email = "kohinoornimes.dev@gmail.com";

  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col space-y-4 ">
      <p className="text-sm leading-6.5">
        Hey, I&apos;m Kohinoor. <strong>Software Engineer</strong>.
        <br />
        <br />
        <strong>probably thinking:</strong>
        <em>&quot;Why the f*** did you build this site?&quot;</em> Honestly, no
        clue. Still don&apos;t. <strong>Maybe that&apos;s the point.</strong>
        <br />
        <br />
        Started as a <strong>weekend project</strong>. Got it working, then
        abandoned it. Couldn&apos;t afford AWS, too lazy for servers.
        <br />
        <br />
        Then a <strong>holy dog</strong> appeared in my dream:{" "}
        <em>&quot;Finish it.&quot;</em>
        <br />
        So here we are.
        <br />
        <br />
        Used an external API back then. Last two months? Learned{" "}
        <strong>
          SSL, Nginx, DNS, caching, scraping, PM2, reverse proxies
        </strong>
        . Accidentally became the infrastructure guy.
        <br />
        <br />
        Now running my own setup with <strong>18,000+ dog images</strong>. Low
        latency, no CDN {"(Will setup soon)"}, fast. Too fun to stop.
        <br />
      </p>
      <p className="text-sm leading-6.5">
        2nd-year B.Tech student. Build weird things. Always learning, always
        curious.
      </p>
      <strong className="text-sm leading-6.5">
        Got questions? Wanna collaborate? Hit me up.
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
