import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce.js';
import { useUser } from '../store/useUser.js';

export const useAuth = () => {
  const debouncedAuth = useDebounce(false, 10);
  const [isAuth, setIsAuth] = useState(debouncedAuth);
  const { setUser } = useUser((state) => state);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo?.id) {
      setUser(userInfo);
      setIsAuth(() => true);
    }
  }, [setUser]);

  return { isAuth, setIsAuth };
};
