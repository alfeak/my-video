import React, { useEffect, useRef, useState } from "react";
import { LyricPlayer } from "@applemusic-like-lyrics/react";
import parseLrc from "./lyricsparse";
import { useCurrentFrame, useVideoConfig } from "remotion";


type LyricPlayerCompProps = {
    lyricsUrl: string;
};
export const LyricPlayerComp: React.FC<LyricPlayerCompProps> = ({
    lyricsUrl,
}) => {
    const [lyricLines, setLyricLines] = useState<LyricLine[]>([]);
    const { fps} = useVideoConfig();
    const frame = useCurrentFrame();
    const [currentTime, setCurrentTime] = useState(0);

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

    useEffect(() =>{
        setCurrentTime(frame/fps);
        // console.log(currentTime,frame,fps);
    },[frame,fps]);

    return (
        <LyricPlayer
            lyricLines={lyricLines}
            currentTime={currentTime}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'  // 0.5 is the alpha value for 50% transparency
            }}
        />
    )
};