import { KeyboardEvent, useState } from 'react';

interface AccordionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleAccordion();
    }
  };

  return (
    <div className="border rounded-lg mb-4">
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer focus:outline-none"
        onClick={toggleAccordion}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        <h2 className="text-lg font-semibold">{title}</h2>

        <svg
          className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
          />
        </svg>
      </div>

      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
}
