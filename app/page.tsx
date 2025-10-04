'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-dark grid-bg">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-neon-purple/3"></div>

        {/* Content */}
        <motion.div 
          className="text-center z-10 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <div className="relative w-20 h-20">
              <Image
                src="/logo-tradgen.png"
                alt="TradGen Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-tech font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyber-blue to-matrix-green bg-clip-text text-transparent">
              <span className="text-cyber-blue">T</span>rad
              <span className="text-matrix-green">G</span>en
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Quantum Trading Technology powered by Neural Networks
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyber-blue to-matrix-green text-gray-dark px-8 py-4 rounded-lg font-tech font-bold text-lg hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300"
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

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-blue rounded-full glow-text"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-matrix-green rounded-full"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </section>
    </div>
  )
}
