"use client"
import { Provider } from 'react-redux'
import ThemeProvider from "./theme-provider";

import { store } from './store'



export function Providers({ children }: { children: React.ReactNode }) {
   
    return <Provider store={store}>
        {children}

    </Provider>
} 