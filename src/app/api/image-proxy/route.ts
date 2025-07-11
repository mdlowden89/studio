
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const imageBlob = await response.blob();
    
    // We create a new response with the image data and appropriate headers.
    // This response is coming from our own domain, so CORS is no longer an issue for the client.
    const headers = new Headers();
    headers.set('Content-Type', imageBlob.type);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(imageBlob, { headers });

  } catch (error: any) {
    console.error('Image Proxy Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to proxy image' }, { status: 502 });
  }
}
