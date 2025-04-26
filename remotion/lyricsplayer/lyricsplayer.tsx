import React, { useMemo } from "react";
import { LyricLine } from "@applemusic-like-lyrics/lyric";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { LyricLineWrapper } from "./LyricLineWrapper";

type LyricPlayerProps = {
  lyricLines: LyricLine;
};

export const LyricsPlayer: React.FC<LyricPlayerProps> = ({
  lyricLines,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Assume video time = frame / fps
  const currentTime = frame / fps;

  const wrappedLines = useMemo(() => {
    const lineHeight = 60; // Example, you can tweak
    return lyricLines.map((line, index) => {
      return new LyricLineWrapper(line, lineHeight, index * lineHeight);
    });
  }, [lyricLines]);

  const currentIndex = wrappedLines.findIndex(
    (line) => currentTime >= line.startTime && currentTime < line.endTime
  );

  const targetY = useMemo(() => {
    if (currentIndex === -1) return 0;
    return -wrappedLines[currentIndex].yPosition + 300; // Center in container
  }, [currentIndex, wrappedLines]);

  // Interpolate opacity fade in/out
  const opacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      className="lyrics-container"
      style={{
        position: "relative",
        height: "600px",
        overflow: "hidden",
        width: "100%",
        opacity,
      }}
    >
      <div
        style={{
          transform: `translateY(${targetY}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {wrappedLines.map((line, index) => {
          const isActive = index === currentIndex;
          const scale = isActive ? 1.3 : 1;
          const opacity = isActive ? 1 : 0.5;

          return (
            <div
              key={index}
              style={{
                height: line.lineHeight,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${scale})`,
                opacity,
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: "bold" }}>
                {line.original}
              </div>
              <div style={{ fontSize: 20, marginTop: 4 }}>
                {line.translated}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};