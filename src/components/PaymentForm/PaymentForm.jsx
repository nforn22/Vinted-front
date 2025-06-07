import { useState, useEffect } from "react";
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
    
    // vérifier si Stripe est prêt
    useEffect(() => {
        if (stripe && elements) {
            setIsStripeReady(true);
        }
    }, [stripe, elements]);

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <h2>Paiement</h2>
                
                {!isStripeReady && (
                    <div className="stripe-loading">
                        <div className="spinner"></div>
                        <p>Chargement du système de paiement...</p>
                    </div>
                )}

                {isStripeReady && (
                    <>
                        <div className="card-details">
                            <div className="card-element-container">
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
                            <div className="card-help">
                                <p>Format accepté : 4242 4242 4242 4242</p>
                                <p>Date d'expiration : MM/AA</p>
                                <p>CVV : 3 chiffres</p>
                            </div>
                        </div>

                        {cardError && (
                            <div className="error-message card-error">
                                {cardError}
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={!stripe || !elements || isLoading || !cardComplete}
                            className={`payment-button ${isLoading ? 'loading' : ''}`}
                        >
                            {isLoading ? (
                                <div className="button-content">
                                    <div className="spinner"></div>
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