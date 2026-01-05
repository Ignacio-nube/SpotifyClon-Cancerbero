import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { PlayerProvider } from "@/context/PlayerContext"
import { Sidebar, PlayerBar, MainView, QueueDrawer } from "@/components"
import type { Album } from "@/types/Song"

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  console.log("App renderizada. Álbum seleccionado:", selectedAlbum)

  return (
    <PlayerProvider>
      <Box bg="black" minH="100vh">
        {/* Cola de Reproducción (Overlay) */}
        <QueueDrawer />

        {/* Layout Principal */}
        <Flex gap={{ base: 0, md: 2 }} p={{ base: 0, md: 2 }} pb="110px" direction={{ base: "column", md: "row" }}>
          {/* Sidebar - Oculta en móvil, visible en desktop */}
          <Box 
            display={{ base: "none", md: "block" }} 
            w="300px" 
            flexShrink={0}
            position="sticky"
            top="2"
            h="calc(100vh - 100px)"
          >
            <Sidebar onAlbumSelect={setSelectedAlbum} selectedAlbum={selectedAlbum} />
          </Box>
          
          {/* Contenido Principal */}
          <MainView 
            selectedAlbum={selectedAlbum} 
            onBack={() => setSelectedAlbum(null)}
            onAlbumSelect={setSelectedAlbum}
          />
        </Flex>
        
        {/* Player Bar Fija */}
        <PlayerBar />
      </Box>
    </PlayerProvider>
  )
}

export default App
