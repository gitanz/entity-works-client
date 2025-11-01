import App from "../../../root/components/App";

export default function Configuration() {
    return (
        <App.Root>
            <App.Explorer>
                <div>
                    this is explorer
                </div>
            </App.Explorer>
            <App.Workspace>
                <div>
                    this is workspace
                </div>
            </App.Workspace>
            <App.Drawer>
                <div>
                    this is drawer
                </div>
            </App.Drawer>
            <App.Palette>
                <div>
                    this is palette 
                </div>
            </App.Palette>
        </App.Root>      
    );
}
