import React from 'react'

const Gallery: React.FC = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-center text-5xl font-medium mb-12 text-gray-800">Our Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large yellow vintage car */}
        <div className="md:col-span-7 rounded-2xl overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-20%20at%2022.39.06-vd71AI27i1H4aWIB1Lx0BIuPbVEGPq.png"
            alt="Yellow vintage car parked in front of colorful building"
            width={750}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right column top images */}
        <div className="md:col-span-5 grid grid-rows-2 gap-4">
          {/* Car interior */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/placeholder.svg?height=250&width=500"
              alt="Luxury car interior dashboard"
              width={500}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>

          {/* White sports cars */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/placeholder.svg?height=250&width=500"
              alt="White sports cars in parking lot"
              width={500}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom row of three equal images */}
        <div className="md:col-span-4 rounded-2xl overflow-hidden">
          <img
            src="/placeholder.svg?height=350&width=400"
            alt="Gray BMW M4 at dusk"
            width={400}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-4 rounded-2xl overflow-hidden">
          <img
            src="/placeholder.svg?height=350&width=400"
            alt="Black Porsche at sunset"
            width={400}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-4 rounded-2xl overflow-hidden">
          <img
            src="/placeholder.svg?height=350&width=400"
            alt="Gold BMW M4 parked"
            width={400}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Gallery