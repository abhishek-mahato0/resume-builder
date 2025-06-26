import { useState, useEffect } from "react";
import { ResumeData, TemplateType } from "../template/types";
import { RiPrinterLine } from "react-icons/ri";
import { saveTemplate } from "../auth/utils";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { validateResume } from "../template/zodSchema";
import { downloadPDF } from "@/lib/utils";

const Sidebar = ({
  sampleData,
  onDataChange,
}: {
  sampleData: ResumeData;
  onDataChange?: (data: ResumeData | null) => void;
}) => {
  const [jsonText, setJsonText] = useState(""); // editable text
  const [parsedJson, setParsedJson] = useState<ResumeData | null>(null);
  const searchParams = useSearchParams();
  const template = (searchParams.get("template") as TemplateType) || "classic";
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

  const saveResume = async (jsonData: ResumeData) => {
    try {
      await saveTemplate({ ...jsonData, templateId: template });
      toast.success("✅ Resume saved successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        "❌ Failed to save resume: " + (error?.message || "Unknown error")
      );
      setIsLoading(false);
      return;
    }
  };
  const downloadResume = async () => {
    setIsLoading(true);
    if (!parsedJson) {
      setIsLoading(false);
      return;
    }
    const isDownloaded = await downloadPDF(
      "classic-resume",
      parsedJson.title || "My Resume",
      template
    );

    if (isDownloaded) {
      const { data, error } = validateResume(parsedJson);
      if (error) {
        toast.error("❌ Invalid JSON data: " + JSON.stringify(error));
        setIsLoading(false);
        return;
      }
      await saveResume(data as ResumeData);
    } else {
      toast.error("❌ Failed to download resume.");
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (isValid && parsedJson) {
      await saveResume(parsedJson);
    } else {
      toast.error("❌ Invalid JSON data. Please fix errors before saving.");
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
          onClick={downloadResume}
          className="px-3 py-2 bg-blue-600 rounded text-sm cursor-pointer flex gap-1 items-center"
          disabled={isLoading}
        >
          <RiPrinterLine />
          <span>{isLoading ? "Downloading..." : "Download"}</span>
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-2 bg-green-600 rounded text-sm cursor-pointer"
        >
          💾 Save
        </button>
      </div>

      {/* JSON Editor */}
      <div className="flex-1 bg-gray-100 text-black border border-gray-300 rounded">
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
