"use client";

import { useState, useRef, useEffect } from "react";
import { tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";

// Georgian travel expertise and trip planning logic
const georgianRegions = {
  tbilisi: {
    name: "Tbilisi",
    description:
      "Capital city with old town, modern districts, and cultural sites",
    highlights: [
      "Old Town",
      "Narikala Fortress",
      "Sulfur Baths",
      "Rustaveli Avenue",
      "Bridge of Peace",
    ],
    bestTime: "Year-round",
    duration: "2-3 days",
  },
  kakheti: {
    name: "Kakheti",
    description:
      "Wine region with vineyards, monasteries, and traditional villages",
    highlights: [
      "Wine Tastings",
      "Alaverdi Monastery",
      "Telavi",
      "Sighnaghi",
      "Supra Feasts",
    ],
    bestTime: "April-October",
    duration: "2-3 days",
  },
  svaneti: {
    name: "Svaneti",
    description: "Mountain region with towers, hiking, and stargazing",
    highlights: [
      "Svan Towers",
      "Ushguli Village",
      "Hiking Trails",
      "Stargazing",
      "Mestia",
    ],
    bestTime: "May-September",
    duration: "3-4 days",
  },
  borjomi: {
    name: "Borjomi",
    description: "Wellness destination with mineral springs and national park",
    highlights: [
      "Mineral Springs",
      "Borjomi Park",
      "Spa Treatments",
      "Forest Bathing",
      "Cable Car",
    ],
    bestTime: "Year-round",
    duration: "2-3 days",
  },
  adjara: {
    name: "Adjara",
    description: "Black Sea coast with Batumi and subtropical climate",
    highlights: [
      "Batumi",
      "Black Sea",
      "Botanical Garden",
      "Gonio Fortress",
      "Beach Resorts",
    ],
    bestTime: "May-September",
    duration: "2-3 days",
  },
  mtskheta: {
    name: "Mtskheta",
    description: "Ancient capital with UNESCO World Heritage sites",
    highlights: [
      "Svetitskhoveli Cathedral",
      "Jvari Monastery",
      "Ancient Capital",
      "UNESCO Site",
    ],
    bestTime: "Year-round",
    duration: "1 day",
  },
};

const tourTypes = {
  cultural: {
    name: "Cultural Heritage",
    description: "Ancient churches, monasteries, UNESCO sites",
    regions: ["tbilisi", "mtskheta", "kakheti"],
    activities: [
      "Church visits",
      "Monastery tours",
      "Museum visits",
      "Historical sites",
    ],
  },
  culinary: {
    name: "Culinary Adventures",
    description: "Wine tastings, supra feasts, cooking classes",
    regions: ["kakheti", "tbilisi"],
    activities: [
      "Wine tastings",
      "Supra feasts",
      "Cooking classes",
      "Market tours",
    ],
  },
  adventure: {
    name: "Adventure & Nature",
    description: "Hiking, stargazing, mountain expeditions",
    regions: ["svaneti", "borjomi"],
    activities: ["Hiking", "Stargazing", "Mountain climbing", "Nature walks"],
  },
  wellness: {
    name: "Wellness & Relaxation",
    description: "Spa retreats, mineral springs, forest bathing",
    regions: ["borjomi", "adjara"],
    activities: ["Spa treatments", "Mineral springs", "Forest bathing", "Yoga"],
  },
  urban: {
    name: "Urban Exploration",
    description: "Tbilisi, Batumi, Kutaisi city experiences",
    regions: ["tbilisi", "adjara"],
    activities: ["City tours", "Modern architecture", "Nightlife", "Shopping"],
  },
};

// AI Trip Planning Logic
function generateTripRecommendation(userPreferences) {
  const { interests, duration, groupSize, budget, season, activityLevel } =
    userPreferences;

  // Analyze interests to determine tour type
  let recommendedType = "cultural";
  if (
    interests.includes("wine") ||
    interests.includes("food") ||
    interests.includes("culinary")
  ) {
    recommendedType = "culinary";
  } else if (
    interests.includes("hiking") ||
    interests.includes("nature") ||
    interests.includes("mountains")
  ) {
    recommendedType = "adventure";
  } else if (
    interests.includes("spa") ||
    interests.includes("wellness") ||
    interests.includes("relaxation")
  ) {
    recommendedType = "wellness";
  } else if (
    interests.includes("city") ||
    interests.includes("urban") ||
    interests.includes("nightlife")
  ) {
    recommendedType = "urban";
  }

  // Select regions based on tour type and season
  const typeInfo = tourTypes[recommendedType];
  const availableRegions = typeInfo.regions.filter((regionKey) => {
    const region = georgianRegions[regionKey];
    return (
      region.bestTime === "Year-round" ||
      (season && region.bestTime.includes(season)) ||
      !season
    );
  });

  // Create itinerary based on duration
  let itinerary = [];
  let totalDays = 0;

  for (const regionKey of availableRegions) {
    const region = georgianRegions[regionKey];
    const regionDays = Math.min(
      parseInt(region.duration.split("-")[1]),
      duration - totalDays
    );
    if (regionDays > 0 && totalDays < duration) {
      itinerary.push({
        region: region.name,
        days: regionDays,
        highlights: region.highlights.slice(0, 3),
        description: region.description,
      });
      totalDays += regionDays;
    }
    if (totalDays >= duration) break;
  }

  // Calculate estimated cost
  const baseCostPerDay =
    budget === "luxury" ? 200 : budget === "mid-range" ? 120 : 80;
  const groupMultiplier = groupSize > 4 ? 0.9 : groupSize > 2 ? 0.95 : 1;
  const estimatedCost = Math.round(
    totalDays * baseCostPerDay * groupMultiplier * groupSize
  );

  return {
    type: typeInfo.name,
    description: typeInfo.description,
    itinerary,
    estimatedCost,
    totalDays,
    activities: typeInfo.activities,
  };
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "🇬🇪 Hello! I'm your AI travel curator for Georgia. I'll help you plan the perfect Georgian adventure! What type of experience interests you most? (Cultural heritage, wine & food, adventure & nature, wellness, or urban exploration?)",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({});
  const [conversationStep, setConversationStep] = useState("interests");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: "user", content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateAIResponse(
        inputValue.toLowerCase(),
        conversationStep,
        userPreferences
      );
      setMessages([
        ...newMessages,
        { role: "assistant", content: response.message },
      ]);

      if (response.nextStep) {
        setConversationStep(response.nextStep);
      }
      if (response.preferences) {
        setUserPreferences({ ...userPreferences, ...response.preferences });
      }

      setIsLoading(false);
    }, 1000);
  };

  function generateAIResponse(input, step, preferences) {
    switch (step) {
      case "interests":
        return handleInterestsStep(input, preferences);
      case "duration":
        return handleDurationStep(input, preferences);
      case "groupSize":
        return handleGroupSizeStep(input, preferences);
      case "budget":
        return handleBudgetStep(input, preferences);
      case "season":
        return handleSeasonStep(input, preferences);
      case "activityLevel":
        return handleActivityLevelStep(input, preferences);
      case "recommendation":
        return handleRecommendationStep(input, preferences);
      default:
        return {
          message:
            "I'm here to help! What would you like to know about Georgia?",
        };
    }
  }

  function handleInterestsStep(input, preferences) {
    const interests = [];
    if (
      input.includes("cultural") ||
      input.includes("heritage") ||
      input.includes("church") ||
      input.includes("monastery")
    ) {
      interests.push("cultural");
    }
    if (
      input.includes("wine") ||
      input.includes("food") ||
      input.includes("culinary") ||
      input.includes("supra")
    ) {
      interests.push("culinary");
    }
    if (
      input.includes("hiking") ||
      input.includes("nature") ||
      input.includes("mountain") ||
      input.includes("adventure")
    ) {
      interests.push("adventure");
    }
    if (
      input.includes("spa") ||
      input.includes("wellness") ||
      input.includes("relaxation") ||
      input.includes("healing")
    ) {
      interests.push("wellness");
    }
    if (
      input.includes("city") ||
      input.includes("urban") ||
      input.includes("nightlife") ||
      input.includes("modern")
    ) {
      interests.push("urban");
    }

    if (interests.length === 0) {
      return {
        message:
          "Great! I can help you with any of these experiences:\n\n🍷 **Culinary Adventures** - Wine tastings, supra feasts, cooking classes\n🏛️ **Cultural Heritage** - Ancient churches, monasteries, UNESCO sites\n🏔️ **Adventure & Nature** - Hiking, stargazing, mountain expeditions\n🧘 **Wellness & Relaxation** - Spa retreats, mineral springs, forest bathing\n🏙️ **Urban Exploration** - City tours, modern architecture, nightlife\n\nWhich one sounds most appealing to you?",
        nextStep: "interests",
      };
    }

    return {
      message: `Excellent choice! ${interests
        .map((i) => tourTypes[i].name)
        .join(
          " and "
        )} experiences are amazing in Georgia. How many days are you planning to spend in Georgia?`,
      nextStep: "duration",
      preferences: { interests },
    };
  }

  function handleDurationStep(input, preferences) {
    const duration = parseInt(input.match(/\d+/)?.[0]) || 0;
    if (duration < 1 || duration > 14) {
      return {
        message:
          "I'd recommend 3-10 days for a great Georgian experience. How many days would you like to spend?",
        nextStep: "duration",
      };
    }

    return {
      message: `Perfect! ${duration} days will give you a wonderful taste of Georgia. How many people will be traveling?`,
      nextStep: "groupSize",
      preferences: { ...preferences, duration },
    };
  }

  function handleGroupSizeStep(input, preferences) {
    const groupSize = parseInt(input.match(/\d+/)?.[0]) || 1;
    if (groupSize < 1 || groupSize > 20) {
      return {
        message:
          "Please let me know how many people will be traveling (1-20 people).",
        nextStep: "groupSize",
      };
    }

    return {
      message: `Great! Traveling with ${groupSize} ${
        groupSize === 1 ? "person" : "people"
      } will be wonderful. What's your budget range per person per day?\n\n💰 **Budget-friendly**: $50-80\n💎 **Mid-range**: $80-150\n👑 **Luxury**: $150+`,
      nextStep: "budget",
      preferences: { ...preferences, groupSize },
    };
  }

  function handleBudgetStep(input, preferences) {
    let budget = "mid-range";
    if (
      input.includes("budget") ||
      input.includes("50") ||
      input.includes("80")
    ) {
      budget = "budget-friendly";
    } else if (
      input.includes("luxury") ||
      input.includes("150") ||
      input.includes("premium")
    ) {
      budget = "luxury";
    }

    return {
      message: `Perfect! ${
        budget === "budget-friendly"
          ? "Budget-friendly"
          : budget === "luxury"
          ? "Luxury"
          : "Mid-range"
      } options will work great. What season are you planning to visit?\n\n🌸 **Spring** (March-May)\n☀️ **Summer** (June-August)\n🍂 **Autumn** (September-November)\n❄️ **Winter** (December-February)`,
      nextStep: "season",
      preferences: { ...preferences, budget },
    };
  }

  function handleSeasonStep(input, preferences) {
    let season = "";
    if (
      input.includes("spring") ||
      input.includes("march") ||
      input.includes("april") ||
      input.includes("may")
    ) {
      season = "Spring";
    } else if (
      input.includes("summer") ||
      input.includes("june") ||
      input.includes("july") ||
      input.includes("august")
    ) {
      season = "Summer";
    } else if (
      input.includes("autumn") ||
      input.includes("fall") ||
      input.includes("september") ||
      input.includes("october") ||
      input.includes("november")
    ) {
      season = "Autumn";
    } else if (
      input.includes("winter") ||
      input.includes("december") ||
      input.includes("january") ||
      input.includes("february")
    ) {
      season = "Winter";
    }

    return {
      message: `Excellent! ${
        season || "That season"
      } is a wonderful time to visit Georgia. What's your preferred activity level?\n\n🚶 **Easy** - Relaxed pace, minimal walking\n🚶‍♂️ **Moderate** - Some hiking, city walking\n🏃‍♂️ **Challenging** - Mountain hiking, adventure activities`,
      nextStep: "activityLevel",
      preferences: { ...preferences, season },
    };
  }

  function handleActivityLevelStep(input, preferences) {
    let activityLevel = "moderate";
    if (
      input.includes("easy") ||
      input.includes("relaxed") ||
      input.includes("minimal")
    ) {
      activityLevel = "easy";
    } else if (
      input.includes("challenging") ||
      input.includes("adventure") ||
      input.includes("hiking")
    ) {
      activityLevel = "challenging";
    }

    const finalPreferences = { ...preferences, activityLevel };
    const recommendation = generateTripRecommendation(finalPreferences);

    return {
      message: `Perfect! Based on your preferences, here's your personalized Georgian adventure:\n\n🎯 **${
        recommendation.type
      } Experience**\n${recommendation.description}\n\n📅 **${
        recommendation.totalDays
      }-Day Itinerary:**\n${recommendation.itinerary
        .map(
          (item) =>
            `• **${item.region}** (${item.days} days) - ${item.highlights.join(
              ", "
            )}`
        )
        .join("\n")}\n\n💰 **Estimated Cost**: $${
        recommendation.estimatedCost
      } total for your group\n\n🎯 **Key Activities**: ${recommendation.activities.join(
        ", "
      )}\n\nWould you like me to customize this further or would you like to contact our team to book this amazing adventure?`,
      nextStep: "recommendation",
      preferences: finalPreferences,
    };
  }

  function handleRecommendationStep(input, preferences) {
    if (
      input.includes("book") ||
      input.includes("contact") ||
      input.includes("team")
    ) {
      return {
        message: `Fantastic! Our team is ready to help you book this amazing Georgian adventure! 🎉\n\n📞 **Contact us:**\n• Email: hello@mustseegeorgia.com\n• Phone: +995 32 123 4567\n• Website: Contact form\n\nWe'll create a detailed itinerary and handle all the arrangements for you. Can't wait to welcome you to Georgia! 🇬🇪✨`,
      };
    } else if (
      input.includes("customize") ||
      input.includes("change") ||
      input.includes("different")
    ) {
      return {
        message:
          "Of course! Let's customize your trip. What would you like to change? (Interests, duration, budget, or regions?)",
        nextStep: "interests",
      };
    } else {
      return {
        message:
          "I'm here to help! Would you like to book this trip, customize it further, or plan something completely different?",
      };
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 transition-all hover:bg-brand-dark hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 h-96 w-80 rounded-3xl border border-slate-200/70 bg-white/95 shadow-2xl backdrop-blur-sm">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-200/70 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-brand/20 flex items-center justify-center">
                <svg
                  className="h-4 w-4 text-brand-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Travel Curator</h3>
                <p className="text-xs text-slate-500">Online now</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-slate-400 hover:text-slate-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-brand text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200/70 p-4"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your dream Georgian tour..."
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="rounded-2xl bg-brand px-4 py-2 text-white disabled:opacity-50 hover:bg-brand-dark transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
