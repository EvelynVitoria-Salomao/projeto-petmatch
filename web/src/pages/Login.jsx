import React from "react";
import { useNavigate } from "react-router-dom";
import imgPatinhas from "../assets/patinhas-verdes.png";
import imgLoginCachorro from "../assets/dog-computador.png";
import logoLogin from "../assets/logo-login.png";


const loginStyles = `
  .login-page {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    padding: 16px;
    position: relative;
    overflow: hidden;
  }

  .login-patinhas {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 90%;
    width: auto;
    opacity: 1;
    pointer-events: none;
    z-index: 1;
  }

  .login-card {
    position: relative;
    z-index: 10;
    background: white;
    width: 100%;
    max-width: 900px;
    border-radius: 30px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .login-form-col {
    width: 100%;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-form-inner {
    width: 100%;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .login-image-col {
    background-color: #F8D849;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    min-height: 200px;
  }

  @media (min-width: 768px) {
    .login-patinhas { display: block; }
    .login-card { flex-direction: row; min-height: 0; }
    .login-form-col { width: 50%; padding: 40px 48px; align-items: flex-start; }
    .login-image-col { width: 50%; min-height: 0; padding: 40px; }
  }

  @media (max-width: 767px) {
    .login-patinhas { display: none; }
    .login-page { background-color: white; padding: 8px; }
    .login-card { box-shadow: none; border-radius: 0; }
    .login-image-col { border-radius: 20px; margin: 0 8px 12px; }
    .login-form-col { padding: 15px 1px; }
  }
`;

const inputStyle = {
  width: '100%',
  border: '1px solid #EE8133',
  borderRadius: '999px',
  padding: '12px 22px',
  fontSize: '13px',
  color: '#EE8133',
  outline: 'none',
  boxSizing: 'border-box'
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{loginStyles}</style>
      <div className="login-page">

        <img src={imgPatinhas} alt="" className="login-patinhas" />

        <div className="login-card">

          {/* COLUNA ESQUERDA — Formulário */}
          <div className="login-form-col">
            <div className="login-form-inner">

              <img
                src={logoLogin}
                alt="Pet Match Logo"
                style={{ height: '55px', width: 'auto', objectFit: 'contain', marginBottom: '10px' }}
              />

              <h2 style={{
                color: '#EE8133',
                fontSize: '11px',
                marginBottom: '20px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
                Realize seu login
              </h2>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>

                <input type="email" placeholder="e-mail:" style={inputStyle} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <input type="password" placeholder="senha:" style={inputStyle} />
                  <a href="#" style={{ fontSize: '10px', color: '#999', textAlign: 'right', paddingRight: '8px', textDecoration: 'none' }}>
                    Esqueci minha senha
                  </a>
                </div>

                <button type="submit" style={{
                  width: '100%',
                  backgroundColor: '#EE8133',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '999px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  Login
                </button>

                <button type="button" style={{
                  width: '100%',
                  backgroundColor: '#DB4437',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '999px',
                  fontWeight: '600',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '16px', fontWeight: '900', lineHeight: 1 }}>G</span>
                  Google
                </button>

              </div>

              {/* TODO: conectar navigate('/') quando a home estiver pronta */}
              <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => navigate("/")} style={{
                  background: 'none', border: 'none', color: '#999',
                  fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  ‹ Voltar
                </button>
              </div>

            </div>
          </div>

          {/* COLUNA DIREITA — Imagem amarela */}
          <div className="login-image-col">
            <img
              src={imgLoginCachorro}
              alt="Cachorro usando notebook"
              style={{ width: '100%', maxWidth: '340px', height: 'auto', objectFit: 'contain' }}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;