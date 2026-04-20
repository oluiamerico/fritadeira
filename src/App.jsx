import React, { useState, useEffect } from 'react';
import { Header, ProductCore, ExpertHighlights } from './components/TopSections';
import { PricingActions, PurchasingOptions, ReviewsSection } from './components/MiddleSections';
import { Newsletter, Footer } from './components/BottomSections';

import { ReturnModal } from './components/ReturnModal';
import { TechModal } from './components/TechModal';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';

function App() {
    const [view, setView] = useState('product'); // 'product' or 'cart'
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [isTechModalOpen, setIsTechModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navigate = (newView) => {
        setView(newView);
        window.scrollTo(0, 0);
    };

    return (
        <div className="app-container">
            <Header onNavigate={navigate} />

            {view === 'product' ? (
                <>
                    <ProductCore />
                    <PricingActions />
                    <PurchasingOptions
                        onOpenReturnModal={() => setIsReturnModalOpen(true)}
                        onOpenTechModal={() => setIsTechModalOpen(true)}
                    />
                    <ExpertHighlights />
                    <ReviewsSection />
                    <Newsletter />

                    <div className="sticky-bottom-bar">
                        <div className="price">
                            <span className="currency">€</span>69,<span className="cents">90</span>
                        </div>
                        <button className="add-to-cart-btn" onClick={() => navigate('cart')}>
                            <i className="fa-solid fa-cart-shopping"></i> ADICIONAR AO CARRINHO
                        </button>
                    </div>
                </>
            ) : view === 'cart' ? (
                <Cart navigate={navigate} />
            ) : (
                <Checkout
                    subtotal={69.90}
                    navigate={navigate}
                />
            )}

            <Footer />

            <ReturnModal
                isOpen={isReturnModalOpen}
                onClose={() => setIsReturnModalOpen(false)}
            />

            <TechModal
                isOpen={isTechModalOpen}
                onClose={() => setIsTechModalOpen(false)}
            />

            <button
                id="scrollToTop"
                className="scroll-to-top"
                onClick={scrollToTop}
                style={{ display: (view === 'product' && showScrollTop) ? 'flex' : 'none' }}
            >
                <i className="fa-solid fa-arrow-up"></i>
                <span>TOPO</span>
            </button>
        </div>
    );
}

export default App;
