import { useState } from 'react';

function App() {
  const [ options, setOptions ] = useState('');
  const [ generatedItems, setGeneratedItems ] = useState([]);

  const rndItem = () => {
    const lines = options
      .trim()
      .split(/[\n,]/)
      .map((i) => i.trim())
      .filter((i) => !!i);

    return lines[Math.floor(Math.random() * lines.length)];
  }

  const generateRandomItem = () => {
    const item = rndItem();
    if (!item) {
      return;
    }

    setGeneratedItems([ ...generatedItems, rndItem() ]);
  }

  return (
    <div className="App flex flex-1 flex-col h-full">
      <header className="text-center">
        <h1 className="text-3xl font-bold bg-yellow-200 p-4">Randomizer</h1>
      </header>
      <div className="flex flex-1 h-full p-4">
        <div className="flex flex-col flex-none w-96 h-full">
          <textarea
            value={options}
            onChange={(e) => setOptions(e.currentTarget.value)}
            className="bg-white h-full flex-1 border border-gray-300 rounded-md p-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          />
        </div>
        <div className="flex flex-col flex-auto px-4">
          <div className="flex h-16 flex-row justify-evenly">
            <button
              className="rounded-full bg-blue-800 px-2 text-gray-50"
              onClick={generateRandomItem}
            >
              Generate Random
            </button>
            <button
              className="rounded-full bg-red-800 px-2 text-gray-50"
              onClick={() => setGeneratedItems([])}
            >
              Reset Items
            </button>
          </div>

          <div className="">
            <ul>
              {generatedItems.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
