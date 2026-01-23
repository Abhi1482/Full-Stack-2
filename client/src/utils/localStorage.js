// localStorage utility for workspace persistence

const STORAGE_KEY = 'student_workspace_data';

export const saveWorkspace = (components) => {
  try {
    const data = JSON.stringify(components);
    localStorage.setItem(STORAGE_KEY, data);
    return true;
  } catch (error) {
    console.error('Failed to save workspace:', error);
    return false;
  }
};

export const loadWorkspace = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load workspace:', error);
    return [];
  }
};

export const clearWorkspace = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear workspace:', error);
    return false;
  }
};

export const exportWorkspace = () => {
  const components = loadWorkspace();
  const dataStr = JSON.stringify(components, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `workspace-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

export const importWorkspace = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const components = JSON.parse(e.target.result);
        saveWorkspace(components);
        resolve(components);
      } catch (error) {
        reject(new Error('Invalid workspace file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
