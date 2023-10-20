/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { UserProvider } from "../providers/user-provider";
import "./globals.css";

export const metadata = {
  title: "Grades",
  description: "Manage your grades and feedbacks",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body className="bg-slate-400">{children}</body>
      </html>
    </UserProvider>
  );
}
