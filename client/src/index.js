import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { ContextProvider } from './socketContext'
import './styles.css'
import { ThemeProvider } from '@mui/styles'
import theme from './theme'


const root = createRoot(document.getElementById('root'))

root.render(
    <ThemeProvider theme={theme}>
        <ContextProvider>
            <App />
        </ContextProvider>
    </ThemeProvider>
)