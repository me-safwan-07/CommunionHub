import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { Navigation } from './components/Navigation';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';



const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
          <main className='flex-grow'>
            <AnimatePresence mode='wait'>
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App