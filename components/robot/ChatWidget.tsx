// /components/robot/ChatWidget.tsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot, User } from 'lucide-react'
import { BRAND, ROBOT_ACTIONS } from '@/lib/knowledge/yisas'

interface Action {
  type: 'link' | 'form' | 'call' | 'demo'
  label: string
  url?: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  actions?: Action[]
  suggestions?: string[]
  timestamp: Date
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Merhaba! 👋 Ben ${BRAND.name} Robotu, ${BRAND.tagline.toLowerCase()}nin asistanıyım.\n\nSize nasıl yardımcı olabilirim?`,
  actions: ROBOT_ACTIONS.quick as unknown as Action[],
  suggestions: ROBOT_ACTIONS.suggestions.slice(0, 3),
  timestamp: new Date(),
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('yisa_robot_session')
    if (stored) {
      setSessionId(stored)
    } else {
      const newId = crypto.randomUUID()
      localStorage.setItem('yisa_robot_session', newId)
      setSessionId(newId)
    }
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([WELCOME_MESSAGE])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const handleSend = useCallback(async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/robot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          context: 'website',
          page_url: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      })

      const result = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.success ? result.data.message : 'Üzgünüm, bir hata oluştu.',
        actions: result.success ? result.data.actions : [],
        suggestions: result.success ? result.data.suggestions : [],
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Bağlantı hatası. Lütfen tekrar deneyin.',
        actions: [{ type: 'link', label: '📞 İletişim', url: '/hakkimizda#iletisim' }],
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, sessionId])

  const handleAction = (action: Action) => {
    if (action.url) {
      window.location.href = action.url
    }
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full 
              bg-gradient-to-br from-amber-500 to-orange-600 
              text-slate-900 shadow-lg shadow-amber-500/30
              flex items-center justify-center
              hover:shadow-xl hover:shadow-amber-500/40 transition-shadow"
          >
            <Bot size={28} />
            <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[380px] h-[500px] sm:h-[550px]
              bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50
              shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 
              bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 
                  flex items-center justify-center text-slate-900">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{BRAND.name} Robotu</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Çevrimiçi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%]`}>
                      <div className={`flex items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                          ${message.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`}>
                          {message.role === 'user' 
                            ? <User size={16} className="text-slate-300" />
                            : <Bot size={16} className="text-slate-900" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-3
                          ${message.role === 'user'
                            ? 'bg-amber-500 text-slate-900 rounded-br-md'
                            : 'bg-slate-800 text-slate-100 rounded-bl-md'}`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className={`flex flex-wrap gap-2 mt-2 ${message.role === 'user' ? 'justify-end' : 'ml-10'}`}>
                          {message.actions.map((action, idx) => (
                            <button key={idx} onClick={() => handleAction(action)}
                              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 
                                text-amber-400 hover:text-amber-300 rounded-full border border-slate-700 
                                hover:border-amber-500/50 transition-all">
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className={`flex flex-wrap gap-2 mt-2 ${message.role === 'user' ? 'justify-end' : 'ml-10'}`}>
                          {message.suggestions.map((suggestion, idx) => (
                            <button key={idx} onClick={() => handleSend(suggestion)}
                              className="px-3 py-1.5 text-xs bg-slate-800/50 hover:bg-slate-700 
                                text-slate-400 hover:text-white rounded-full border border-slate-700/50 transition-all">
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 
                        flex items-center justify-center">
                        <Bot size={16} className="text-slate-900" />
                      </div>
                      <div className="bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input */}
            {!isMinimized && (
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Mesajınızı yazın..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-slate-800 text-white placeholder-slate-500
                      rounded-xl border border-slate-700 focus:border-amber-500/50 focus:outline-none
                      disabled:opacity-50 transition-all"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600
                      text-slate-900 hover:shadow-lg hover:shadow-amber-500/30
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
