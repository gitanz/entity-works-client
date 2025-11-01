import Root from "../components/Root";
import RootProvider from "../contexts/RootContext";

export default function RootContainer () {
    return (
        <RootProvider layout="default">
            <Root />
        </RootProvider>
    )
}
