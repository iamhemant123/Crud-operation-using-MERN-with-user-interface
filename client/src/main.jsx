// import strict mode function and create root function and enquiry
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Enquiry from './Enquiry.jsx'
import './index.css'

// use sweetalert for verfiaction 
import 'sweetalert2/src/sweetalert2.scss'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Enquiry />
  </StrictMode>,
)
