import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from('.contact__title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Subtitle entrance
      gsap.from('.contact__subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Form column entrance
      gsap.from('.contact__form-col', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Info column entrance
      gsap.from('.contact__info-col', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.comment.trim()) {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', comment: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact__inner container">
        <h2 className="contact__title">CONTACT</h2>
        <p className="contact__subtitle">
          Have a question or comment?<br />
          Use the form below to send us a message or contact us by mail at: <a href="mailto:tanushreekakulte11@gmail.com" className="contact__email-link">tanushreekakulte11@gmail.com</a>
        </p>

        <div className="contact__grid">
          {/* Left — Contact Form */}
          <div className="contact__form-col">
            <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="contact__input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-phone">Phone Number</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  className="contact__input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">
                  Email <span className="contact__required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className="contact__input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-comment">
                  Comment <span className="contact__required">*</span>
                </label>
                <textarea
                  id="contact-comment"
                  name="comment"
                  className="contact__textarea"
                  rows={6}
                  value={formData.comment}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact__submit-btn"
                id="contact-submit"
              >
                {submitted ? '✓ Message Sent!' : 'SUBMIT CONTACT'}
              </button>
            </form>
          </div>

          {/* Right — Get in Touch Info */}
          <div className="contact__info-col">
            <h3 className="contact__info-title">Get in Touch!</h3>
            <p className="contact__info-text">
              We'd love to hear from you — please use the form to send us your message or ideas.
            </p>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 4L12 13L2 4"/>
                </svg>
              </div>
              <a href="mailto:tanushreekakulte11@gmail.com" className="contact__info-link">
                tanushreekakulte11@gmail.com
              </a>
            </div>

            <div className="contact__info-block">
              <p className="contact__info-label">Address :</p>
              <p className="contact__info-address">
                Harsul, Aditya Nagar,<br />
                Chhatrapati Sambhajinagar 431001,<br />
                Maharashtra, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
