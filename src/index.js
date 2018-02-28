import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "material-ui/styles";
import "./assets/styles/style.css";
import App from "./app/App";

ReactDOM.render(
	<MuiThemeProvider>
		<App />
		<div className="overlay" />
	</MuiThemeProvider>,
	document.getElementById("root")
);
