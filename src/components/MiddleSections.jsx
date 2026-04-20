import React from 'react';

export const PricingActions = () => (
    <div className="content-padding">
        <div className="price-section">
            <div className="price">
                <span className="currency">€</span>69,<span className="cents">90</span>
            </div>
        </div>
    </div>
);

export const PurchasingOptions = ({ onOpenReturnModal, onOpenTechModal }) => (
    <div className="content-padding pt-0">
        <div className="delivery-options card">
            <div className="option-header">
                <i className="fa-solid fa-store"></i>
                <h3>Levanta na loja</h3>
            </div>
            <div className="option-item">
                <div className="item-details">
                    <span className="time">Em <strong>15 minutos</strong></span>
                </div>
                <span className="tag-green">Grátis</span>
            </div>

            <div className="option-header mt-4">
                <i className="fa-solid fa-truck"></i>
                <h3>Recebe em casa</h3>
            </div>
            <div className="option-item">
                <div className="item-details">
                    <span className="time">Em <strong>1 a 2 dias úteis</strong></span>
                </div>
                <span className="tag-green">Grátis</span>
            </div>
            <div className="option-item mt-2">
                <div className="item-details">
                    <span className="time">Em <strong>2 horas</strong></span>
                </div>
                <span className="tag-price">€5,99</span>
            </div>
        </div>



        <div className="seller-card">

            <div className="seller-info">
                Vendido por <strong className="worten-red-text">worten</strong>
            </div>
            <div className="return-policy">
                <div className="policy-text">
                    <h4>Devolução grátis até 14 dias numa loja Worten</h4>
                    <p>Adere grátis ao Worten Life e tens até 30 dias para devolver</p>
                    <button className="link bg-transparent border-none p-0 cursor-pointer" onClick={onOpenReturnModal}>Saber mais</button>
                </div>
            </div>
            <div className="other-offers pt-0">

                <h3>Ver outras ofertas</h3>
                <p>Vendido por <a href="#" className="link-dark underline">+38 vendedores</a> desde <strong>€153,73</strong></p>
            </div>
        </div>

        <div className="payment-card border-tb">
            <div className="universo-logo">
                <strong><span style={{color:'#1e3a8a'}}>u</span>niverso.</strong>
            </div>
            <div className="payment-flex">
                <div className="payment-info">
                    <h4>Paga em prestações desde</h4>
                    <p><span className="red-text">€50,00/mês</span> em 4 meses sem juros</p>
                </div>
                <button className="btn-outline-red">SABE MAIS</button>
            </div>
        </div>

        <div className="accordion-section border-tb mt-0" style={{marginTop: "16px"}}>
            <div className="accordion-header cursor-pointer" onClick={onOpenTechModal}>
                <i className="fa-solid fa-braille"></i>
                <h3>Características técnicas</h3>
                <i className="fa-solid fa-chevron-right ml-auto"></i>
            </div>
        </div>
    </div>
);

const reviewsData = [
    { id: 1, name: "Anónimo", stars: 5, date: "há 7 dias", text: "Estou satisfeita com o produto", verified: true },
    { id: 2, name: "Ermelinda", stars: 5, date: "há 18 dias", title: "2 gavetas e multifunções.", text: "Comprei este produto há umas semanas já usei algumas vezes e estou muito satisfeito.", verified: true, recommend: true },
    { id: 3, name: "João Silva", stars: 5, date: "há 1 mês", text: "Excelente fritadeira! O cesto duplo é uma maravilha para fazer frango e batatas ao mesmo tempo.", verified: true, recommend: true },
    { id: 4, name: "Maria Santos", stars: 5, date: "há 1 mês", text: "Muito prática e fácil de limpar. Recomendo vivamente.", verified: true, recommend: true },
    { id: 5, name: "Hélder P.", stars: 4, date: "há 2 meses", text: "Design moderno e funcional. A comida fica estaladiça sem o óleo.", verified: true },
    { id: 6, name: "Ana Costa", stars: 4, date: "há 2 meses", text: "Um pouco grande para a minha bancada, mas compensa imenso no dia a dia.", verified: true },
    { id: 7, name: "Carlos R.", stars: 5, date: "há 3 meses", text: "A melhor compra que fiz este ano. Poupa imenso tempo nas refeições.", verified: true, recommend: true },
    { id: 8, name: "Sofia L.", stars: 5, date: "há 3 meses", text: "Silenciosa e eficiente. As funcionalidades digitais são muito intuitivas.", verified: true, recommend: true },
    { id: 9, name: "Paulo Ferreira", stars: 5, date: "há 4 meses", text: "A capacidade de 9L é perfeita para famílias grandes.", verified: true, recommend: true },
    { id: 10, name: "Marta B.", stars: 4, date: "há 4 meses", text: "Cumpre o que promete. As batatas fritas ficam ótimas.", verified: true },
    { id: 11, name: "Ricardo G.", stars: 5, date: "há 5 meses", text: "Qualidade de construção impecável. Philips é sempre uma garantia.", verified: true, recommend: true },
    { id: 12, name: "Luísa F.", stars: 5, date: "há 5 meses", text: "Adoro a cor cobre, fica lindíssima na cozinha.", verified: true, recommend: true },
    { id: 13, name: "Tiago M.", stars: 3, date: "há 6 meses", text: "Funciona bem, mas achei o manual de instruções um pouco confuso.", verified: true },
    { id: 14, name: "Beatriz S.", stars: 5, date: "há 6 meses", text: "Perfeita! Faço tudo nela, desde bolos a assados.", verified: true, recommend: true },
    { id: 15, name: "Jorge N.", stars: 4, date: "há 7 meses", text: "Muito boa, mas consome um pouco mais de energia do que esperava.", verified: true }
];

