import { Box, VStack, HStack, Text, IconButton } from "@chakra-ui/react"
import { X, PlayCircle, Trash2 } from "lucide-react"
import { usePlayerState } from "@/context/PlayerContext"
import { ImageWithFallback } from "./ImageWithFallback"

export function QueueDrawer() {
  const { 
    playlist, 
    currentSong, 
    playSong, 
    removeFromQueue, 
    isQueueOpen, 
    toggleQueue 
  } = usePlayerState()

  if (!isQueueOpen) return null

  // Encontrar índice actual para separar "reproducida" de "siguientes"
  const currentIndex = currentSong 
    ? playlist.findIndex(s => s.id === currentSong.id) 
    : -1

  const upcomingSongs = currentIndex !== -1 
    ? playlist.slice(currentIndex + 1)
    : playlist

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      h="calc(100vh - 90px)" // Dejar espacio para player bar
      w={{ base: "full", md: "400px" }}
      bg="gray.900"
      borderLeft="1px solid"
      borderColor="whiteAlpha.200"
      zIndex={99}
      display="flex"
      flexDirection="column"
      boxShadow="-4px 0 20px rgba(0,0,0,0.5)"
    >
      <HStack p={4} justify="space-between" borderBottom="1px solid" borderColor="whiteAlpha.100">
        <Text fontSize="lg" fontWeight="bold">Cola de Reproducción</Text>
        <IconButton
          aria-label="Cerrar cola"
          onClick={toggleQueue}
          variant="ghost"
          color="gray.400"
          _hover={{ color: "white" }}
        >
          <X size={20} />
        </IconButton>
      </HStack>

      <Box flex={1} overflowY="auto" p={4}>
        {/* Canción Actual */}
        {currentSong && (
          <Box mb={6}>
            <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} textTransform="uppercase">
              Sonando Ahora
            </Text>
            <HStack 
              bg="whiteAlpha.100" 
              p={3} 
              borderRadius="md" 
              gap={3}
              border="1px solid"
              borderColor="blood.500"
            >
              <ImageWithFallback
                src={currentSong.cover}
                alt={currentSong.title}
                boxSize="48px"
                borderRadius="sm"
                objectFit="cover"
              />
              <VStack align="start" gap={0} flex={1} overflow="hidden">
                <Text fontWeight="bold" color="blood.500" truncate w="full">{currentSong.title}</Text>
                <Text fontSize="sm" color="gray.400">{currentSong.album}</Text>
              </VStack>
              <Box animation="pulse 2s infinite">
                <PlayCircle size={20} color="#8b0000" fill="white" />
              </Box>
            </HStack>
          </Box>
        )}

        {/* Siguientes Canciones */}
        <Box>
          <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} textTransform="uppercase">
            A continuación
          </Text>
          {upcomingSongs.length === 0 ? (
            <Text color="gray.500" fontSize="sm" fontStyle="italic">
              No hay más canciones en la cola
            </Text>
          ) : (
            <VStack gap={2} align="stretch">
              {upcomingSongs.map((song, i) => {
                // Calcular el índice real en la playlist original
                // currentIndex es el de la canción sonando.
                // upcomingSongs empieza en currentIndex + 1
                // Así que el índice en playlist es currentIndex + 1 + i
                const realIndex = currentIndex + 1 + i
                
                return (
                  <HStack 
                    key={`${song.id}-${i}`}
                    p={2} 
                    borderRadius="md" 
                    _hover={{ bg: "whiteAlpha.100", '& .delete-btn': { opacity: 1 } }}
                    gap={3}
                    role="group"
                  >
                    <ImageWithFallback
                      src={song.cover}
                      alt={song.title}
                      boxSize="40px"
                      borderRadius="sm"
                      objectFit="cover"
                    />
                    <VStack align="start" gap={0} flex={1} overflow="hidden">
                      <Text 
                        fontWeight="medium" 
                        fontSize="sm" 
                        truncate 
                        w="full"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => playSong(song)} // Esto cambiaría la canción y reiniciaría, cuidado si queremos solo saltar
                      >
                        {song.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">{song.album}</Text>
                    </VStack>
                    <IconButton
                      aria-label="Eliminar"
                      className="delete-btn"
                      opacity={0}
                      size="xs"
                      variant="ghost"
                      color="gray.500"
                      _hover={{ color: "red.400", bg: "whiteAlpha.100" }}
                      onClick={() => removeFromQueue(realIndex)}
                      transition="all 0.2s"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </HStack>
                )
              })}
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  )
}
