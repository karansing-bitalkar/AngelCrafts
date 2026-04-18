import { FiStar } from "react-icons/fi";

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function StarRating({ rating, size = 16, interactive = false, onRate }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onRate?.(star)}
          className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
          disabled={!interactive}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={star <= rating ? "#FBBF24" : "none"}
            stroke={star <= rating ? "#FBBF24" : "#D1D5DB"}
            strokeWidth={2}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}
