// Library
import { useContext } from 'react';

// Context
import { ToastContext } from 'context/toast';

// components
import { Main, Toast } from '..';

const Layout = () => {
  const { toast } = useContext(ToastContext);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Main />
        </div>
      </div>

      <Toast message={toast.message} toastType={toast.toastType} isShow={toast.isVisible} />
    </>
  );
};

export default Layout;
