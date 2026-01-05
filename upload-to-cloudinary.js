import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

const albums = ['vida', 'muerte'];
const baseDir = path.join(__dirname, 'public', 'songs');

async function uploadSongs() {
  console.log('🚀 Iniciando subida a Cloudinary...');

  for (const album of albums) {
    const albumDir = path.join(baseDir, album);
    
    if (!fs.existsSync(albumDir)) {
      console.warn(`⚠️ La carpeta ${albumDir} no existe. Saltando...`);
      continue;
    }

    const files = fs.readdirSync(albumDir).filter(file => file.endsWith('.mp3'));
    console.log(`\n📁 Procesando álbum: ${album.toUpperCase()} (${files.length} canciones)`);

    for (const file of files) {
      const filePath = path.join(albumDir, file);
      
      // Generar public_id exacto para que coincida con el código
      // Reemplaza espacios por guiones y limpia caracteres especiales
      const publicId = `songs/${album}/${file.replace('.mp3', '').toLowerCase().replace(/ /g, '-')}`;

      try {
        console.log(`📤 Subiendo: ${file}...`);
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'video', // Cloudinary usa 'video' para audio
          public_id: publicId,
          overwrite: true
        });
        console.log(`✅ Éxito: ${result.secure_url}`);
      } catch (error) {
        console.error(`❌ Error subiendo ${file}:`, error.message);
      }
    }
  }

  console.log('\n✨ Proceso finalizado.');
}

uploadSongs();
