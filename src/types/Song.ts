export type Album = "Vida" | "Muerte"

export interface Song {
  id: string
  title: string
  album: Album
  src: string      // URL de Google Drive o ruta local
  cover: string    // ruta a la imagen en /public/images
  duration?: number // duración en segundos (opcional, se puede calcular)
}
