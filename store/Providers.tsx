"use client"
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from './store';

import { NextUIProvider } from "@nextui-org/react";


export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
        <Provider store={store}>
          {children}
        </Provider>
      </ThemeProvider>
    </NextUIProvider>
  )
} 