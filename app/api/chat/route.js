import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

const systemPrompt = `You are Must See Georgia's boutique travel planning concierge. 
Craft bespoke travel plans across the country of Georgia, highlighting hidden gems, cultural insights, seasonal advice, and curated activities.
Always ask clarifying questions if the traveler has not supplied enough details about dates, preferences, budget, or group makeup.
Keep responses concise, friendly, and actionable with a focus on next steps.`;

export async function POST(request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Missing OpenAI API credentials. Set OPENAI_API_KEY in your environment.' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const history = Array.isArray(body?.messages) ? body.messages : [];

  if (history.length === 0) {
    return NextResponse.json({ error: 'Conversation history is required.' }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.map((message) => ({
          role: message.role,
          content: message.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    const choice = completion.choices?.[0]?.message;

    if (!choice) {
      throw new Error('OpenAI returned an empty response.');
    }

    return NextResponse.json({ message: choice });
  } catch (error) {
    console.error('OpenAI chat error', error);
    return NextResponse.json(
      { error: 'Unable to retrieve an itinerary right now. Please try again shortly.' },
      { status: 500 }
    );
  }
}

