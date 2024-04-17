"use client";
import { ReactNode } from "react";
import MUIProvider from "./MUIProvider";
import ReduxProvider from "./ReduxProvider";
type Props = {
  children: ReactNode;
};

function Providers({ children }: Props) {
  return (
    <MUIProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </MUIProvider>
  );
}

export default Providers;
