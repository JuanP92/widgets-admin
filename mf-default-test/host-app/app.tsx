import React, { Suspense } from 'react';
import { AuthSkeleton } from '@learnbit-react/mf-demo.ui.auth-skeleton';

let RemoteApp: any = null;

try {
  // @ts-ignore @bit-ignore - ignore the missing module as it's a remote component
  RemoteApp = React.lazy(() => import('widgets/widgets'));
} catch (e) {
  RemoteApp = () => <div>Module not found</div>;
}

const App = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative bg-white">
      <h1 className="text-6xl font-bold">Welcome!</h1>
      <div className="inset-0 z-10 overflow-y-auto w-full h-full bg-gray-200 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-2 bg-gray-50/50 min-h-screen w-full z-20">
              <AuthSkeleton />
            </div>
          }
        >
          <RemoteApp />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
