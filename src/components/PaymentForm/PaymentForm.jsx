import { useState, useEffect, useRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import "./PaymentForm.css";

const API_URL = import.meta.env.VITE_API_URL || "https://site--backend-vinted--t29qzrn4njwx.code.run";

function PaymentForm({ title, price, id, image, brand, size, /*condition, color, city */ }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [isStripeReady, setIsStripeReady] = useState(false);
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [cardError, setCardError] = useState(null);
    const formRef = useRef(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingSubmit, setPendingSubmit] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // vérifier si Stripe est prêt
    useEffect(() => {
        if (stripe && elements) {
            setIsStripeReady(true);
        }
    }, [stripe, elements]);

    // gestion de la touche Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                // retourner à la page précédente ou fermer la modale
                window.history.back();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleCardChange = (event) => {
        setCardComplete(event.complete);
        setCardError(event.error ? event.error.message : null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        // On affiche la confirmation avant de lancer le paiement
        setPendingSubmit(() => () => doPayment());
        setShowConfirm(true);
    };

    // Fonction qui lance le paiement réel
    const doPayment = async () => {
        setIsLoading(true);
        setError(null);
        setShowConfirm(false);
        try {
            if (!stripe || !elements) {
                throw new Error("Le système de paiement n'est pas encore prêt");
            }
            if (!cardComplete) {
                throw new Error("Veuillez remplir correctement les informations de votre carte");
            }

            const token = Cookies.get("token");
            const response = await axios.post(
                `${API_URL}/payment/create-payment-intent`,
                {
                    title,
                    price,
                    offerId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                response.data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            if (paymentIntent.status === "succeeded") {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2000);
            }
        } catch (error) {
            console.error("Erreur lors du paiement:", error);
            setError(error.message || "Une erreur est survenue lors du paiement");
            if (formRef.current) {
                const firstInput = formRef.current.querySelector('input');
                if (firstInput) firstInput.focus();
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="payment-form-container" role="dialog" aria-modal="true">
            <div className="order-summary">
                <h3>Résumé de la commande</h3>
                <div className="order-summary-content">
                    <img src={image} alt={title} className="order-summary-img" />
                    <div className="order-summary-details">
                        <div className="order-title">{title}</div>
                        <div className="order-desc">
                            {size && `Taille ${size}`}
                            {brand && ` - Marque ${brand}`}
                        </div>
                        <div className="order-price">Prix : <strong>{price.toFixed(2)} €</strong></div>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <div className="payment-success-message" role="alert">
                    <span className="success-icon">✅</span>
                    Paiement réussi ! Merci pour ton achat.
                </div>
            )}

            {showConfirm && (
                <div className="confirm-modal-overlay" tabIndex={-1}>
                    <div className="confirm-modal" role="dialog" aria-modal="true">
                        <div className="confirm-title">Confirmer le paiement</div>
                        <div className="confirm-text">Es-tu sûr de vouloir payer <strong>{price.toFixed(2)}&nbsp;€</strong> pour cet article&nbsp;?</div>
                        <div className="confirm-actions">
                            <button type="button" className="btn-cancel" onClick={() => setShowConfirm(false)}>Annuler</button>
                            <button type="button" className="btn-confirm" onClick={() => { setShowConfirm(false); if (pendingSubmit) pendingSubmit(); }}>Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
            <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className="payment-form"
                noValidate
            >
                <h2 id="payment-title">Paiement</h2>
                
                {!isStripeReady && (
                    <div className="stripe-loading" role="status" aria-live="polite">
                        <div className="spinner" aria-hidden="true"></div>
                        <p>Chargement du système de paiement...</p>
                    </div>
                )}

                {isStripeReady && (
                    <>
                        <div className="card-details">
                            <div 
                                className="card-element-container"
                                role="group"
                                aria-labelledby="card-label"
                            >
                                <span id="card-label" className="visually-hidden">Informations de carte</span>
                                <CardElement 
                                    onChange={handleCardChange}
                                    options={{
                                        hidePostalCode: true,
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                                ':-webkit-autofill': {
                                                    color: '#424770',
                                                },
                                            },
                                            invalid: {
                                                color: '#9e2146',
                                            },
                                        },
                                        disableLink: true // désactiver le préremplissage automatique de Stripe Link
                                    }}
                                />
                            </div>
                            {/* <div className="card-help" role="complementary" aria-label="Format de carte accepté">
                                <p>Format accepté : 4242 4242 4242 4242</p>
                                <p>Date d'expiration : MM/AA</p>
                                <p>CVV : 3 chiffres</p>
                            </div> */}
                        </div>

                        {cardError && (
                            <div className="error-message card-error" role="alert">
                                {cardError}
                            </div>
                        )}

                        {error && (
                            <div className="error-message" role="alert">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={!stripe || !elements || isLoading || !cardComplete}
                            className={`payment-button ${isLoading ? 'loading' : ''}`}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <div className="button-content">
                                    <div className="spinner" aria-hidden="true"></div>
                                    <span>Paiement en cours...</span>
                                </div>
                            ) : (
                                "Payer"
                            )}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

export default PaymentForm;