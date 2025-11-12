// src/components/dashboard/ScheduleCard.tsx
import { Check, X, Clock } from 'lucide-react';
import { Card } from '@/lib/api';
import { useWebSocket } from '@/hooks/useWebSocket';

interface ScheduleCardProps {
  card: Card;
  onAction?: (cardId: string, action: string) => void;
}

export const ScheduleCard = ({ card, onAction }: ScheduleCardProps) => {
  const { handleCardAction } = useWebSocket();

  const handleAccept = () => {
    handleCardAction(card.card_id, 'accept');
    onAction?.(card.card_id, 'accept');
  };

  const handleReject = () => {
    handleCardAction(card.card_id, 'reject');
    onAction?.(card.card_id, 'reject');
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="glass p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-white/90 mb-1">{card.title}</h3>
          <p className="text-white/60 text-sm mb-2">{card.description}</p>
          
          <div className="flex items-center gap-2 text-sm text-white/40 mb-3">
            <Clock size={14} />
            <span>
              {formatTime(card.primary_action.start_time)} - {formatTime(card.primary_action.end_time)}
            </span>
            {card.metadata.urgency === 'high' && (
              <span className="px-2 py-1 bg-red-400/20 text-red-400 rounded-full text-xs">
                Urgent
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-1 ml-2">
          <button
            onClick={handleAccept}
            className="p-2 bg-green-400/20 text-green-400 rounded-xl hover:bg-green-400/30 transition-all"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleReject}
            className="p-2 bg-red-400/20 text-red-400 rounded-xl hover:bg-red-400/30 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {card.alternatives && card.alternatives.length > 0 && (
        <div className="border-t border-white/10 pt-3">
          <p className="text-sm text-white/50 mb-2">Alternative times:</p>
          <div className="space-y-1">
            {card.alternatives.map((alt, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {formatTime(alt.start_time)} - {formatTime(alt.end_time)}
                </span>
                <span className="text-white/40 text-xs">{alt.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
        <div className="flex gap-2">
          {card.metadata.flexibility === 'flexible' && (
            <span className="px-2 py-1 bg-blue-400/20 text-blue-400 rounded-full text-xs">
              Flexible
            </span>
          )}
          <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
            {Math.round(card.confidence * 100)}% confidence
          </span>
        </div>
        
        <span className="text-white/30 text-xs">
          {new Date(card.created_at).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};