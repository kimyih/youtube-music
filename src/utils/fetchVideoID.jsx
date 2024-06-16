const API_KEY = 'AIzaSyC_9paGhSpgsO2dkNhB5uzHpRhGoXiINr4';

export const fetchVideoID = async (query) => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${API_KEY}`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
        return data.items.map(item => ({
            videoID: item.id.videoId,
            title: item.snippet.title,
            artist: item.snippet.channelTitle,
            imageURL: item.snippet.thumbnails.default.url,
        }));
    }
    return [];
};