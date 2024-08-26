import  { Suspense } from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Frm from "./views/Frm/Frm";
import App from "./views/App/App";

createRoot(document.getElementById('root')).render(
  <Suspense>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/:id/:name/:email/:edad/frm" element={<Frm />} />
          </Routes>
        </BrowserRouter>
  </Suspense>
)
