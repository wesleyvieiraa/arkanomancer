import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

// Material Dashboard 2 PRO React TS Context Provider
import { AuthContextProvider, MaterialUIControllerProvider } from "context";
import Background from "layouts/Background";
const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MaterialUIControllerProvider>
        <Background>
          <App />
        </Background>
      </MaterialUIControllerProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
