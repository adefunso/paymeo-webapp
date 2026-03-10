import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Mic, Send, X, ShoppingBag, MessageSquare, Volume2, VolumeX, Grid, Info } from 'lucide-react';
import { getAgentResponse, generateSpeech } from '../services/gemini';
import { MOCK_INVENTORY } from '../constants';
import ReactMarkdown from 'react-markdown';

interface StoreAgentProps {
  onClose: () => void;
}

export const StoreAgent: React.FC<StoreAgentProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isNoisyMode, setIsNoisyMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<{ product: typeof MOCK_INVENTORY[0], quantity: number }[]>([]);
  const [detectedProduct, setDetectedProduct] = useState<typeof MOCK_INVENTORY[0] | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastTranscription, setLastTranscription] = useState('');
  const [isWelcomed, setIsWelcomed] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate AI noise detection after a short delay
    const noiseDetectionTimeout = setTimeout(() => {
      const simulatedNoiseDetected = Math.random() > 0.5; // 50% chance for demo
      if (simulatedNoiseDetected) {
        setIsNoisyMode(true);
        handleAIInteraction("I've detected some background noise. I'll show my responses as text and enable the keyboard so you can type if you need to!");
      }
    }, 8000);

    return () => clearTimeout(noiseDetectionTimeout);
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        
        // Initial welcome
        if (!isWelcomed) {
          handleAIInteraction("Hello! I just arrived at the stall. Please welcome me.");
          setIsWelcomed(true);
        }
      } catch (err) {
        console.error('Camera access error:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      }
    }
    return undefined;
  };

  const handleAIInteraction = async (text: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    if (text !== "Hello! I just arrived at the stall. Please welcome me.") {
      setMessages(prev => [...prev, { role: 'user', text }]);
    }

    try {
      const imageBase64 = captureFrame();
      const responseText = await getAgentResponse(text, imageBase64);
      
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      setLastTranscription(responseText);

      if (!isMuted) {
        const audioBase64 = await generateSpeech(responseText);
        if (audioBase64 && audioRef.current) {
          audioRef.current.src = `data:audio/mp3;base64,${audioBase64}`;
          audioRef.current.play();
        }
      }
    } catch (error) {
      console.error("Agent Error:", error);
    } finally {
      setIsProcessing(false);
      setInputText('');
    }
  };

  const addToCart = (product: typeof MOCK_INVENTORY[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    handleAIInteraction(`I've added the ${product.name} to my cart.`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const simulateDetection = () => {
    const randomProduct = MOCK_INVENTORY[Math.floor(Math.random() * MOCK_INVENTORY.length)];
    setDetectedProduct(randomProduct);
    handleAIInteraction(`I'm looking at the ${randomProduct.name}. Can you tell me more about it?`);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col md:flex-row overflow-hidden">
      {/* Camera Viewport */}
      <div className="relative flex-1 bg-zinc-900">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4 bg-gradient-to-b from-black/80 to-transparent z-20">
          <div className="flex justify-between items-center w-full md:w-auto">
            <div className="flex flex-col">
              <h2 className="text-white font-bold text-lg md:text-xl tracking-tight flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
                The Artisan Stall
              </h2>
              <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest font-semibold mt-0.5">AI Agent Active</p>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <button 
              onClick={simulateDetection}
              className="flex-1 md:flex-none p-3 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              title="Simulate Vision Detection"
            >
              <Camera className="w-4 h-4 md:w-5 h-5" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Detect Item</span>
            </button>
            <button 
              onClick={() => setShowProducts(!showProducts)}
              className="flex-1 md:flex-none p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              title="Browse Products"
            >
              <Grid className="w-4 h-4 md:w-5 h-5" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Browse</span>
            </button>
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="md:hidden p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="hidden md:flex p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Transcription Overlay (Noisy Environment) */}
        <AnimatePresence>
          {lastTranscription && isNoisyMode && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-32 left-6 right-6 p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] font-bold">AI</span>
                </div>
                <div className="text-white/90 text-sm leading-relaxed font-medium">
                  <ReactMarkdown>{lastTranscription}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interaction Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-3">
            <AnimatePresence>
              {isNoisyMode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="flex-1 w-full relative"
                >
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAIInteraction(inputText)}
                    placeholder="Type your message..."
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                  <button 
                    onClick={() => handleAIInteraction(inputText)}
                    disabled={isProcessing || !inputText.trim()}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-500 text-white rounded-full transition-all flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-2 w-full md:w-auto justify-center">
              <button 
                onClick={() => setIsNoisyMode(!isNoisyMode)}
                className={`px-4 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all flex-1 md:flex-none ${isNoisyMode ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-white/40'}`}
              >
                {isNoisyMode ? 'Noisy Mode Active' : 'Detecting Noise...'}
              </button>
              
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full backdrop-blur-xl border transition-all relative ${isMuted ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-white/10 border-white/20 text-white'} ${isSpeaking && !isMuted ? 'ring-4 ring-blue-500/30' : ''}`}
              >
                {isSpeaking && !isMuted && (
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full bg-blue-400/30"
                  />
                )}
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History Sidebar */}
      <AnimatePresence>
        {(showHistory || !isMobile) && (
          <motion.div 
            initial={isMobile ? { x: '100%' } : { opacity: 0, width: 0 }}
            animate={isMobile ? { x: 0 } : { opacity: 1, width: 384 }}
            exit={isMobile ? { x: '100%' } : { opacity: 0, width: 0 }}
            className={`fixed md:relative inset-y-0 right-0 w-full md:w-96 bg-zinc-950 border-l border-white/5 flex flex-col z-40 md:z-auto`}
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                Negotiation History
              </h3>
              <button 
                onClick={() => setShowHistory(false)}
                className="md:hidden p-2 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <MessageSquare className="w-12 h-12 mb-4" />
                  <p className="text-sm">No messages yet</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'
                  }`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        className="hidden" 
        onPlay={() => setIsSpeaking(true)}
        onEnded={() => setIsSpeaking(false)}
        onPause={() => setIsSpeaking(false)}
      />

      {/* Product Browser Overlay */}
      <AnimatePresence>
        {showProducts && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">Store Inventory</h3>
                  <p className="text-white/40 text-sm mt-1">Browse our handcrafted collection</p>
                </div>
                <button 
                  onClick={() => setShowProducts(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
                {MOCK_INVENTORY.map((product) => (
                  <div 
                    key={product.id}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{product.name}</h4>
                      <span className="text-blue-400 font-mono font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Stock: {product.stock} units</span>
                      <button 
                        onClick={() => {
                          setShowProducts(false);
                          setDetectedProduct(product);
                          handleAIInteraction(`Tell me more about the ${product.name}`);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-full transition-all active:scale-95"
                      >
                        <Info className="w-3 h-3" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-zinc-950/50 border-t border-white/5 text-center">
                <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
                  All items are handcrafted with care
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detected Product Showcase Card */}
      <AnimatePresence>
        {detectedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-32 left-6 right-6 md:left-auto md:right-auto md:w-[400px] md:bottom-32 md:left-1/2 md:-translate-x-1/2 z-50"
          >
            <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/20 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-zinc-800 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-blue-400 opacity-20" />
                <button 
                  onClick={() => setDetectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white/60 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Detected Item
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{detectedProduct.name}</h3>
                  <span className="text-blue-400 font-mono font-bold text-lg">${detectedProduct.price.toFixed(2)}</span>
                </div>
                
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {detectedProduct.description}
                </p>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      handleAIInteraction(`I want to buy the ${detectedProduct.name}. Can we negotiate the price?`);
                    }}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold rounded-2xl transition-all active:scale-95"
                  >
                    Negotiate
                  </button>
                  <button 
                    onClick={() => {
                      setDetectedProduct(null);
                      addToCart(detectedProduct);
                    }}
                    className="flex-[1.5] py-3 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Overlay */}
      <AnimatePresence>
        {showCart && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">Your Cart</h3>
                  <p className="text-white/40 text-sm mt-1">{cartCount} items selected</p>
                </div>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-12">
                    <ShoppingBag className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <button 
                      onClick={() => { setShowCart(false); setShowProducts(true); }}
                      className="mt-4 text-blue-400 text-sm font-bold uppercase tracking-widest hover:underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                        {item.quantity}x
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">{item.product.name}</h4>
                        <p className="text-white/40 text-xs">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-white/20 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-8 bg-zinc-950/50 border-t border-white/5 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      handleAIInteraction("I'm ready to checkout and pay for my items.");
                      setShowCart(false);
                    }}
                    className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Checkout with Paymeo
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
