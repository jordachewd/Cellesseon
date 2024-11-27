import css from "./ChatInput.module.css";
import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import { Message } from "@/types";
import { IconButton, Input, Zoom } from "@mui/material";
import { UploadFileInput } from "../shared/UploadFileInput";
import { TooltipArrow } from "../shared/TooltipArrow";

interface ChatInputProps {
  sendMessage: (message: Message) => void;
  loading: boolean;
  startPrompt?: string;
}

export default function ChatInput({
  sendMessage,
  loading,
  startPrompt,
}: ChatInputProps) {
  const [prompt, setPrompt] = useState(startPrompt || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

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
        image_url: {
          url: `data:image/jpeg;base64,${base64Image}`,
        },
      });
    }

    sendMessage({
      whois: "user",
      role: "user",
      content,
    });

    setPrompt("");
    setSelectedFile(null);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const convertToBase64 = (file: File): Promise<string> => {
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

  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <div className={css.FieldRow}>
          <Input
            fullWidth
            multiline
            value={prompt}
            disabled={loading}
            className="mb-[0.55rem] !pb-0"
            placeholder="Ask Celeseon..."
            onChange={(e) => setPrompt(e.target.value)}
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
            slots={{
              transition: Zoom,
            }}
          >
            <span>
              <IconButton size="small" disabled={prompt === "" || loading}>
                <i
                  className={`bi bi-send ${css.icon}`}
                  onClick={handleSubmit}
                ></i>
              </IconButton>
            </span>
          </TooltipArrow>
        </div>
        <div className={css.Buttons}>
          {!selectedFile ? (
            <TooltipArrow
              title="Attach media"
              placement="top"
              slots={{
                transition: Zoom,
              }}
            >
              <IconButton component="label" size="small" disabled={loading}>
                <i className={`bi bi-cloud-upload ${css.icon}`}></i>
                <UploadFileInput
                  id="addFile"
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={handleImageChange}
                />
              </IconButton>
            </TooltipArrow>
          ) : fileUrl ? (
            <div className={css.image} onClick={() => setSelectedFile(null)}>
              <i className={`bi bi-x ${css.removeImg}`}></i>
              <Image
                priority
                width={40}
                height={40}
                className="rounded"
                alt="Selected image"
                src={`data:image/jpeg;base64,${fileUrl}`}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={css.disclaimer}>
        Celeseon can make mistakes. So double-check it.
      </div>
    </section>
  );
}
