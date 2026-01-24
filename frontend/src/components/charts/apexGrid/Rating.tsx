import { Star } from "lucide-react";

interface RatingProps {
  value: number; 
  max?: number;
}

const RatingStars = ({ value, max = 5 }: RatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, i) => {
        const filled = i + 1 <= Math.floor(value);

        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        );
      })}
      <span className="ml-1 text-sm font-medium text-gray-600">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

export default RatingStars;
