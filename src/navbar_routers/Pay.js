import styles from "./Pay.module.css"
import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51Pgfnm2MAyR1R09oOpueeVf2DuNMAUJev4PEItFtqoOE97jifuUwFZ3nNosJYQWPlc0Hpe3FMg6pZ9omUypXyDI200gFgKZRmc"
);

export default function Pay() {
    const [outletContextObj] = useOutletContext();
    const setIsBlankPage = outletContextObj['isBlankPage'][1];
    const clientSecret = outletContextObj['clientSecret'][0];
    const setClientSecret = outletContextObj['clientSecret'][1];
    const chosenFoods = outletContextObj['chosenFoods'];

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    useEffect(() => {
        async function showStripeElement() {
            await fetch("/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
            try {
                let result = await fetch("http://localhost:3001/sales", {
                method: "PATCH",
                body: JSON.stringify(chosenFoods),
                headers: {
                    "Content-Type": "application/json",
                },
                });
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        showStripeElement()
    }, [])

    function handleGoBack() {
        setIsBlankPage(false)
    }
    return (<>
        <div className={styles.bg_container}>
            
            <div className={styles.payForm_container}>
                {clientSecret && (<>
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </>)}
            </div>
           <div>
                <Link to="/cart">
                    <button className={styles.btn_goBack} onClick={() => handleGoBack()}>
                        <label className={styles.lbl_goBack}>取消</label>
                        <img className={styles.img_goBack} src="./cencel_icon.png" alt="cencel_icon"/>
                    </button>
                </Link>
            </div>
        </div>
    </>)
}