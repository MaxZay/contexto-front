import { lazy, Suspense } from 'react';
import './global.css';
import { useAuth } from './hooks/useAuth.js';
import { createPortal } from 'react-dom';
import Loader from './uikit/conponents/Loader/Loader.jsx';
import { Route, Routes } from 'react-router-dom';

const AuthModal = lazy(() =>
  import('./modules/Auth/components/AuthModal/AuthModal.jsx')
);

const SinglePlayGame = lazy(() =>
  import('./modules/Game/components/SinglePlayGame/SinglePlayGame.jsx')
);

const MultiplayerGame = lazy(() =>
  import('./modules/Multiplayer/components/MultiplayerGame/MultiplayerGame.jsx')
);

function App() {
  const { isAuth, setIsAuth } = useAuth();

  const closeModal = () => setIsAuth(true);

  return (
    <main>
      <Suspense fallback={<Loader />}>
        {isAuth ? (
          <Routes>
            <Route path={'/'} element={<SinglePlayGame />} />
            <Route path={'/rooms/:id'} element={<MultiplayerGame />} />
          </Routes>
        ) : (
          createPortal(<AuthModal closeModal={closeModal} />, document.body)
        )}
      </Suspense>
    </main>
  );
}

export default App;
