import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: "Please sign in before starting verification." }, { status: 401 });
    }

    const apiKey = process.env.DIDIT_API_KEY;
    const workflowId = process.env.DIDIT_WORKFLOW_ID;

    if (!apiKey || !workflowId) {
      console.error("DIDIT ENV ERROR: Missing API key or workflow ID");
      return Response.json({ error: "Didit environment variables are missing" }, { status: 500 });
    }

    const response = await fetch("https://verification.didit.me/v3/session/", {
      method: "POST",
      headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ workflow_id: workflowId, vendor_data: user.id }),
    });

    const responseText = await response.text();
    let data: unknown;
    try { data = JSON.parse(responseText); } catch { data = responseText; }

    if (!response.ok) {
      console.error("DIDIT ERROR:", response.status, data);
      return Response.json({ error: "Didit session creation failed", details: data }, { status: response.status });
    }

    const session = data as { url?: string; session_id?: string };
    if (!session.url || !session.session_id) {
      return Response.json({ error: "Didit returned an invalid session response" }, { status: 502 });
    }

    const { error: dbError } = await supabase.from("kyc_verifications").upsert({
      user_id: user.id,
      didit_session_id: session.session_id,
      status: "IN_PROGRESS",
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

    if (dbError) {
      console.error("KYC DATABASE ERROR:", dbError.message);
      return Response.json({ error: "Could not save verification status" }, { status: 500 });
    }

    return Response.json({ url: session.url, session_id: session.session_id });
  } catch (error) {
    console.error("DIDIT SERVER ERROR:", error);
    return Response.json({ error: "Failed to create Didit session" }, { status: 500 });
  }
}
