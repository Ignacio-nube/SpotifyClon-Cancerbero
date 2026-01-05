import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react"
import type { Song } from "@/types/Song"
import { songs } from "@/data/songs"

// Separamos el contexto para optimizar rendimientos
// PlayerStateContext: Datos que cambian poco (reproducción, canción actual, playlist)
// PlayerProgressContext: Datos que cambian MUY rápido (progreso, duración)

interface PlayerStateContextType {
  currentSong: Song | null
  isPlaying: boolean
  isLoading: boolean
  volume: number
  playlist: Song[]
  isShuffle: boolean
  repeatMode: "off" | "all" | "one"
  isQueueOpen: boolean
  
  playSong: (song: Song, newPlaylist?: Song[]) => void
  togglePlay: () => void
  pause: () => void
  play: () => void
  setVolume: (volume: number) => void
  nextSong: () => void
  prevSong: () => void
  setPlaylist: (songs: Song[]) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  addToQueue: (song: Song) => void
  playNext: (song: Song) => void
  removeFromQueue: (index: number) => void
  toggleQueue: () => void
  seekTo: (time: number) => void // SeekTo es una acción, aunque afecte el progreso
}

interface PlayerProgressContextType {
  progress: number
  duration: number
}

const PlayerStateContext = createContext<PlayerStateContextType | null>(null)
const PlayerProgressContext = createContext<PlayerProgressContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playlist, setPlaylist] = useState<Song[]>(songs)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const [isQueueOpen, setIsQueueOpen] = useState(false)

  // Crear el elemento Audio una sola vez
  useEffect(() => {
    const audio = new Audio()
    audio.volume = volume
    audio.preload = "auto"
    // No usamos crossOrigin para evitar problemas con GDrive si no están configurados los headers
    audioRef.current = audio
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const playSong = useCallback((song: Song, newPlaylist?: Song[]) => {
    const audio = audioRef.current
    if (!audio) return

    if (newPlaylist) {
      setPlaylist(newPlaylist)
    }

    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play().catch(err => console.error("Error al reanudar:", err))
      }
      return
    }

    setCurrentSong(song)
    setProgress(0)
    setDuration(0)
    setIsLoading(true)
    
    audio.src = song.src
    audio.load()
    
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Error en play():", err)
          setIsPlaying(false)
        })
    }
  }, [currentSong, isPlaying])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }, [isPlaying, currentSong])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(console.error)
  }, [currentSong])

  const setVolume = useCallback((newVolume: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
    }
    setVolumeState(newVolume)
  }, [])

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setProgress(time)
  }, [])

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev)
  }, [])

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === "off") return "all"
      if (prev === "all") return "one"
      return "off"
    })
  }, [])

  const addToQueue = useCallback((song: Song) => {
    setPlaylist(prev => [...prev, song])
  }, [])

  const playNext = useCallback((song: Song) => {
    setPlaylist(prev => {
      if (!currentSong) return [...prev, song]
      const currentIndex = prev.findIndex(s => s.id === currentSong.id)
      if (currentIndex === -1) return [...prev, song]
      
      const newPlaylist = [...prev]
      newPlaylist.splice(currentIndex + 1, 0, song)
      return newPlaylist
    })
  }, [currentSong])

  const removeFromQueue = useCallback((index: number) => {
    setPlaylist(prev => prev.filter((_, i) => i !== index))
  }, [])
  
  const toggleQueue = useCallback(() => {
    setIsQueueOpen(prev => !prev)
  }, [])

  const nextSong = useCallback(() => {
    if (!currentSong || playlist.length === 0) return
    
    let nextIndex: number

    if (isShuffle) {
      if (playlist.length <= 1) {
          nextIndex = 0
      } else {
          do {
            nextIndex = Math.floor(Math.random() * playlist.length)
          } while (nextIndex === playlist.findIndex(s => s.id === currentSong.id))
      }
    } else {
      const currentIndex = playlist.findIndex((s) => s.id === currentSong.id)
      nextIndex = (currentIndex + 1) % playlist.length
    }
    
    const nextTrack = playlist[nextIndex]
    if (nextTrack) {
        // Usamos playSong pero tenemos que tener cuidado con las dependencias
        // Como playSong es estable (si sus deps lo son), aquí accedemos a él.
        // Pero playSong depende de currentSong. 
        // Mejor duplicar lógica simple o llamar a playSong si es seguro.
        // Llamar playSong es seguro.
        
        // Hack: Para evitar dependencias circulares complejas si playSong cambiara mucho,
        // aquí playSong depende de currentSong.
        // Pero nextSong tambien.
        
        // Simplemente llamamos playSong
        const audio = audioRef.current
        if (!audio) return

        setCurrentSong(nextTrack)
        setProgress(0)
        audio.src = nextTrack.src
        audio.load()
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(console.error)
    }
  }, [currentSong, playlist, isShuffle])

  const prevSong = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentSong || playlist.length === 0) return
    
    if (audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    
    const currentIndex = playlist.findIndex((s) => s.id === currentSong.id)
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    const prevTrack = playlist[prevIndex]
    
    if (prevTrack) {
      setCurrentSong(prevTrack)
      audio.src = prevTrack.src
      audio.load()
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }, [currentSong, playlist])

  const handleAutoNext = useCallback(() => {
     if (repeatMode === "one") {
        const audio = audioRef.current
        if (audio) {
            audio.currentTime = 0
            audio.play()
        }
        return
     }

     if (repeatMode === "off" && !isShuffle) {
        const currentIndex = playlist.findIndex(s => s.id === currentSong?.id)
        if (currentIndex === playlist.length - 1) {
           setIsPlaying(false)
           return
        }
     }
     nextSong()
  }, [currentSong, playlist, repeatMode, isShuffle, nextSong])

  // Event Listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setProgress(audio.currentTime)
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }
    const handleWaiting = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    
    const handleEnded = () => {
        handleAutoNext()
    }

    const handleError = () => {
      console.error("Audio Error", audio.error)
      setIsPlaying(false)
      setIsLoading(false)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("waiting", handleWaiting)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("waiting", handleWaiting)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [handleAutoNext])

  // No dependemos de progress/duration aquí para evitar re-renders masivos
  const stateVal: PlayerStateContextType = useMemo(() => ({
    currentSong,
    isPlaying,
    isLoading,
    volume,
    playlist,
    isShuffle,
    repeatMode,
    isQueueOpen,
    playSong,
    togglePlay,
    pause,
    play,
    setVolume,
    nextSong,
    prevSong,
    setPlaylist,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    playNext,
    removeFromQueue,
    toggleQueue,
    seekTo,
  }), [
    currentSong, isPlaying, isLoading, volume, playlist, isShuffle, repeatMode, isQueueOpen,
    playSong, togglePlay, pause, play, setVolume, nextSong, prevSong, setPlaylist,
    toggleShuffle, toggleRepeat, addToQueue, playNext, removeFromQueue, toggleQueue, seekTo
  ])

  // Contexto separado para lo que cambia cada segundo
  const progressVal: PlayerProgressContextType = useMemo(() => ({
    progress,
    duration
  }), [progress, duration])

  return (
    <PlayerStateContext.Provider value={stateVal}>
      <PlayerProgressContext.Provider value={progressVal}>
        {children}
      </PlayerProgressContext.Provider>
    </PlayerStateContext.Provider>
  )
}

// Hook original (mantiene compatibilidad, pero re-renderiza con todo)
// Útil para el PlayerBar que NECESITA el progreso
export function usePlayer() {
  const state = useContext(PlayerStateContext)
  const progress = useContext(PlayerProgressContext)
  
  if (!state || !progress) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  
  return { ...state, ...progress }
}

// NUEVO Hook optimizado: Solo devuelve estado, no progreso
// Útil para SongList, Sidebar, etc. que NO necesitan re-renderizar cada segundo
export function usePlayerState() {
  const context = useContext(PlayerStateContext)
  if (!context) {
    throw new Error("usePlayerState must be used within a PlayerProvider")
  }
  return context
}
