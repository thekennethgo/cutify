const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const searchTracks = async (query) => {
  const params = new URLSearchParams({
    method: 'track.search',
    track: query,
    api_key: LASTFM_API_KEY,
    format: 'json',
    limit: 5
  });

  try {
    const response = await fetch(`${LASTFM_BASE_URL}?${params}`);
    const data = await response.json();
    
    return data.results.trackmatches.track.map(track => ({
      name: track.name,
      artist: track.artist,
    }));
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};