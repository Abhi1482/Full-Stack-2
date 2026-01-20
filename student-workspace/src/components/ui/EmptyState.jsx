import React from 'react';
import './EmptyState.css';
import { ArrowDown, MousePointer2 } from 'lucide-react';

const EmptyState = () => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <MousePointer2 size={64} strokeWidth={1.5} />
                <ArrowDown size={32} className="arrow-animation" />
            </div>
            <h2>Start Building Your Workspace</h2>
            <p className="text-muted">
                Drag components from the left sidebar to create your academic organization system
            </p>
            <div className="empty-state-hints">
                <div className="hint">
                    <span className="hint-number">1</span>
                    <span>Add a Course to begin</span>
                </div>
                <div className="hint">
                    <span className="hint-number">2</span>
                    <span>Nest Parts and Subjects inside</span>
                </div>
                <div className="hint">
                    <span className="hint-number">3</span>
                    <span>Add Notes, Assignments, and Tests</span>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
