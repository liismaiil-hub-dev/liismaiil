import {NextResponse, NextRequest} from 'next/server'
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_6c544851019a65f3aafbfe598a0c4d97adc513a9a2eb218175094022ad897433";
app.get('/webhook', express.raw({type: 'application/json'}), async (request:NextRequest, response:NextResponse) => {
  const sig = request.headers['stripe-signature'];
const arg = request.nextUrl.searchParams.get('arg')
console.log({ arg})
const endpoint = await stripe.webhookEndpoints.create({
  url: `${process.env.NEXT_PUBLIC_URL}/webhook`,
  enabled_events
: [
    'payment_intent.payment_failed',
    'payment_intent.succeeded',
  ],
});
})
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(`Webhook Error: ${err.message}`,{status:400});
    
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      const {id, ...rest} =paymentIntentSucceeded 
      // decrement left places until 100 
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
      case 'payment_intent.payment_failed':


    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));