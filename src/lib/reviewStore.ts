/**
 * Shared in-memory review store so OrderHistory and CustomerReviews
 * can exchange data without a backend.
 */

export interface ReviewEntry {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  artisanName: string;
  rating: number;
  title: string;
  text: string;
  date: string;
}

// Simple module-level reactive store with subscriber support
let reviews: ReviewEntry[] = [];
const listeners: (() => void)[] = [];

export function getReviews(): ReviewEntry[] {
  return reviews;
}

export function addReview(review: ReviewEntry): void {
  reviews = [review, ...reviews];
  listeners.forEach((fn) => fn());
}

export function hasReview(orderId: string): boolean {
  return reviews.some((r) => r.orderId === orderId);
}

export function subscribe(fn: () => void): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx > -1) listeners.splice(idx, 1);
  };
}
