import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset form states when modal opens/closes or tab changes
  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMessage('');
      setLoading(false);
      // Animate modal open
      const ctx = gsap.context(() => {
        gsap.to(backdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.fromTo(
          contentRef.current,
          { scale: 0.95, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' }
        );
      }, modalRef);
      return () => ctx.revert();
    }
  }, [isOpen, activeTab]);

  const handleClose = () => {
    // Animate modal close before calling onClose
    gsap.to(contentRef.current, {
      scale: 0.95,
      y: 20,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'signin') {
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const userName = email.split('@')[0];
        const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
        setSuccessMessage(`Welcome back, ${formattedName}!`);
        setTimeout(() => {
          onLogin({ name: formattedName, email });
          handleClose();
        }, 1200);
      }, 1500);
    } else if (activeTab === 'signup') {
      if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Account created successfully!');
        setTimeout(() => {
          onLogin({ name, email });
          handleClose();
        }, 1200);
      }, 1500);
    } else {
      // Forgot password
      if (!email) {
        setError('Please enter your email.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Password reset link sent to your email.');
        setTimeout(() => {
          setActiveTab('signin');
          setSuccessMessage('');
          setEmail('');
        }, 2000);
      }, 1200);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="auth-modal" id="auth-modal-root">
      <div
        ref={backdropRef}
        className="auth-modal__backdrop"
        onClick={handleOverlayClick}
      />
      <div ref={contentRef} className="auth-modal__content">
        <button className="auth-modal__close" onClick={handleClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {successMessage ? (
          <div className="auth-modal__success">
            <div className="auth-modal__success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="auth-modal__title">Success</h3>
            <p className="auth-modal__success-msg">{successMessage}</p>
          </div>
        ) : (
          <>
            <div className="auth-modal__header">
              {activeTab !== 'forgot' ? (
                <div className="auth-modal__tabs">
                  <button
                    className={`auth-modal__tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('signin');
                      setError('');
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className={`auth-modal__tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('signup');
                      setError('');
                    }}
                  >
                    Register
                  </button>
                </div>
              ) : (
                <h3 className="auth-modal__title">Reset Password</h3>
              )}
            </div>

            <form className="auth-modal__form" onSubmit={handleSubmit}>
              {error && <div className="auth-modal__error-box">{error}</div>}

              {activeTab === 'signup' && (
                <div className="auth-modal__input-group">
                  <input
                    type="text"
                    id="reg-name"
                    required
                    className="auth-modal__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                  />
                  <label htmlFor="reg-name" className="auth-modal__label">Full Name</label>
                </div>
              )}

              <div className="auth-modal__input-group">
                <input
                  type="email"
                  id="auth-email"
                  required
                  className="auth-modal__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                />
                <label htmlFor="auth-email" className="auth-modal__label">Email Address</label>
              </div>

              {activeTab !== 'forgot' && (
                <div className="auth-modal__input-group">
                  <input
                    type="password"
                    id="auth-password"
                    required
                    className="auth-modal__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                  />
                  <label htmlFor="auth-password" className="auth-modal__label">Password</label>
                </div>
              )}

              {activeTab === 'signin' && (
                <div className="auth-modal__forgot-trigger">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot');
                      setError('');
                    }}
                    className="auth-modal__link-btn"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="auth-modal__submit-btn"
              >
                {loading ? (
                  <span className="auth-modal__spinner" />
                ) : activeTab === 'signin' ? (
                  'Sign In'
                ) : activeTab === 'signup' ? (
                  'Create Account'
                ) : (
                  'Send Reset Link'
                )}
              </button>

              {activeTab === 'forgot' && (
                <div className="auth-modal__back-trigger">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signin');
                      setError('');
                    }}
                    className="auth-modal__link-btn"
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
