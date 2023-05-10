import React, { useEffect, useRef } from 'react';

interface SectionProps {
  html: string;
  sectionNumber: number;
  id: string;
}

const Section: React.FC<SectionProps> = ({ html, sectionNumber, id }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.getElementsByTagName('section');
    if (sections.length >= sectionNumber) {
      const targetSection = sections[sectionNumber - 1];
      if (sectionRef.current && targetSection.nextSibling) {
        targetSection.parentNode?.insertBefore(sectionRef.current, targetSection.nextSibling);
      }
    }
  }, [sectionNumber]);

  return <section
    id={id}
    className="max-w-6xl mx-auto sm:px-6 lg:px-8"
    ref={sectionRef}
    dangerouslySetInnerHTML={{ __html: html }}
  >
  </section>
}

export default Section;
