import React from 'react';

interface CardProps {
    genre: string;
    number: number;
    flipped?: boolean;
}

export const Card: React.FC<CardProps> = ({genre, number, flipped}) => {
    return (
        <div className="relative h-10 w-10">
            {/*<img src={`/images/${genre}-${number}.jpg`} alt={`${genre}-${number}`} className="h-20 w-20"/>*/}
            <div
                className="absolute inset-0 flex items-center justify-center text-lg font-bold">{flipped ? `${number}` : 'XX'}</div>
        </div>
    );
}

interface GenderedProps {
    number: number;
    flipped: boolean;
}

export const Hat: React.FC<GenderedProps> = ({flipped, number}) => {
    const genre = `hat`;
    return (
        <Card genre={genre} number={number} flipped={flipped} key={`{genre}{number}`}/>
    );
}

export const Rabbit: React.FC<GenderedProps> = ({number, flipped}) => {
    const genre = `rabbit`;
    return (
        <Card number={number} genre={genre} flipped={flipped}/>
    );
}

