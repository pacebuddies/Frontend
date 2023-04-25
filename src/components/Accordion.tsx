// Accordion.tsx
import React, { useState, useRef, ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';

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
      height: isOpen ? (contentRef.current?.scrollHeight || 0) : 0,
      opacity: isOpen ? 1 : 0,
    },
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <button
        className="w-full text-left py-3 px-4 bg-gray-200 text-gray-800 font-semibold focus:outline-none"
        onClick={toggleAccordion}
      >
        {title}
      </button>
      <animated.div
        style={{
          height,
          opacity,
          overflow: 'hidden',
        }}
        ref={contentRef}
      >
        <div className="p-4 text-gray-600 overflow-hidden">{children}</div>
      </animated.div>
    </div>
  );
};

export default Accordion;
