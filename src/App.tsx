import React, { useState } from 'react';
import { Copy, Check, Code, FileText, Palette } from 'lucide-react';

interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
  icon: React.ReactNode;
  bgColor: string;
  onCodeChange: (code: string) => void;
}

function CodeBlock({ title, language, code, icon, bgColor, onCodeChange }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className={`${bgColor} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="text-white">{icon}</div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <span className="text-white/80 text-sm bg-white/20 px-2 py-1 rounded">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm transition-colors duration-200"
          >
            {isEditing ? 'Preview' : 'Edit'}
          </button>
        </div>
        
        {isEditing ? (
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className="w-full h-80 p-6 pr-20 bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:bg-white border-0"
            spellCheck={false}
          />
        ) : (
          <pre className="bg-gray-50 p-6 pr-20 overflow-x-auto">
            <code className="font-mono text-sm text-gray-800 whitespace-pre">
              {code}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}

function App() {
  const [htmlCode, setHtmlCode] = useState(`
                                        
                                    `);

  const [cssCode, setCssCode] = useState(`:root {`);

  const [jsCode, setJsCode] = useState(`// 
                
            
            .

        

        `);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Code className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Code Display & Copy</h1>
              <p className="text-gray-600 mt-1">Easily view, edit, and copy your HTML, CSS, and JavaScript code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <CodeBlock
            title="HTML Structure"
            language="HTML"
            code={htmlCode}
            icon={<FileText size={24} />}
            bgColor="bg-gradient-to-r from-orange-500 to-red-500"
            onCodeChange={setHtmlCode}
          />
          
          <CodeBlock
            title="CSS Styling"
            language="CSS"
            code={cssCode}
            icon={<Palette size={24} />}
            bgColor="bg-gradient-to-r from-blue-500 to-purple-600"
            onCodeChange={setCssCode}
          />
          
          <CodeBlock
            title="JavaScript Logic"
            language="JavaScript"
            code={jsCode}
            icon={<Code size={24} />}
            bgColor="bg-gradient-to-r from-yellow-500 to-green-500"
            onCodeChange={setJsCode}
          />
        </div>
        
        {/* Instructions */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="text-blue-600" />
            How to Use
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Edit Your Code</h3>
              <p>Click the "Edit" button in any section to modify your HTML, CSS, or JavaScript code directly in the browser.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Copy className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Copy with One Click</h3>
              <p>Use the copy button in each section header to instantly copy the entire code block to your clipboard.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Check className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Use Anywhere</h3>
              <p>Paste your copied code into your IDE, text editor, or share it with others. Perfect for tutorials and documentation.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            Built with React and Tailwind CSS • Perfect for developers and educators
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
