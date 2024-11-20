'use client';

export default function GlobalError({ reset }: { /* error: Error & { digest?: string }; */ reset: () => void }) {
    return (
        <>
            <h2>Something went globally wrong with your Application session!</h2>
            <button onClick={() => reset()}>Try again</button>
        </>
    );
}
