import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {manager} from "@openremote/core";
import {ManagerConfig} from "@openremote/model";
import "./index.css";

/**
 * Define the Manager configuration to talk with OpenRemote.
 * For example, defining the realm and URL to communicate with. (these will be consumed with HTTP API calls for example)
 * We also enable autoLogin to prompt a Keycloak login before the app appears.
 */
const managerConfig: ManagerConfig = {
	realm: "custom",
	managerUrl: "http://192.168.0.101:8080",
	autoLogin: true
};

/**
 * Initialize the Manager connection.
 * Afterward, we can start rendering the React DOM UI.
 */
manager.init(managerConfig).then(() => {

	ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
});
