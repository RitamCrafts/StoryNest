import React, { useState } from "react";
import quoteBoxLeaf from "../../assets/quoteBoxLeaf.png";

function QuoteBoxLeaf({
  className = "absolute bottom-5 right-5 w-28",
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={quoteBoxLeaf}
      alt=""
      draggable={false}
      loading="eager"
      onLoad={() => setLoaded(true)}
      className={`
        pointer-events-none
        select-none
        transition-opacity
        duration-200
        ${className}
        ${loaded ? "opacity-100" : "opacity-0"}
      `}
    />
  );
}

export default QuoteBoxLeaf;