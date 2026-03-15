import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Assistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente de estudio. ¿En qué te puedo ayudar hoy con el Programa Sintético de la Fase 4?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Eres un asistente educativo experto en el Programa Sintético de la Fase 4 de Educación Primaria en México. Responde a la siguiente pregunta del estudiante de forma clara, amigable y motivadora, como si fueras una de las Chicas Superpoderosas (Bombón, Burbuja o Bellota). Pregunta: ${userMsg}`
      });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Lo siento, no pude procesar tu solicitud.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Hubo un error al conectar con el asistente. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border-4 border-pink-300 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-pink-400 p-4 text-white flex items-center gap-3">
        <div className="bg-white p-2 rounded-full text-pink-500">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Asistente Superpoderoso</h2>
          <p className="text-sm opacity-90">¡Lista para ayudarte a estudiar!</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-pink-50">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-cyan-400 text-white' : 'bg-green-400 text-white'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-500 text-white rounded-tr-none' : 'bg-white text-gray-800 border-2 border-green-200 rounded-tl-none shadow-sm'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-10 h-10 rounded-full bg-green-400 text-white flex items-center justify-center shrink-0">
                <Bot size={20} />
              </div>
              <div className="p-4 rounded-2xl bg-white text-gray-800 border-2 border-green-200 rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t-2 border-pink-100">
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu pregunta aquí..."
            className="flex-1 p-3 rounded-full border-2 border-pink-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-full bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-50 transition-colors"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
