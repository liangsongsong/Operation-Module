import React, { useState } from 'react';
import { UnitData } from './types';
import Dashboard from './components/Dashboard';
import UnitDetail from './components/UnitDetail';
import Records from './components/Records';
import Settings from './components/Settings';
import { Settings as SettingsIcon, Home, AlertOctagon, Search, Blocks } from 'lucide-react';

const INITIAL_UNITS: UnitData[] = Array.from({ length: 6 }, (_, i) => {
  const letter = String.fromCharCode(65 + i); // A, B, C, D, E, F
  return {
    id: i + 1,
    name: `单元 ${letter}`,
    status: i === 1 ? 'Running' : i === 3 ? 'Finished' : i === 5 ? 'Error' : 'Available',
    progress: i === 1 ? 45 : 0,
    samples: {},
    extractionTemplate: '',
    pcrTemplate: '',
    currentTemp: 25,
    targetTemp: 25,
    cycle: 0,
    runMode: 'full',
    connection: {
      main: i !== 5, // 模拟单元F连接异常
      extraction: i !== 5,
      pcr: i !== 5
    },
    remainingTime: i === 1 ? '00:45:30' : undefined,
    testItem: i === 1 ? '呼吸道多重核酸检测' : undefined
  };
});

type ViewState = 'dashboard' | 'records' | 'settings';

export default function App() {
  const [units, setUnits] = useState<UnitData[]>(INITIAL_UNITS);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const selectedUnit = units.find(u => u.id === selectedUnitId);

  const updateUnit = (id: number, updates: Partial<UnitData>) => {
    setUnits(units.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const handleGlobalStop = () => {
    if (window.confirm('确定要执行整体停止吗？所有正在运行的单元将立即停止！')) {
      setUnits(units.map(u => u.status === 'Running' ? { ...u, status: 'Error' } : u));
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex items-center justify-center overflow-hidden font-sans">
      {/* 16:9 Aspect Ratio Container */}
      <div 
        className="bg-slate-100 relative flex flex-col overflow-hidden shadow-2xl"
        style={{ 
          aspectRatio: '16/9', 
          width: 'min(100vw, 100vh * 16 / 9)',
          height: 'min(100vh, 100vw * 9 / 16)'
        }}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-5 flex flex-col gap-4 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
              <Blocks size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">操作模块</h1>
              <p className="text-slate-500 text-sm mt-1">高通量独立控制单元 (6通道)</p>
            </div>
          </div>
          
          {/* Global Action Buttons */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => { setCurrentView('dashboard'); setSelectedUnitId(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap ${
                currentView === 'dashboard' 
                  ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Home size={22} />
              主页
            </button>
            <button 
              onClick={() => { setCurrentView('records'); setSelectedUnitId(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap ${
                currentView === 'records' 
                  ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Search size={22} />
              查询记录
            </button>
            <button 
              onClick={() => { setCurrentView('settings'); setSelectedUnitId(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap ${
                currentView === 'settings' 
                  ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <SettingsIcon size={22} />
              系统设置
            </button>
            <div className="flex-1"></div>
            <button 
              onClick={handleGlobalStop}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold shadow-sm transition-colors whitespace-nowrap"
            >
              <AlertOctagon size={22} />
              整体停止
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 relative">
          {currentView === 'dashboard' && (
            <Dashboard units={units} onSelectUnit={setSelectedUnitId} />
          )}
          {currentView === 'records' && (
            <Records />
          )}
          {currentView === 'settings' && (
            <Settings />
          )}

          {/* Modal Overlay for Unit Detail */}
          {selectedUnit && currentView === 'dashboard' && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
              <div className="w-[90%] max-w-7xl h-[90%] shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                <UnitDetail 
                  unit={selectedUnit} 
                  onBack={() => setSelectedUnitId(null)} 
                  onUpdate={(updates) => updateUnit(selectedUnit.id, updates)}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
