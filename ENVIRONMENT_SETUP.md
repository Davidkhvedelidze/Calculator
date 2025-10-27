# Environment Setup

## Required Environment Variables

To enable the OpenAI chat functionality, you need to set up the following environment variable:

### 1. Create `.env.local` file
Create a `.env.local` file in the project root with your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

### 3. Optional Configuration
You can also specify the OpenAI model:

```bash
OPENAI_MODEL=gpt-4o-mini
```

## Fallback System

The chat widget includes a built-in fallback system that works even without the OpenAI API key. When the API key is not available or the quota is exceeded, the system automatically switches to built-in Georgian travel expertise.

## Security Note

Never commit your actual API key to version control. The `.env.local` file is already in `.gitignore` to prevent accidental commits.

## Testing

After setting up the environment variables, restart your development server:

```bash
npm run dev
```

The chat widget will automatically detect the API key and use the appropriate response system.
