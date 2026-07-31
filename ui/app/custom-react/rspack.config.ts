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
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  devServer: {
    host: "0.0.0.0",
    port: 9000,
    open: false,
  },
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    parser: {
      "css/auto": {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /(maplibre|mapbox|@material|gridstack|@mdi).*\.css$/, // output css as strings
        type: "asset/source",
      },
      {
        test: /\.tsx$/,
        type: "javascript/auto",
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    // Define MANAGER_URL as a global variable
    new rspack.DefinePlugin({
      MANAGER_URL: JSON.stringify(process.env.MANAGER_URL ?? (isDev ? "http://localhost:8080" : undefined)),
    }),
    // Import assets
    new rspack.CopyRspackPlugin({
      patterns: [{ from: "./assets", to: "assets" }],
    }),
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  output: {
    publicPath: isDev ? "/custom-react/" : "/",
  },
  experiments: {
    css: true,
  },
});
