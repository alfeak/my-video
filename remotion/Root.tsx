// import { Composition } from "remotion";
// import { HelloWorld, helloWorldCompSchema } from "./HelloWorld";

// // Each <Composition> is an entry in the sidebar!

// export const RemotionRoot: React.FC = () => {
//   return (
//     <>
//       <Composition
//         // You can take the "id" to render a video:
//         // npx remotion render src/index.ts <id> out/video.mp4
//         id="HelloWorld"
//         component={HelloWorld}
//         durationInFrames={800}
//         fps={30}
//         width={1920}
//         height={1080}
//         // You can override these props for each render:
//         // https://www.remotion.dev/docs/parametrized-rendering
//         schema={helloWorldCompSchema}
//         defaultProps={{
//           titleText: "Render Server Template",
//           titleColor: "#000000",
//           logoColor1: "#91EAE4",
//           logoColor2: "#86A8E7",
//         }}
//       />
//     </>
//   );
// };

import { Composition } from "remotion";
import { HelloWorld, helloWorldCompSchema } from "./HelloWorld";
import { staticFile } from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';

// 音频文件路径
const audioUrl = staticFile('test.mp3');  // 使用 staticFile 来获取正确路径
const lyricsUrl = staticFile('test.lrc') 

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={800}  // 默认为 800 帧，动态更新时长
        fps={30}
        width={720}
        height={1080}
        schema={helloWorldCompSchema}
        defaultProps={{
          audioUrl: audioUrl,
          lyricsUrl : lyricsUrl,
        }}
        calculateMetadata={async ({props}) => {
          const imported = await getAudioDurationInSeconds(audioUrl);
          return {
            durationInFrames: Math.floor(imported * 30),
          };
        }
      }
      />
    </>
  );
};
