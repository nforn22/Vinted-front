import { useState, useEffect, useRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentForm.css";

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [isStripeReady, setIsStripeReady] = useState(false);
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [cardError, setCardError] = useState(null);
    const formRef = useRef(null);
    
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
        setIsLoading(true);
        setError(null);

        try {
            if (!stripe || !elements) {
                throw new Error("Le système de paiement n'est pas encore prêt");
            }

            if (!cardComplete) {
                throw new Error("Veuillez remplir correctement les informations de votre carte");
            }

            // TODO: implémenter la logique de paiement ici
            await new Promise(resolve => setTimeout(resolve, 2000)); // simulation d'un appel API
            alert("paiement non implémenté (test)");
        } catch (error) {
            console.error("Erreur lors du paiement:", error);
            setError(error.message || "Une erreur est survenue lors du paiement");
            // focus sur le premier champ en cas d'error
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
            {/* résumé de la commande */}
            <div className="order-summary">
                <h3>Résumé de la commande</h3>
                <div className="order-summary-content">
                    <img src="https://via.placeholder.com/80x80.png?text=Article" alt="Produit" className="order-summary-img" />
                    <div className="order-summary-details">
                        <div className="order-title">T-shirt oversize blanc</div>
                        <div className="order-desc">Taille M - Marque Zara</div>
                        <div className="order-price">Prix : <strong>12,00 €</strong></div>
                    </div>
                </div>
            </div>
            {/* form de paiement */}
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