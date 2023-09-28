import React from 'react';
import '@learnbit/styling.config.tailwind/dist/globals.tailwind.css';

export function MyApp() {
  return (
    <iframe
      src="https://bit-mf-remote.netlify.app/"
      title="remote-app"
      className="w-96 h-96 bg-white"
      style={{ border: 'none' }}
    />
  );
}
