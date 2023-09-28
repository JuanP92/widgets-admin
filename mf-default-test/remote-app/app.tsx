/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export function RemoteApp({ version }: { version?: string }) {

  return (
    <div className="flex flex-col items-center justify-center py-2 bg-gray-50/50 min-h-screen w-full z-20">
      <h1 className="text-6xl font-bold">RemoteApp</h1>
    </div>
  );
}

RemoteApp.defaultProps = {
  version: "",
};

// export the app as default because dynamic imports returns the default export
export default RemoteApp;
