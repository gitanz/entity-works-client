import App from "../module";
import Configuration from "./Configuration";
import ConfigurationProvider from "./ConfigurationContext";

export default function ConfigurationContainer() {
    return (
        <App.Provider id="configuration">
            <ConfigurationProvider>
                <Configuration></Configuration>
            </ConfigurationProvider>
        </App.Provider>
    );
}
