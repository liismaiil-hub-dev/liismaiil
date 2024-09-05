"use client"
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from './store';



export function Providers({ children }: { children: React.ReactNode }) {

  return (
      <ThemeProvider defaultTheme="system" attribute="class" enableSystem>

        <Provider store={store}>
          {children}

        </Provider>

      </ThemeProvider>
  )
} 