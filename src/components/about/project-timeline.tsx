import React from "react";

const TimelineItem = ({
  date,
  title,
  description,
}: {
  date: string;
  title: string;
  description: React.ReactNode;
}) => (
  <div className="relative pl-5 pb-5">
    <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-300 dark:bg-zinc-700"></div>
    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 -translate-x-1/2"></div>
    <div className="flex flex-col">
      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        {date}
      </span>
      <h3 className="text-sm font-semibold my-1 text-zinc-800 dark:text-zinc-200">
        {title}
      </h3>
      <div className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </div>
    </div>
  </div>
);

const ProjectTimeline = () => {
  return (
    <div className="flex flex-col space-y-1">
      <TimelineItem
        date="August 16, 2025"
        title="Weekend Project Begins"
        description={
          <>
            Started as a weekend project. Designed the initial UI structure
            using glassmorphism concepts which I was learning at the time.
            Created the basic layout and navigation components in the first 6
            hours.
          </>
        }
      />

      <TimelineItem
        date="August 17, 2025"
        title="UI Implementation"
        description={
          <>
            Completed most of the UI components including the image viewer,
            bottom bar, and side navigation. Implemented theme switching
            functionality and refined the glassmorphism styling across all
            components.
          </>
        }
      />

      <TimelineItem
        date="August 18, 2025"
        title="Image Navigation Logic"
        description={
          <>
            Started learning about doubly linked list data structures to
            implement next/previous image navigation. Each image acts as a node
            with references to the next and previous images, allowing smooth
            navigation between dog pictures.
          </>
        }
      />

      <TimelineItem
        date="Present"
        title="Infrastructure & Deployment"
        description={
          <>
            Currently learning system programming and exploring cost-effective
            deployment options instead of expensive AWS EC2 instances. Working
            on setting up my own infrastructure to keep the project running
            without burning through my budget.
          </>
        }
      />

      <div className="text-xs text-zinc-500 dark:text-zinc-400 italic mt-2">
        <span className="font-semibold">Note:</span> Timeline will be updated as
        the project evolves.
      </div>
    </div>
  );
};

export default ProjectTimeline;
