import React, { useState, useEffect } from 'react';
import { UnitData } from '../types';
import { ArrowLeft, Settings, Activity, Thermometer, Link2, Link2Off, X, Unlock, Lock, RotateCcw, Settings2 } from 'lucide-react';
import SampleConfig from './SampleConfig';
import ExtractionControl from './ExtractionControl';
import PCRControl from './PCRControl';

interface Props {
  unit: UnitData;
  onBack: () => void;
  onUpdate: (updates: Partial<UnitData>) => void;
}

type Tab = 'sample' | 'extraction' | 'pcr';

function ConnectionLight({ label, isConnected }: { label: string, isConnected: boolean }) {
  return (
    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
      <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse'}`}></div>
      <span className="text-sm font-medium text-slate-600">{label}</span>
      {isConnected ? <Link2 size={14} className="text-emerald-500 ml-1" /> : <Link2Off size={14} className="text-red-500 ml-1" />}
    </div>
  );
}

export default function UnitDetail({ unit, onBack, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('sample');
  const [showControls, setShowControls] = useState(false);

  const handleAction = (action: string) => {
    // 实际项目中这里会调用API发送指令给下位机
    console.log(`[Unit ${unit.id}] 执行操作: ${action}`);
  };

  // 当运行模式改变时，如果当前处于被隐藏的Tab，则自动切回样本配置
  useEffect(() => {
    if (unit.runMode === 'extraction_only' && activeTab === 'pcr') setActiveTab('sample');
    if (unit.runMode === 'pcr_only' && activeTab === 'extraction') setActiveTab('sample');
  }, [unit.runMode, activeTab]);

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl font-bold text-slate-800">{unit.name}</h2>
          
          <div className="relative">
            <button 
              onClick={() => setShowControls(!showControls)}
              className={`p-2 rounded-lg transition-colors ${showControls ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
              title="快捷操作"
            >
              <Settings2 size={24} />
            </button>

            {showControls && (
              <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 shadow-xl rounded-xl p-1.5 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 w-28">
                <button onClick={() => { handleAction('开门'); setShowControls(false); }} className="w-full px-3 py-2 bg-transparent text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Unlock size={16} /> 开门
                </button>
                <button onClick={() => { handleAction('关门'); setShowControls(false); }} className="w-full px-3 py-2 bg-transparent text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Lock size={16} /> 关门
                </button>
                <button onClick={() => { handleAction('复位'); setShowControls(false); }} className="w-full px-3 py-2 bg-transparent text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <RotateCcw size={16} /> 复位
                </button>
              </div>
            )}
          </div>

          <span className={`px-4 py-1.5 rounded-full text-base font-medium ${unit.status === 'Error' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
            {unit.status}
          </span>
          
          {/* Connection Status Lights */}
          <div className="flex items-center gap-3 ml-4 pl-6 border-l-2 border-slate-200">
            <ConnectionLight label="主控" isConnected={unit.connection.main} />
            <ConnectionLight label="核提" isConnected={unit.connection.extraction} />
            <ConnectionLight label="PCR" isConnected={unit.connection.pcr} />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-2 bg-slate-200/50 p-1.5 rounded-xl">
            <button 
              className={`px-6 py-2.5 rounded-lg text-lg font-medium flex items-center gap-2 transition-colors ${activeTab === 'sample' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'}`}
              onClick={() => setActiveTab('sample')}
            >
              <Settings size={20} /> 样本配置
            </button>
            {(unit.runMode === 'full' || unit.runMode === 'extraction_only') && (
              <button 
                className={`px-6 py-2.5 rounded-lg text-lg font-medium flex items-center gap-2 transition-colors ${activeTab === 'extraction' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'}`}
                onClick={() => setActiveTab('extraction')}
              >
                <Activity size={20} /> 核酸提取
              </button>
            )}
            {(unit.runMode === 'full' || unit.runMode === 'pcr_only') && (
              <button 
                className={`px-6 py-2.5 rounded-lg text-lg font-medium flex items-center gap-2 transition-colors ${activeTab === 'pcr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'}`}
                onClick={() => setActiveTab('pcr')}
              >
                <Thermometer size={20} /> PCR扩增
              </button>
            )}
          </div>
          
          <button onClick={onBack} className="p-3 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-full transition-colors ml-2">
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
        {activeTab === 'sample' && <SampleConfig unit={unit} onUpdate={onUpdate} />}
        {activeTab === 'extraction' && <ExtractionControl unit={unit} onUpdate={onUpdate} />}
        {activeTab === 'pcr' && <PCRControl unit={unit} onUpdate={onUpdate} />}
      </div>
    </div>
  );
}
