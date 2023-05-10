import React, { useEffect, useRef } from 'react';

interface SectionProps {
  html: string;
  sectionNumber: number;
  id: string;
}

const Section: React.FC<SectionProps> = ({ html, sectionNumber, id }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const extraDescriptionSection = document.getElementById('extra-description');
  if (extraDescriptionSection && sectionRef.current) {
    extraDescriptionSection.appendChild(sectionRef.current);
  }
  }, [sectionNumber]);

  return <div
    id={id}
    className="py-10 sm:py-16 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8"
    ref={sectionRef}
    dangerouslySetInnerHTML={{ __html: html }}
  >
  </div>
}

export default Section;