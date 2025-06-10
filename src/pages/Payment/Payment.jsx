import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "../../components/PaymentForm/PaymentForm"
import Cookies from "js-cookie"
import "./Payment.css"

const stripePromise = loadStripe('pk_test_51RXFwMQaX2N40R9b3nJ5gXe3LT1N9WpgxEBcMQu4wo63D8A9sc65OGM9YoDUxjlfVGOk0n8QPsrsCmzlQYkXiHrx00kG1efPL9')

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const userToken = Cookies.get("token");

    useEffect(() => {
        if (!userToken) {
            navigate("/signup");
        }
        if (!location.state) {
            navigate("/");
        }
    }, [userToken, location, navigate]);

    if (!location.state) return null;

    return (
        <div className="payment-container">
        <Elements stripe={stripePromise}>
            <PaymentForm {...location.state} />
        </Elements>
        </div>
    );
}

export default Payment;