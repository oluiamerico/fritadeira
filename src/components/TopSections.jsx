import React from 'react';

export const Header = ({ onNavigate }) => (
    <header className="header">
        <div className="header-content">
            <button className="menu-btn"><i className="fa-solid fa-bars"></i></button>
            <div className="logo" onClick={() => onNavigate('product')} style={{cursor: 'pointer'}}><strong>worten</strong></div>
            <div className="header-actions">
                <button className="user-btn">
                    <i className="fa-regular fa-user"></i>
                    <span className="user-badge"><i className="fa-solid fa-xmark"></i></span>
                </button>
                <button className="cart-btn" onClick={() => onNavigate('cart')}><i className="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
    </header>
);

export const ProductCore = () => {
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const trackRef = React.useRef(null);

    const handleScroll = () => {
        if (trackRef.current) {
            const width = trackRef.current.clientWidth;
            const scrollLeft = trackRef.current.scrollLeft;
            const index = Math.round(scrollLeft / width) + 1;
            setCurrentIndex(index);
        }
    };

    const prevSlide = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: -trackRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const nextSlide = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: trackRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const images = ['/fritadeira1.webp', '/fritadeira2.webp', '/fritadeira3.webp', '/fritadeira4.webp', '/fritadeira5.webp'];

    return (
        <div className="content-padding bg-white">
            <div className="breadcrumb">
                Ver Loja <span>PHILIPS</span>
            </div>

            <h1 className="product-title">Fritadeira sem Óleo PHILIPS NA352/00 Dua Serie 3000 (9 L - Cinzento-carvão/Cobre)</h1>

            <div className="rating-summary">
                <span className="rating-value">4.7</span>
                <div className="stars">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <span className="rating-count">(338 avaliações do produto)</span>
            </div>

            <div className="product-gallery">
                <div className="image-wrapper">
                    <div className="carousel-track" ref={trackRef} onScroll={handleScroll}>
                        {images.map((img, i) => (
                            <div className="carousel-item" key={i}>
                                <img src={img} alt={`Fritadeira Philips ${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="carousel-indicator">
                    <button onClick={prevSlide} className="nav-arrow-btn">
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <span>{currentIndex} de 5</span>
                    <button onClick={nextSlide} className="nav-arrow-btn">
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
                <div className="top-sales-banner">
                    <div className="banner-text">🔥 Top Vendas do Mês!</div>
                </div>
            </div>
        </div>
    );
};

export const ExpertHighlights = () => (
    <div className="content-padding bg-white pt-0">
        <div className="expert-highlight">
            <div className="expert-badge">
                <i className="fa-regular fa-thumbs-up"></i>
                <span>worten<br/>recomenda</span>
            </div>
            <div className="expert-content">
                <h3>Os nossos especialistas destacam:</h3>
                <div className="expert-item">
                    <i className="fa-solid fa-check"></i>
                    <span>9L de Grande Capacidade</span>
                </div>
                <div className="expert-item">
                    <i className="fa-solid fa-check"></i>
                    <span>Sincronização para que Ambos Os Cestos Terminem ao Mesmo Tempo</span>
                </div>
                <div className="expert-item">
                    <i className="fa-solid fa-check"></i>
                    <span>Peças Próprias para Máquina de Lavar Louça</span>
                </div>
            </div>
        </div>
    </div>
);
