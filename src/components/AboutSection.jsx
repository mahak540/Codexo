import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll('.about-content > *');
    
    gsap.fromTo(elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <div className="about-content">
        <h2 className="section-title">About Codexo</h2>
        <p className="about-text">
  I am <strong>Mehak Mittal</strong>, a software engineer and web designer dedicated 
  to building the web, better. As the founder of <strong>Codexo</strong>, I bridge 
  the gap between aesthetic design and technical precision. We craft high-performance, 
  scalable digital solutions—from modern web applications to conversion-focused 
  eCommerce—that turn your vision into a powerful digital reality.
</p>
        <div className="about-features">
          <span className="feature-tag">🚀 Modern Web Apps</span>
          <span className="feature-tag">💎 eCommerce Solutions</span>
          <span className="feature-tag">🎨 UI/UX Design</span>
          <span className="feature-tag">⚡ Performance First</span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;