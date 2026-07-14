export const fetchWithRefresh = async (uri, options = { ...options, credentials: "include" }) => {
  let response = await fetch(uri, options);

  if (response.status === 401) {
    const refresh = await fetch("http://localhost:7000/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refresh.ok) {
      response = await fetch(uri, options);
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  return response;
};
