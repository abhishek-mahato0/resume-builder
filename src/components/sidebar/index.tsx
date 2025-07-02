"use client";
import { useState, useEffect, useRef } from "react";
import { ResumeData, TemplateType } from "../template/types";
import { RiPrinterLine } from "react-icons/ri";
import { saveTemplate, updateTemplate } from "../auth/utils";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";
import { validateResume } from "../template/zodSchema";
import html2pdf from "html2pdf.js";
import { IoMdSend } from "react-icons/io";

const Sidebar = ({
  sampleData,
  onDataChange,
}: {
  sampleData: ResumeData;
  onDataChange?: (data: ResumeData | null) => void;
}) => {
  const params = useParams();
  const [jsonText, setJsonText] = useState(""); // editable text
  const [parsedJson, setParsedJson] = useState<ResumeData | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const searchParams = useSearchParams();
  const template = (searchParams.get("template") as TemplateType) || "classic";
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAIOpertations, setIsAIOpertations] = useState<{
    isLoading: boolean;
    error: string | null;
    data: null;
  }>({
    isLoading: false,
    error: null,
    data: null,
  });
  const downloadPDF = async (elementId: string, fileName = "resume.pdf") => {
    try {
      const element = document.getElementById(elementId);
      if (!element) return;
      await new Promise((resolve) => setTimeout(resolve, 100));

      const opt = {
        margin: [0.5, 0.5],
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
        },
        jsPDF: {
          unit: "pt",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().from(element).set(opt).save();
      return true;
    } catch (error) {
      console.error("Error downloading PDF:", error);
      return false;
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset first
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // grow up to 200px
    }
  };

  useEffect(() => {
    if (!sampleData) return;
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
      if (params?.id) {
        await updateTemplate(params.id?.toString(), {
          ...jsonData,
          templateId: template,
        });
      } else {
        await saveTemplate({ ...jsonData, templateId: template });
      }
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
      parsedJson.title || "My Resume"
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

  const handleAIRequest = async (query: string) => {
    setIsAIOpertations((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const res = fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: query,
          context: JSON.stringify(parsedJson),
        }),
      });
      const data = await (await res).json();
      if (data?.length) {
        setParsedJson(data?.[0]);
        setJsonText(JSON.stringify(data?.[0], null, 2));
        setIsAIOpertations((prev) => ({
          ...prev,
          isLoading: false,
          data: data,
          error: null,
        }));
      }
    } catch (error) {
      setIsAIOpertations((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
      toast.error(
        "❌ AI request failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="flex flex-col lg:w-[30%] w-full bg-black text-white lg:h-[100vh] min-h-screen gap-4 py-6 lg:pr-4 lg:pl-8">
      {/* Title and Description */}
      <div className="w-full flex flex-col">
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
      <div className="bg-gray-100 text-black border lg:h-[70%] h-[400px] border-gray-300 rounded overflow-hidden">
        {isAIOpertations.isLoading ? (
          <div className="animate-pulse bg-gray-400 bg-opacity-50 flex h-full items-center justify-center z-10">
            <p className="text-gray-800">Loading AI response...</p>
          </div>
        ) : (
          <textarea
            value={jsonText}
            onChange={(e) => handleRawJsonChange(e.target.value)}
            className="w-full lg:h-full h-[400px] font-mono p-2 text-sm outline-none resize-none overflow-y-auto"
          />
        )}
      </div>

      {/* AI Section Placeholder */}
      <div className="flex gap-4 items-center bg-gray-900 border border-gray-600 p-2 rounded">
        <textarea
          ref={textareaRef}
          placeholder="Ask AI (coming soon)"
          className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none overflow-y-clip lg:max-h-[120px] max-h-[200px]"
          disabled={isAIOpertations.isLoading}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onInput={handleInput}
        />
        <p
          className={`text-white text-2xl cursor-pointer hover:scale-105 ${
            isAIOpertations.isLoading
              ? "cursor-not-allowed text-gray-400 animate-pulse"
              : ""
          }`}
          onClick={() => {
            if (isAIOpertations.isLoading) return;
            handleAIRequest(userInput);
          }}
        >
          <IoMdSend />
        </p>
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
