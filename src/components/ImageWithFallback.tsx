import { Box, Image, type ImageProps } from "@chakra-ui/react"
import { Music } from "lucide-react"
import { useState } from "react"

interface ImageWithFallbackProps extends ImageProps {
  fallbackIconSize?: number
}

export function ImageWithFallback({ src, alt, fallbackIconSize = 24, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  
  if (hasError || !src) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="surface.400"
        {...props}
      >
        <Music size={fallbackIconSize} color="#888" />
      </Box>
    )
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      {...props}
    />
  )
}
