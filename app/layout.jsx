import "./globals.css";

export const metadata = {
  title: "Grades",
  description: "Manage your grades and feedbacks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-400">{children}</body>
    </html>
  );
}
