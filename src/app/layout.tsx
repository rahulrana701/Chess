import type { Metadata } from "next";
import Socketprovider from "./socketprovider";
import StoreProvider from "./storeprovider";

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
      <body>
        <StoreProvider>
          <Socketprovider> {children}</Socketprovider>
        </StoreProvider>
      </body>
    </html>
  );
}
