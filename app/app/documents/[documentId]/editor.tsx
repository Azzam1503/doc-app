"use client";

import React, { useEffect } from "react";
import Quill from "quill";
const Editor = () => {
  useEffect(() => {
    new Quill("#container");
  }, []);
  return <div id="container"></div>;
};

export default Editor;
