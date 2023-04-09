import { useEffect, useRef } from 'react';
import { getRandomColor } from 'utilities/color';
import { Point } from '../models/Point';

const drawPoint = (
  { x, y, color }: Point,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, 2.5, 0, 2 * Math.PI);
  context.fill();
};

const useCanvasDrawing = (
  points: Point[],
  addPoint: ({ x, y, color }: Point) => void,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return undefined;

    const handleClick = (event: MouseEvent) => {
      const x = event.offsetX;
      const y = event.offsetY;

      const color = getRandomColor();

      addPoint({ x, y, color });
      drawPoint({ x, y, color }, context);
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return undefined;

    // Limpiar canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Volver a pintar puntos
    points.forEach((point) => {
      drawPoint(point, context);
    });
  }, [points]);

  return {
    canvasRef,
  };
};

export default useCanvasDrawing;
