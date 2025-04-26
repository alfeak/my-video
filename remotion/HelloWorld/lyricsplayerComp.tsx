import React, { useEffect, useRef, useState } from "react";
import parseLrc from "./lyricsparse";
import { LyricLine } from "@applemusic-like-lyrics/lyric";
import { LyricsPlayer } from "../lyricsplayer/lyricsplayer";
type LyricPlayerCompProps = {
    lyricsUrl: string;
};
export const LyricPlayerComp: React.FC<LyricPlayerCompProps> = ({
    lyricsUrl,
}) => {
    const [lyricLines, setLyricLines] = useState<LyricLine[]>([]);

    const loadLrcFile = async (filePath: string) => {
        try {
            const response = await fetch(filePath);
            const lrcText = await response.text();
            setLyricLines(parseLrc(lrcText));
        } catch (error) {
            console.error('Error loading LRC file:', error);
        }
    };
    // Initialize lyrics when component mounts
    useEffect(() => {
        // Load LRC file from the local path
        loadLrcFile(lyricsUrl);
    }, []);


    return (
        <div>
            <LyricsPlayer lyricLines={lyricLines}/>
        </div>

    )
};