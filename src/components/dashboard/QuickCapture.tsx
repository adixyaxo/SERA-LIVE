// src/components/dashboard/QuickCapture.tsx
import { useState, useRef } from 'react';
import { Mic, Square, Send } from 'lucide-react';
import { apiService } from '@/lib/api';
import { useWebSocket } from '@/hooks/useWebSocket';

interface QuickCaptureProps {
  onNewCards?: (cards: any[]) => void;
}

export const QuickCapture = ({ onNewCards }: QuickCaptureProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { connect, isConnected } = useWebSocket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await apiService.captureText(text);
      console.log('Generated cards:', response.cards);
      onNewCards?.(response.cards);
      setText(''); // Clear input after successful submission
      
      // Auto-adjust height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error capturing text:', error);
      alert('Failed to process your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Audio recording logic would go here
  };

  return (
    <div className="animate-fade-in glass p-6 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Quick Capture</h2>
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="What would you like to schedule? (e.g., 'Meeting with team tomorrow at 2 PM for 1 hour')"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:border-white/20 min-h-[60px] max-h-[120px]"
            rows={1}
            disabled={isProcessing}
          />
          
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-2 rounded-xl transition-all ${
                isRecording 
                  ? 'bg-red-400/20 text-red-400' 
                  : 'bg-white/5 hover:bg-white/10 text-white/60'
              }`}
            >
              {isRecording ? <Square size={16} /> : <Mic size={16} />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-white/40">
            {isProcessing ? 'Processing...' : 'Press Enter to send'}
          </div>
          
          <button
            type="submit"
            disabled={!text.trim() || isProcessing}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-xl transition-all flex items-center gap-2"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
            Send
          </button>
        </div>
      </form>
    </div>
  );
};