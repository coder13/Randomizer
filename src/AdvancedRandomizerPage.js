import { useCallback, useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { InformationCircleIcon } from '@heroicons/react/solid'
import { Parser, Generator } from 'kbnf';

const parser = new Parser();

function RandomizerPage() {
  const [ source, setSource ] = useState('');
  const [ template, setTemplate ] = useState('');
  const [ output, setOutput ] = useState('');
  const [ errors, setErrors ] = useState([]);
  const [ rulesAccordionVisible, setRulesAccordionVisible ] = useState(false);
  
  const generator = useMemo(() => {
    try {
      setErrors([]);
      const grammar = parser.parse(source);
      if (grammar) {
        return new Generator(grammar);
      }
    } catch (e) {
      // Don't do anything
      setErrors([{
        name: e.name,
        message: e.message,
      }]);
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

  const copyOutputToClipboard = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        console.log('Text copied to clipboard');
      });
  };

  useEffect(() => {
    formatOutput();
  }, [formatOutput]);

  return (
    <div className="flex flex-col flex-wrap flex-1 h-full p-4 xl:w-4/5 lg:w-5/6 md:w-full border-collapse">
      <div className="flex flex-row flex-1 px-4">
        <div className="flex flex-col flex-none w-1/3 h-full sm:text-sm">
          <div>
            <h2 className="text-lg">Grammar</h2>
          </div>
          <textarea
            value={source}
            onChange={(e) => setSource(e.currentTarget.value)}
            className={clsx("font-mono	resize-none h-full flex-1 border border-gray-300 rounded-md rounded-b-none shadow-sm p-1 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1", {
              'border-red-300': errors.length > 0,
              'focus:border-red-300': errors.length > 0,
              'focus:ring-red-300': errors.length > 0,
            })}
            autoFocus
            />
          {errors.map((error) => (
            <div className="p-1 text-white bg-red-600 border-gray-300">
              <p><b>{error.name}</b></p>
              <p>{error.message}</p>
            </div>
          ))}
          <div className="border border-gray-300 bg-gray-50">
            <button
              type="button"
              className="flex items-center w-full px-2 py-1 text-base transition bg-white border-0 rounded-none focus:outline-none shadow-md"
              onClick={() => setRulesAccordionVisible(!rulesAccordionVisible)}
            >
              {generator?.grammar?.rules?.length || 0} {generator?.grammar?.rules?.length === 1 ? 'Rule' : 'Rules'}
              <div className="flex-1" />
              {rulesAccordionVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            {rulesAccordionVisible && (
              <div className="p-1 bg-gray-100 text-sm border">
                {generator?.grammar?.rules.map((rule) => (
                  <p>{rule.name}: {rule.values.map((i) => i.map(({ type, value }) => (
                    type === 'rule' ? `<${value}>` : `"${value}"`
                  )).join(' ')).join(' | ')}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 px-4">
          <div className="flex flex-col flex-1 w-full font-mono rounded-md h-1/2">
            <h2 className="text-lg">Template</h2>
            <textarea
              name="outputTemplate"
              value={template}
              onChange={(e) => setTemplate(e.currentTarget.value)}
              className="flex-1 w-full p-1 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
            </div>
            <div className="flex flex-col flex-1 w-full font-mono rounded-md h-1/2">
              <h2 className="text-lg">Output</h2>
              <textarea
                className="flex-1 w-full p-1 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none sm:text-sm"
                name="output"
                value={output}
                disabled
              />
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={formatOutput}
                >
                  Regenerate
                </button>
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={copyOutputToClipboard}
                >
                  Copy To Clipboard
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomizerPage;
