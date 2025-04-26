import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LyricLine } from "@applemusic-like-lyrics/lyric";

interface LyricPlayerProps {
    lyricLines: LyricLine[];
    currentTime: number;
    style: React.CSSProperties;
  }
  
  const LyricPlayer: React.FC<LyricPlayerProps> = ({ lyricLines, currentTime, style }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
    const [textObjects, setTextObjects] = useState<THREE.Mesh[]>([]);
  
    useEffect(() => {
      if (canvasRef.current) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
  
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(width, height);
        camera.position.z = 5;
  
        setScene(scene);
        setCamera(camera);
        setRenderer(renderer);
  
        // Add background
        const bgColor = new THREE.Color(0x000000).convertSRGBToLinear();
        scene.background = bgColor;
  
        // Create text for each lyric line
        const fontLoader = new THREE.FontLoader();
        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
          const lineMeshes: THREE.Mesh[] = [];
  
          lyricLines.forEach((line, index) => {
            const lyricText = line.words.map(word => word.text).join(' ');
            const textGeometry = new THREE.TextGeometry(lyricText, {
              font: font,
              size: 0.5,
              height: 0.1,
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
            textMesh.position.set(0, index * -1.5, 0);  // Stack lines vertically
            scene.add(textMesh);
            lineMeshes.push(textMesh);
          });
  
          setTextObjects(lineMeshes);
        });
      }
    }, [lyricLines]);
  
    useEffect(() => {
      // Update the scroll effect based on current time
      if (textObjects.length > 0 && currentTime >= 0) {
        textObjects.forEach((textMesh, index) => {
          const line = lyricLines[index];
          if (currentTime >= line.startTime && currentTime <= line.endTime) {
            textMesh.position.y = (currentTime - line.startTime) * -0.5;  // Adjust speed of scroll
          } else if (currentTime > line.endTime) {
            textMesh.position.y = -5; // Move off-screen after the line finishes
          }
        });
      }
    }, [currentTime, lyricLines, textObjects]);
  
    useEffect(() => {
      // Render loop
      const animate = () => {
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
        requestAnimationFrame(animate);
      };
  
      animate();
    }, [renderer, scene, camera]);
  
    return <canvas ref={canvasRef} style={style} />;
  };
  
  export default LyricPlayer;