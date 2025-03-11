import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ToastProvider, ToastViewport } from './components/ui/Toast';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { Events } from './pages/Events';
import { About } from './pages/About';

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
                <Route path='/events' element={<Events />} />
                <Route path='/about' element={<About />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <ToastViewport />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App