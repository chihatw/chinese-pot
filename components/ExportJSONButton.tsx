"use client";

import { Button } from "./ui/button";

const ExportJSONButton = ({ jsonText }: { jsonText: string }) => {
  const handleClick = () => {
    download(jsonText, `${new Date().getTime()}.json`);
  };

  return <Button onClick={handleClick}>Export JSON</Button>;
};

export default ExportJSONButton;

const download = (content: string, fileName: string) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};
