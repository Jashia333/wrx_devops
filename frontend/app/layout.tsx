import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WRX API – Input / Output",
  description: "Test GET, POST, PUT, DELETE against the WRX API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Outfit:wght@400;600&display=swap"
        />
      </head>
      <body style={{ margin: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
