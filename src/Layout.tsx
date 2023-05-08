import React, { ReactNode } from 'react';
import MenuButton from './components/MenuButton';
import RecommendationsButton from './components/Recommendations/RecommendationsButton';
import TopNavBar from './components/TopNavBar';

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen ">
      <TopNavBar />
      <RecommendationsButton />
      <MenuButton />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
