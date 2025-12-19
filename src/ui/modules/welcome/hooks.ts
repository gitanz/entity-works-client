import { ModuleIds } from "..";
import { useShellContext } from "../../shell/ShellContext";
import type { ProjectPath } from "../../types";
import { useWelcomeContext } from "./WelcomeContext";

export const useWorkspace = () => {

  const {setWorkspacePath, setActivatedModuleId} = useShellContext();

  const welcomeContext = useWelcomeContext()

  const setWorkspace = (path: ProjectPath) => {
    welcomeContext.setProjectPath?.(path);
    setWorkspacePath?.(path);
    setActivatedModuleId?.(ModuleIds.CONFIGURATION);
  };

  const createNewProject = async () => {
    const selectedPath = await window.electronApi.welcome.createProject();
    
    if (!selectedPath) {
      return;
    }

    if (!selectedPath.trim()) {
      return;
    }
    
    setWorkspace(selectedPath);
  };

  const openExistingProject = async () => {
    const selectedPath = await window.electronApi.welcome.openProject();
    
    if (!selectedPath) {
      return;
    }

    if (!selectedPath.trim()) {
      return;
    }
    
    setWorkspace(selectedPath);
  };

  return { createNewProject, openExistingProject };
}