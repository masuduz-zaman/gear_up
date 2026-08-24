import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const GlobalLoading = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <Spinner className="size-8" />
            <p>Loading data...</p>
        </div>
    );
};

export default GlobalLoading;