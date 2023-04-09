import React from 'react';
import useCanvasDrawing from './hooks/useCanvasDrawing';
import { Point } from './models/Point';

interface WhiteboardProps {
  points: Point[];
  addPoint: ({ x, y, color }: Point) => void;
}

const Whiteboard = ({ points, addPoint }: WhiteboardProps) => {
  const { canvasRef } = useCanvasDrawing(points, addPoint);

  return (
    <canvas
      width={1000}
      height={400}
      ref={canvasRef}
      className='border-2 border-black rounded-md'
    />
  );
};

export default Whiteboard;
