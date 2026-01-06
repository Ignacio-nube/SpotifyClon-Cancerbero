import { Box, Flex, VStack, HStack, Text, IconButton } from "@chakra-ui/react"
import { Play, ChevronLeft } from "lucide-react"
import { usePlayerState } from "@/context/PlayerContext"
import { songs, getAlbumCover, albums } from "@/data/songs"
import { SongList } from "./SongList"
import { ImageWithFallback } from "./ImageWithFallback"
import type { Album } from "@/types/Song"

interface MainViewProps {
  selectedAlbum: Album | null
  onBack?: () => void
  onAlbumSelect?: (album: Album) => void
}

export function MainView({ selectedAlbum, onBack, onAlbumSelect }: MainViewProps) {
  const { playSong, setPlaylist } = usePlayerState()

  // Asegurarnos de que songs existe y es un array
  const allSongs = songs || []
  
  const displaySongs = selectedAlbum 
    ? allSongs.filter(s => s.album === selectedAlbum)
    : allSongs

  const handlePlayAll = () => {
    if (displaySongs.length > 0) {
      setPlaylist(displaySongs)
      playSong(displaySongs[0], displaySongs)
    }
  }

  const heroTitle = selectedAlbum || "Canserbero"
  const heroSubtitle = selectedAlbum 
    ? "Álbum • Canserbero" 
    : "Tirone José González Orama • Venezuela • Hip Hop Filosófico"
  const heroImage = selectedAlbum 
    ? getAlbumCover(selectedAlbum) 
    : "/cancer.webp"

  if (!displaySongs) return <Box flex={1} bg="black" />

  return (
    <Box
      flex={1}
      h={{ base: "calc(100vh - 110px)", md: "calc(100vh - 90px)" }}
      overflow="auto"
      bg="surface.500"
      borderRadius={{ base: "none", md: "lg" }}
      position="relative"
    >
      {/* Background Decorator */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="400px"
        zIndex={0}
        pointerEvents="none"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset={0}
          backgroundImage="url('/portada.webp')"
          backgroundSize="cover"
          backgroundPosition="center 20%"
          opacity={0.4}
          filter="blur(15px)"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-b"
          gradientFrom={
            selectedAlbum === "Muerte" 
              ? "rgba(45, 0, 0, 0.5)" 
              : selectedAlbum === "Vida" 
                ? "rgba(139, 0, 0, 0.3)" 
                : "rgba(0, 0, 0, 0.4)"
          }
          gradientTo="surface.500"
          gradientStop="70%"
        />
      </Box>

      <Box position="relative" zIndex={1}>
        {/* Mobile Header / Back Button */}
        {selectedAlbum && (
          <Box display={{ base: "block", md: "none" }} p={4} position="absolute" top={0} left={0} zIndex={10}>
            <IconButton
              aria-label="Volver"
              variant="ghost"
              color="white"
              onClick={onBack}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <ChevronLeft size={24} />
            </IconButton>
          </Box>
        )}

        {/* Album Selector for Mobile (when no album selected) */}
        {!selectedAlbum && (
          <Box display={{ base: "block", md: "none" }} p={4} pt={6}>
            <Text fontSize="xl" fontWeight="bold" mb={4} color="white">Explorar Álbumes</Text>
            <HStack gap={4} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
              {albums.map(album => (
                <VStack 
                  key={album} 
                  minW="140px" 
                  align="start" 
                  onClick={() => onAlbumSelect?.(album)}
                  cursor="pointer"
                >
                  <ImageWithFallback
                    src={getAlbumCover(album)}
                    alt={album}
                    boxSize="140px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                  <Text fontSize="sm" fontWeight="bold" color="white" truncate w="full">{album}</Text>
                </VStack>
              ))}
            </HStack>
          </Box>
        )}

        {/* Hero Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 6 }}
          p={{ base: 4, md: 6 }}
          pb={{ base: 6, md: 8 }}
          align={{ base: "center", md: "flex-end" }}
          pt={{ base: selectedAlbum ? 12 : 4, md: 6 }}
        >
          {/* Cover */}
          <Box
            boxSize={{ base: "180px", md: "232px" }}
            borderRadius="md"
            overflow="hidden"
            boxShadow="0 8px 24px rgba(0,0,0,0.5)"
            flexShrink={0}
          >
            <ImageWithFallback
              src={heroImage}
              alt={heroTitle}
              w="full"
              h="full"
              objectFit="cover"
              fallbackIconSize={80}
            />
          </Box>

          {/* Info */}
          <VStack align={{ base: "center", md: "start" }} gap={{ base: 1, md: 2 }}>
            <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase" color="gray.400">
              {selectedAlbum ? "Álbum" : "Artista Verificado"}
            </Text>
            <Text
              fontSize={{ base: "3xl", md: "6xl", lg: heroTitle.length > 10 ? "6xl" : "8xl" }}
              fontWeight="black"
              lineHeight={1}
              letterSpacing="tight"
              textAlign={{ base: "center", md: "left" }}
            >
              {heroTitle}
            </Text>
            <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} textAlign={{ base: "center", md: "left" }}>
              {heroSubtitle}
            </Text>
            <HStack gap={2} mt={2}>
              <Text fontSize="xs" color="gray.400">
                {displaySongs.length} canciones
              </Text>
            </HStack>
          </VStack>
        </Flex>

        {/* Action Bar */}
        <HStack px={{ base: 4, md: 6 }} py={4} gap={4}>
          <Box
            as="button"
            w={{ base: 12, md: 14 }}
            h={{ base: 12, md: 14 }}
            bg="blood.500"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ transform: "scale(1.06)", bg: "blood.400" }}
            transition="all 0.2s"
            onClick={handlePlayAll}
            boxShadow="0 8px 16px rgba(139, 0, 0, 0.4)"
          >
            <Play size={24} fill="white" color="white" />
          </Box>
        </HStack>

        {/* Lista de Canciones */}
        <Box px={{ base: 2, md: 4 }} pb={8}>
          <SongList songs={displaySongs} />
        </Box>
      </Box>
    </Box>
  )
}
