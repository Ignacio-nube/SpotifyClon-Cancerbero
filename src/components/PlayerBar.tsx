import { Box, Flex, HStack, VStack, Text, Slider } from "@chakra-ui/react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Maximize2,
  ListMusic,
} from "lucide-react"
import { usePlayer } from "@/context/PlayerContext"
import { ImageWithFallback } from "./ImageWithFallback"

// Formatear tiempo mm:ss
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === Infinity) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

interface ControlButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  active?: boolean
  primary?: boolean
}

function ControlButton({
  icon,
  onClick,
  size = "md",
  active,
  primary,
}: ControlButtonProps) {
  const sizes = {
    sm: { boxSize: 8, iconScale: 0.8 },
    md: { boxSize: 9, iconScale: 1 },
    lg: { boxSize: 10, iconScale: 1.1 },
  }

  return (
    <Box
      as="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSize={sizes[size].boxSize}
      borderRadius={primary ? "full" : "md"}
      bg={primary ? "white" : "transparent"}
      color={primary ? "black" : active ? "blood.500" : "gray.400"}
      _hover={{
        color: primary ? "black" : "white",
        transform: "scale(1.05)",
      }}
      transition="all 0.15s"
      onClick={onClick}
      transform={`scale(${sizes[size].iconScale})`}
    >
      {icon}
    </Box>
  )
}

export function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    isLoading,
    volume,
    progress,
    duration,
    isShuffle,
    repeatMode,
    togglePlay,
    setVolume,
    seekTo,
    nextSong,
    prevSong,
    toggleShuffle,
    toggleRepeat,
    toggleQueue,
    isQueueOpen,
  } = usePlayer()

  const handleProgressChange = (details: { value: number[] }) => {
    seekTo(details.value[0])
  }

  const handleVolumeChange = (details: { value: number[] }) => {
    setVolume(details.value[0] / 100)
  }

  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      h={{ base: "110px", md: "90px" }}
      bg="black"
      borderTop="1px solid"
      borderColor="surface.400"
      px={{ base: 2, md: 4 }}
      zIndex={100}
    >
      {/* Barra de Progreso para Móvil (arriba del todo) */}
      <Box display={{ base: "block", md: "none" }} pt={1} px={2}>
        <Slider.Root
          min={0}
          max={duration || 100}
          value={[progress]}
          onValueChange={handleProgressChange}
          size="sm"
        >
          <Slider.Control>
            <Slider.Track bg="surface.200" h="2px" borderRadius="full">
              <Slider.Range bg="blood.500" />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      </Box>

      <Flex h="full" align="center" justify="space-between" direction="row">
        {/* Información de la Canción Actual */}
        <HStack gap={3} minW={{ base: "150px", md: "200px" }} maxW={{ base: "70%", md: "30%" }}>
          {currentSong ? (
            <>
              <ImageWithFallback
                src={currentSong.cover}
                alt={currentSong.title}
                boxSize={{ base: "48px", md: "56px" }}
                borderRadius="md"
                objectFit="cover"
              />
              <VStack align="start" gap={0} overflow="hidden">
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="medium"
                  color="white"
                  truncate
                  _hover={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {currentSong.title}
                </Text>
                <Text fontSize="2xs" color="gray.400" truncate>
                  Canserbero
                </Text>
              </VStack>
            </>
          ) : (
            <Box p={2}>
              <Text fontSize="xs" color="gray.500">
                Selecciona una canción
              </Text>
            </Box>
          )}
        </HStack>

        {/* Controles Centrales */}
        <VStack gap={1} flex={1} maxW="600px" display={{ base: "none", md: "flex" }}>
          {/* Botones de Control */}
          <HStack gap={2}>
            <ControlButton 
              icon={<Shuffle size={18} />} 
              size="sm" 
              active={isShuffle}
              onClick={toggleShuffle}
            />
            <ControlButton icon={<SkipBack size={20} />} onClick={prevSong} />
            <ControlButton
              icon={isLoading ? <Box as="span" animation="spin 2s linear infinite">⏳</Box> : isPlaying ? <Pause size={22} fill="black" /> : <Play size={22} fill="black" />}
              onClick={togglePlay}
              primary
              size="lg"
            />
            <ControlButton icon={<SkipForward size={20} />} onClick={nextSong} />
            <ControlButton 
              icon={repeatMode === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />} 
              size="sm" 
              active={repeatMode !== "off"}
              onClick={toggleRepeat}
            />
          </HStack>

          {/* Barra de Progreso Desktop */}
          <HStack gap={2} w="full">
            <Text fontSize="xs" color="gray.400" minW="40px" textAlign="right">
              {formatTime(progress)}
            </Text>
            <Slider.Root
              flex={1}
              min={0}
              max={duration || 100}
              value={[progress]}
              onValueChange={handleProgressChange}
              size="sm"
            >
              <Slider.Control>
                <Slider.Track bg="surface.200" h="4px" borderRadius="full">
                  <Slider.Range bg="white" _groupHover={{ bg: "blood.500" }} />
                </Slider.Track>
                <Slider.Thumb
                  index={0}
                  boxSize={3}
                  bg="white"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                >
                  <Slider.HiddenInput />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.Root>
            <Text fontSize="xs" color="gray.400" minW="40px">
              {isLoading ? "..." : formatTime(duration)}
            </Text>
          </HStack>
        </VStack>

        {/* Controles Móvil (Play/Pause y Next) */}
        <HStack display={{ base: "flex", md: "none" }} gap={2}>
          <ControlButton
            icon={isLoading ? <Box as="span" animation="spin 2s linear infinite">⏳</Box> : isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
            onClick={togglePlay}
            primary
            size="md"
          />
          <ControlButton icon={<SkipForward size={20} />} onClick={nextSong} />
        </HStack>

        {/* Controles Secundarios (Volumen) - Ocultos en móvil */}
        <HStack gap={3} minW="200px" justify="flex-end" display={{ base: "none", md: "flex" }}>
          <ControlButton 
            icon={<ListMusic size={18} />} 
            size="sm" 
            active={isQueueOpen}
            onClick={toggleQueue}
          />
          <HStack gap={2}>
            <ControlButton
              icon={volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              size="sm"
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            />
            <Slider.Root
              w="100px"
              min={0}
              max={100}
              value={[volume * 100]}
              onValueChange={handleVolumeChange}
              size="sm"
            >
              <Slider.Control>
                <Slider.Track bg="surface.200" h="4px" borderRadius="full">
                  <Slider.Range bg="white" _groupHover={{ bg: "blood.500" }} />
                </Slider.Track>
                <Slider.Thumb
                  index={0}
                  boxSize={3}
                  bg="white"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                >
                  <Slider.HiddenInput />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.Root>
          </HStack>
          <ControlButton icon={<Maximize2 size={16} />} size="sm" />
        </HStack>
      </Flex>
    </Box>
  )
}
