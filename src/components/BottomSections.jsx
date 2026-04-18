import React, { useState } from 'react';

export const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isChecked && email) {
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="newsletter-section" style={{textAlign: 'center', padding: '40px 16px'}}>
                <i className="fa-solid fa-circle-check" style={{fontSize: '3rem', marginBottom: '16px'}}></i>
                <h2 style={{fontSize: '1.4rem'}}>Obrigado! O seu e-mail foi enviado com sucesso.</h2>
                <p style={{marginTop: '10px', opacity: 0.9}}>Fique atento às nossas novidades.</p>
                <button 
                    onClick={() => setIsSubmitted(false)}
                    style={{marginTop: '20px', background: 'white', color: 'var(--worten-red)', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 700}}
                >
                    VOLTAR
                </button>
            </div>
        );
    }

    return (
        <div className="newsletter-section">
            <h2>Recebe todas as novidades e promoções no teu email e aproveita 10€ desconto* na primeira subscrição</h2>
            <p className="newsletter-disclaimer">* em compras acima de 50€. Não acumulável com outras promoções.</p>
            
            <form className="newsletter-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="O teu e-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={!isChecked} style={{opacity: isChecked ? 1 : 0.5}}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </form>

            <label className="newsletter-checkbox">
                <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
                <span>Li e tomei conhecimento sobre a informação relativa ao <a href="#">Tratamento de Dados Pessoais</a></span>
            </label>
        </div>
    );
};

export const Footer = () => (
    <footer className="dark-footer">
        <div className="footer-top-presence">
            <div className="footer-logo-block">
                <img src="/app-worten.svg" alt="Worten App" style={{width: "40px"}} />
            </div>
            <div className="footer-presence-text">
                <h3>APP Worten</h3>
                <p>A loja sempre presente.</p>
            </div>
        </div>

        <div className="footer-accordion">
            <div className="f-accordion-item">
                <div className="f-left"><i className="fa-solid fa-location-dot text-red"></i> LOJAS WORTEN</div>
            </div>
            <div className="f-accordion-item">
                <div className="f-left"><i className="fa-regular fa-comment-dots text-red"></i> FALA CONNOSCO</div>
            </div>
            <div className="f-accordion-item">
                <div className="f-left"><i className="fa-solid fa-list text-red"></i> DICAS E NOVIDADES</div>
            </div>

            <div className="f-accordion-item">
                <span>Apoio ao Cliente</span><i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="f-accordion-item">
                <span>Institucional</span><i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="f-accordion-item">
                <span>Links Úteis</span><i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="f-accordion-item">
                <span>Marketplace</span><i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="f-accordion-item">
                <span>Eventos</span><i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="f-accordion-item">
                <span>Legal</span><i className="fa-solid fa-chevron-down"></i>
            </div>
        </div>

        <div className="footer-social">
            <p>Estamos onde tu estás.</p>
            <div className="social-icons">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-x-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-twitch"></i>
                <i className="fa-brands fa-youtube"></i>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="footer-links">
                <span>Reportar Conteúdos ou Produtos</span>
                <span>Exercicio de Direitos e Stop SMS</span>
                <span>Livro de Reclamações</span>
            </div>
            <p className="footer-copyright">
                © WORTEN - EQUIPAMENTOS PARA O LAR, S.A., com sede em Lugar do Espido, Via Norte, Edifício 2D, 4470-179 Maia, pessoa coletiva nº 503 630 330, que é também o seu número de matrícula na Conservatória do Registo Comercial do Porto, com o capital social de 21.530.000€.
            </p>
            <div className="footer-badges">
                <img src="/escolha-do-consumidor.webp" alt="Escolha do consumidor" />
                <img src="/marca-de-confianca.webp" alt="Marca de Confiança" />
                <img src="/great-place-to-work.webp" alt="Great Place To Work" />
                
                <div className="acepi">
                    <img src="/acepi.webp" alt="ACEPI" />
                </div>
            </div>
        </div>
    </footer>
);
