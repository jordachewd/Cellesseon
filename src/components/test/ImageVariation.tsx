"use client";
import Image from "next/image";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

export default function ImageVariation() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    console.log("selectedFile: ", selectedFile);

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Upload image to the server
      const uploadRes = await fetch("/api/tests/uploads", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image.");
      }

      const uploadResData = await uploadRes.json();
      console.log("uploadResData: ", uploadResData);

      const { fileName } = uploadResData;

      // Generate variation using the uploaded image
      const variationRes = await fetch("/api/tests/generateVariation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageName: fileName }),
      });

      if (!variationRes.ok) {
        throw new Error("Failed to generate variation.");
      }

      const variationResData = await variationRes.json();
      console.log("variationResData: ", variationResData);

      const { url } = variationResData;
      setGeneratedImage(url);
    } catch (error) {
      console.error(error);
      alert("An error occurred: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <Typography variant="h4" sx={{ marginBottom: "1em" }}>
        Generate Image Variation
      </Typography>

      <div className="flex">
        <input type="file" accept="image/png" onChange={handleFileChange} />

        <Button size="small" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Generate"}
        </Button>
      </div>

      {generatedImage && (
        <div className="flex flex-col">
          <Typography variant="h5" sx={{ marginBottom: "1em" }}>
            Generated Variation
          </Typography>
          <Image
            priority
            src={generatedImage}
            alt="Generated variation"
            width={480}
            height={480}
            className="my-4"
            sizes="50vw"
          />
        </div>
      )}
    </div>
  );
}
