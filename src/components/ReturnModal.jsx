import React from 'react';

export const ReturnModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal-content" style={{height: 'auto', minHeight: '300px'}}>
                <header className="modal-header">
                    <div style={{flex: 1}}></div>
                    <button className="close-btn" onClick={onClose}>
                        FECHAR <i className="fa-solid fa-xmark"></i>
                    </button>
                </header>

                <div className="modal-body">
                    <h2 className="modal-title" style={{fontSize: '1.2rem', fontWeight: 700}}>Devolução grátis em loja</h2>

                    <ul className="modal-list" style={{listStyle: 'none', padding: 0, margin: '20px 0'}}>
                        <li style={{marginBottom: '20px', display: 'flex', gap: '10px'}}>
                            <span style={{fontSize: '1.5rem', lineHeight: '1'}}>•</span>
                            <p style={{fontSize: '1rem', color: '#333'}}>
                                Dispões de 14 dias, após a data de receção, para devolveres o teu produto.
                            </p>
                        </li>
                        <li style={{display: 'flex', gap: '10px'}}>
                            <span style={{fontSize: '1.5rem', lineHeight: '1'}}>•</span>
                            <p style={{fontSize: '1rem', color: '#333'}}>
                                Se aderires grátis ao <a href="#" style={{color: '#333', textDecoration: 'underline'}}>Worten Life</a>, tens até 30 dias para fazer a devolução.
                            </p>
                        </li>
                    </ul>

                    <p style={{fontSize: '1rem', marginTop: '30px'}}>
                        Consulta todas as condições sobre devoluções <a href="#" style={{color: '#333', textDecoration: 'underline'}}>aqui.</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
