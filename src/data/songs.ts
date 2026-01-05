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
    cover: "/images/vida.jpg",
  },
  {
    id: "v2",
    title: "Mucho Gusto",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/02---mucho-gusto"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v3",
    title: "Clima Tropical",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/03---clima-tropical"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v4",
    title: "Vida",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/04---vida"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v5",
    title: "Aceptas?",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/05---aceptas_"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v6",
    title: "Martillos y Ruedas",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/06---martillos-y-ruedas"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v7",
    title: "Hace Falta Soñar",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/07---hace-falta-sonìƒar"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v8",
    title: "Americanos",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/08---americanos"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v9",
    title: "Interludio K219",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/09---interludio-k219"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v10",
    title: "Pensando en Ti",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/10---pensando-en-ti"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v11",
    title: "Y la Felicidad Qué?",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/11---y-la-felicidad-que_"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v12",
    title: "No Justice",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/12---no-justice"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v13",
    title: "Únetenos",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/13---unetenos"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v14",
    title: "Quién Eres?",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/14---quien-eres_"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v15",
    title: "Perdiendo la Fe",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/15---perdiendo-la-fe"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v16",
    title: "Ley del Hielo",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/16---ley-del-hielo"),
    cover: "/images/vida.jpg",
  },
  {
    id: "v17",
    title: "Epílogo",
    album: "Vida",
    src: cloudinaryAudio("vida", "songs/vida/17---epilogo"),
    cover: "/images/vida.jpg",
  },

  // ==================== ÁLBUM: MUERTE (14 tracks) ====================
  {
    id: "m1",
    title: "C'est La Mort",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/01---canserbero---c'est-la-mort"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m2",
    title: "Es Épico",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/02---canserbero---es-epico"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m3",
    title: "Ser Vero",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/03---canserbero---ser-vero"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m4",
    title: "En el Valle de las Sombras",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/04---canserbero---en-el-valle-de-las-sombras"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m5",
    title: "Maquiavélico",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/05---canserbero---maquiavelico"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m6",
    title: "Mundo de Piedra",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/06---canserbero---mundo-de-piedra"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m7",
    title: "Sin Mercy",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/07---canserbero---sin-mercy"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m8",
    title: "Un Día en el Barrio",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/08---canserbero---un-dia-en-el-barrio"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m9",
    title: "Llovía",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/09---canserbero---llovia"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m10",
    title: "Y en un Espejo Vi",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/10---canserbero---y-en-un-espejo-vi"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m11",
    title: "La Hora del Juicio",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/11---canserbero---la-hora-del-juicio"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m12",
    title: "El Primer Trago",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/12---canserbero---el-primer-trago"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m13",
    title: "De Mi Muerte",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/13---canserbero---de-mi-muerte"),
    cover: "/images/muerte.jpg",
  },
  {
    id: "m14",
    title: "Jeremías 17-5",
    album: "Muerte",
    src: cloudinaryAudio("muerte", "songs/muerte/14---canserbero---jeremias-17-5"),
    cover: "/images/muerte.jpg",
  },
]

export const getAlbumCover = (album: string): string => {
  switch (album) {
    case "Vida":
      return "/images/vida.jpg"
    case "Muerte":
      return "/images/muerte.jpg"
    default:
      return "/images/default.jpg"
  }
}

export const albums = ["Vida", "Muerte"] as const

// Filtrar canciones por álbum
export const getSongsByAlbum = (album: string): Song[] => {
  return songs.filter((song) => song.album === album)
}
