import {PointerEvent, PointerEventHandler, useCallback, useState} from 'react';

type Handlers = {
  onPointerDown: PointerEventHandler;
  onPointerMove: PointerEventHandler;
  onPointerUp: PointerEventHandler;
  onPointerEnter: PointerEventHandler;
  onPointerLeave: PointerEventHandler;
  onPointerOver: PointerEventHandler;
  onPointerOut: PointerEventHandler;
};

const usePointerEventDemo = (): {
  handlers: Handlers;
  isDown: boolean;
  isHover: boolean;
  pressure: number;
} => {
  const [isDown, setIsDown] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [pressure, setPressure] = useState(0);

  const logPointerEvent = useCallback((type: string, e: PointerEvent) => {
    const {pointerId, pointerType, isPrimary, pressure, width, height, tiltX, tiltY} = e;
    const {twist} = e as any;
    const logRow = [
      type,
      String(pointerId),
      pointerType,
      String(isPrimary),
      String(pressure),
      `${width},${height}`,
      `${tiltX},${tiltY}`,
      String(twist),
    ] as [string, string, string, string, string, string, string, string];
    console.log(logRow.join('|'));
  }, []);

  const onPointerDown = useCallback((e: PointerEvent) => {
    setIsDown(true);
    setPressure(e.pressure);
    logPointerEvent('down', e);
  }, []);
  const onPointerUp = useCallback((e: PointerEvent) => {
    setIsDown(false);
    setPressure(e.pressure);
    logPointerEvent('up', e);
  }, []);
  const onPointerEnter = useCallback((e: PointerEvent) => {
    setIsHover(true);
    setPressure(e.pressure);
    logPointerEvent('enter', e);
  }, []);
  const onPointerLeave = useCallback((e: PointerEvent) => {
    setIsHover(false);
    setPressure(e.pressure);
    logPointerEvent('leave', e);
  }, []);
  const onPointerOver = useCallback((e: PointerEvent) => {
    setPressure(e.pressure);
    logPointerEvent('over', e);
  }, []);
  const onPointerOut = useCallback((e: PointerEvent) => {
    setPressure(e.pressure);
    logPointerEvent('out', e);
  }, []);
  const onPointerMove = useCallback((e: PointerEvent) => {
    setPressure(e.pressure);
    logPointerEvent('move', e);
  }, []);

  return {
    handlers: {
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      onPointerOver,
      onPointerOut,
      onPointerMove,
    },
    isDown,
    isHover,
    pressure,
  };
};

export default usePointerEventDemo;
