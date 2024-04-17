"use client";
import { CircularProgress } from "@mui/material";

function LoadingBox() {
  return (
    <div className="h-48 flex">
      <CircularProgress className="m-auto" />
    </div>
  );
}

export default LoadingBox;
