import { useCallback, useState, useMemo, useEffect } from 'react';
import { Parser, Generator } from 'kbnf';

const parser = new Parser();

function RandomizerPage() {
  const [ source, setSource ] = useState('');
  const [ template, setTemplate ] = useState('');
  const [ output, setOutput ] = useState('');
  const [ errors, setErrors ] = useState([]);
  
  const generator = useMemo(() => {
    try {
      console.log(13, source);
      const grammar = parser.parse(source);
      if (grammar) {
        console.log(grammar);
        return new Generator(grammar);
      }
    } catch (e) {
      // Don't do anything
      console.error('obviously', e);
      return null;
    }
  }, [source]);

  const formatOutput = useCallback(() => {
    if (!generator) {
      return;
    }

    const replacer = (match, token) => {
      if (generator.findRule(token)) {
        return generator.generate(token, true);
      } else {
        return `<${token}>`;
      }
    };
    
    setOutput(template.replace(/\<([a-zA-Z]*)\>/g, replacer));
  }, [template, generator]);

  useEffect(() => {
    formatOutput();
  }, [formatOutput]);

  return (
    <div className="flex flex-1 flex-col flex-wrap xl:w-4/5 lg:w-5/6 md:w-full h-full p-4">
      <div className="flex flex-row flex-1 px-4">
        <div className="flex flex-col flex-none w-1/3 h-full">
          <div>
            <h2 className="text-lg">Grammar</h2>
          </div>
          <textarea
            value={source}
            onChange={(e) => setSource(e.currentTarget.value)}
            className="font-mono	resize-none h-full flex-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            autoFocus
            />
          <p>
            {generator?.grammar?.rules?.length || 0} Rules
          </p>
        </div>
        <div className="flex flex-col flex-1 px-4">
          <div className="font-mono	flex flex-1 flex-col w-full h-1/2 rounded-md">
            <h2 className="text-lg">Template</h2>
            <textarea
              name="outputTemplate"
              value={template}
              onChange={(e) => setTemplate(e.currentTarget.value)}
              className="resize-none w-full flex-1 border border-gray-300 rounded-md rounded-b-none p-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
            </div>
            <div className="font-mono	flex flex-1 flex-col w-full h-1/2 rounded-md">
              <h2 className="text-lg">Output</h2>
              <textarea
                className="resize-none w-full flex-1 border border-gray-300 p-1 shadow-sm focus:outline-none sm:text-sm"
                name="output"
                value={output}
                disabled
              />
              <button
                className="bg-indigo-600 rounded-b-md"
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
