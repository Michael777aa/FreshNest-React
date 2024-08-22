import React from "react";

export default function Advertisement() {
  return (
    <div className="ads-restaurant-frame">
      <video
        data-aos="fade-up"
        className="ads-video"
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-mdeia=""
      >
        <source type="video/mp4" src="video/burak-ads.mp4" />
      </video>
    </div>
  );
}
