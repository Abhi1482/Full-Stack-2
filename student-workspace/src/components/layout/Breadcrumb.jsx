import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

const Breadcrumb = ({ navigationStack, onNavigate }) => {
    return (
        <div className="breadcrumb">
            <button
                className="breadcrumb-item root"
                onClick={() => onNavigate(null)}
            >
                <Home size={16} />
                <span>Workspace</span>
            </button>

            {navigationStack.map((item, index) => (
                <React.Fragment key={item.id}>
                    <ChevronRight size={16} className="breadcrumb-separator" />
                    <button
                        className={`breadcrumb-item ${index === navigationStack.length - 1 ? 'active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        {item.title}
                    </button>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;
