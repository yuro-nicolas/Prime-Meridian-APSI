import { useState } from "react";
import "./VideoHero.css";

/* ---------------------------------------------------------
   Paste your YouTube video's ID here — the part of the URL after
   "v=" (e.g. https://youtube.com/watch?v=dQw4w9WgXcQ → dQw4w9WgXcQ),
   or after youtu.be/ if that's the link format you have. Unlisted
   videos embed exactly the same way as public ones; only "Private"
   videos can't be embedded.

   Leave this empty ("") to fall back to a local file at
   client/public/videos/hero.mp4 instead (or the placeholder, if
   that file doesn't exist either).
---------------------------------------------------------- */
const YOUTUBE_ID = "_tzXCD72VDo";

/**
 * Organism. The site's opening moment: a short, wide video with the
 * wordmark centered over it. Three ways this can render, in order of
 * priority: (1) a YouTube embed if YOUTUBE_ID is set above, styled to
 * fill the section like a background video; (2) a local file at
 * /videos/hero.mp4; (3) a labeled placeholder if neither is available.
 */
export function VideoHero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="video-hero">
      {YOUTUBE_ID ? (
        !reduceMotion ? (
          <div className="video-hero__yt-wrap">
            <iframe
              className="video-hero__yt"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1`}
              title="Prime Meridian Realty"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          </div>
        ) : (
          // Reduced motion: show a static, non-autoplaying embed instead.
          <div className="video-hero__yt-wrap">
            <iframe
              className="video-hero__yt"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?controls=1`}
              title="Prime Meridian Realty"
              frameBorder="0"
            />
          </div>
        )
      ) : (
        <>
          {!videoFailed && (
            <video
              className="video-hero__video"
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              onError={() => setVideoFailed(true)}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          )}
          {videoFailed && (
            <div className="video-hero__placeholder">
              <span>Video placeholder — add your file at client/public/videos/hero.mp4, or set YOUTUBE_ID in this file</span>
            </div>
          )}
        </>
      )}

      <div className="video-hero__scrim" />

      <div className="video-hero__mark">
        <h1>Prime Meridian Realty</h1>
      </div>
    </section>
  );
}
