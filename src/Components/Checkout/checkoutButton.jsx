import { loadStripe } from '@stripe/stripe-js';
import Button from "@mui/material/Button";

export default function CheckoutButton() {
  const handlePayment = async () => {
  try {
    // Make the API request to create a checkout session
    const response = await fetch('https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 123 }), // Adjust the amount according to your needs
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
  };

  return (
  <Button onClick={handlePayment} color="inherit">
                                Payer
                            </Button>
)}