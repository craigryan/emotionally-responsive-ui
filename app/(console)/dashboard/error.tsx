'use client';

import React from 'react';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div>
            <h2>Something went wrong with your new Dashboard</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the 'tasks' segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
