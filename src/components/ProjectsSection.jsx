import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'GlossAndGlowResin',
    problem: 'Client needed an elegant, high-performance storefront to showcase handcrafted resin art and simplify the ordering process for a D2C audience.',
    tech: ['HTML5', 'CSS3', 'JavaScript',],
    features: [
      'Interactive product gallery with custom filters',
      'Integrated WhatsApp ordering for personalized conversational commerce',
      'Responsive, mobile-first UI design',
      'Real-time inventory management',
      'Optimized image performance for high-fidelity art showcases'
    ],
    demoUrl: 'https://glossandglowresin.vercel.app/',
    icon: '🚀'
  },
  {
    name: 'Tourism Management System',
    problem: 'Required a centralized system to streamline travel bookings, itinerary management, and user inquiries for travel agencies.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    features: [
      'Automated booking and reservation system',
      'Dynamic itinerary management dashboard',
      'User-friendly search and filtering for travel packages',
      'Admin portal for managing inquiries and bookings',
      'Secure database architecture for client data'
    ],
    demoUrl: 'https://tourism-management-system.great-site.net/?i=1',
    icon: '✈️'
  },
  {
    name: 'Zerodha Trading Clone',
    problem: 'Recreated a complex, high-frequency trading interface to demonstrate expertise in financial data visualization and robust backend architecture.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Real-time stock portfolio tracking',
      'Dynamic charts and data visualization',
      'Order management system (Buy/Sell logic)',
      'Secure user authentication and dashboard',
      'Responsive design mirroring professional trading platforms'
    ],
    demoUrl: 'https://zerodha.com/', // Add your link here
    icon: '📈'
  },
  
];

const ProjectsSection = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(cards,
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
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
    <section className="section projects" id="projects" ref={sectionRef}>
      <h2 className="section-title">Our Projects</h2>
      <p className="section-subtitle">
        Real results from real clients — deployed and live
      </p>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <span className="project-badge">LIVE PROJECT</span>
            <div className="project-image">
              {project.icon}
            </div>
            <div className="project-content">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-problem">{project.problem}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span className="tech-tag" key={i}>{tech}</span>
                ))}
              </div>
              <ul className="project-features">
                {project.features.slice(0, 3).map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="project-buttons">
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-project btn-demo"
                >
                  Live Demo
                </a>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;