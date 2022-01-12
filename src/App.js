import RandomizerPage from './RandomizerPage';
import AdvancedRandomizerPage from './AdvancedRandomizerPage';

const Header = () => (
  <header className="flex flex-row justify-center flex-none w-full pt-2">
    <h1 className="text-3xl font-boldp-4">Randomizer</h1>
  </header>
);

const Routes = {
  '/': <RandomizerPage />,
  '/advanced': <AdvancedRandomizerPage/>
};

function App() {
  const page = Routes[window.location.pathname];

  return (
    <div className="flex flex-col items-center flex-1 h-full">
      <Header />
      <div className="flex flex-row flex-1 xl:w-4/5 lg:w-5/6 md:w-full ">
        { page || (
          <div>
            Page not found
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
