'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CutPage() {

    const router = useRouter();
    const [song, setSong] = useState(null);

    useEffect(() => {
        const songData = JSON.parse(localStorage.getItem('selectedSong'));
        if (!songData) {
            router.push('/');
        }
        setSong(songData);
    }, [router]);

    if (!song) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => router.push('/')}> Return </button>
            <h1>Cut Page</h1>
            <h2>{song.title}</h2>
            <h2>{song.artist}</h2>
        </div>
    );
}