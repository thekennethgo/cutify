import { useState, useEffect } from 'react';
import { searchTracks } from '../utils/lastfm';

export default function SearchBar({ onSongSelect }) {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSongSelect = async (song) => {
      setIsLoading(true);
      
      const songData = {
        title: song.name,
        artist: song.artist
      }
      localStorage.setItem('selectedSong', JSON.stringify(songData));
      onSongSelect(songData);

      setIsLoading(false);
    };

  useEffect(() => {
    const searchSongs = async () => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        try {
          const results = await searchTracks(query);
          setSongs(results);
        } catch (error) {
          console.error('Error searching songs:', error);
        }
        setIsLoading(false);
      } else {
        setSongs([]);
      }
    };

    const timeoutId = setTimeout(searchSongs, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
      />
      {isLoading && <div>Loading...</div>}
      <ul className="mt-4">
        {songs.map((song) => (
          <li
            key={`${song.artist}-${song.name}`}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSongSelect(song)}
          >
            <div className="font-medium">{song.name}</div>
            <div className="text-sm text-gray-600">{song.artist}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}