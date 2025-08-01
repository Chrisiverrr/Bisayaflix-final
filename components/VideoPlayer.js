import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function VideoPlayer({ streamData }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(streamData.streamingLink.link.file)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari
      video.src = streamData.streamingLink.link.file
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
    }
  }, [streamData])

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        poster={streamData.streamingLink.tracks?.[0]?.file.replace('.vtt', '.jpg')}
      />
    </div>
  )
}
