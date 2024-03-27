import { useLocation } from 'react-router-dom';

const useLanguagePrefix = () => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/');

  if (pathSegments.length >= 2) {
    return pathSegments[1];
  }

  return 'en';
};

export default useLanguagePrefix;
