import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card as CardType } from '@/lib/api';

interface ConfirmationDialogProps {
  generatedCards: CardType[];
  onConfirm: () => void;
  onReject: () => void;
  isVisible: boolean;
}

export const ConfirmationDialog = ({ generatedCards, onConfirm, onReject, isVisible }: ConfirmationDialogProps) => {
  if (!isVisible || generatedCards.length === 0) return null;

  return (
    <div className="animate-fade-in glass p-6 rounded-3xl border border-accent/20">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl">AI Generated Suggestions</CardTitle>
        <CardDescription>
          Review the following {generatedCards.length} suggestion{generatedCards.length > 1 ? 's' : ''} and confirm to apply
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {generatedCards.map((card, index) => (
            <div key={card.card_id} className="p-3 rounded-xl bg-background/50 border border-white/5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{card.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                      {card.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(card.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20"
            variant="ghost"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Yes, Apply Changes
          </Button>
          <Button
            onClick={onReject}
            className="flex-1 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
            variant="ghost"
          >
            <XCircle className="h-4 w-4 mr-2" />
            No, Regenerate
          </Button>
        </div>
      </CardContent>
    </div>
  );
};
