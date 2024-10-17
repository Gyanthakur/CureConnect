import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</BrowserRouter>
);
