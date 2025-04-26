import { LyricLine } from "@applemusic-like-lyrics/lyric";

export class LyricLineWrapper {
  original: string;
  translated: string;
  startTime: number;
  endTime: number;
  lineHeight: number;
  yPosition: number;

  constructor(lyricLine: LyricLine, lineHeight: number, yPosition: number) {
    this.original = lyricLine.words.length > 0 ? lyricLine.words[0].word : "";
    this.translated = lyricLine.translatedLyric || "";
    this.startTime = lyricLine.startTime;
    this.endTime = lyricLine.endTime;
    this.lineHeight = lineHeight;
    this.yPosition = yPosition;
  }
}