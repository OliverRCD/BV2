import React, { useState } from 'react';
import DataView from './components/DataView';
import ProjectBuilder from './components/ProjectBuilder';
import { ChemicalData } from './types';

const App: React.FC = () => {
  // Lifted state for data visualization
  const [viscosityData, setViscosityData] = useState<ChemicalData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDbInfo, setConnectedDbInfo] = useState<{host: string, db: string} | null>(null);

  const handleDbConnect = (host: string, db: string) => {
    // Only update the connection status label. Do NOT overwrite data here.
    setConnectedDbInfo({ host, db });
    setIsConnected(true);
  };
  
  const handleDataLoaded = (data: ChemicalData[]) => {
      // This is the only place data should be set
      setViscosityData(data);
      setIsConnected(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
             </div>
             <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 hidden sm:block">
                玄武岩粘度 AI 训练平台
             </span>
             <span className="text-lg font-bold sm:hidden">Basalt AI</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* API Key management removed as per security guidelines. Using process.env.API_KEY. */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section>
          <DataView 
            data={viscosityData} 
            isConnected={isConnected} 
            dbInfo={connectedDbInfo}
          />
        </section>

        <section>
          <ProjectBuilder 
            onConnect={handleDbConnect} 
            onDataLoaded={handleDataLoaded}
          />
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>Powered by Google Gemini 2.5 Flash &bull; 专为地球化学分析设计</p>
        </div>
      </footer>
    </div>
  );
};

export default App;