const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const MODEL = 'gemini-2.0-flash'; // Using the faster flash model for quick responses

export const generateChatResponse = async (
  message: string, 
  signal: AbortSignal
): Promise<string> => {
    try {
        const response = await fetch(
            `${BASE_URL}/models/${MODEL}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                }),
                signal // Pass the abort signal to fetch
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to get response');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw error; // Re-throw abort errors
        }
        console.error('Error details:', error);
        throw new Error(error.message || 'Failed to get response from Gemini');
    }
};
