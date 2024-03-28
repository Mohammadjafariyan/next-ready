export async function GET (req: Request) {
  // Handle GET request

  if (req.method === 'GET') {
    // Your logic to fetch or generate data
    const data = {
      message: 'This is a sample response from the API endpoint',
      timestamp: new Date().toISOString(),
    };

    // Send the data as JSON response
    return Response.json(data);
  } else {
    // Handle other HTTP methods
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
    });
  }
}
