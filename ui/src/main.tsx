import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './hooks/i18n/i18n';

createRoot(document.getElementById('root')!).render(
    <StrictMode >
        <App/>
    </StrictMode>
)
