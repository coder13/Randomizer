import { useState } from 'react';

function RandomizerPage() {
  const [ options, setOptions ] = useState('');
  const [ generatedItems, setGeneratedItems ] = useState([]);

  const items = options
    .trim()
    .split(/[\n,]/)
    .map((i) => i.trim())
    .filter((i) => !!i);
  
  const rndItem = () => items[Math.floor(Math.random() * items.length)];

  const generateRandomItem = () => {
    const item = rndItem();
    if (!item) {
      return;
    }

    setGeneratedItems([ ...generatedItems, rndItem() ]);
  }

  const removeItem = (index) => setGeneratedItems(generatedItems.filter((v, i) => index !== i));

  return (
    <div className="flex flex-col flex-1 h-full p-4 xl:w-4/5 lg:w-5/6 md:w-full">
      <div className="flex flex-row py-2 mb-4 bg-gray-200 rounded-md shadow-sm flex-0 justify-evenly">
        <button
          className="px-3 py-2 text-white rounded-md shadow text-md bg-sky-500 disabled:opacity-75"
          onClick={generateRandomItem}
          disabled={items.length === 0}
        >
          Generate Random
        </button>
        <button
          className="px-3 py-2 text-white bg-red-500 rounded-md shadow text-md disabled:opacity-75"
          onClick={() => setGeneratedItems([])}
          disabled={generatedItems.length === 0}
        >
          Reset List
        </button>
      </div>
      <div className="flex flex-row flex-1 px-4">
        <div className="flex flex-col flex-none w-1/3 h-full">
          <div>
            <h2>List Items Here:</h2>
          </div>
          <textarea
            value={options}
            onChange={(e) => setOptions(e.currentTarget.value)}
            className="flex-1 h-full p-1 text-white bg-blue-500 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            autoFocus
          />
          <p>
            Items: {items.length}
          </p>
        </div>
        <div className="flex flex-col flex-auto px-4">
          <div>
            <h2>Your Random Items Here:</h2>
          </div>
          <div className="flex flex-1 w-full h-full p-1 text-white bg-blue-500 rounded-md">
            {generatedItems.length ? (
              <ul className="w-full list-disc">
                {generatedItems.map((item, index) => (
                  <li
                    key={`${index}-${item}`}
                    className="px-2 rounded-md hover:bg-red-600"
                    onClick={() => removeItem(index)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No items yet....
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomizerPage;
