import React, { ReactNode } from 'react';
import MenuButton from './components/MenuButton';
import RecommendationsButton from './components/Recommendations/RecommendationsButton';
import TopNavBar from './components/TopNavBar';
import PushNotificationLayout  from './components/PushNotificationLayout'

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <PushNotificationLayout>
      <div className="h-screen ">
        <TopNavBar />
        <RecommendationsButton />
        <MenuButton />
        <main>{children}</main>
      </div>
    </PushNotificationLayout>
  );
};

export default Layout;
