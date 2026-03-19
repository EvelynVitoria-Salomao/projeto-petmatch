import React from 'react';
import iconLogo from '../assets/icon-logo.png';
import iconInstagram from '../assets/icon-instagram.png';
import iconWhats from '../assets/icon-whats.png';
import iconMail from '../assets/icon-mail.png';
import iconYoutube from '../assets/icon-youtube.png';

const footerStyles = `
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 24px;
    text-align: center;
  }
  .footer-logo  { display: flex; justify-content: center; }
  .footer-text  { display: flex; justify-content: center; order: 3; }
  .footer-icons { display: flex; justify-content: center; gap: 24px; align-items: center; order: 2; }

  @media (min-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0;
    }
    .footer-logo  { justify-content: flex-start; order: 1; }
    .footer-text  { justify-content: center;     order: 2; }
    .footer-icons { justify-content: flex-end;   order: 3; }
  }
`;

const Footer = () => {
  return (
    <>
      <style>{footerStyles}</style>
      <footer style={{
        backgroundColor: '#27607B',
        color: 'white',
        width: '100%',
        marginTop: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '32px 24px',
          boxSizing: 'border-box'
        }}>
          <div className="footer-grid">

            {/* Logo */}
            <div className="footer-logo">
              <img
                src={iconLogo}
                alt="Logo Pet Match"
                style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Texto */}
            <div className="footer-text">
              <p style={{
                color: '#E5B300',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textAlign: 'center',
                margin: 0
              }}>
                desenvolvido por DevSquad 2026
              </p>
            </div>

            {/* Ícones */}
<div className="footer-icons">
  <a href="#"
    style={{ transition: 'transform 0.2s', display: 'inline-flex' }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src={iconInstagram} alt="Instagram" style={{ width: '28px', height: '28px' }} />
  </a>
  <a href="#"
    style={{ transition: 'transform 0.2s', display: 'inline-flex' }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src={iconWhats} alt="WhatsApp" style={{ width: '28px', height: '28px' }} />
  </a>
  <a href="#"
    style={{ transition: 'transform 0.2s', display: 'inline-flex' }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src={iconMail} alt="E-mail" style={{ width: '28px', height: '28px' }} />
  </a>
  <a href="#"
    style={{ transition: 'transform 0.2s', display: 'inline-flex' }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src={iconYoutube} alt="Youtube" style={{ width: '28px', height: '28px' }} />
  </a>
</div>

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;