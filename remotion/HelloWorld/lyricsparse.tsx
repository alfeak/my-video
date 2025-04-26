import React from 'react';
import { LyricLine } from "@applemusic-like-lyrics/lyric";

// Parse LRC text into LyricLine[]
const parseLrc = (text: string): LyricLine[] => {
  const lines = text.replace(/\r/g, '\n').split('\n');
  const result: LyricLine[] = [];
  let lastTime = 0;

  lines.forEach(line => {
    // Match [mm:ss.xx] timestamp
    const timeMatch = line.match(/^\[\s*(\d{2}):(\d{2})\.(\d{2})\s*\]\s*(.*)$/);
    if (!timeMatch) return;

    const minutes = parseFloat(timeMatch[1]);
    const seconds = parseFloat(timeMatch[2]);
    const hundredths = parseFloat(timeMatch[3]) / 100;
    const time = minutes * 60 + seconds + hundredths;

    // Extract French and Chinese parts
    const contentMatch = line.match(/\]\s*(.*?)\s*\/\s*(.*)/);
    if (!contentMatch) return;

    const frenchText = contentMatch[1].trim();
    const chineseText = contentMatch[2].trim();

    result.push({
      startTime: time,
      endTime: 0, // Will be updated later
      words: [{
        startTime: time,
        endTime: 0,
        word: frenchText
      }],
      translatedLyric: chineseText,
      romanLyric: "",
      isBG: false,
      isDuet: false
    });

    // Update previous line's endTime
    if (result.length > 1) {
      result[result.length - 2].endTime = time;
      result[result.length - 2].words[0].endTime = time;
    }
    
    lastTime = time;
  });

  // Set endTime for the last line (assuming song ends 5s after last lyric)
  if (result.length > 0) {
    result[result.length - 1].endTime = lastTime + 5;
    result[result.length - 1].words[0].endTime = lastTime + 5;
  }

  return result;
};

export default parseLrc;