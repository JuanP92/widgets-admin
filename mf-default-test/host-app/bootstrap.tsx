import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import '@learnbit/styling.config.tailwind/dist/globals.tailwind.css';

const root = document!.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(<App />);

export default App;
