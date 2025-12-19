import { AbsoluteCenter, Button, VStack } from "@chakra-ui/react"
import LogoV2 from "../../Logo";
import { useWorkspace } from "./hooks";

function CreateNewProject() {
  const { createNewProject } = useWorkspace();

  return (
    <div>
      <Button 
        variant="outline"
        width={"sm"}
        onClick={createNewProject}
        >
          Create Workspace
        </Button>
    </div>
  );
}
  
function OpenExistingProject() {
  const { openExistingProject } = useWorkspace();

  return (
    <div>
      <Button 
        variant="outline"
        width={"sm"}
        onClick={openExistingProject}
        >Open Workspace</Button>
    </div>
  );
}

export function Welcome() {
    return (
        <AbsoluteCenter>
            <VStack>
                <LogoV2 height={500} color="#27272a"></LogoV2>
                <CreateNewProject />
                <OpenExistingProject />
            </VStack>
        </AbsoluteCenter>
    );
}
