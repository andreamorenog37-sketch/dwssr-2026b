// Biblioteca file stream
import fs from 'node:fs';
// Biblioteca de rutas
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Creando variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
 * Helper para Handlebars que genera las etiquetas de Vite
 * En desarrollo: conecta al servidor de desarrollo de Vite
 * En producción: usa los compilados de Vite
 */
export function viteAssets() {
  // Obtener modo de ejecución
  const isDev = process.env.NODE_ENV !== 'production';
  // Rescatando la URL del servidor de desarrollo
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

  // Si estamos en modo desarrollador
  if (isDev) {
    // En desarrollo, cargamos los archivos del front directamente del servidor de Vite
    return `
      <script type="module" src="${viteDevServer}/@vite/client"></script>
      <script type="module" src="${viteDevServer}/main.js"></script>
    `;
  }

  // En producción leemos el manifest y generamos las etiquetas finales
  const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json');

  // Si no existe el manifest
  if (!fs.existsSync(manifestPath)) {
    console.warn("Vite manifest not found. Run 'npm run build'");
    return '';
  }

  // Leyendo y parseando a JSON el archivo de manifiesto
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  // Obteniendo la ruta del punto de entrada del front-end
  const mainEntry = manifest['main.js'];

  if (!mainEntry) {
    console.warn('Archivo main.js no está disponible en el manifiesto de Vite');
    return '';
  }

  let tags = '';

  // CSS files
  if (mainEntry.css) {
    mainEntry.css.forEach((cssFile) => {
      tags += `<link rel="stylesheet" href="/${cssFile}">\n`;
    });
  }

  // JS files
  tags += `<script type="module" src="/${mainEntry.file}" defer></script>`;

  return tags;
}

/*
 * Función registradora del helper de Handlebars
 */
export function registerViteHelper(hbs) {
  hbs.registerHelper('viteAssets', () => {
    // Sanitizando la salida del helper
    return new hbs.SafeString(viteAssets());
  });
}