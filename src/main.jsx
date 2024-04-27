import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './router'
import {RouterProvider} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import GlobalContextProvider from './context/GlobalContextProvider'

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus:false,
      },
    },
  }
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <GlobalContextProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition='top-rigth'/>
      
      <RouterProvider router={router} />
     
    </QueryClientProvider>
    </GlobalContextProvider>
  </React.StrictMode>
  
)
