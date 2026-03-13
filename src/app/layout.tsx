import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import "./animation.css";
import { DiceProvider, ThemeProvider } from "@/shared";


const roboto = Roboto_Flex({
  variable: "--font-roboto",
  subsets: []
})

export const metadata: Metadata = {
  title: "Dice game",
  description: "The test task for Zionix",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
    <body className={`${roboto.variable}`}>

    <AppRouterCacheProvider>
      <ThemeProvider>
        <DiceProvider>
          <Container maxWidth="sm" sx={{height: "100%"}}>
            {children}
          </Container>
        </DiceProvider>


      </ThemeProvider>
    </AppRouterCacheProvider>

    </body>
    </html>
  );
}
