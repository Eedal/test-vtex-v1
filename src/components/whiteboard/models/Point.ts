export interface Point {
  id?: number;
  x: number;
  y: number;
  color: string;
}

export interface PointResponse {
  points: Point[];
  hasRedo: boolean;
  hasUndo: boolean;
}
