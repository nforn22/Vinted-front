import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    
    // pour l'instant, on ne fait rien au submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO: implémenter la logique de paiement ici
        alert("paiement non implémenter(test)")
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
            <h2>Paiement</h2>
            <div style={{ margin: "24px 0" }}>
                <CardElement options={{ hidePostalCode: true }} />
            </div>
            <button type="submit" disabled={!stripe || !elements} style={{  background: "#2cb1ba", color: "#fff", padding: "12px 24px", border: "none", borderRadius: 4, cursor: "pointer", fontSize: "16px" }}
            >
            Payer
            </button>
        </form>
    )
}

export default PaymentForm;