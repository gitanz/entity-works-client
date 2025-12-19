import { Provider } from './components/ui/provider'
import './App.css'
import "@vscode/codicons/dist/codicon.css"
import ShellContainer from './shell/ShellContainer'
import ShellProvider from './shell/ShellContext'

export default function App() {
  return (
    <Provider>
      <ShellProvider layout="default" activatedModuleId="welcome">
        <ShellContainer />  
      </ShellProvider>
    </Provider>     
  )
}
