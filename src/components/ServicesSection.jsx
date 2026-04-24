import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '💻',
    title: 'Website Development',
    desc: 'Custom websites built with modern technologies for optimal performance and scalability.'
  },
  {
    icon: '🛒',
    title: 'E-commerce Websites',
    desc: 'Full-featured online stores with secure payments, inventory management, and seamless UX.'
  },
  {
    icon: '🎨',
    title: 'Portfolio Websites',
    desc: 'Stunning portfolios that showcase your work with beautiful galleries and smooth navigation.'
  },
  {
    icon: '📄',
    title: 'Landing Pages',
    desc: 'High-converting landing pages designed to capture leads and maximize your ROI.'
  },
  {
    icon: '✨',
    title: 'UI/UX Design',
    desc: 'User-centered design that combines aesthetics with functionality for exceptional experiences.'
  },
  {
    icon: '🔧',
    title: 'Full Stack Web Apps',
    desc: 'End-to-end web applications with robust backends and intuitive frontends.'
  }
];

const ServicesSection = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.service-card');
    
    gsap.fromTo(cards,
      { opacity: 0, y: 60, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section className="section services" id="services" ref={sectionRef}>
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">
        Comprehensive web solutions tailored to elevate your business
      </p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            className="service-card" 
            key={index}
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <span className="service-icon">{service.icon}</span>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;