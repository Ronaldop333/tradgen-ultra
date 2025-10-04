'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-dark/80 backdrop-blur-md border-b border-gray-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Apenas Texto */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-tech font-bold">
                  <span className="text-cyber-blue">TRAD</span>
                  <span className="text-matrix-green">GEN</span>
                </span>
                <span className="text-xs text-gray-400 font-base -mt-1">
                  QUANTUM TRADING
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-tech text-sm"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyber-blue to-matrix-green text-gray-dark px-6 py-2 rounded-lg font-tech font-bold text-sm hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300"
            >
              LAUNCH APP
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden flex flex-col space-y-1"
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-6 h-0.5 bg-cyber-blue"></span>
            <span className="w-6 h-0.5 bg-cyber-blue"></span>
            <span className="w-6 h-0.5 bg-cyber-blue"></span>
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}
