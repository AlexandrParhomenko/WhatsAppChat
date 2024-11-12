import { FC } from "react";
import { Outlet } from 'react-router-dom';
import styles from './BaseLayout.module.scss'
import Header from "../../components/Header/Header.tsx";

const BaseLayout: FC = () => {

  return (
    <div className={styles.base}>
      <div className={styles.base__content}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;