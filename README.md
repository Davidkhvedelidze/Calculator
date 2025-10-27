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

