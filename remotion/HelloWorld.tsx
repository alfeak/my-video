import React from 'react';
import {
  AbsoluteFill,
  Audio,
} from "remotion";

import { z } from "zod";
import Background from './HelloWorld/background';
import { LyricPlayerComp } from './HelloWorld/lyricsplayer';

export const helloWorldCompSchema = z.object({
  lyricsUrl: z.string(),
  audioUrl: z.string(),
});

export const HelloWorld: React.FC<z.infer<typeof helloWorldCompSchema>> = ({
  lyricsUrl,
  audioUrl,
}) => {

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={audioUrl} />
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>
      <AbsoluteFill>
        <LyricPlayerComp lyricsUrl={lyricsUrl} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
