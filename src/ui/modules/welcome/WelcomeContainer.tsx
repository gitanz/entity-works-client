import { Welcome } from "./Welcome";
import WelcomeProvider from "./WelcomeContext";

export function WelcomeContainer() {    
    return (
        <WelcomeProvider>
            <Welcome></Welcome>
        </WelcomeProvider>
    )
}
