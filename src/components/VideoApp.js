import React from "react";
import VideoJS from './VideoJS' // point to where the functional component is stored
import "videojs-resolution-switcher";
import 'videojs-contrib-hls.js'; // auto attaches hlsjs handler
import '../App.css' //for resolution switcher postition

function VideoApp(props) {
  const playerRef = React.useRef(null);
  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    plugins: {
        videoJsResolutionSwitcher: {
          default: 'low', // Default resolution [{Number}, 'low', 'high'], or add resolution
          dynamicLabel: true
        }
    },
    // userActions: {
    //   hotKeys: true
    // },
    
    sources: [
          {
            src: './videos/index.m3u8',
            type: 'application/x-mpegURL',
            label: '360p',
            res: 360,
            // withCredentials: true
          },
          {
            src: './videos/ap.m3u8',
            type: 'application/x-mpegURL',
            label: '720p',
            res: 720,
            // withCredentials: true
          },
          {
            src: './videos/next.m3u8',
            type: 'application/x-mpegURL',
            label: '1080p',
            res: 1080,
            // withCredentials: true
          }
    ],
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('resolutionchange', function(){
        console.log('Source changed to %s', player.src())
    })

    player.on('dispose', () => {
      console.log('player will dispose');
    });

  };

  // const changePlayerOptions = () => {
  //   // you can update the player through the Video.js player instance
  //   if (!playerRef.current) {
  //     return;
  //   }
  //   // [update player through instance's api]
  //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
  //   playerRef.current.autoplay(false);
  // };

  return (
    <>
      <div>Rest of app here</div>
      <div style={{width:"40%"}}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <div>Rest of app here</div>
    </>
  );
}

export default VideoApp;