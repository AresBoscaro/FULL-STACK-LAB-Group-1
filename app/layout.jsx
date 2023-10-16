import "./globals.css";

export const metadata = {
  title: "Grades",
  description: "Manage your grades and feedbacks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[url('../public/GradesBG.png')]">
      <body>{children}</body>
    </html>
  );
}
