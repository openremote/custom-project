/*
 * Copyright 2026, OpenRemote Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { manager } from "@openremote/core";
import type { ManagerConfig } from "@openremote/model";
import "./index.css";

declare const MANAGER_URL: string | undefined;

/**
 * Define the Manager configuration to talk with OpenRemote.
 * For example, defining the realm and URL to communicate with. (these will be consumed with HTTP API calls for example)
 * We also enable autoLogin to prompt a Keycloak login before the app appears.
 */
const managerConfig: ManagerConfig = {
  realm: "master",
  managerUrl: MANAGER_URL ?? "",
  autoLogin: true,
};

/**
 * Initialize the Manager connection.
 * Afterward, we can start rendering the React DOM UI.
 */
manager.init(managerConfig).then(() => {
  /**
   * Render your React application to the DOM.
   */
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
