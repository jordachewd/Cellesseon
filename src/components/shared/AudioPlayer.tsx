import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";

interface AudioPlayerProps {
  audioSrc: string | null;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    if (audioSrc) {
      try {
        const byteCharacters = atob(audioSrc);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);

        const audioElement = new Audio(url);
        setAudio(audioElement);

        audioElement.onloadedmetadata = () => {
          setDuration(formatTime(audioElement.duration));
        };

        return () => {
          URL.revokeObjectURL(url);
          audioElement.pause();
          setAudio(null);
        };
      } catch (error) {
        console.error("Error processing audio:", error);
      }
    }
  }, [audioSrc]);

  useEffect(() => {
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio]);

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        margin: "0.75rem auto 0",
      }}
    >
      <CardContent className="flex flex-1 items-center justify-between gap-4 !p-4">
        <Button
          size="small"
          onClick={togglePlay}
          startIcon={
            <i className={`bi bi-${isPlaying ? "pause" : "play"}`}></i>
          }
          disabled={!blobUrl}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <LinearProgress
          variant="determinate"
          value={progress}
          className="flex-1"
        />

        <Typography variant="body2" className="!text-sm">
          {currentTime} / {duration}
        </Typography>
      </CardContent>
    </Card>
  );
}
