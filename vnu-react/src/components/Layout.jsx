import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../blocks/Header/Header';
import Footer from '../blocks/Footer/Footer';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const lang = pathname.split('/');
  const excludedPaths = ['/en/', '/uk/'];
  return (
    <>
      <Header />
      {lang.length > 2 && (pathname !== excludedPaths[0] && pathname !== excludedPaths[1]) && <Breadcrumbs />}
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
