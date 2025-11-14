import AboutMe from "./about-me";
import ProjectTimeline from "./project-timeline";

const AboutTabContent = ({ tab }: { tab: "about" | "project-timeline" }) => {
  return tab === "about" ? <AboutMe /> : <ProjectTimeline />;
};

export default AboutTabContent;
