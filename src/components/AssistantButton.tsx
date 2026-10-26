import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Car } from 'lucide-react';
import { answer, suggestedQuestions } from '@/data/assistant';
import { formatCurrency } from '@/data/vehicles';
import type { Vehicle } from '@/data/vehicles';

interface Msg {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  vehicles?: Vehicle[];
}

interface Props {
  onVehicleClick: (v: Vehicle) => void;
}

const welcome: Msg = {
  id: 0,
  role: 'assistant',
  text:
    "Hi! I'm the Velox Virtual Assistant — a demo helper (not a live AI). Ask me about rentals, cars for sale, pricing, or how booking works.",
};

export default function AssistantButton({ onVehicleClick }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([welcome]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const userMsg: Msg = { id: idRef.current++, role: 'user', text: q };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const res = answer(q);
      const aMsg: Msg = { id: idRef.current++, role: 'assistant', text: res.text, vehicles: res.vehicles };
      setMessages((m) => [...m, aMsg]);
      setLoading(false);
    }, 500 + Math.random() * 400);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Toggle button - bottom left */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close assistant' : 'Open Velox Virtual Assistant'}
        aria-expanded={open}
        className="fixed left-4 bottom-4 z-[90] w-14 h-14 rounded-full bg-[#0B0B0D] border border-[#FF6B2C]/40 text-white shadow-xl shadow-black/40 flex items-center justify-center hover:bg-[#17191D] transition-colors"
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} className="text-[#FF6B2C]" />}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#FF6B2C] animate-pulse-dot" />
        )}
      </button>

      {open && (
        <div
          className="fixed left-4 z-[95] w-[calc(100vw-2rem)] sm:w-[380px] animate-slide-up-panel"
          style={{ bottom: 'calc(max(1rem, env(safe-area-inset-bottom)) + 4.5rem)' }}
          role="dialog"
          aria-label="Velox Virtual Assistant"
        >
          <div className="flex flex-col rounded-2xl bg-[#17191D] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden" style={{ maxHeight: 'min(70vh, 560px)' }}>
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-[#0B0B0D] border-b border-white/10">
              <span className="w-9 h-9 rounded-full bg-[#FF6B2C]/15 flex items-center justify-center">
                <Sparkles size={18} className="text-[#FF6B2C]" />
              </span>
              <div className="flex-1">
                <div className="font-bold text-white text-sm">Velox Virtual Assistant</div>
                <div className="text-xs text-white/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Demo · not a live AI
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-white/60 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll p-3 space-y-3 bg-[#0B0B0D]/40">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${m.role === 'user' ? '' : 'w-full'}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-[#FF6B2C] text-white rounded-br-md'
                          : 'bg-[#17191D] text-white/90 border border-white/10 rounded-bl-md'
                      }`}
                    >
                      {m.text}
                    </div>

                    {m.vehicles && m.vehicles.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {m.vehicles.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => onVehicleClick(v)}
                            className="w-full flex items-center gap-3 p-2 rounded-xl bg-[#17191D] border border-white/10 hover:border-[#FF6B2C]/50 transition-colors text-left group"
                          >
                            <img
                              src={v.image}
                              alt={`${v.make} ${v.model}`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-14 h-10 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-white truncate">
                                {v.make} {v.model}{v.year ? ` ${v.year}` : ''}
                              </div>
                              <div className="text-xs text-white/50">
                                {v.category} · {v.transmission}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs font-bold text-[#FF6B2C]">
                                {v.dailyRate != null ? `${formatCurrency(v.dailyRate)}/d` : formatCurrency(v.price!)}
                              </div>
                              <div className="text-[10px] text-white/40 group-hover:text-[#FF6B2C] flex items-center gap-0.5 justify-end mt-0.5">
                                <Car size={10} /> view
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-[#17191D] border border-white/10 rounded-bl-md flex items-center gap-1">
                    <span className="typing-dot w-2 h-2 rounded-full bg-white/60" />
                    <span className="typing-dot w-2 h-2 rounded-full bg-white/60" />
                    <span className="typing-dot w-2 h-2 rounded-full bg-white/60" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && !loading && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-[#0B0B0D]/40">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-[#17191D] border border-white/10 text-white/70 hover:border-[#FF6B2C]/50 hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#0B0B0D]">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                  aria-label="Message input"
                  className="flex-1 resize-none max-h-24 px-3 py-2 rounded-xl bg-[#17191D] border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#FF6B2C] transition-colors"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#FF6B2C] text-white flex items-center justify-center hover:bg-[#e85a1f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
