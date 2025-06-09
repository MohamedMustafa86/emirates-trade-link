
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  readonly = false, 
  size = "md",
  className 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  const handleStarClick = (starIndex: number) => {
    if (readonly) return;
    
    const newRating = starIndex + 1;
    setCurrentRating(newRating);
    onRatingChange?.(newRating);
  };

  const handleStarHover = (starIndex: number) => {
    if (readonly) return;
    setHoverRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const displayRating = hoverRating || currentRating;

  return (
    <div 
      className={cn("flex items-center gap-1", className)}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(5)].map((_, index) => {
        const isActive = index < displayRating;
        
        return (
          <button
            key={index}
            type="button"
            className={cn(
              "transition-colors duration-150",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default"
            )}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            disabled={readonly}
          >
            <Star
              className={cn(
                sizes[size],
                isActive 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "fill-gray-200 text-gray-200",
                !readonly && "hover:fill-yellow-300 hover:text-yellow-300"
              )}
            />
          </button>
        );
      })}
      {!readonly && (
        <span className="text-sm text-gray-600 mr-2">
          {displayRating > 0 ? `${displayRating}/5` : "اختر التقييم"}
        </span>
      )}
    </div>
  );
};

export default StarRating;
