import type { Song } from "@/types/Song"

// Cloudinary cloud name
const CLOUD_NAME = "doosdrcdk"

// Helper para generar URL de Cloudinary para audio
// Estructura: /songs/vida/nombre-archivo o /songs/muerte/nombre-archivo
const cloudinaryAudio = (_album: "vida" | "muerte", filename: string) => 
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${filename}`

export const songs: Song[] = [
  // ==================== ÁLBUM: VIDA (17 tracks) ====================
  {
    id: "v1",
    title: "Prólogo",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/01---prologo"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v2",
    title: "Mucho Gusto",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/02---mucho-gusto"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v3",
    title: "Clima Tropical",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/03---clima-tropical"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v4",
    title: "Vida",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/04---vida"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v5",
    title: "Aceptas?",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/05---aceptas_"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v6",
    title: "Martillos y Ruedas",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/06---martillos-y-ruedas"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v7",
    title: "Hace Falta Soñar",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/07---hace-falta-sonìƒar"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v8",
    title: "Americanos",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/08---americanos"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v9",
    title: "Interludio K219",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/09---interludio-k219"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v10",
    title: "Pensando en Ti",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/10---pensando-en-ti"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v11",
    title: "Y la Felicidad Qué?",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/11---y-la-felicidad-que_"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v12",
    title: "No Justice",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/12---no-justice"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v13",
    title: "Únetenos",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/13---unetenos"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v14",
    title: "Quién Eres?",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/14---quien-eres_"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v15",
    title: "Perdiendo la Fe",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/15---perdiendo-la-fe"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v16",
    title: "Ley del Hielo",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/16---ley-del-hielo"),
    cover: "/caratula_vida.webp",
  },
  {
    id: "v17",
    title: "Epílogo",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/17---epilogo"),
    cover: "/caratula_vida.webp",
  },

  // ==================== ÁLBUM: MUERTE (14 tracks) ====================
  {
    id: "m1",
    title: "C'est La Mort",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/01---canserbero---c'est-la-mort"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m2",
    title: "Es Épico",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/02---canserbero---es-epico"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m3",
    title: "Ser Vero",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/03---canserbero---ser-vero"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m4",
    title: "En el Valle de las Sombras",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/04---canserbero---en-el-valle-de-las-sombras"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m5",
    title: "Maquiavélico",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/05---canserbero---maquiavelico"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m6",
    title: "Mundo de Piedra",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/06---canserbero---mundo-de-piedra"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m7",
    title: "Sin Mercy",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/07---canserbero---sin-mercy"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m8",
    title: "Un Día en el Barrio",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/08---canserbero---un-dia-en-el-barrio"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m9",
    title: "Llovía",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/09---canserbero---llovia"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m10",
    title: "Y en un Espejo Vi",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/10---canserbero---y-en-un-espejo-vi"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m11",
    title: "La Hora del Juicio",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/11---canserbero---la-hora-del-juicio"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m12",
    title: "El Primer Trago",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/12---canserbero---el-primer-trago"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m13",
    title: "De Mi Muerte",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/13---canserbero---de-mi-muerte"),
    cover: "/caratula_muerte.webp",
  },
  {
    id: "m14",
    title: "Jeremías 17-5",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/14---canserbero---jeremias-17-5"),
    cover: "/caratula_muerte.webp",
  },
]

export const getAlbumCover = (album: string): string => {
  switch (album) {
    case "Vida":
      return "/caratula_vida.webp"
    case "Muerte":
      return "/caratula_muerte.webp"
    default:
      return "/portada.webp"
  }
}

export const albums = ["Vida", "Muerte"] as const

// Filtrar canciones por álbum
export const getSongsByAlbum = (album: string): Song[] => {
  return songs.filter((song) => song.album === album)
}
