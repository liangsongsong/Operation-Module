import React from 'react';
import { UnitData } from '../types';
import { Play, Square, FileCode } from 'lucide-react';

interface Props {
  unit: UnitData;
  onUpdate: (updates: Partial<UnitData>) => void;
}

export default function ExtractionControl({ unit, onUpdate }: Props) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <h3 className="text-xl font-semibold text-slate-800 mb-8 border-b border-slate-100 pb-4 shrink-0">核酸提取模块控制</h3>
      
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Template Selection */}
        <div className="shrink-0">
          <label className="block text-sm font-medium text-slate-700 mb-2">运行模板 (HEX文件)</label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FileCode size={18} />
              </div>
              <select 
                value={unit.extractionTemplate}
                onChange={(e) => onUpdate({ extractionTemplate: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
              >
                <option value="">选择HEX控制模板...</option>
                <option value="extract_v1.hex">Standard_Extraction_V1.hex</option>
                <option value="extract_fast.hex">Fast_Extraction_V2.hex</option>
                <option value="extract_deep.hex">Deep_Extraction_V1.hex</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Display */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex-1 flex flex-col justify-center">
          <h4 className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">模块状态</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <div className="text-slate-400 text-sm mb-2">电机状态</div>
              <div className="font-semibold text-slate-700 text-lg">待机中 (Z轴归位)</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <div className="text-slate-400 text-sm mb-2">磁棒套状态</div>
              <div className="font-semibold text-emerald-600 text-lg">已就绪</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <div className="text-slate-400 text-sm mb-2">加热槽温度</div>
              <div className="font-semibold text-slate-700 text-lg">25.0 °C</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <div className="text-slate-400 text-sm mb-2">预计剩余时间</div>
              <div className="font-semibold text-slate-700 text-lg">-- : --</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-6 shrink-0">
          <button 
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!unit.extractionTemplate || unit.status === 'Running'}
            onClick={() => onUpdate({ status: 'Running', progress: 0 })}
          >
            <Play size={24} /> 开始提取
          </button>
          <button 
            className="px-10 py-4 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={unit.status !== 'Running'}
            onClick={() => onUpdate({ status: 'Available', progress: 0 })}
          >
            <Square size={24} /> 停止
          </button>
        </div>
      </div>
    </div>
  );
}
