import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "../../components/PaymentForm/PaymentForm"
import "./Payment.css"

const stripePromise = loadStripe('pk_test_51RXFwMQaX2N40R9b3nJ5gXe3LT1N9WpgxEBcMQu4wo63D8A9sc65OGM9YoDUxjlfVGOk0n8QPsrsCmzlQYkXiHrx00kG1efPL9')

function Payment() {
    return (
        <div className="payment-container">
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
        </div>
    );
}

export default Payment;