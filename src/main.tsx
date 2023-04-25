import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.tsx";
import "./scss/index.scss";
import "./scss/zero.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
