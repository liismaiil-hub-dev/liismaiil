"use client"
import { Provider } from 'react-redux'
import { ThemeProvider } from "next-themes";

import { store } from './store'



export function Providers({ children }: { children: React.ReactNode }) {
   
  return <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
  
    <Provider store={store}>
        {children}

    </Provider>
    </ThemeProvider>
} 