# Must See Georgia — AI Travel Concierge

This project now includes an OpenAI-powered chat concierge that helps visitors design bespoke trips across Georgia.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Provide the required OpenAI credentials by creating a `.env.local` file in the project root:

   ```bash
   OPENAI_API_KEY=your_api_key_here
   # Optional: override the default chat model (defaults to gpt-4o-mini)
   # OPENAI_MODEL=gpt-4o-mini
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` and use the chat bubble in the bottom-right corner to start planning a journey.

The widget uses the `app/api/chat` endpoint to fetch itinerary suggestions powered by OpenAI. The UI labels the experience as “Powered by OpenAI · gpt-5-codex” to match the concierge branding.

## Configuring secure online payments

To accept live deposits with PayPal, Apple Pay, Google Pay, and major cards, configure both Stripe and PayPal credentials in `.env.local`:

```bash
# Stripe (required for card, Apple Pay, Google Pay)
STRIPE_SECRET_KEY=sk_test_yourSecretKey
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_yourPublishableKey

# PayPal (required for PayPal checkout button)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

> **Tip:** Use Stripe test keys and a PayPal sandbox client ID while developing. Production keys can be added later without changing the code.

After setting the environment variables, restart `npm run dev`. Travelers can then complete deposits directly from the Contact page or any tour detail page. Stripe automatically enables Apple Pay and Google Pay when the domain is verified and the browser supports those wallets. PayPal payments are captured immediately and display the transaction ID inside the interface.

