import type { Metadata } from "next";
import Socketprovider from "./socketprovider";
import StoreProvider from "./storeprovider";
import SessionProvider from "./sessionprovider";

export const metadata: Metadata = {
  title: "Chess",
  description: "A multiplayer chess game",
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
          href="https://fonts.googleapis.com/css2?family=Belanosima&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Belanosima', sans-serif" }}>
        <SessionProvider>
          <StoreProvider>
            <Socketprovider> {children}</Socketprovider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
