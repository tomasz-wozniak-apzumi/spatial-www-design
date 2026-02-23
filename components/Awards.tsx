import React from 'react';

interface AwardsProps {
    version?: 'v1' | 'v2' | 'v3';
}

const Awards: React.FC<AwardsProps> = ({ version = 'v1' }) => {
    // Only show this in v2 as requested after Hero in the prompt context
    if (version !== 'v2') return null;

    return (
        <div className="bg-white py-8 border-b border-gray-100 flex justify-center items-center overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-center items-center">
                <img
                    src="/images/awards.png"
                    alt="Our Awards"
                    className="h-16 md:h-20 lg:h-24 object-contain"
                />
            </div>
        </div>
    );
};

export default Awards;
