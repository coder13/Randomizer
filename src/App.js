import { useState } from 'react';

function App() {
  const [ options, setOptions ] = useState('');
  const [ generatedItems, setGeneratedItems ] = useState([]);

  const lines = options
    .trim()
    .split(/[\n,]/)
    .map((i) => i.trim())
    .filter((i) => !!i);
  
  console.log(lines);

  const rndItem = () => lines[Math.floor(Math.random() * lines.length)];

  const generateRandomItem = () => {
    const item = rndItem();
    if (!item) {
      return;
    }

    setGeneratedItems([ ...generatedItems, rndItem() ]);
  }

  const removeItem = (index) => setGeneratedItems(generatedItems.filter((v, i) => index !== i));

  console.log(generatedItems.length === 0)

  return (
    <div className="App flex flex-1 flex-col h-full bg-gray-50">
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
          <div className="flex flex-row justify-evenly rounded-md bg-gray-300 py-2 mb-4">
            <button
              className="rounded-md px-3 py-2 text-md shadow bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-500"
              onClick={generateRandomItem}
              disabled={lines.length === 0}
            >
              Generate Random
            </button>
            <button
              className="rounded-md px-3 py-2 text-md shadow bg-red-700 text-white hover:bg-red-800 disabled:bg-red-500"
              onClick={() => setGeneratedItems([])}
              disabled={generatedItems.length === 0}
            >
              Reset List
            </button>
          </div>

          <div className="px-8">
            <ul className="list-disc">
              {generatedItems.map((item, index) => (
                <li
                  key={`${index}-${item}`}
                  className="hover:bg-red-200 px-2"
                  onClick={() => removeItem(index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
