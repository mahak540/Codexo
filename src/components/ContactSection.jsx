import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const formElements = sectionRef.current.querySelectorAll('.contact-form > *');
    
    gsap.fromTo(formElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
/*
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };*/
const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const { name, email, message } = formData;

  let whatsappMessage = `*New Message*\n\n`;
  whatsappMessage += `*Name:* ${name}\n`;
  whatsappMessage += `*Email:* ${email}\n`;
  whatsappMessage += `*Message:* ${message}`;

  const phoneNumber = "919779217061"; // your number
  const encodedMessage = encodeURIComponent(whatsappMessage);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

  setFormData({ name: '', email: '', message: '' });
  setIsSubmitting(false);
};
  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="section-title">Let's Build Something Amazing</h2>
        <p className="section-subtitle">
          Ready to transform your digital presence? Get in touch!
        </p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              required
            />
          </div>
          
          <div className="contact-cta">
            <p className="contact-cta-text">Let's Build Your Website</p>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            <div className="contact-options">
              <a href="https://wa.me/9779217061" className="contact-option" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp
              </a>
              <a href="mailto:mittalmehak121@gmail.com" className="contact-option">
                📧 mittalmehak121@gmail.com
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
