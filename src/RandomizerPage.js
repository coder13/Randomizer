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
    <div className="flex flex-1 flex-col xl:w-4/5 lg:w-5/6 md:w-full h-full p-4">
      <div className="flex flex-row flex-0 justify-evenly rounded-md bg-gray-200 shadow-sm py-2 mb-4">
        <button
          className="rounded-md px-3 py-2 text-md shadow bg-sky-500 text-white disabled:opacity-75"
          onClick={generateRandomItem}
          disabled={items.length === 0}
        >
          Generate Random
        </button>
        <button
          className="rounded-md px-3 py-2 text-md shadow bg-red-500 text-white disabled:opacity-75"
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
            className="resize-none	bg-blue-500 text-white h-full flex-1 border border-gray-300 rounded-md p-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
          <div className="flex flex-1 w-full h-full p-1 rounded-md bg-blue-500 text-white">
            {generatedItems.length ? (
              <ul className="list-disc w-full">
                {generatedItems.map((item, index) => (
                  <li
                    key={`${index}-${item}`}
                    className="hover:bg-red-600 rounded-md px-2"
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
