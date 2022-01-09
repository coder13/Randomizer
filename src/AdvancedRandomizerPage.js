import { useCallback, useState, useMemo, useEffect } from 'react';

function RandomizerPage() {
  const [ source, setSource ] = useState('');
  const [ template, setTemplate ] = useState('');
  const [ output, setOutput ] = useState('');
  const [ errors, setErrors ] = useState([]);
  
  const items = useMemo(() => {
    const lines = source
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => !!line);

    const _items = {};

    lines.forEach((line) => {
      const split = line.split(/\s=\s/);
      if (split.length !== 2) {
        return;
      }
  
      const tokenName = split[0];
      const values = split[1].split(/\s\|\s/);
      _items[tokenName] = values;
    });

    return _items;
  }, [source]);

  const formatOutput = useCallback(() => {
    const replacer = (match, token) => {
      const generator = items[token];
      if (!generator) {
        return match;
      }

      return generator[Math.floor(Math.random() * generator.length)];
    };
    
    setOutput(template.replace(/\<([a-zA-Z]*)\>/g, replacer));
  }, [template, items]);

  useEffect(() => {
    formatOutput();
  }, [formatOutput]);

  return (
    <div className="flex flex-1 flex-col xl:w-4/5 lg:w-5/6 md:w-full h-full p-4">
      <div className="flex flex-row flex-1 px-4">
        <div className="flex flex-col flex-none w-1/3 h-full">
          <div>
            <h2>Grammar</h2>
          </div>
          <textarea
            value={source}
            onChange={(e) => setSource(e.currentTarget.value)}
            className="font-mono	resize-none	bg-blue-400 text-white h-full flex-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            autoFocus
            />
          <p>
            {Object.keys(items).length} Rules
          </p>
        </div>
        <div className="flex flex-col flex-auto px-4">
          <div>
            <h2>Template</h2>
          </div>
          <div className="font-mono	flex flex-1 flex-col w-full h-full rounded-md bg-blue-400 text-white">
            <textarea
              name="outputTemplate"
              value={template}
              onChange={(e) => setTemplate(e.currentTarget.value)}
              className="resize-none bg-blue-400 w-full h-1/2 flex-1 border border-gray-300 rounded-md rounded-b-none p-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
            <textarea
              className="resize-none	bg-white text-black w-full h-1/2 flex-1 border border-gray-300 p-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              name="output"
              value={output}
              disabled
            />
            <button
              className="bg-indigo-600 text-white rounded-b-md"
              onClick={formatOutput}
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomizerPage;
