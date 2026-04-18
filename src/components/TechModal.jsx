import React from 'react';

export const TechModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const sections = [
        {
            title: 'Referências',
            items: [
                { label: 'Referência', value: '8090405', info: true },
                { label: 'EAN', value: '8720389032998', info: true },
                { label: 'Marca', value: 'PHILIPS', info: true },
                { label: 'Modelo', value: 'FRITADEIRA PHILIPS NA352/00 AIRFRYER DUA', info: true }
            ]
        },
        {
            title: 'Características Físicas',
            items: [
                { label: 'Cor', value: 'Cinzento-carvão / cobre', info: true },
                { label: 'Peso', value: '7,85', info: true },
                { label: 'Altura', value: '44,3', info: true },
                { label: 'Largura', value: '38,2', info: true },
                { label: 'Profundidade', value: '31,4', info: true },
                { label: 'Unidade de Medida', value: 'cm', info: true }
            ]
        },
        {
            title: 'Características Específicas',
            items: [
                { label: 'Tipologia', value: 'Fritadeira sem Óleo', info: true },
                { label: 'Gênero de Fritadeira', value: 'Sem óleo' },
                { label: 'Capacidade de Alimentos (g/kg)', value: '9' },
                { label: 'Capacidade (L)', value: '9' },
                { label: 'Potência (W)', value: '2750', info: true },
                { label: 'Partes Laváveis na Máquina', value: 'Sim' },
                { label: 'Filtro Anti-Gordura Lavável', value: 'Sim', info: true },
                { label: 'Janela de Visualização', value: 'Sim' },
                { label: 'Temperatura regulável', value: 'Sim' },
                { label: 'Temporizador', value: 'Sim', info: true },
                { label: 'Aviso Sonoro Temporizador', value: 'Sim' },
                { label: 'Pés anti-deslizantes', value: 'Sim' },
                { label: 'Piloto termostato', value: 'Sim' },
                { label: 'Paredes frias', value: 'Sim' },
                { label: 'Material da cuba', value: 'Aço inoxidável' },
                { label: 'Filtro Anti-Odores', value: 'Sim' }
            ]
        }
    ];

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <header className="modal-header">
                    <div style={{flex: 1}}></div>
                    <button className="close-btn" onClick={onClose}>
                        FECHAR <i className="fa-solid fa-xmark"></i>
                    </button>
                </header>

                <div className="modal-body tech-scroll">
                    <h2 className="modal-title" style={{fontSize: '1.2rem', marginBottom: '32px'}}>Características técnicas</h2>

                    {sections.map((section, sIndex) => (
                        <div key={sIndex} className="tech-section">
                            <h3 className="section-title">{section.title}</h3>
                            <div className="specs-table">
                                {section.items.map((item, iIndex) => (
                                    <div key={iIndex} className="spec-row">
                                        <div className="spec-label">
                                            {item.label} 
                                            {item.info && <i className="fa-solid fa-circle-info info-icon"></i>}
                                        </div>
                                        <div className="spec-value">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
