const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const getYouTubeVideo = async (title, artist) => {

    const query = `${title} ${artist} audio lyrics`;
    const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        videoCategoryId: '10', // Music category
        maxResults: '1',
        key: YOUTUBE_API_KEY
    });
  
    try {
        const response = await fetch(
            `${YOUTUBE_API_URL}?${params}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const video = data.items[0];
            return {
            id: video.id.videoId,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle
            };
        }
        return null;
    } catch (error) {
        console.error('Error searching YouTube:', error);
        return null;
    }
  };