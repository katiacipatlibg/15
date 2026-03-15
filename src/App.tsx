/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, CheckSquare, Lightbulb, MessageCircle, Heart, Star, Zap } from 'lucide-react';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import Assistant from './components/Assistant';
import { questions, cases } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz' | 'cases' | 'assistant'>('flashcards');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-cyan-50 to-green-50 font-sans pb-16">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b-4 border-pink-300">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <Heart className="text-pink-500 fill-pink-500" size={28} />
              <Zap className="text-cyan-400 fill-cyan-400" size={28} />
              <Star className="text-green-500 fill-green-500" size={28} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
              Estudio <span className="text-pink-500">Super</span>Poderoso
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
            <button 
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === 'flashcards' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-50'}`}
            >
              <BookOpen size={18} /> Tarjetas
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === 'quiz' ? 'bg-cyan-400 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-cyan-50'}`}
            >
              <CheckSquare size={18} /> Examen
            </button>
            <button 
              onClick={() => setActiveTab('cases')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === 'cases' ? 'bg-green-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-green-50'}`}
            >
              <Lightbulb size={18} /> Casos
            </button>
            <button 
              onClick={() => setActiveTab('assistant')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === 'assistant' ? 'bg-purple-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-purple-50'}`}
            >
              <MessageCircle size={18} /> Asistente
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'flashcards' && <Flashcards />}
        {activeTab === 'quiz' && <Quiz questions={questions} title="Preguntas tipo examen" colorTheme="cyan" />}
        {activeTab === 'cases' && <Quiz questions={cases} title="Casos de Estudio" colorTheme="green" />}
        {activeTab === 'assistant' && <Assistant />}
      </main>

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 opacity-50 pointer-events-none flex items-center gap-2">
        <Heart className="text-pink-400 fill-pink-400" size={16} />
        <span className="font-bold text-gray-500 tracking-widest uppercase text-sm">Miss Karu</span>
      </div>
    </div>
  );
}
