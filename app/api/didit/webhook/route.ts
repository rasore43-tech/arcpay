export async function POST(request: Request) {
  try {
    const body = await request.text();

    console.log("DIDIT WEBHOOK RECEIVED:", body);

    return Response.json({ received: true });
  } catch (error) {
    console.error("DIDIT WEBHOOK ERROR:", error);

    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
