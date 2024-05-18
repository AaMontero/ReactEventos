import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Ingresar } from './components/Ingresar.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route exact path="" element={<Ingresar/>} />
            <Route path="/app" element={<App/>} /> 
          </Routes>
        </div>
      </Router>
    </Provider>

  </React.StrictMode>,
)
