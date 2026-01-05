import Configuration from "./Configuration";
import ConfigurationProvider from "./ConfigurationContext";

export default function ConfigurationContainer() {
    return (
        <ConfigurationProvider>
            <Configuration></Configuration>
        </ConfigurationProvider>
    );
}
