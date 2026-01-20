import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/layout/Sidebar';
import Canvas from './components/layout/Canvas';
import ConfigPanel from './components/layout/ConfigPanel';
import Breadcrumb from './components/layout/Breadcrumb';
import FileViewerModal from './components/ui/FileViewerModal';
import { useWorkspace } from './hooks/useWorkspace';
import './App.css';

function App() {
  const {
    components,
    selectedId,
    setSelectedId,
    addComponent,
    updateComponent,
    deleteComponent,
    getComponent,
  } = useWorkspace();

  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [currentContext, setCurrentContext] = useState(null); // null = root workspace
  const [navigationStack, setNavigationStack] = useState([]); // Breadcrumb trail
  const [fileViewerComponent, setFileViewerComponent] = useState(null); // For file viewer modal

  const handleDrop = (item, parentId, position) => {
    // When in a context, use that as parent if no specific parent is provided
    const finalParent = parentId !== undefined ? parentId : currentContext;
    const finalPosition = position || { x: 100, y: 100 };

    // Add new component
    const newId = addComponent(item.type, finalParent, finalPosition);

    // Select the newly added component
    setSelectedId(newId);
    setShowConfigPanel(true);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    setShowConfigPanel(true);
  };

  const handleCloseConfig = () => {
    setSelectedId(null);
    setShowConfigPanel(false);
  };

  // Handle double-click to drill into a component
  const handleDrillDown = (component) => {
    // Only allow drilling into Course, Part, and Subject
    if (['course', 'part', 'subject'].includes(component.type)) {
      setCurrentContext(component.id);
      setNavigationStack([...navigationStack, { id: component.id, title: component.title }]);
      setShowConfigPanel(false);
      setSelectedId(null);
    }
  };

  // Handle single click on Notes/Assignment to view files
  const handleViewFiles = (component) => {
    if (['notes', 'assignment'].includes(component.type)) {
      setFileViewerComponent(component);
    }
  };

  // Handle breadcrumb navigation
  const handleNavigate = (contextId) => {
    if (contextId === null) {
      // Navigate to root
      setCurrentContext(null);
      setNavigationStack([]);
    } else {
      // Navigate to specific context in the stack
      const index = navigationStack.findIndex(item => item.id === contextId);
      if (index !== -1) {
        setCurrentContext(contextId);
        setNavigationStack(navigationStack.slice(0, index + 1));
      }
    }
    setShowConfigPanel(false);
    setSelectedId(null);
  };

  const selectedComponent = getComponent(selectedId);
  const currentContextComponent = getComponent(currentContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-layout">
        <Sidebar currentContext={currentContextComponent} />
        <div className="app-main">
          <Breadcrumb
            navigationStack={navigationStack}
            onNavigate={handleNavigate}
          />
          <Canvas
            components={components}
            currentContext={currentContext}
            onDrop={handleDrop}
            onSelect={handleSelect}
            onViewFiles={handleViewFiles}
            onDrillDown={handleDrillDown}
            selectedId={selectedId}
          />
        </div>
        {showConfigPanel && (
          <ConfigPanel
            component={selectedComponent}
            onUpdate={updateComponent}
            onDelete={deleteComponent}
            onClose={handleCloseConfig}
          />
        )}
        {fileViewerComponent && (
          <FileViewerModal
            component={fileViewerComponent}
            onClose={() => setFileViewerComponent(null)}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
