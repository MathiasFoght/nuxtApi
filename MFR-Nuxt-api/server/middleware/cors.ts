export default defineEventHandler((event) => {
  // Tilføj CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "origin, content-type, accept, x-requested-with",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };
  setHeaders(event, headers);

  //Håndter OPTIONS forespørgsler
  if (event.node.req.method === "OPTIONS") {
    event.node.res.statusCode = 204;
    event.node.res.end();
    return;
  }
});
