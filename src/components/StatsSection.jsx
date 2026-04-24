import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 50, suffix: '+', label: 'Websites Delivered' },
  { number: 45, suffix: '+', label: 'Happy Clients' },
  { number: 300, suffix: '%', label: 'Performance Improvement' },
  { number: 24, suffix: '/7', label: 'Support Availability' }
];

const StatsSection = () => {
  const sectionRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const statNumbers = sectionRef.current.querySelectorAll('.stat-number');
    
    gsap.fromTo(statNumbers,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => setHasAnimated(true),
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section className="section stats" id="stats" ref={sectionRef}>
      <h2 className="section-title">Our Impact</h2>
      <p className="section-subtitle">
        Numbers that speak for themselves
      </p>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-number">
              <Counter target={stat.number} hasAnimated={hasAnimated} />
              {stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Counter = ({ target, hasAnimated }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, hasAnimated]);

  return <>{count}</>;
};

export default StatsSection;