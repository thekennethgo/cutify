'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getYouTubeVideo } from '@/utils/youtube';
import YouTube from 'react-youtube';

export default function CutPage() {

    const router = useRouter();
    const [song, setSong] = useState(null);
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const songData = JSON.parse(localStorage.getItem('selectedSong'));
        if (!songData) {
            router.push('/');
        }
        setSong(songData);
    }, [router]);

    useEffect(() => {
        if (song) {
            const fetchVideo = async () => {
                const video = await getYouTubeVideo(song.title, song.artist);
                setVideo(video);
                setIsLoading(false);
            }
            fetchVideo();
        }
    }, [song]);

    if (!song) {
        return <div>Loading...</div>;
    }

    const opts = {
        height: '640',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div>
            <button onClick={() => router.push('/')}> Return </button>
            <h1>Cut Page</h1>
            <h2>{song.title}</h2>
            <h2>{song.artist}</h2>

            {isLoading ? (
                <div>Loading...</div>
            ):(
                <div>
                    <YouTube
                        videoId={video.id}
                        opts={opts}
                        className="w-full"
                        iframeClassName="w-full h-full"
                    />
                </div>
            )}
        </div>
    );
}