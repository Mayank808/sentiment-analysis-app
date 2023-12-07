"use client";

import Typewriter from "typewriter-effect";
import React from "react";

const TypeWriterEffect = ({ strings }) => {
  return (
    <Typewriter
      options={{
        strings: strings,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default TypeWriterEffect;
