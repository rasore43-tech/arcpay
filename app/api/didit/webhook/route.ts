import crypto from "node:crypto";

function canonical(value: any): string {
  if (Array.isArray(value)) {
    return `[${value.map(canonical).join(",")}]`;
  }

  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

export async function POST(request: Request) {
  try {
    const secret = process.env.DIDIT_WEBHOOK_SECRET;

    if (!secret) {
      return Response.json(
        { error: "Webhook secret is missing" },
        { status: 500 }
      );
    }

    const bodyText = await request.text();
    const body = JSON.parse(bodyText);

    const signature = request.headers.get("x-signature-v2");
    const timestamp = request.headers.get("x-timestamp");

    if (!signature || !timestamp) {
      return Response.json({ error: "Missing signature" }, { status: 401 });
    }

    const bodyTimestamp = String(body.timestamp ?? "");

    if (bodyTimestamp !== timestamp) {
      return Response.json({ error: "Invalid timestamp" }, { status: 401 });
    }

    if (Math.abs(Date.now() / 1000 - Number(body.timestamp)) > 300) {
      return Response.json({ error: "Webhook expired" }, { status: 401 });
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(canonical(body), "utf8")
      .digest("hex");

    const valid =
      signature.length === expected.length &&
      crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expected)
      );

    if (!valid) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (body.webhook_type !== "status.updated") {
      return Response.json({ received: true });
    }

    const userId = body.vendor_data;
    const status = body.status;

    if (!userId || !status) {
      return Response.json(
        { error: "Missing KYC data" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return Response.json(
        { error: "Supabase service configuration is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`,
      {
        method: "PATCH",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          verification_status: status,
          didit_session_id: body.session_id ?? null,
          updated_at: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      console.error("PROFILE UPDATE ERROR:", await response.text());

      return Response.json(
        { error: "Database update failed" },
        { status: 500 }
      );
    }

    console.log("DIDIT KYC STATUS UPDATED:", status);

    return Response.json({ received: true });
  } catch (error) {
    console.error("DIDIT WEBHOOK ERROR:", error);

    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
