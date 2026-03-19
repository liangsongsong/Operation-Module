import React from 'react';
import { UnitData } from '../types';
import { Play, Square, Settings2, Activity } from 'lucide-react';

interface Props {
  unit: UnitData;
  onUpdate: (updates: Partial<UnitData>) => void;
}

export default function PCRControl({ unit, onUpdate }: Props) {
  return (
    <div className="max-w-5xl mx-auto flex gap-6 h-full">
      {/* Left: Controls */}
      <div className="w-1/2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-xl font-semibold text-slate-800 mb-8 border-b border-slate-100 pb-4">PCR扩增模块控制</h3>
        
        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">温控程序模板</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Settings2 size={18} />
              </div>
              <select 
                value={unit.pcrTemplate}
                onChange={(e) => onUpdate({ pcrTemplate: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
              >
                <option value="">选择PCR扩增程序...</option>
                <option value="pcr_covid.temp">COVID-19_45Cycles.temp</option>
                <option value="pcr_hbv.temp">HBV_Standard.temp</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-slate-500 text-sm mb-1">当前温度</div>
              <div className="text-3xl font-bold text-slate-800 font-mono">{unit.currentTemp.toFixed(1)}<span className="text-lg text-slate-500 ml-1">°C</span></div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-slate-500 text-sm mb-1">目标温度</div>
              <div className="text-3xl font-bold text-blue-600 font-mono">{unit.targetTemp.toFixed(1)}<span className="text-lg text-blue-400 ml-1">°C</span></div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 col-span-2">
              <div className="text-slate-500 text-sm mb-1">循环进度 (Cycles)</div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-800 font-mono">{unit.cycle}</div>
                <div className="text-lg text-slate-500 font-mono mb-1">/ 45</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100">
          <button 
            className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!unit.pcrTemplate || unit.status === 'Running'}
            onClick={() => onUpdate({ status: 'Running', progress: 0 })}
          >
            <Play size={20} /> 开始扩增
          </button>
          <button 
            className="px-8 py-3.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={unit.status !== 'Running'}
            onClick={() => onUpdate({ status: 'Available', progress: 0 })}
          >
            <Square size={20} /> 停止
          </button>
        </div>
      </div>

      {/* Right: Real-time Chart Placeholder */}
      <div className="w-1/2 bg-slate-800 p-6 rounded-xl shadow-inner flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20">
          {unit.status === 'Running' && (
            <div className="h-full bg-blue-500 animate-pulse" style={{ width: '45%' }}></div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-200 font-medium flex items-center gap-2">
            <Activity size={18} className="text-blue-400" /> 实时荧光曲线
          </h3>
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> FAM</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-blue-400"></div> HEX</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-red-400"></div> ROX</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-amber-400"></div> CY5</span>
          </div>
        </div>

        <div className="flex-1 border border-slate-700/50 rounded-lg bg-slate-900/50 relative flex items-center justify-center">
          {/* Mock Chart Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
          
          {unit.status === 'Running' ? (
            <svg className="w-full h-full absolute inset-0 preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 90 Q 20 90, 40 80 T 60 40 T 80 10 L 100 5" fill="none" stroke="#34d399" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <path d="M 0 95 Q 30 95, 50 85 T 70 60 T 90 30 L 100 20" fill="none" stroke="#60a5fa" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            </svg>
          ) : (
            <div className="text-slate-600 text-sm z-10">等待扩增开始...</div>
          )}
        </div>
      </div>
    </div>
  );
}
