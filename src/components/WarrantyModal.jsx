import React, { useState } from 'react';

export const WarrantyModal = ({ isOpen, onClose, selectedPlan, onSelectPlan }) => {
    const [activeTab, setActiveTab] = useState('garantia');

    if (!isOpen) return null;

    const garantiaPlans = [
        { id: '3years', title: '+ 3 anos garantia', price: '32', cents: '90', fullPrice: '€32,90' },
        { id: '1year', title: '+ 1 ano garantia', price: '15', cents: '99', fullPrice: '€15,99' }
    ];

    const seguroPlans = [
        { id: 'seguro1year', title: 'Seguro Substituição 1 ano', price: '29', cents: '99', fullPrice: '€29,99', subtitle: 'Pagamento Único' }
    ];

    const isGarantia = activeTab === 'garantia';
    const currentPlans = isGarantia ? garantiaPlans : seguroPlans;

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <header className="modal-header">
                    <div className="modal-tabs">
                        <button 
                            className={`tab ${isGarantia ? 'active' : ''}`}
                            onClick={() => setActiveTab('garantia')}
                        >
                            Garantia Extra
                        </button>
                        <button 
                            className={`tab ${!isGarantia ? 'active' : ''}`}
                            onClick={() => setActiveTab('seguro')}
                        >
                            Seguro
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        FECHAR <i className="fa-solid fa-xmark"></i>
                    </button>
                </header>

                <div className="modal-info-banner">
                    <i className="fa-solid fa-circle-info"></i>
                    <span>6 em cada 10 clientes estendem e ficam 100% satisfeitos</span>
                </div>

                <div className="modal-body">
                    <h2 className="modal-title">
                        {isGarantia 
                            ? "Estende a garantia e esquece as preocupações!" 
                            : "Em caso de dano acidental o teu produto é imediatamente substituído!"}
                    </h2>

                    <div className="benefits-box">
                        {isGarantia ? (
                            <>
                                <div className="benefit-item">
                                    <i className="fa-solid fa-screwdriver-wrench blue-text"></i>
                                    <p><strong>Reparação</strong> Cobre a reparação em caso de avaria</p>
                                </div>
                                <div className="benefit-item">
                                    <i className="fa-solid fa-rotate blue-text"></i>
                                    <p><strong>Troca</strong> Por um idêntico, em caso de perda total</p>
                                </div>
                                <div className="benefit-item">
                                    <i className="fa-solid fa-circle-check blue-text"></i>
                                    <p><strong>Peças e mão de obra</strong> Incluídas no valor da garantia</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="benefit-item">
                                    <i className="fa-solid fa-rotate blue-text"></i>
                                    <p><strong>Troca direta</strong> Troca imediata em caso de dano.</p>
                                </div>
                                <div className="benefit-item">
                                    <i className="fa-solid fa-wallet blue-text"></i>
                                    <p><strong>Sem custos adicionais</strong> Sem franquias nem pagamentos extra!</p>
                                </div>
                                <div className="benefit-item">
                                    <i className="fa-solid fa-circle-check blue-text"></i>
                                    <p><strong>Sem limite</strong> Uso ilimitado, onde quer que estejas!</p>
                                </div>
                            </>
                        )}
                    </div>

                    {!isGarantia && (
                        <p className="modal-subtitle" style={{fontWeight: 700, marginBottom: '16px'}}>
                            Escolhe o seguro que mais se adequa a ti
                        </p>
                    )}

                    <div className="plans-list">
                        {currentPlans.map(plan => {
                            const isSelected = selectedPlan?.id === plan.id;
                            return (
                                <div key={plan.id} className={`plan-card ${isSelected ? 'selected' : ''}`}>
                                    <h3 className="plan-title">{plan.title}</h3>
                                    <div className="plan-price">
                                        <span className="currency">€</span>{plan.price},<span className="cents">{plan.cents}</span>
                                    </div>

                                    {plan.subtitle && (
                                        <p className="plan-subtitle" style={{marginBottom: '20px', fontSize: '1rem'}}>{plan.subtitle}</p>
                                    )}

                                    {isSelected ? (
                                        <div className="selected-row">
                                            <div className="selected-badge">
                                                <i className="fa-solid fa-check"></i> SELECIONADO
                                            </div>
                                            <button className="remove-plan-btn" onClick={() => onSelectPlan(null)}>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="select-btn" onClick={() => onSelectPlan(plan)}>
                                            SELECIONAR
                                        </button>
                                    )}
                                    <a href="#" className="terms-link">Li e aceito as condições contratuais</a>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <footer className="modal-footer">
                    <button className="add-service-btn" onClick={onClose}>
                        ADICIONAR SERVIÇO
                    </button>
                </footer>
            </div>
        </div>
    );
};
