import { useState } from 'react';
import { motion } from 'motion/react';
import { flashcards } from '../data';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const card = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-2">Tarjetas de Estudio</h2>
        <p className="text-gray-600">Tarjeta {currentIndex + 1} de {flashcards.length}</p>
      </div>

      <div 
        className="relative w-full h-80 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border-4 border-pink-400 p-8 flex flex-col items-center justify-center text-center">
            <div className="text-pink-500 mb-4">
              <RotateCcw size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{card.front}</h3>
            <p className="text-sm text-gray-400 mt-4">Toca para voltear</p>
          </div>

          {/* Back */}
          <div 
            className="absolute w-full h-full backface-hidden bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-500 p-8 flex flex-col items-center justify-center text-center overflow-y-auto"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-lg text-gray-800 whitespace-pre-line">{card.back}</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between w-full mt-8">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full bg-cyan-400 text-white hover:bg-cyan-500 transition-colors shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {flashcards.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-green-400' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="p-3 rounded-full bg-cyan-400 text-white hover:bg-cyan-500 transition-colors shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
