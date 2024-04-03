import React, { useState, useRef } from 'react';
import tingting from "./mixkit-bell-notification-933.wav";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current?.pause(); 
        } else {
            audioRef.current?.play(); 
        }
        setIsPlaying(prevState => !prevState); 
    };

    const handleEnded = () => {
        setIsPlaying(false); 
    };

    return (
        <div>
            <audio ref={audioRef} controls onEnded={handleEnded}>
                <source src={tingting} type="audio/mpeg" />
            </audio>

            <button onClick={toggleAudio}>
                {isPlaying ? 'OFF' : 'ON'}
            </button>
        </div>
    );
}
