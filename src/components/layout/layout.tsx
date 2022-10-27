import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
