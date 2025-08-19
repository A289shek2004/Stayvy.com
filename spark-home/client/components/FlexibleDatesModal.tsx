import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FlexibleDates } from "./FlexibleDates";
import { XIcon } from "lucide-react";

interface FlexibleDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (duration: string, month: string) => void;
}

export function FlexibleDatesModal({ isOpen, onClose, onApply }: FlexibleDatesModalProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const handleSelection = (duration: string, month: string) => {
    setSelectedDuration(duration);
    setSelectedMonth(month);
  };

  const handleApply = () => {
    if (onApply) {
      onApply(selectedDuration, selectedMonth);
    }
    onClose();
  };

  const handleClear = () => {
    setSelectedDuration("");
    setSelectedMonth("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">
              I'm flexible
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-gray-600 mt-2">
            Choose when and how long you'd like to stay
          </p>
        </DialogHeader>

        {/* Content */}
        <div className="p-6">
          <FlexibleDates onSelection={handleSelection} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 pt-4 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!selectedDuration && !selectedMonth}
          >
            Clear all
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={!selectedDuration || !selectedMonth}
              className="bg-dusky-rose hover:bg-dusky-thistle px-8"
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
