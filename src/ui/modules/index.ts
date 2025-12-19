import ConfigurationContainer from "./configuration/ConfigurationContainer";
import { WelcomeContainer } from "./welcome/WelcomeContainer";

export const ModuleIds = {
    WELCOME: 'welcome',
    CONFIGURATION: 'configuration',
}

export type ModuleId = typeof ModuleIds[keyof typeof ModuleIds];

const modules: {[key: ModuleId]: React.ComponentType} = {
    welcome: WelcomeContainer,
    configuration: ConfigurationContainer
}

export default modules;
