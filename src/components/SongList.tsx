import { Box, Grid, HStack, Text, Menu, IconButton } from "@chakra-ui/react"
import { Play, Pause, Clock, MoreHorizontal, ListPlus, PlaySquare } from "lucide-react"
import { usePlayerState } from "@/context/PlayerContext" // Usar usePlayerState para evitar re-renders por tiempo
import type { Song } from "@/types/Song"
import { ImageWithFallback } from "./ImageWithFallback"
import { memo } from "react"

interface SongRowProps {
  song: Song
  index: number
  allSongs: Song[]
}

// Memoizamos para que solo renderice si cambia el estado relevante
const SongRow = memo(function SongRow({ song, index, allSongs }: SongRowProps) {
  // Ahora usamos usePlayerState, que NO se actualiza con el progreso (timeupdate)
  const { currentSong, isPlaying, playSong, addToQueue, playNext } = usePlayerState()
  const isCurrentSong = currentSong?.id === song.id
  const isCurrentPlaying = isCurrentSong && isPlaying

  const handlePlay = () => {
    playSong(song, allSongs)
  }

  return (
    <Grid
      templateColumns={{ base: "16px 1fr 40px", md: "16px 4fr 3fr 1fr 40px" }}
      gap={4}
      alignItems="center"
      px={{ base: 2, md: 4 }}
      py={2}
      borderRadius="md"
      role="group"
      _hover={{ bg: "whiteAlpha.100" }}
      cursor="pointer"
      onClick={(e) => {
        // Evitar que el click en el menú dispare la reproducción
        if ((e.target as HTMLElement).closest('.more-options')) return
        handlePlay()
      }}
    >
      {/* Número / Play Icon */}
      <Box
        w={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={isCurrentSong ? "blood.500" : "gray.400"}
      >
        <Box _groupHover={{ display: "none" }} display={isCurrentPlaying ? "none" : "block"}>
          {isCurrentSong ? (
            <Box
              w={3}
              h={3}
              bg="blood.500"
              borderRadius="full"
              animation="pulse 1.5s infinite"
            />
          ) : (
            <Text fontSize="sm">{index + 1}</Text>
          )}
        </Box>
        <Box _groupHover={{ display: "flex" }} display={isCurrentPlaying ? "flex" : "none"}>
          {isCurrentPlaying ? (
            <Pause size={14} fill="white" color="white" />
          ) : (
            <Play size={14} fill="white" color="white" />
          )}
        </Box>
      </Box>

      {/* Título y Artista */}
      <HStack gap={3} overflow="hidden">
        <ImageWithFallback
          src={song.cover}
          alt={song.title}
          boxSize="40px"
          borderRadius="sm"
          objectFit="cover"
          fallbackIconSize={16}
        />
        <Box overflow="hidden">
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="normal"
            color={isCurrentSong ? "blood.500" : "white"}
            truncate
          >
            {song.title}
          </Text>
          <Text fontSize="xs" color="gray.400" truncate>
            Canserbero
          </Text>
        </Box>
      </HStack>

      {/* Álbum - Oculto en móvil */}
      <Text fontSize="sm" color="gray.400" truncate display={{ base: "none", md: "block" }}>
        {song.album}
      </Text>

      {/* Duración */}
      <Text fontSize="sm" color="gray.400" textAlign="right" display={{ base: "none", md: "block" }}>
        3:45
      </Text>

      {/* Menú de Opciones */}
      <Box className="more-options" display={{ base: "none", md: "flex" }} justifyContent="flex-end" opacity={0} _groupHover={{ opacity: 1 }}>
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              aria-label="Opciones"
              variant="ghost"
              size="xs"
              color="gray.400"
              _hover={{ color: "white" }}
            >
              <MoreHorizontal size={16} />
            </IconButton>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content bg="gray.800" borderColor="whiteAlpha.100" minW="200px">
              <Menu.Item value="queue" gap={2} onClick={() => addToQueue(song)} cursor="pointer" _hover={{ bg: "whiteAlpha.100" }}>
                <ListPlus size={16} />
                Agregar a la cola
              </Menu.Item>
              <Menu.Item value="next" gap={2} onClick={() => playNext(song)} cursor="pointer" _hover={{ bg: "whiteAlpha.100" }}>
                <PlaySquare size={16} />
                Reproducir a continuación
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Box>
      
      {/* Botón de duración para móvil (reemplaza duración numérica y opciones) */}
      <Box display={{ base: "flex", md: "none" }} justifyContent="flex-end">
          <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              aria-label="Opciones"
              variant="ghost"
              size="xs"
              color="gray.400"
              className="more-options"
            >
              <MoreHorizontal size={16} />
            </IconButton>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content bg="gray.800" borderColor="whiteAlpha.100" minW="200px" zIndex={2000}>
              <Menu.Item value="queue" gap={2} onClick={() => addToQueue(song)}>
                <ListPlus size={16} />
                Agregar a la cola
              </Menu.Item>
              <Menu.Item value="next" gap={2} onClick={() => playNext(song)}>
                <PlaySquare size={16} />
                Reproducir a continuación
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Box>
    </Grid>
  )
})

interface SongListProps {
  songs: Song[]
  title?: string
}

export function SongList({ songs, title }: SongListProps) {
  return (
    <Box>
      {title && (
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          {title}
        </Text>
      )}

      {/* Header de la tabla */}
      <Grid
        templateColumns={{ base: "16px 1fr 40px", md: "16px 4fr 3fr 1fr 40px" }}
        gap={4}
        px={{ base: 2, md: 4 }}
        py={2}
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        mb={2}
      >
        <Text fontSize="xs" color="gray.400" textAlign="center">
          #
        </Text>
        <Text fontSize="xs" color="gray.400" textTransform="uppercase">
          Título
        </Text>
        <Text fontSize="xs" color="gray.400" textTransform="uppercase" display={{ base: "none", md: "block" }}>
          Álbum
        </Text>
        <Box textAlign="right" color="gray.400" display={{ base: "none", md: "flex" }} justifyContent="flex-end">
          <Clock size={14} />
        </Box>
        <Box width="40px" display={{ base: "none", md: "block" }} />
      </Grid>

      {/* Lista de canciones */}
      <Box>
        {songs.map((song, index) => (
          <SongRow key={song.id} song={song} index={index} allSongs={songs} />
        ))}
      </Box>
    </Box>
  )
}
