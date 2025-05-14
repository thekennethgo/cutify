'use client';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [selectedSong, setSelectedSong] = useState(null);
  const router = useRouter();

  const cutSong = () => {    
    router.push(`/cut`);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Cutify</h1>
      <div className="w-full max-w-2xl">
        {selectedSong && (
          <div className="flex flex-row justify-between mb-8 p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">{selectedSong.title}</h2>
              <p className="text-gray-600">{selectedSong.artist}</p>
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={cutSong}> Cut song </button>
          </div>
        )}
        <SearchBar onSongSelect={setSelectedSong} />
      </div>
    </div>
  );
}
