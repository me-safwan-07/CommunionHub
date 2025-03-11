import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { Navigation } from './components/Navigation';



const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App