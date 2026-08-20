import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const GlobalLoading = () => {
    return (
        <div className="flex items-center gap-6">
            <Spinner className="size-8" />
        </div>
    );
};

export default GlobalLoading;