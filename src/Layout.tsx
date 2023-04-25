import React, { ReactNode } from 'react';
import MenuButton from './components/MenuButton';
import RecommendationsButton from './components/Recommendations/RecommendationsButton';
import TopNavBar from './components/TopNavBar';
import { Footer } from "flowbite-react";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen">
      <TopNavBar />
      <RecommendationsButton />
      <MenuButton />
      <main>{children}</main>
      {/*<Footer container={true}>*/}
      {/*  <Footer.Copyright*/}
      {/*    href="#"*/}
      {/*    by="Flowbite™"*/}
      {/*    year={2022}*/}
      {/*  />*/}
      {/*  <Footer.LinkGroup>*/}
      {/*    <Footer.Link href="#">*/}
      {/*      About*/}
      {/*    </Footer.Link>*/}
      {/*    <Footer.Link href="#">*/}
      {/*      Privacy Policy*/}
      {/*    </Footer.Link>*/}
      {/*    <Footer.Link href="#">*/}
      {/*      Licensing*/}
      {/*    </Footer.Link>*/}
      {/*    <Footer.Link href="#">*/}
      {/*      Contact*/}
      {/*    </Footer.Link>*/}
      {/*  </Footer.LinkGroup>*/}
      {/*</Footer>*/}
    </div>
  );
};

export default Layout;
