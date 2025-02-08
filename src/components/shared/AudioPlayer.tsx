"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

interface AudioPlayerProps {
  audioSrc: string | null;
}
export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioSrc) {
      const audioElement = new Audio(audioSrc);
      setAudio(audioElement);
    }
  }, [audioSrc]);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card sx={{ display: "flex", textAlign: "center", margin: "auto" }}>
      <CardContent>
        <Typography variant="h5">Audio Response</Typography>
        <Button
          size="small"
          onClick={togglePlay}
          startIcon={
            <i className={`bi bi-${isPlaying ? "pause" : "play"}`}></i>
          }
          sx={{ mt: 2 }}
          disabled={!audioSrc}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </CardContent>
    </Card>
  );
}
