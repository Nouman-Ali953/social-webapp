import React from "react";
import ContentLoader from "react-content-loader";

const StoryLoader = () => (
  <ContentLoader
    width={500}
    height={100}
    viewBox="0 0 500 100"
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
  >
    <circle cx="46" cy="38" r="38" />
    <rect x="34" y="83" rx="5" ry="5" width="25" height="10" />
    <rect x="547" y="222" rx="5" ry="5" width="220" height="10" />
    <rect x="82" y="150" rx="5" ry="5" width="220" height="10" />
    <circle cx="137" cy="38" r="38" />
    <rect x="124" y="83" rx="5" ry="5" width="25" height="10" />
    <circle cx="228" cy="38" r="38" />
    <rect x="215" y="83" rx="5" ry="5" width="25" height="10" />
    <circle cx="320" cy="38" r="38" />
    <rect x="307" y="83" rx="5" ry="5" width="25" height="10" />
    <circle cx="410" cy="38" r="38" />
    <rect x="398" y="83" rx="5" ry="5" width="25" height="10" />
  </ContentLoader>
);

StoryLoader.metadata = {
  name: "Alan Hurtarte", // My name
  github: "kenny08gt", // Github username
  description: "Instagram histories. Picture + username", // Little tagline
  filename: "HistoriesLoader", // filename of your loader
};

export default StoryLoader;
