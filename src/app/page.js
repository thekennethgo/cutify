'use client';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Cutify</h1>
      <div className="w-full max-w-2xl">
        <SearchBar onSongSelect={setSelectedSong} />

        {selectedSong && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">{selectedSong.name}</h2>
            <p className="text-gray-600">{selectedSong.artist}</p>
          </div>
        )}
      </div>
    </div>
  );
}
