import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './Board'
import './style.css'


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);



// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
