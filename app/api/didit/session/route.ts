export async function POST() {
  try {
    const apiKey = process.env.DIDIT_API_KEY;
    const workflowId = process.env.DIDIT_WORKFLOW_ID;

    if (!apiKey || !workflowId) {
      console.error("DIDIT ENV ERROR: Missing API key or workflow ID");

      return Response.json(
        { error: "Didit environment variables are missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://verification.didit.me/v3/session/",
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workflow_id: workflowId,
          vendor_data: "arcpay-user",
        }),
      }
    );

    const responseText = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    if (!response.ok) {
      console.error("DIDIT ERROR:", response.status, data);

      return Response.json(
        {
          error: "Didit session creation failed",
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }

    console.log("DIDIT SESSION CREATED");

    const session = data as {
      url?: string;
      session_id?: string;
    };

    return Response.json({
      url: session.url,
      session_id: session.session_id,
    });
  } catch (error) {
    console.error("DIDIT SERVER ERROR:", error);

    return Response.json(
      { error: "Failed to create Didit session" },
      { status: 500 }
    );
  }
}
