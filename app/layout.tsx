"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ThemeProvider as TP2, createTheme } from '@mui/material/styles';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

import { Authenticator, Menu, MenuItem, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"
import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import {
  ThemeProvider,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react";
import BottomNavComponent from "@/app/components/BottomNav";

Amplify.configure(outputs);

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const theme = {
    name: 'my-theme',
    overrides: [
      defaultDarkModeOverride,
    ],
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  

  return (
    <html lang="en">
      <body>
        <TP2 theme={darkTheme}>
          <ThemeProvider colorMode="dark" theme={theme}>
            <Authenticator>
              <View style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <View style={{
                  padding: 12,
                  flexGrow: 1,
                }}>
                  {children}
                </View>
                <BottomNavComponent />
              </View>
            </Authenticator>
          </ThemeProvider>
        </TP2>

      </body>
    </html>
  );
}
