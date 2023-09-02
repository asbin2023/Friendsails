import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import store from "../redux/store.jsx";
// import { Provider } from "react-redux";
import './main.css'

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <App />
  </BrowserRouter>

);
