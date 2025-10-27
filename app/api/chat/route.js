import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

const systemPrompt = `You are Must See Georgia's boutique travel planning concierge specializing in Georgia (the country). 

Your expertise includes:
- Georgian regions: Tbilisi, Kakheti (wine country), Svaneti (mountains), Borjomi (wellness), Adjara (Black Sea), Mtskheta (ancient capital)
- Cultural experiences: Supra feasts, wine tastings, monastery visits, traditional crafts
- Adventure activities: Hiking in Svaneti, stargazing, mountain expeditions
- Wellness: Mineral springs in Borjomi, spa treatments, forest bathing
- Urban exploration: Tbilisi old town, modern Batumi, cultural sites

Always ask clarifying questions about:
- Travel dates and duration
- Group size and composition  
- Interests (cultural, culinary, adventure, wellness, urban)
- Budget range
- Activity level preferences

Provide specific recommendations with:
- Detailed day-by-day itineraries
- Best times to visit each region
- Local experiences and hidden gems
- Cultural insights and etiquette tips
- Practical travel advice
- Estimated costs

Keep responses enthusiastic, informative, and actionable. Always end with next steps for booking.`;

export async function POST(request) {
  if (!process.env.OPENAI_API_KEY) {
    console.log("OpenAI API key not found, using fallback responses");
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const history = Array.isArray(body?.messages) ? body.messages : [];

  if (history.length === 0) {
    return NextResponse.json(
      { error: "Conversation history is required." },
      { status: 400 }
    );
  }

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const choice = completion.choices?.[0]?.message;

    if (!choice) {
      throw new Error("OpenAI returned an empty response.");
    }

    return NextResponse.json({ message: choice });
  } catch (error) {
    console.error("OpenAI chat error:", error);

    // Fallback to built-in AI responses when OpenAI is unavailable
    const lastMessage =
      history[history.length - 1]?.content?.toLowerCase() || "";

    let fallbackResponse =
      "Welcome to Must See Georgia! I'm here to help you plan your perfect Georgian adventure using our expert knowledge!\n\n";

    if (
      lastMessage.includes("wine") ||
      lastMessage.includes("culinary") ||
      lastMessage.includes("food")
    ) {
      fallbackResponse +=
        "🍷 **Culinary Adventures in Georgia**\n\nFor wine and food experiences, I recommend:\n• **Kakheti Region** - The heart of Georgian wine country\n• **Tbilisi** - Modern restaurants and traditional supra feasts\n• **Sighnaghi** - Beautiful wine town with stunning views\n\n**3-Day Wine Itinerary:**\nDay 1: Tbilisi - Old town, sulfur baths, traditional restaurants\nDay 2: Kakheti - Wine tastings, Alaverdi Monastery, Telavi\nDay 3: Sighnaghi - Wine cellars, traditional crafts, local cuisine\n\nWould you like me to customize this further or add more days?";
    } else if (
      lastMessage.includes("culture") ||
      lastMessage.includes("heritage") ||
      lastMessage.includes("church")
    ) {
      fallbackResponse +=
        "🏛️ **Cultural Heritage Tour**\n\nFor cultural experiences, I recommend:\n• **Tbilisi** - Old town, museums, modern architecture\n• **Mtskheta** - Ancient capital, UNESCO World Heritage sites\n• **Kakheti** - Monasteries and traditional villages\n\n**4-Day Cultural Itinerary:**\nDay 1: Tbilisi - Old town, Narikala Fortress, museums\nDay 2: Mtskheta - Svetitskhoveli Cathedral, Jvari Monastery\nDay 3: Kakheti - Alaverdi Monastery, traditional villages\nDay 4: Tbilisi - Modern districts, Bridge of Peace, shopping\n\nThis gives you a perfect mix of ancient and modern Georgian culture!";
    } else if (
      lastMessage.includes("adventure") ||
      lastMessage.includes("hiking") ||
      lastMessage.includes("mountain")
    ) {
      fallbackResponse +=
        "🏔️ **Adventure & Nature Tour**\n\nFor adventure experiences, I recommend:\n• **Svaneti** - Mountain region with towers and hiking\n• **Borjomi** - National park and mineral springs\n• **Tbilisi** - City adventures and cultural sites\n\n**5-Day Adventure Itinerary:**\nDay 1: Tbilisi - Arrival, old town exploration\nDay 2-3: Svaneti - Hiking, Svan towers, Ushguli village\nDay 4: Borjomi - National park, mineral springs\nDay 5: Tbilisi - Departure, last-minute shopping\n\nPerfect for nature lovers and adventure seekers!";
    } else {
      fallbackResponse +=
        "🇬🇪 **Welcome to Georgia!**\n\nI'd love to help you plan your Georgian adventure! Here are some amazing options:\n\n🍷 **Culinary Adventures** - Wine tastings, supra feasts, cooking classes\n🏛️ **Cultural Heritage** - Ancient churches, monasteries, UNESCO sites\n🏔️ **Adventure & Nature** - Hiking, stargazing, mountain expeditions\n🧘 **Wellness & Relaxation** - Spa retreats, mineral springs, forest bathing\n🏙️ **Urban Exploration** - City tours, modern architecture, nightlife\n\nWhat type of experience interests you most? Also, how many days are you planning to spend in Georgia?";
    }

    return NextResponse.json({
      message: {
        role: "assistant",
        content: fallbackResponse,
      },
    });
  }
}
