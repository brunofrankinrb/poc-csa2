"use client";

import { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Timeline from "./components/Timeline";
import FileUpload from "./components/FileUpload";

export default function Home() {
  const ref = useRef<AudioPlayer>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [fileName, setFileName] = useState<string>();

  return (
    <div>
      {!fileName && (
        <FileUpload onUploadComplete={setFileName} />
      )}
      {fileName && (
        <>
          <AudioPlayer
            ref={ref}
            autoPlay={false}
            src={`/${fileName}`}
            onPlay={(e) => console.log("onPlay", e)}
            onListen={() =>
              setCurrentTime(ref.current?.audio.current?.currentTime || 0)
            }
            listenInterval={100}
            // other props here
          />

          <Timeline currentTime={currentTime} />
        </>
      )}
    </div>
  );
}
