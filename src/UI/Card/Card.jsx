import React from "react";

const Card = ({ username, bgImage }) => (
  <div
    className="relative rounded-xl overflow-hidden group cursor-pointer"
    style={{ background: bgImage ? `url(${bgImage}) center/cover` : "var(--surface)" }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)" }}
    >
      <span className="text-white font-semibold text-sm">{username}</span>
    </div>
  </div>
);

export default Card;
