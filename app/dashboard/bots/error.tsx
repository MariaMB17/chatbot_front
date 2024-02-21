'use client';

import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-center">Algo salió mal!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render
                    () => reset()
                }
            >
                Intentar otra vez
            </button>
        </main>
    );
}