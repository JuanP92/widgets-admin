/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { Cronometro } from '@personal-micro-front/mf-default-test.components.cronometro';

let Cronometro: any = null;

try {
  Cronometro = React.lazy(
    () => import('@personal-micro-front/mf-default-test.components.cronometro')
  );
} catch (e) {
  Cronometro = () => <div>Module not found</div>;
}

export function RemoteApp({ version }: { version?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-2 bg-gray-50/50 min-h-screen w-full z-20">
      <h1 className="text-6xl font-bold">RemoteApp</h1>
      <React.Suspense fallback={<label>Loading...</label>}>
        <Cronometro />
      </React.Suspense>
    </div>
  );
}

RemoteApp.defaultProps = {
  version: '',
};

// export the app as default because dynamic imports returns the default export
export default RemoteApp;
