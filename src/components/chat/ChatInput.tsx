import css from "./ChatInput.module.css";
import { useState, ChangeEvent } from "react";
import { Message } from "@/types";
import { TextField, IconButton } from "@mui/material";
import { UploadFileInput } from "../shared/UploadFileInput";

interface ChatInputProps {
  sendMessage: (message: Message) => void;
  loading: boolean;
}

export default function ChatInput({ sendMessage, loading }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (prompt === "" && !selectedFile) return;

    const content: Message["content"] = [
      {
        type: "text",
        text: prompt,
      },
    ];

    if (selectedFile) {
      /*      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Upload image to the server
        const uploadRes = await fetch("/api/uploadFiles", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload image.");
        }

        const uploadResp = await uploadRes.json();
        console.log("uploadResp: ", uploadResp);

        const { fileName } = uploadResp;

        return;
      } catch (error) {}
    } */

      const base64Image = await convertToBase64(selectedFile);
      content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${base64Image}`,
          // url: selectedFile,
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
        <div className={css.AboveField}>
          <IconButton component="label" size="small">
            <i className={`bi bi-images text-xl`}></i>
            <UploadFileInput
              id="addFile"
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={handleImageChange}
            />
            {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
          </IconButton>

          <IconButton component="label" size="small">
            <i className={`bi bi-brilliance text-xl`}></i>
          </IconButton>

          <IconButton size="small" className="!ml-auto">
            {loading ? (
              <i className={`bi bi-arrow-repeat ${css.spinner}`}></i>
            ) : (
              <i
                className={`bi bi-send ${css.send}`}
                onClick={handleSubmit}
              ></i>
            )}
          </IconButton>
        </div>

        <div className={css.FieldRow}>
          <TextField
            fullWidth
            value={prompt}
            disabled={loading}
            label="Ask Celeseon..."
            helperText="Celeseon can make mistakes. So double-check it."
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
