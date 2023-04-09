import { useEffect, useState } from 'react';
import { Point, PointResponse } from '@components/whiteboard/models/Point';
import httpService from 'services/http-service';

const usePoints = () => {
  const [myPoints, setMyPoints] = useState<Point[]>([]);

  const [hasUndo, setHasUndo] = useState(false);
  const [hasRedo, setHasRedo] = useState(false);

  useEffect(() => {
    const fetchAllPoints = async () => {
      try {
        const {
          data: { points, hasUndo: hasUndoValue, hasRedo: hasRedoValue },
        } = await httpService.get<PointResponse>('/api/point');

        setHasUndo(hasUndoValue);

        setHasRedo(hasRedoValue);
        setMyPoints(points);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchAllPoints();
  }, []);

  const addPoint = async (payload: Point) => {
    try {
      const { data: point } = await httpService.post(
        '/api/point/draw',
        payload
      );
      setHasUndo(true);
      setHasRedo(false);
      const newPoint = { ...payload, id: point.insertedId };
      setMyPoints((currentMyPoints) => [...currentMyPoints, newPoint]);
    } catch (error) {
      console.log(error);
    }
  };

  const undoRedo = async (endPoint: string) => {
    try {
      const {
        data: { points, hasUndo: hasUndoValue, hasRedo: hasRedoValue },
      } = await httpService.get<PointResponse>(endPoint);

      setHasUndo(hasUndoValue);
      setHasRedo(hasRedoValue);
      setMyPoints(points);
    } catch (error) {
      console.log(error);
    }
  };

  const undo = async () => {
    undoRedo('/api/point/undo');
  };

  const redo = async () => {
    undoRedo('/api/point/redo');
  };

  return {
    undo,
    redo,
    points: myPoints,
    addPoint,
    hasUndo,
    hasRedo,
  };
};

export default usePoints;