export const ReviewsSection = () => {
    const [visibleCount, setVisibleCount] = React.useState(3);
    const trackRef = React.useRef(null);

    const scroll = (direction) => {
        if (trackRef.current) {
            const scrollAmount = 280; // Approximately 2 items
            trackRef.current.scrollBy({ 
                left: direction === 'next' ? scrollAmount : -scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    return (
        <div className="content-padding mt-2 mb-large bg-white">
            <div className="reviews-section">
                <h2>Avaliações</h2>
                
                <p className="review-resume-title">Resumo das avaliações</p>
                <p className="review-subtitle">Seleciona uma linha abaixo para filtrar as avaliações.</p>

                <div className="rating-bars">
                    {[
                        { stars: 5, pct: 80, count: 267 },
                        { stars: 4, pct: 20, count: 49 },
                        { stars: 3, pct: 5, count: 10 },
                        { stars: 2, pct: 2, count: 4 },
                        { stars: 1, pct: 3, count: 8 }
                    ].map((row) => (
                        <div className="bar-row" key={row.stars}>
                            <span className="star-label">{row.stars} estrela{row.stars > 1 ? 's' : ''}</span>
                            <div className="bar-container"><div className="bar-fill" style={{width: `${row.pct}%`}}></div></div>
                            <span className="bar-count">{row.count}</span>
                        </div>
                    ))}
                </div>

                <p className="review-resume-title mt-4">Avaliação global</p>
                <div className="global-rating">
                    <div className="big-score">4.7</div>
                    <div className="score-details">
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <a href="#" className="link-dark underline">338 avaliações</a>
                    </div>
                </div>
                
                <p className="recommend-text">193 de 206 (94%) clientes recomendam este produto</p>

                <div className="feature-ratings">
                    <p>Classificação média dos clientes</p>
                    
                    <div className="feature-row">
                        <span>Funcionalidades</span>
                        <div className="feature-bars">
                            <div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar half-filled"></div>
                        </div>
                        <span className="f-score">4.7</span>
                    </div>
                    
                    <div className="feature-row">
                        <span>Qualidade</span>
                        <div className="feature-bars">
                            <div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar half-filled"></div>
                        </div>
                        <span className="f-score">4.7</span>
                    </div>
                    
                    <div className="feature-row">
                        <span>Relação preço/qualidade</span>
                        <div className="feature-bars">
                            <div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar filled"></div><div className="f-bar partial-filled"></div>
                        </div>
                        <span className="f-score">4.4</span>
                    </div>
                </div>

                <h4 className="gallery-title">Imagens e vídeos de clientes</h4>
                <div className="reviews-carousel-wrapper">
                    <button className="nav-arrow reviews-prev" onClick={() => scroll('prev')}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <div className="client-gallery reviews-carousel" ref={trackRef}>
                        {[...Array(18)].map((_, i) => (
                            <div className="review-carousel-item" key={i}>
                                <img src={`/av${i + 1}.jpg`} alt={`Review client ${i + 1}`} />
                            </div>
                        ))}
                        <div className="review-carousel-item">
                            <img src="/19.jpg" alt="Review client 19" />
                        </div>
                        <div className="review-carousel-item">
                            <img src="/20.jpg" alt="Review client 20" />
                        </div>
                    </div>
                    <button className="nav-arrow reviews-next" onClick={() => scroll('next')}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>

                <div className="filter-section">
                    <p>Filtrar avaliações</p>
                    <div className="search-input">
                        <input type="text" placeholder="Pesquisar tópicos e avaliações" />
                        <i className="fa-solid fa-search"></i>
                    </div>
                    
                    <div className="filter-buttons">
                        <button className="btn-filter"><i className="fa-solid fa-sliders"></i> Filtros</button>
                        <button className="btn-filter sort-btn"><i className="fa-solid fa-arrow-down-up-across-line"></i> Ordenar por Idioma <i className="fa-solid fa-info-circle info-top"></i></button>
                    </div>
                    
                    <p className="review-count">1 - 5 de 338 avaliações</p>
                </div>

                <div className="review-list">
                    {reviewsData.slice(0, visibleCount).map((review) => (
                        <React.Fragment key={review.id}>
                            <div className="review-item">
                                <div className="stars small mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fa-solid fa-star ${i < review.stars ? '' : 'text-gray'}`}></i>
                                    ))}
                                </div>
                                {review.title && <h4 className="review-title">{review.title}</h4>}
                                <h4 className="reviewer-name red-text">{review.name}</h4>
                                {review.verified && (
                                    <div className="verified-purchase">
                                        <i className="fa-solid fa-check-circle green-text"></i> <span className="light-text">COMPRA VERIFICADA</span>
                                    </div>
                                )}
                                <p className="review-date">{review.date}</p>
                                <p className="review-text">{review.text}</p>
                                {review.recommend && (
                                    <div className="recommendation">
                                        <i className="fa-solid fa-check-circle"></i> Sim, Recomendo este produto.
                                    </div>
                                )}
                            </div>
                            <hr className="divider" />
                        </React.Fragment>
                    ))}
                </div>

                {visibleCount < reviewsData.length && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button className="btn-show-more" onClick={() => setVisibleCount(v => v + 5)}>
                            VER MAIS AVALIAÇÕES
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
