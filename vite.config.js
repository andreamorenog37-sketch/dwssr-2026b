//importanto configurador de vite
import {defineConfig} from 'vite';
//importando un admin de rutas
import {resolve} from 'node:path';
//imports para crear Dirname
import { fileURLToPath } from 'node:url';
import{dirname} from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    //directorio raiz de los archivos fuente del frontend
    root: 'src',
    //configurando el servidor de desarrollo
    server: {
    //puerto de escucha del servidor de desarrollo
        port: 5173,
        //Rigidez del puerto, para que no se cambie automaticamente si esta ocupado
        strictPort: true,},
// Configurando el build
build: { 
    // Directorio de salida del javaScript para produccion 
    outDir: '../dist',  
    // Asegurando limpieza del folder de produccion 
    emptyOutDir: true,
    // Generar manifiesto para el servidor 
    manifest: true,
    // Opciones de empaquetado de Rollup
    rollupOptions: {
        // Configurando la entrada del proyecto
        input: {
            main: resolve(__dirname, 'src/main.js'),
}}},
// Configuracion para el desarrollo 
publicDir: false, // Deshabilitando la carpeta de archivos publicos
})