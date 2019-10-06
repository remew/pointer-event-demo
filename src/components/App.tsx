import React, {useCallback, useRef, PointerEvent} from 'react';
import usePointerEventDemo from '../hooks/usePointerEventDemo';

const App: React.FC<{}> = () => {
  const {handlers, isDown, isHover, pressure} = usePointerEventDemo();
  const targetRef = useRef<HTMLDivElement>(null);
  const capture = useCallback((e: PointerEvent) => {
    if (!targetRef.current) {
      return;
    }
    targetRef.current.setPointerCapture(e.pointerId);
  }, []);
  const release = useCallback((e: PointerEvent) => {
    if (!targetRef.current) {
      return;
    }
    targetRef.current.releasePointerCapture(e.pointerId);
  }, []);
  return (
    <>
      <div className={'root'}>
        <main>
          <div className="buttons">
            <button onPointerDown={capture}>capture pointer event</button>
            <button onPointerDown={release}>release pointer event</button>
          </div>
          <div {...handlers} className={'pointer-area'}>
            <div className={'inner-item'} />
          </div>
          <div className={'pointer-state'}>
            <ul>
              <li>pressure:{pressure}</li>
              <li>hover:{String(isHover)}</li>
              <li>press:{String(isDown)}</li>
            </ul>
          </div>
        </main>
      </div>
      <style jsx>{`
        .root {
          font-size: 200%;
          display: flex;
          width: 100%;
          height: 100%;
          background-color: #424242;
        }
        main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        button {
          padding: 1em;
        }
        .pointer-area {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 640px;
          height: 480px;
          background-color: #fff;
          position: relative;
        }
        .pointer-area:before {
          display: block;
          content: 'pointer area';
          position: absolute;
          top: 0;
          left: 0;
        }
        .pointer-area .inner-item {
          position: relative;
          width: 320px;
          height: 240px;
          background-color: #ccc;
        }
        .pointer-area .inner-item:before {
          display: block;
          content: 'inner item';
          position: absolute;
          top: 0;
          left: 0;
        }
        .pointer-state {
          background-color: #fff;
        }
        .pointer-state ul {
          width: 640px;
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .pointer-state li {
          flex: 1;
          padding: 1em;
        }
      `}</style>
    </>
  );
};

export default App;
