import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import React, { ReactNode, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: {
      height: isOpen ? contentRef.current?.scrollHeight ?? 0 : 0,
      opacity: isOpen ? 1 : 0,
    },
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mb-4 w-full overflow-hidden ${isOpen ? '' : 'w-0'} `}>
      <button
        className=" flex w-full flex-row justify-between border-b border-x border-pb-green px-4 py-3 text-left font-semibold text-gray-800 focus:outline-none"
        onClick={toggleAccordion}
      >
        {title}
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6" />
        ) : (
          <ChevronDownIcon className="h-6 w-6" />
        )}
      </button>
      <animated.div
        style={{
          height,
          opacity,
          overflow: 'hidden',
        }}
        ref={contentRef}
      >
        <div className={`overflow-hidden p-4 text-gray-600 bg-pb-gray/40 rounded-b-xl`}>{children}</div>
      </animated.div>
    </div>
  );
};

export default Accordion;
