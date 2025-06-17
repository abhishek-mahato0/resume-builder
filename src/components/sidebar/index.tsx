import { useState, useEffect } from "react";
import { ResumeData } from "../template/types";
import { downloadResumeAsPDF } from "@/utils";

const Sidebar = ({
  sampleData,
  onDataChange,
}: {
  sampleData: ResumeData;
  onDataChange?: (data: ResumeData | null) => void;
}) => {
  const [jsonText, setJsonText] = useState(""); // editable text
  const [parsedJson, setParsedJson] = useState<ResumeData | null>(null);
  const [isValid, setIsValid] = useState(true);

  // Set initial value when data arrives
  useEffect(() => {
    const prettyJson = JSON.stringify(sampleData, null, 2);
    setJsonText(prettyJson);
    setParsedJson(sampleData);
  }, [sampleData]);

  useEffect(() => {
    if (!onDataChange) return;
    onDataChange(parsedJson);
  }, [parsedJson]);

  // Handle user editing the JSON
  const handleRawJsonChange = (value: string) => {
    setJsonText(value);

    try {
      const parsed = JSON.parse(value);
      setParsedJson(parsed);
      setIsValid(true);
    } catch {
      setIsValid(false);
    }
  };

  console.log("data", parsedJson);

  return (
    <div className="flex flex-col w-[30%] h-[100vh] gap-2 p-2">
      <p className="font-bold">Your Data</p>
      <button
        onClick={() => downloadResumeAsPDF("classic-resume", "resume.pdf")}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Print Resume
      </button>

      <div className="bg-gray-100 text-black h-[90%] overflow-y-scroll border border-gray-300 rounded">
        <textarea
          value={jsonText}
          onChange={(e) => handleRawJsonChange(e.target.value)}
          className="h-full w-full font-mono p-2 text-sm"
        />
      </div>
      <div className="flex gap-4 bg-gray-900 border-gray-500">
        <input
          type="text"
          onChange={() => {}}
          placeholder="Ask AI"
          className="p-2 outline-0 focus:outline-0"
        />
        <p>Send</p>
      </div>
      {!isValid && (
        <p className="text-red-500 text-sm font-semibold">
          ⚠️ Invalid JSON syntax
        </p>
      )}
    </div>
  );
};

export default Sidebar;
