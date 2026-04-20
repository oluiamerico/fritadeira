import React, { useState } from 'react';

export const Cart = ({ navigate }) => {
    const [quantity, setQuantity] = useState(1);
    const productPrice = 69.90;

    const subtotal = (productPrice * quantity);

    const handleIncrease = () => setQuantity(q => q + 1);
    const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className="cart-page">
            <header className="cart-header">
                <h1>O meu carrinho <span>({quantity} {quantity === 1 ? 'artigo' : 'artigos'})</span></h1>
            </header>

            <section className="cart-items-list">
                {/* Product Item */}
                <div className="cart-item">
                    <div className="cart-img-box">
                        <img src="/fritadeira1.webp" alt="Philips Airfryer" />
                    </div>
                    <div className="cart-item-info">
                        <h2 className="cart-item-title">
                            Fritadeira sem Óleo PHILIPS NA352/00 Dua Serie 3000 (9 L - Cinzento-carvão/Cobre)
                        </h2>
                        <div className="cart-item-price">
                            <span className="currency">€</span>69,<span className="cents">90</span>
                        </div>
                        <div className="cart-item-vendor">
                            Vendido por: <strong>WORTEN</strong>
                        </div>
                        
                        <div className="cart-delivery-info">
                            <div className="cart-delivery-row">
                                <i className="fa-solid fa-truck"></i>
                                <span>Entrega em 1 a 2 dias úteis <strong className="green-text">Grátis</strong></span>
                            </div>
                            <div className="cart-delivery-row">
                                <i className="fa-solid fa-store"></i>
                                <span>Levanta na loja <strong className="green-text">Grátis</strong></span>
                            </div>
                        </div>

                        <div className="cart-item-actions">
                            <div className="qty-selector">
                                <button className="qty-btn" onClick={handleDecrease}>-</button>
                                <span>{quantity}</span>
                                <button className="qty-btn" onClick={handleIncrease}>+</button>
                            </div>
                        </div>
                    </div>
                </div>


            </section>

            <section className="order-summary">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="summary-row">
                    <span>Custos de envio estimados</span>
                    <span className="green-text">€0,00</span>
                </div>
                
                <div className="summary-total">
                    <span className="total-label">Total</span>
                    <div className="total-price">
                        {/* Split the total into main part and cents */}
                        <span className="main-price">€{Math.floor(subtotal)},<span className="cents">{(subtotal % 1).toFixed(2).split('.')[1]}</span></span>
                    </div>
                </div>

                <div className="payment-badges-grid">
                    <img src="/mbway.svg" alt="MBway" className="payment-badge" style={{height: '40px'}} />
                    <img src="/multibanoc.svg" alt="Multibanco" className="payment-badge" style={{height: '55px'}} />
                </div>

                <div style={{marginTop: '30px'}}>
                    <button className="add-to-cart-btn" style={{width: '100%', justifyContent: 'center', padding: '16px'}} onClick={() => navigate('checkout')}>
                        FINALIZAR COMPRA
                    </button>
                </div>
            </section>
        </div>
    );
};
