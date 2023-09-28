import React from 'react';
import '@learnbit/styling.config.tailwind/dist/globals.tailwind.css';

export function MyApp() {
  return (
    <iframe
      src="https://bit-mf-host.netlify.app/"
      title="host-app"
      className="w-96 h-96 bg-white"
      style={{ border: 'none' }}
    />
  );
}
