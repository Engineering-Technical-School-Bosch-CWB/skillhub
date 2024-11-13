import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './contexts/userContext.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.ts'

import './hooks/i18n/i18n';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserProvider>
            <RouterProvider router={router}/>
        </UserProvider>
    </StrictMode>
)
