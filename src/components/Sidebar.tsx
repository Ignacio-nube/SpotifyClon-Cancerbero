import { Box, VStack, HStack, Text } from "@chakra-ui/react"
import { Home, Search, Library, PlusCircle, Music, Play } from "lucide-react"
import type { Album } from "@/types/Song"
import { albums, getAlbumCover } from "@/data/songs"
import { ImageWithFallback } from "./ImageWithFallback"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <HStack
      as="button"
      gap={4}
      py={2}
      px={4}
      w="full"
      borderRadius="md"
      color={active ? "white" : "gray.400"}
      bg={active ? "whiteAlpha.100" : "transparent"}
      _hover={{ color: "white", bg: "whiteAlpha.50" }}
      transition="all 0.2s"
      onClick={onClick}
    >
      {icon}
      <Text fontWeight={active ? "semibold" : "normal"}>{label}</Text>
    </HStack>
  )
}

interface AlbumItemProps {
  album: Album
  cover: string
  active?: boolean
  onClick?: () => void
}

function AlbumItem({ album, cover, active, onClick }: AlbumItemProps) {
  return (
    <HStack
      as="button"
      gap={3}
      p={2}
      w="full"
      borderRadius="md"
      bg={active ? "whiteAlpha.200" : "transparent"}
      color={active ? "white" : "gray.400"}
      _hover={{ bg: "whiteAlpha.100", color: "white" }}
      transition="all 0.2s"
      onClick={onClick}
    >
      <Box position="relative">
        <ImageWithFallback
          src={cover}
          alt={album}
          boxSize="48px"
          borderRadius="md"
          objectFit="cover"
          fallbackIconSize={20}
        />
        {active && (
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
          >
            <Play size={16} fill="white" />
          </Box>
        )}
      </Box>
      <VStack align="start" gap={0} overflow="hidden">
        <Text fontSize="sm" fontWeight="medium" truncate>
          {album}
        </Text>
        <Text fontSize="xs" color="gray.400" truncate>
          Álbum • Canserbero
        </Text>
      </VStack>
    </HStack>
  )
}

interface SidebarProps {
  onAlbumSelect?: (album: Album | null) => void
  selectedAlbum: Album | null
}

export function Sidebar({ onAlbumSelect, selectedAlbum }: SidebarProps) {
  return (
    <Box
      as="aside"
      w="full"
      h="full"
      bg="black"
      p={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {/* Logo */}
      <Box px={4} py={4}>
        <HStack gap={3}>
          <ImageWithFallback
            src="/logo.webp"
            alt="Logo Canserbero"
            boxSize="40px"
            borderRadius="full"
            objectFit="cover"
            fallbackIconSize={20}
          />
          <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight">
            Canserbero
          </Text>
        </HStack>
      </Box>

      {/* Navegación Principal */}
      <Box bg="surface.500" borderRadius="lg" p={3}>
        <VStack gap={1} align="stretch">
          <NavItem 
            icon={<Home size={22} />} 
            label="Inicio" 
            active={selectedAlbum === null}
            onClick={() => onAlbumSelect?.(null)} 
          />
          <NavItem icon={<Search size={22} />} label="Buscar" />
        </VStack>
      </Box>

      {/* Biblioteca */}
      <Box bg="surface.500" borderRadius="lg" p={3} flex={1} overflow="hidden">
        <VStack gap={4} align="stretch" h="full">
          {/* Header Biblioteca */}
          <HStack justify="space-between" px={2}>
            <HStack gap={2} color="gray.400" _hover={{ color: "white" }} cursor="pointer">
              <Library size={22} />
              <Text fontWeight="semibold">Tu Biblioteca</Text>
            </HStack>
            <Box
              as="button"
              color="gray.400"
              _hover={{ color: "white", bg: "whiteAlpha.100" }}
              p={1}
              borderRadius="full"
            >
              <PlusCircle size={20} />
            </Box>
          </HStack>

          {/* Lista de Álbumes */}
          <Box flex={1} overflow="auto">
            <VStack gap={1} align="stretch">
              {albums.map((album) => (
                <AlbumItem
                  key={album}
                  album={album}
                  active={selectedAlbum === album}
                  cover={getAlbumCover(album)}
                  onClick={() => onAlbumSelect?.(album)}
                />
              ))}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
