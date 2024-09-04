"use client"
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';

import { store } from './store';



export function Providers({ children }: { children: React.ReactNode }) {

  return <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
    <NextUIProvider >

      <Provider store={store}>
        {children}

      </Provider>
    </NextUIProvider >

  </ThemeProvider>
} 