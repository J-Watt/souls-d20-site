import { ReactNode } from "react";

export const metadata = {
  title: "Info"
};

export default function InfoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}