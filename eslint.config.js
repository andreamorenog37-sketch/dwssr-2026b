import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ignora los build 
  {
    ignores :[
      "dist/**",//ignora carpeta de dist 
      "node_"
    ]
  },
 
  //2 config de vite 
  { files: ["vite.config.js"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals:{
        ecmaVersion: "latest",
        sourceType: "module",
        ...globals.node} } },

  //2.1 config baack-end
  { files: ["vite.config.js"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals:{
        ecmaVersion: "latest",
        sourceType: "module",
        ...globals.node} } },

        rules : {
          "no-unused-vars": ["error",
             { "argsIgnorePattern": "^_" }]
        }
  },


  //3 config front-end
  { files: ["src/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals:{
        ecmaVersion: "latest",
        sourceType: "module",
        ...globals.browser} } },

  //4opcional si hay js en public
  { files: ["public/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals:{
        ecmaVersion: "latest",
        sourceType: "module",
        (property) 'browser': Globals.browser} } },
        ...globals.browser
      } } },
]);
