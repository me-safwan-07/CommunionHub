import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { Glow } from './ui/glow';

function Hero() {
    const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white mb-10"> 
        <div className="group relative overflow-hidden py-24 sm:py-25">
          <div
            className="relative z-10 mx-auto flex max-w-container flex-col items-center gap-6 text-center sm:gap-8"
          >
            <h1 className="text-3xl font-semibold sm:text-5xl animate-appear">
              Connecting People Across Faiths & Interests
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              A platform connecting people of all faiths through events and community support.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/events')}
              className="animate-appear delay-100"
              variant={"default"}
            >
                Explore Events
            </Button>
          </div>
          <div className="absolute left-0 top-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
            <Glow variant="bottom" className="animate-appear-zoom delay-300" />
          </div>
        </div>
      </div>
  )
}

export default Hero
