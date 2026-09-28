// Bundled into the lazy VideoModal chunk — only loaded after the user clicks play.
export default function YouTubeEmbed({ videoId, title }) {
  const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1', playsinline: '1' })

  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="absolute inset-0 size-full border-0"
    />
  )
}
