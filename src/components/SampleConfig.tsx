import React, { useState } from 'react';
import { UnitData, SampleData, RunMode } from '../types';

interface Props {
  unit: UnitData;
  onUpdate: (updates: Partial<UnitData>) => void;
}

export default function SampleConfig({ unit, onUpdate }: Props) {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(1);

  const handleSampleChange = (field: keyof SampleData, value: string) => {
    const currentSample = unit.samples[selectedSampleIndex] || { id: '', patientName: '', assayType: '' };
    onUpdate({
      samples: {
        ...unit.samples,
        [selectedSampleIndex]: { ...currentSample, [field]: value }
      }
    });
  };

  const currentSample = unit.samples[selectedSampleIndex] || { id: '', patientName: '', assayType: '' };

  const ModeButton = ({ mode, label, current }: { mode: RunMode, label: string, current: RunMode }) => (
    <button
      onClick={() => onUpdate({ runMode: mode })}
      className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all border ${
        current === mode 
          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex gap-8 h-full">
      {/* Left: Graphical Representation */}
      <div className="w-2/3 bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">PCR孔位映射 (2x8)</h3>
        
        <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 p-8">
          <div className="flex gap-6">
            {[1, 2, 3, 4].map(sampleIdx => {
              const isSelected = selectedSampleIndex === sampleIdx;
              const hasData = !!unit.samples[sampleIdx]?.id;
              
              return (
                <div 
                  key={sampleIdx}
                  onClick={() => setSelectedSampleIndex(sampleIdx)}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                      : hasData 
                        ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300' 
                        : 'border-slate-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold ${
                    isSelected ? 'bg-blue-500 text-white' : hasData ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    样本 {sampleIdx}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[3, 2, 4, 1].map(well => (
                      <div 
                        key={well} 
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                          hasData ? 'border-emerald-400 bg-emerald-100 text-emerald-700' : 'border-slate-300 bg-slate-100 text-slate-400'
                        }`}
                      >
                        {well}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-slate-100"></div> 空闲孔位</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-emerald-400 bg-emerald-100"></div> 已配置孔位</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-xl border-2 border-blue-500 bg-blue-50"></div> 当前选中区域</div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-1/3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        
        {/* Run Mode Selection */}
        <div className="mb-6 pb-6 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">运行模式选择</h3>
          <div className="flex gap-2">
            <ModeButton mode="full" label="全流程" current={unit.runMode} />
            <ModeButton mode="extraction_only" label="仅核酸提取" current={unit.runMode} />
            <ModeButton mode="pcr_only" label="仅PCR扩增" current={unit.runMode} />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mb-4">样本 {selectedSampleIndex} 信息录入</h3>
        
        <div className="space-y-5 flex-1">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">样本条码 (Sample ID)</label>
            <input 
              type="text" 
              value={currentSample.id}
              onChange={(e) => handleSampleChange('id', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="扫描或输入条码..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">患者姓名</label>
            <input 
              type="text" 
              value={currentSample.patientName}
              onChange={(e) => handleSampleChange('patientName', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="输入姓名..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">检测项目 (Assay Type)</label>
            <select 
              value={currentSample.assayType}
              onChange={(e) => handleSampleChange('assayType', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">请选择检测项目...</option>
              <option value="COVID-19">新型冠状病毒核酸检测</option>
              <option value="HBV">乙型肝炎病毒核酸检测</option>
              <option value="HPV">人乳头瘤病毒核酸检测</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <button 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
            onClick={() => {
              if (selectedSampleIndex < 4) setSelectedSampleIndex(selectedSampleIndex + 1);
            }}
          >
            保存并配置下一个
          </button>
        </div>
      </div>
    </div>
  );
}
