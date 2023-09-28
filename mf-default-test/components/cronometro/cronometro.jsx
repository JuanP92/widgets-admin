import React from 'react';

export default function Cronometro() {
  const [time, setTime] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const intervalRef = React.useRef(0);
  const format = React.useMemo(() => {
    if (time === 0) {
      return '00:00';
    }
    const min = Math.floor(time / 60);
    const seg = Math.floor(time % 60);
    return `${min < 10 ? '0' : ''}${min}:${seg < 10 ? '0' : ''}${seg}`;
  }, [time]);

  React.useEffect(() => {
    if (start) {
      intervalRef.current = setInterval(() => {
        setTime((old) => old + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [start]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <h2
        style={{
          fontSize: 24,
        }}
      >
        {format}
      </h2>
      <div
        style={{
          display: 'flex',
          gap: 20,
        }}
      >
        {start ? (
          <button
            onClick={() => {
              setStart(false);
            }}
            type="button"
          >
            Pausa
          </button>
        ) : (
          <button
            onClick={() => {
              setStart(true);
            }}
            type="button"
          >
            Start
          </button>
        )}
        <button
          onClick={() => {
            setStart(false);
            setTime(0);
          }}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
