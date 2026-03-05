import Image from "next/image";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { Message } from "@/types";
import { UploadFileInput } from "../shared/UploadFileInput";
import { TooltipArrow } from "../shared/TooltipArrow";

interface ChatInputProps {
  loading: boolean;
  startPrompt?: string;
  sendMessage: (message: Message) => void;
}

export default function ChatInput({
  loading,
  startPrompt,
  sendMessage,
}: ChatInputProps) {
  const [prompt, setPrompt] = useState<string>(startPrompt || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (selectedFile) {
      convertToBase64(selectedFile).then((url) => setFileUrl(url));
    } else {
      setFileUrl(null);
    }

    if (startPrompt) {
      setPrompt(startPrompt);
    } else {
      setPrompt("");
    }
  }, [selectedFile, startPrompt]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleOpenFilePicker = () => {
    if (loading) return;

    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (prompt === "" && !selectedFile) return;

    const content: Message["content"] = [
      {
        type: "text",
        text: prompt,
      },
    ];

    if (selectedFile) {
      const base64Image = await convertToBase64(selectedFile);
      content.push({
        type: "image_url",
        image_url: { url: `data:image/jpeg;base64,${base64Image}` },
      });
    }

    const message: Message = {
      whois: "user",
      role: "user",
      content,
    };

    sendMessage(message);
    setPrompt("");
    setSelectedFile(null);
  };

  return (
    <section className="sticky bottom-[env(safe-area-inset-bottom)] z-20 flex w-full flex-col items-center px-4 xl:px-0">
      <div className="flex w-full max-w-screen-lg items-end justify-between space-x-2 rounded-md border border-jwdMarine-1000 bg-jwdMarine-900 p-2 shadow-md dark:border-jwdAqua-100/10 dark:bg-jwdAqua-600/10">
        <div className="relative flex flex-1 items-end space-x-2 border-r border-dotted border-slate-300 px-2 dark:border-jwdAqua-100/20">
          <textarea
            id="chatInput"
            name="chatInput"
            value={prompt}
            disabled={loading}
            placeholder="Ask Cellesseon..."
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            className="mb-[0.55rem] flex min-h-11 w-full resize-none rounded-md bg-transparent py-2 text-base leading-tight text-white placeholder:text-sm placeholder:text-white/65 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <TooltipArrow
            title={prompt === "" ? "No message yet" : "Send message"}
            placement="top"
          >
            <span>
              <button
                type="button"
                className="icon-btn text-base"
                disabled={prompt === "" || loading}
                onClick={handleSubmit}
                aria-label="Send message"
              >
                <i className="bi bi-send text-base"></i>
              </button>
            </span>
          </TooltipArrow>
        </div>
        <div className="flex w-auto">
          {!selectedFile ? (
            <TooltipArrow title="Attach media" placement="top">
              <button
                type="button"
                className={`icon-btn text-base ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={handleOpenFilePicker}
                aria-label="Attach media"
                disabled={loading}
              >
                <i className="bi bi-cloud-upload text-base"></i>
              </button>
            </TooltipArrow>
          ) : fileUrl ? (
            <button
              type="button"
              className="relative flex cursor-pointer"
              onClick={() => setSelectedFile(null)}
              aria-label="Remove selected image"
            >
              <i className="bi bi-x absolute -right-1.5 -top-1.5 rounded-full bg-orange-600 pt-[1px] leading-none text-white shadow-sm transition-all hover:bg-amber-600"></i>
              <Image
                priority
                width={40}
                height={40}
                className="max-h-[40px] max-w-[40px] rounded-sm"
                alt="Selected image"
                src={`data:image/jpeg;base64,${fileUrl}`}
              />
            </button>
          ) : null}
          <UploadFileInput
            ref={fileInputRef}
            id="addFile"
            type="file"
            accept="image/*"
            disabled={loading}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="flex py-1 text-xs font-light tracking-wide text-jwdAqua-900">
        Cellesseon can make mistakes. So double-check it.
      </div>
    </section>
  );
}
