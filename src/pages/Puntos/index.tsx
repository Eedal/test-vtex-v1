import React from 'react';
import Head from 'next/head';
import MainLayout from '@components/layout/MainLayout';
import Whiteboard from '@components/whiteboard/Whiteboard';
import Actions from '@components/whiteboard/Actions';
import usePoints from './hooks/usePoints';

const Puntos = () => {
  const {
    undo,
    redo,
    points,
    addPoint,
    hasUndo,
    hasRedo,
  } = usePoints();

  return (
    <MainLayout>
      <Head>
        <title>Puntos</title>
      </Head>
      <div className='mb-2'>
        <Actions
          undo={undo}
          redo={redo}
          undoDisabled={!hasUndo}
          redoDisabled={!hasRedo}
        />
      </div>
      <div className=''>
        <Whiteboard
          points={points}
          addPoint={addPoint}
        />
      </div>
    </MainLayout>
  );
};

export default Puntos;
