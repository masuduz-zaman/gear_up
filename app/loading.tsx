import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const GlobalLoading = () => {
    const [progress, setProgress] = React.useState(13)
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <Spinner className="size-8" />
            <p>Loading data...</p>
        </div>
    );
};

export default GlobalLoading;