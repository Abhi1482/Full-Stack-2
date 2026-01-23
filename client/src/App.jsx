import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/layout/Sidebar';
import Canvas from './components/layout/Canvas';
import ConfigPanel from './components/layout/ConfigPanel';
import Breadcrumb from './components/layout/Breadcrumb';
import FileViewerModal from './components/ui/FileViewerModal';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import { useWorkspace } from './hooks/useWorkspace';
import { useAuth } from './hooks/useAuth.jsx';
import { useCursorEffect } from './hooks/useCursorEffect';
import './App.css';

function App() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  const {
    components,
    selectedId,
    setSelectedId,
    addComponent,
    updateComponent,
    deleteComponent,
    getComponent,
  } = useWorkspace();

  // Activate custom cursor effect
  useCursorEffect();

  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [currentContext, setCurrentContext] = useState(null); // null = root workspace
  const [navigationStack, setNavigationStack] = useState([]); // Breadcrumb trail
  const [fileViewerComponent, setFileViewerComponent] = useState(null); // For file viewer modal

  const handleDrop = async (item, parentId, position) => {
    // When in a context, use that as parent if no specific parent is provided
    const finalParent = parentId !== undefined ? parentId : currentContext;
    const finalPosition = position || { x: 100, y: 100 };

    // Hierarchy Validation
    const parentComponent = currentContextComponent; // Using the component from line 106 if in context

    if (!parentComponent) {
      // Root level: Only "course" allowed
      if (item.type !== 'course') {
        alert('Root level can only contain Courses.');
        return;
      }
    } else {
      // Component Level Validation
      const parentType = parentComponent.type;

      switch (parentType) {
        case 'course':
          if (item.type !== 'part') {
            alert('Courses can only contain Parts.');
            return;
          }
          break;
        case 'part':
          if (item.type !== 'subject') {
            alert('Parts can only contain Subjects.');
            return;
          }
          break;
        case 'subject':
          const allowedTypes = ['notes', 'assignment', 'ai component', 'test'];
          if (!allowedTypes.includes(item.type)) {
            alert('Subjects can only contain Notes, Assignments, AI Components, or Tests.');
            return;
          }
          break;
        default:
          alert(`You cannot add items to a ${parentType}.`);
          return;
      }
    }

    // Add new component
    try {
      const newId = await addComponent(item.type, finalParent, finalPosition);

      if (newId) {
        // Select the newly added component
        setSelectedId(newId);
        setShowConfigPanel(true);
      }
    } catch (error) {
      console.error("Failed to add component:", error);
      alert("Failed to add component. Please try again.");
    }
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

  // Show authentication pages if not logged in
  if (!isAuthenticated && !authLoading) {
    if (showRegister) {
      return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <LoginPage onSwitchToRegister={() => setShowRegister(true)} />;
  }

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
