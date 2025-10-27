# AI-Powered Chat Widget

## Overview

The chat widget is a fixed-position AI assistant that helps customers build personalized tours in Georgia. It uses built-in AI logic with comprehensive Georgian travel expertise to provide intelligent tour recommendations without requiring external APIs.

## Features

- **Fixed Position**: Always visible in the bottom-right corner
- **Smart Trip Planning**: Step-by-step conversation to understand preferences
- **Georgian Expertise**: Built-in knowledge of regions, attractions, and experiences
- **Personalized Recommendations**: Custom itineraries based on user preferences
- **Cost Estimation**: Automatic budget calculations
- **Responsive Design**: Matches the website's design system perfectly

## How It Works

### AI Trip Planning Logic

The chat widget uses sophisticated logic to:

1. **Understand Interests**: Analyzes user input for tour type preferences
2. **Gather Requirements**: Collects duration, group size, budget, season, activity level
3. **Generate Recommendations**: Creates personalized itineraries with:
   - Region selection based on interests and season
   - Day-by-day breakdown
   - Highlight attractions
   - Cost estimates
   - Activity suggestions

### Conversation Flow

1. **Interests** → What type of experience appeals to you?
2. **Duration** → How many days will you spend?
3. **Group Size** → How many people are traveling?
4. **Budget** → What's your budget range?
5. **Season** → When are you planning to visit?
6. **Activity Level** → What's your preferred pace?
7. **Recommendation** → Personalized itinerary and booking options

### Georgian Regions & Experiences

**Regions Covered:**

- **Tbilisi**: Capital city with old town and modern districts
- **Kakheti**: Wine region with vineyards and monasteries
- **Svaneti**: Mountain region with towers and hiking
- **Borjomi**: Wellness destination with mineral springs
- **Adjara**: Black Sea coast with Batumi
- **Mtskheta**: Ancient capital with UNESCO sites

**Tour Types:**

- **Cultural Heritage**: Churches, monasteries, UNESCO sites
- **Culinary Adventures**: Wine tastings, supra feasts, cooking classes
- **Adventure & Nature**: Hiking, stargazing, mountain expeditions
- **Wellness & Relaxation**: Spa retreats, mineral springs, forest bathing
- **Urban Exploration**: City tours, modern architecture, nightlife

## Technical Implementation

### Chat Widget Component (`components/ChatWidget.jsx`)

- **State Management**: Tracks conversation step and user preferences
- **AI Logic**: Built-in functions for each conversation step
- **Recommendation Engine**: Generates personalized itineraries
- **Cost Calculator**: Estimates total trip costs based on preferences
- **UI/UX**: Smooth animations and responsive design

### Key Functions

- `generateTripRecommendation()`: Creates personalized itineraries
- `handleInterestsStep()`: Processes interest preferences
- `handleDurationStep()`: Validates and stores trip duration
- `handleGroupSizeStep()`: Manages group size requirements
- `handleBudgetStep()`: Determines budget category
- `handleSeasonStep()`: Identifies travel season
- `handleActivityLevelStep()`: Sets activity preferences
- `handleRecommendationStep()`: Generates final recommendations

## Customization

### Adding New Regions

Edit the `georgianRegions` object to add new destinations:

```javascript
newRegion: {
  name: "Region Name",
  description: "Description of the region",
  highlights: ["Attraction 1", "Attraction 2"],
  bestTime: "Season or Year-round",
  duration: "X-Y days"
}
```

### Adding New Tour Types

Update the `tourTypes` object to include new experience categories:

```javascript
newType: {
  name: "Tour Type Name",
  description: "Description of experiences",
  regions: ["region1", "region2"],
  activities: ["Activity 1", "Activity 2"]
}
```

### Modifying Cost Calculations

Adjust the cost calculation logic in `generateTripRecommendation()`:

```javascript
const baseCostPerDay =
  budget === "luxury" ? 200 : budget === "mid-range" ? 120 : 80;
```

## No External Dependencies

- **No API Keys Required**: Works immediately without setup
- **No External Services**: All logic runs client-side
- **Instant Responses**: No network delays
- **Always Available**: Works offline and online

## Benefits

- **Immediate Setup**: No configuration required
- **Reliable**: No external API dependencies
- **Fast**: Instant responses
- **Customizable**: Easy to modify and extend
- **Cost-Effective**: No API usage fees
- **Privacy-Focused**: All data stays local
