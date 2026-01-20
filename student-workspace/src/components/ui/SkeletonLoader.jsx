import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ count = 3 }) => {
    return (
        <div className="skeleton-container">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="skeleton-card">
                    <div className="skeleton-header">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-title"></div>
                    </div>
                    <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
