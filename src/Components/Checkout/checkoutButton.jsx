import { loadStripe } from '@stripe/stripe-js';
import Button from "@mui/material/Button";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";

export default function CheckoutButton({ total }) {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);

  const handlePayment = async () => {
    if (loggedIn) {
      try {
        // Make the API request to create a checkout session
        const response = await fetch('https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/checkout', {
          method: 'GET',
          headers: {
            "Authorization": `${user}`,
            'Content-Type': 'application/json',
          }
        });

        // Handle the API response
        if (response.ok) {
          const { sessionId } = await response.json();

          // Load the Stripe instance
          const stripe = await loadStripe('pk_test_51MeC2IGFwxWB3B7MgBO0JGpTwYeudavjvvMa9Jbcu4PN1gerYAI9ErBoETZPAKKbF21EHxu8MUfATXaTvSrZgYSj00YrK3BnKT');

          // Redirect the user to the Stripe checkout page
          stripe.redirectToCheckout({ sessionId });
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <Button variant="contained" onClick={handlePayment} >
      Valider la commande
    </Button>
  );
}