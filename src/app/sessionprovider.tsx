"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
export default function sessionprovider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
