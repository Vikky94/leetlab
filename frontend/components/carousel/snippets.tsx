"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const codingLangs = ['javascript', 'python', 'java'];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {codingLangs.map((langName, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <Image
                    src={`/images/snippets/binarysearch-${langName}.png`}
                    alt={langName}
                    width={1000} // Required: specify width
                    height={1000} // Required: specify height
                    className="rounded-lg shadow-md" // Optional: Tailwind CSS for styling
                  />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
