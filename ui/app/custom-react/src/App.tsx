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
import openremoteLogo from "../assets/openremote.svg";
import { InputType } from "@openremote/or-mwc-components/or-mwc-input";
import type {} from "@openremote/or-mwc-components/jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div id="logo">
        <img src={openremoteLogo} className="logo openremote" alt="OpenRemote logo" />
      </div>
      <h2>"A React template for your custom app."</h2>
      <div id="content">
        <a href="https://docs.openremote.io" target="_blank" rel="noreferrer">
          <or-mwc-input type={InputType.BUTTON} outlined label="View the documentation"></or-mwc-input>
        </a>
      </div>
    </div>
  );
}

export default App;
