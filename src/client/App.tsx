import { ToastProvider } from "./components/Toast"
import { Navigation } from "./routes"

const App = () => {
  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  )
}

export default App
