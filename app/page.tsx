'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ParticleBackground from '../components/ParticleBackground'

export default function Home() {
  return (
    <div className="min-h-screen bg-deep-space overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] z-0"></div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 to-neon-purple/5"></div>

        {/* Content */}
        <motion.div 
          className="text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Logo Grande */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/logo-tradgen.png"
                alt="TradGen Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* TradGen Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-7xl md:text-9xl font-tech font-bold">
              <span className="bg-gradient-to-r from-cyber-blue to-matrix-green bg-clip-text text-transparent">
                <span className="text-cyber-blue">T</span>RAD
                <span className="text-matrix-green">G</span>EN
              </span>
            </h1>
            <motion.p 
              className="text-lg md:text-xl text-cyber-blue font-tech mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              QUANTUM TRADING TECHNOLOGY
            </motion.p>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Neural networks reinventing financial markets
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyber-blue to-matrix-green text-deep-space px-8 py-4 rounded-lg font-tech font-bold text-lg hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300"
            >
              LAUNCH TERMINAL
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-cyber-blue text-cyber-blue px-8 py-4 rounded-lg font-tech font-bold text-lg hover:bg-cyber-blue/10 transition-all duration-300"
            >
              VIEW DEMO
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
