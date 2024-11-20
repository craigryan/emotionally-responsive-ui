'use client';

import React from 'react';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div>
            <h2>Something went wrong with your new Application!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
