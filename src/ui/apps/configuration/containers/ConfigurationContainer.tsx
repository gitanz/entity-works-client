import App from "../../../root/components/App";
import Configuration from "../components/Configuration";
import ConfigurationProvider from "../contexts/ConfigurationContext";

export default function ConfigurationContainer() {
    
    return (
        <App.Provider id="configuration-app">
            <ConfigurationProvider>
                <Configuration></Configuration>
            </ConfigurationProvider>
        </App.Provider>
    );
}
