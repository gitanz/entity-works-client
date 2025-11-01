import { Provider } from './components/ui/provider'
import './App.css'
import "@vscode/codicons/dist/codicon.css"
import RootContainer from './root/containers/RootContainer'

export default function App() {
  return (
    <Provider>
      <RootContainer />
    </Provider>     
  )
}
