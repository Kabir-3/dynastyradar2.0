import "./globals.css";

export const metadata = {
  title: "Dynasty Radar",
  description: "Frontend for Dynasty Radar API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
