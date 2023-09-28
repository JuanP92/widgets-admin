import React from 'react';

export function Cronometro() {
  const [time, setTime] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const intervalRef = React.useRef(0);

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
      }}
    >
      <h2>{time}</h2>
      <div
        style={{
          display: 'flex',
          gap: 10,
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
