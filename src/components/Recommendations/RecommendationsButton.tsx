import { useState } from 'react';
import RecommendationsModal from './RecommendationsModal';
import { Modal } from "flowbite-react";

const RecommendationsButton = () => {
  const [recommendationsOpened, setRecommendationsOpened] = useState(false);
  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="group/button fixed bottom-24 left-4 inline-flex h-14 w-auto items-center">
        <span className=" absolute z-20 flex h-full w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-2xl text-white">
          PB
        </span>
        <span
          onClick={() => setRecommendationsOpened(true)}
          className="relative z-10 ml-0 flex h-full w-0 cursor-pointer items-center overflow-hidden whitespace-nowrap rounded-full bg-pb-gray pl-14 text-black transition-all duration-300 ease-in-out group-hover/button:ml-2 group-hover/button:w-full group-hover:w-full group-hover/button:pr-4"
        >
          Find your buddy
        </span>
      </div>
      <Modal
        show={true}
      >
        <Modal.Header>
          Terms of Service
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RecommendationsButton;
