import { FC } from "react";
import { Outlet } from 'react-router-dom';
import Header from "../../components/Header/Header.tsx";

const BaseLayout: FC = () => {

  return (
    <div className="base">
      <div className="base__content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;