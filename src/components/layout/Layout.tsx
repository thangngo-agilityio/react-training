// Library
import { useContext } from 'react';
// Context
import { ToastContext } from 'context/toast';
// components
import Toast from '@components/common/toast/Toast';
import MainPage from '@components/Main/Main';

const Layout = () => {
  const { toast } = useContext(ToastContext);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <MainPage />
        </div>
      </div>

      <Toast message={toast.message} toastType={toast.toastType} isShow={toast.isVisible} />
    </>
  );
};

export default Layout;
