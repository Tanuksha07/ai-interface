import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, model, temperature, maxTokens } = await req.json();

    const lastMessage = messages[messages.length - 1]?.content || "Hello";

    // Fake AI reply including model and parameters
    const fakeReply = {
      choices: [
        {
          message: {
            role: "assistant",
            content: `
                    Model: ${model}
                    Temperature: ${temperature}
                    Max Tokens: ${maxTokens}

                    Your Message: "${lastMessage}"

                    🤖 This is a mock AI response.

                    ──────
                    Note: This is a simulated/mock response to make the UI appear realistic and polished.
                    We are not calling the actual OpenAI API. This approach is fully valid for frontend-only prototypes.
                    ──────
                  `.trim(),
          },
        },
      ],
    };

    return NextResponse.json(fakeReply);
  } catch (error) {
    console.error("Mock API error:", error);
    return NextResponse.json(
      { error: "Mock server error" },
      { status: 500 }
    );
  }
}
