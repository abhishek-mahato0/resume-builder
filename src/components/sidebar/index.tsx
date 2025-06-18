import { useState, useEffect } from "react";
import { ResumeData } from "../template/types";
import { downloadResumeAsPDF } from "@/utils";
import { RiPrinterLine } from "react-icons/ri";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const prettyJson = JSON.stringify(sampleData, null, 2);
    setJsonText(prettyJson);
    setParsedJson(sampleData);
  }, [sampleData]);

  useEffect(() => {
    if (!onDataChange) return;
    onDataChange(parsedJson);
  }, [parsedJson]);

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

  const saveResume = async () => {
    setIsLoading(true);
    if (!parsedJson) {
      alert("❌ No data to save.");
      setIsLoading(false);
      return;
    }
    const isDownloaded = await downloadResumeAsPDF(
      "classic-resume",
      "resume.pdf"
    );
    if (isDownloaded) {
      alert("✅ Resume saved successfully!");
    } else {
      alert("❌ Failed to save resume.");
    }
    setIsLoading(false);
  };

  const handleSave = () => {
    if (isValid && parsedJson) {
      alert("✅ Data saved successfully!");
      // You can replace this with actual save logic
    } else {
      alert("❌ Cannot save. Fix JSON syntax.");
    }
  };

  return (
    <div className="flex flex-col w-[30%] bg-black text-white h-[100vh] gap-4 py-6 pr-4 pl-8">
      {/* Title and Description */}
      <div>
        <h2 className="text-xl font-bold">Your Resume Data</h2>
        <p className="text-sm text-gray-300 mt-1">
          This section allows you to view and edit your resume data in JSON
          format. Make changes and see updates live.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={saveResume}
          className="px-3 py-2 bg-blue-600 rounded text-sm cursor-pointer flex gap-1 items-center"
          disabled={isLoading}
        >
          <RiPrinterLine />
          <span>{isLoading ? "Printing..." : "Print"}</span>
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-2 bg-green-600 rounded text-sm cursor-pointer"
        >
          💾 Save
        </button>
      </div>

      {/* JSON Editor */}
      <div className="flex-1 bg-gray-100 text-black overflow-y-scroll border border-gray-300 rounded">
        <textarea
          value={jsonText}
          onChange={(e) => handleRawJsonChange(e.target.value)}
          className="h-full w-full font-mono p-2 text-sm outline-none"
        />
      </div>

      {/* AI Section Placeholder */}
      <div className="flex gap-4 items-center bg-gray-900 border border-gray-600 p-2 rounded">
        <input
          type="text"
          placeholder="Ask AI (coming soon)"
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          disabled
        />
        <p className="text-gray-500 cursor-not-allowed">Send</p>
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
