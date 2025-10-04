'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: "TradGen Predator",
    description: "Robô de alta performance para operações automáticas",
    image: "/products/predator.jpg",
    category: "Robôs",
    price: "R$ 1.297",
    featured: true
  },
  {
    id: 2,
    name: "Suite de Indicadores",
    description: "Pacote completo com 14 indicadores exclusivos",
    image: "/products/suite.jpg", 
    category: "Indicadores",
    price: "R$ 897",
    featured: true
  },
  {
    id: 3,
    name: "Termômetro do Mercado",
    description: "Análise em tempo real com IA TradGen",
    image: "/products/thermometer.jpg",
    category: "Ferramentas",
    price: "R$ 497",
    featured: true
  }
]

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <section className="relative bg-gray-dark py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-tech font-bold mb-4">
            <span className="text-cyber-blue">Produtos</span>
            <span className="text-matrix-green"> TradGen</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Soluções inteligentes para traders que buscam performance e consistência
          </p>
        </motion.div>

        {/* Carrossel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Container do Carrossel */}
          <div className="relative h-96 rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  {/* Imagem do Produto */}
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 bg-gradient-to-br from-cyber-blue/20 to-matrix-green/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyber-blue font-tech">IMAGEM {products[currentIndex].name}</span>
                    </div>
                  </div>

                  {/* Informações do Produto */}
                  <div className="text-white">
                    <span className="text-cyber-blue font-tech text-sm mb-2 block">
                      {products[currentIndex].category}
                    </span>
                    <h3 className="text-3xl font-bold mb-4">
                      {products[currentIndex].name}
                    </h3>
                    <p className="text-gray-300 mb-6 text-lg">
                      {products[currentIndex].description}
                    </p>
                    <div className="flex items-center gap-6 mb-6">
                      <span className="text-2xl font-tech text-matrix-green">
                        {products[currentIndex].price}
                      </span>
                      <button className="bg-gradient-to-r from-cyber-blue to-matrix-green text-gray-dark px-6 py-3 rounded-lg font-tech font-bold hover:scale-105 transition-transform">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de Navegação */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-card/80 hover:bg-cyber-blue/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-card/80 hover:bg-cyber-blue/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
          >
            ›
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-cyber-blue' : 'bg-gray-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
