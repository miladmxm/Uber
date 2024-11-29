export async function POST(request: Request) {
  try {
    const { name, email, clerkId } = await request.json();
    if (!name || !email || clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const response = await fetch("http://192.168.202.187:5001", {
      method: "POST",
      body: JSON.stringify({ name, email, clerk_id: clerkId }),
    });
    const jsonResponse = await response.json();
    return new Response(JSON.stringify({ data: jsonResponse }), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ error: err }, { status: 500 });
  }
}
