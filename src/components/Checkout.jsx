import React, { useState } from 'react';

export const Checkout = ({ subtotal, navigate }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nif: '',
        phone: '',
        email: '',
        address: '',
        postalCode: '',
        city: '',
        paymentMethod: 'mbway',
        mbwayPhone: ''
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [paymentError, setPaymentError] = useState(null);

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Formatação e limite em tempo real
        if (name === 'nif' || name === 'phone' || name === 'mbwayPhone') {
            value = value.replace(/\D/g, '').slice(0, 9);
        }
        if (name === 'postalCode') {
            value = value.replace(/[^\d-]/g, '').slice(0, 8);
            if (value.length === 5 && !value.includes('-')) {
                value = value.slice(0, 4) + '-' + value.slice(4);
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpar erro assim que começa a digitar
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Auto-fill postal code with caching and fallback
    React.useEffect(() => {
        const cp = formData.postalCode;
        if (cp.length === 8) {
            // Check cache first
            const cached = localStorage.getItem(`cp_cache_${cp}`);
            if (cached) {
                const data = JSON.parse(cached);
                setFormData(prev => ({ ...prev, city: data.city, address: data.address }));
                return;
            }

            const fetchWithFallback = async () => {
                try {
                    const res = await fetch(`https://json.geoapi.pt/cp/${cp}`);
                    if (res.status === 429) throw new Error('Rate limit');
                    const data = await res.json();
                    
                    if (data && !data.Error) {
                        const newCity = data.Localidade || data.Concelho || data.Designação || '';
                        let newAddress = '';
                        if (data.partes && data.partes.length > 0) {
                            const p = data.partes[0];
                            newAddress = [p.Tipo, p.Artéria, p.Local].filter(Boolean).join(' ');
                        }
                        
                        if (newCity || newAddress) {
                            const result = { city: newCity, address: newAddress };
                            localStorage.setItem(`cp_cache_${cp}`, JSON.stringify(result));
                            setFormData(prev => ({ ...prev, ...result }));
                        }
                        return;
                    }
                } catch (e) {
                    // Fallback to Zippopotamus for at least the city
                    try {
                        const res2 = await fetch(`https://api.zippopotam.us/pt/${cp}`);
                        const data2 = await res2.json();
                        if (data2 && data2.places && data2.places.length > 0) {
                            const place = data2.places[0];
                            const result = { city: place['place name'], address: '' };
                            setFormData(prev => ({ ...prev, ...result }));
                        }
                    } catch (e2) {}
                }
            };

            fetchWithFallback();
        }
    }, [formData.postalCode]);

    const validate = () => {
        const newErrors = {};

        // NIF: Exact 9 digits
        if (!/^\d{9}$/.test(formData.nif)) {
            newErrors.nif = "NIF inválido. Deve ter 9 dígitos.";
        }

        // Phone: 9 digits, optional +351
        if (!/^(\+351)?\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Telemóvel inválido. Formato: 9XXXXXXXX";
        }

        // Postal Code: XXXX-XXX
        if (!/^\d{4}-\d{3}$/.test(formData.postalCode)) {
            newErrors.postalCode = "Código Postal inválido. Formato: XXXX-XXX";
        }

        // Email: Standard email pattern
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "E-mail inválido.";
        }

        // Required generic fields
        if (!formData.firstName.trim()) newErrors.firstName = "Nome é obrigatório.";
        if (!formData.lastName.trim()) newErrors.lastName = "Apelido é obrigatório.";
        if (!formData.address.trim()) newErrors.address = "Morada é obrigatória.";
        if (!formData.city.trim()) newErrors.city = "Localidade é obrigatória.";

        // MBWay Phone
        if (formData.paymentMethod === 'mbway') {
            if (!/^(\+351)?\d{9}$/.test(formData.mbwayPhone)) {
                newErrors.mbwayPhone = "Número MBWay inválido.";
            }
        }

        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) {
            setTimeout(() => {
                const firstError = document.querySelector('.error-input');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsProcessing(true);
            setPaymentError(null);

            const payload = {
                amount: subtotal.toFixed(2),
                payer_name: `${formData.firstName} ${formData.lastName}`.trim(),
                document: formData.nif,
                method: formData.paymentMethod,
                phone: formData.paymentMethod === 'mbway' ? formData.mbwayPhone : formData.phone,
                email: formData.email || 'cliente@gmail.com'
            };

            fetch('http://localhost:8000/api/payment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                setIsProcessing(false);
                if (data.success) {
                    setPaymentResponse(data.data);
                    setIsSuccess(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    setPaymentError(data.error || 'Erro ao processar pagamento.');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            })
            .catch(err => {
                setIsProcessing(false);
                setPaymentError('Erro de ligação. Verifique a sua internet e tente novamente.');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copiado!`);
    };

    if (isSuccess && paymentResponse) {
        // Busca profunda no objeto caso a API retorne encapsulado
        const findValueByKey = (obj, searchKey) => {
            if (typeof obj !== 'object' || obj === null) return null;
            if (searchKey in obj && obj[searchKey]) return obj[searchKey];
            for (const k in obj) {
                const res = findValueByKey(obj[k], searchKey);
                if (res) return res;
            }
            return null;
        };

        const entityData = paymentResponse?.referenceData || {};
        const mbEntity = entityData.entity || findValueByKey(paymentResponse, 'entity') || findValueByKey(paymentResponse, 'entidade') || '---';
        const rawRef = entityData.reference || findValueByKey(paymentResponse, 'reference') || findValueByKey(paymentResponse, 'referencia') || '---';
        const mbReference = rawRef !== '---' && typeof rawRef === 'string' ? rawRef.replace(/(\d{3})(?=\d)/g, '$1 ') : rawRef;
        
        return (
            <div className="checkout-page content-padding">
                <div className="success-message card" style={{textAlign: 'center', padding: '50px 20px', marginTop: '40px', maxWidth: '500px', margin: '40px auto 0'}}>
                    <div style={{background: '#e7f5ef', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 25px', display: 'flex', justifyContent: 'center'}}>
                        <i className="fa-solid fa-check" style={{fontSize: '2.5rem', color: '#0b8e5c'}}></i>
                    </div>
                    <h2 style={{fontSize: '1.8rem', fontWeight: '700', color: '#111'}}>Encomenda Confirmada!</h2>
                    <p style={{marginTop: '15px', color: '#666', fontSize: '1rem'}}>Recebemos o seu pedido. Por favor, conclua o pagamento para processarmos o envio.</p>

                    <div style={{marginTop: '35px', textAlign: 'left'}}>
                        {formData.paymentMethod === 'multibanco' ? (
                            <div style={{background: '#fcfcfc', padding: '25px', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #eaeaea'}}>
                                    <div style={{background: '#005ca9', width: '40px', height: '30px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '0.7rem'}}>MB</div>
                                    <strong style={{fontSize: '1.1rem'}}>Pagamento Multibanco</strong>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '18px'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <span style={{color: '#666', fontSize: '1rem'}}>Entidade:</span>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                            <strong style={{fontSize: '1.1rem', letterSpacing: '1px'}}>{mbEntity}</strong>
                                            <button onClick={() => copyToClipboard(mbEntity, 'Entidade')} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#005ca9'}}><i className="fa-regular fa-copy"></i></button>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <span style={{color: '#666', fontSize: '1rem'}}>Referência:</span>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                            <strong style={{fontSize: '1.1rem', letterSpacing: '1px'}}>{mbReference}</strong>
                                            <button onClick={() => copyToClipboard(mbReference.replace(/\s/g, ''), 'Referência')} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#005ca9'}}><i className="fa-regular fa-copy"></i></button>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', marginTop: '10px', paddingTop: '20px', borderTop: '2px dashed #eaeaea'}}>
                                        <span style={{color: '#666', fontWeight: '400'}}>Montante:</span>
                                        <strong style={{color: 'var(--worten-red)'}}>€{subtotal.toFixed(2).replace('.', ',')}</strong>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{background: '#fcfcfc', padding: '30px 20px', borderRadius: '12px', border: '1px solid #eaeaea', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
                                <img src="/mbway.svg" alt="MBWay" style={{height: '45px', marginBottom: '20px'}} />
                                <p style={{fontSize: '1.1rem', color: '#333', lineHeight: '1.5'}}>
                                    Enviámos um pedido de pagamento para<br/>
                                    <strong>{formData.mbwayPhone}</strong>
                                </p>
                                <div style={{background: '#fff', border: '1px solid #ff000022', padding: '15px', borderRadius: '8px', marginTop: '20px'}}>
                                    <p style={{fontSize: '0.9rem', color: '#666', margin: 0}}>
                                        <i className="fa-solid fa-mobile-screen-button" style={{marginRight: '8px', color: 'var(--worten-red)'}}></i>
                                        Abra a <strong>App MBWay</strong> e autorize o pagamento de <strong>€{subtotal.toFixed(2).replace('.', ',')}</strong> para concluir a sua encomenda.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page content-padding bg-white">
            <h1 className="product-title" style={{marginBottom: '20px'}}>Finalizar Compra</h1>
            
            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    
                    {/* 1. Dados Pessoais */}
                    <div className="checkout-section">
                        <h3>1. Dados Pessoais</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nome *</label>
                                <input type="text" name="firstName" maxLength="50" value={formData.firstName} onChange={handleChange} className={errors.firstName ? 'error-input' : ''} />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>
                            <div className="form-group">
                                <label>Apelido *</label>
                                <input type="text" name="lastName" maxLength="50" value={formData.lastName} onChange={handleChange} className={errors.lastName ? 'error-input' : ''} />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>
                            <div className="form-group">
                                <label>NIF * (Para fatura)</label>
                                <input type="text" name="nif" maxLength="9" placeholder="123456789" value={formData.nif} onChange={handleChange} className={errors.nif ? 'error-input' : ''} />
                                {errors.nif && <span className="error-text">{errors.nif}</span>}
                            </div>
                            <div className="form-group">
                                <label>Telemóvel *</label>
                                <input type="tel" name="phone" maxLength="9" placeholder="912345678" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error-input' : ''} />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>
                            <div className="form-group full-width">
                                <label>E-mail *</label>
                                <input type="email" name="email" maxLength="100" value={formData.email} onChange={handleChange} className={errors.email ? 'error-input' : ''} />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                        </div>
                    </div>

                    {/* 2. Morada de Entrega */}
                    <div className="checkout-section">
                        <h3>2. Morada de Entrega</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Morada *</label>
                                <input type="text" name="address" maxLength="150" placeholder="Rua / Avenida" value={formData.address} onChange={handleChange} className={errors.address ? 'error-input' : ''} />
                                {errors.address && <span className="error-text">{errors.address}</span>}
                            </div>
                            <div className="form-group">
                                <label>Código Postal *</label>
                                <input type="text" name="postalCode" maxLength="8" placeholder="0000-000" value={formData.postalCode} onChange={handleChange} className={errors.postalCode ? 'error-input' : ''} />
                                {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                            </div>
                            <div className="form-group">
                                <label>Localidade *</label>
                                <input type="text" name="city" maxLength="50" value={formData.city} onChange={handleChange} className={errors.city ? 'error-input' : ''} />
                                {errors.city && <span className="error-text">{errors.city}</span>}
                            </div>
                        </div>
                    </div>

                    {/* 3. Pagamento */}
                    <div className="checkout-section">
                        <h3>3. Método de Pagamento</h3>
                        <div className="payment-options">
                            <label className={`payment-option ${formData.paymentMethod === 'mbway' ? 'selected' : ''}`}>
                                <input type="radio" name="paymentMethod" value="mbway" checked={formData.paymentMethod === 'mbway'} onChange={handleChange} />
                                <div className="payment-label-content">
                                    <img src="/mbway.svg" alt="MBway" style={{height: '35px'}} />
                                </div>
                            </label>
                            
                            <label className={`payment-option ${formData.paymentMethod === 'multibanco' ? 'selected' : ''}`}>
                                <input type="radio" name="paymentMethod" value="multibanco" checked={formData.paymentMethod === 'multibanco'} onChange={handleChange} />
                                <div className="payment-label-content">
                                    <img src="/multibanoc.svg" alt="Multibanco" style={{height: '45px'}} />
                                </div>
                            </label>
                        </div>

                        {formData.paymentMethod === 'mbway' && (
                            <div className="mbway-phone-input mt-3">
                                <div className="form-group">
                                    <label>Introduza o nº de telemóvel associado ao MBWay *</label>
                                    <input type="tel" name="mbwayPhone" maxLength="9" placeholder="912345678" value={formData.mbwayPhone} onChange={handleChange} className={errors.mbwayPhone ? 'error-input' : ''} />
                                    {errors.mbwayPhone && <span className="error-text">{errors.mbwayPhone}</span>}
                                </div>
                            </div>
                        )}
                        {formData.paymentMethod === 'multibanco' && (
                            <div className="payment-instructions mt-3">
                                <p style={{fontSize: '0.9rem', color: '#555'}}>A entidade, referência e montante serão apresentados no final e enviados por e-mail.</p>
                            </div>
                        )}
                    </div>

                    {paymentError && (
                        <div className="error-card" style={{background: '#fff8f8', border: '1px solid var(--worten-red)', padding: '15px', borderRadius: '4px', marginTop: '15px'}}>
                            <span className="error-text" style={{margin: 0, fontSize: '0.95rem'}}><i className="fa-solid fa-circle-exclamation"></i> {paymentError}</span>
                        </div>
                    )}

                    <button type="submit" className="add-to-cart-btn checkout-submit-btn" disabled={isProcessing}>
                        {isProcessing ? 'A PROCESSAR...' : 'PAGAR COM SEGURANÇA'}
                        {!isProcessing && <i className="fa-solid fa-lock" style={{marginLeft: '8px'}}></i>}
                    </button>
                </form>

                <div className="checkout-sidebar">
                    <div className="summary-card card">
                        <h3>Resumo da Encomenda</h3>
                        <div className="summary-row mt-3">
                            <span>Subtotal</span>
                            <span>€{subtotal.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div className="summary-row">
                            <span>Portes</span>
                            <span className="green-text">Grátis</span>
                        </div>
                        <div className="summary-total mt-4">
                            <span className="total-label">Total a Pagar</span>
                            <div className="total-price">
                                <span className="main-price">€{Math.floor(subtotal)},<span className="cents">{(subtotal % 1).toFixed(2).split('.')[1]}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
