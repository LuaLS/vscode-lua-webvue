"use strict";
exports.__esModule = true;
var url_1 = require("url");
var vite_1 = require("vite");
var plugin_vue_1 = require("@vitejs/plugin-vue");
// https://vitejs.dev/config/
exports["default"] = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_vue_1["default"])({
            template: {
                compilerOptions: {
                    isCustomElement: function (tag) { return tag.startsWith("vscode-"); }
                }
            }
        }),
    ],
    resolve: {
        alias: {
            "@": (0, url_1.fileURLToPath)(new url_1.URL("./src", import.meta.url))
        }
    },
    build: {
        outDir: "build",
        rollupOptions: {
            output: {
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]"
            }
        }
    }
});
