import React, { useState } from 'react';
import { UnitData } from '../types';
import { Activity, CheckCircle, AlertCircle, PlayCircle, Unlock, Lock, RotateCcw, Settings2 } from 'lucide-react';

interface Props {
  units: UnitData[];
  onSelectUnit: (id: number) => void;
}

export default function Dashboard({ units, onSelectUnit }: Props) {
  return (
    <div className="grid grid-cols-3 gap-8 h-full">
      {units.map(unit => (
        <UnitCard key={unit.id} unit={unit} onSelectUnit={onSelectUnit} />
      ))}
    </div>
  );
}

function UnitCard({ unit, onSelectUnit }: { key?: React.Key, unit: UnitData, onSelectUnit: (id: number) => void }) {
  const [showControls, setShowControls] = useState(false);

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    // 实际项目中这里会调用API发送指令给下位机
    console.log(`[Unit ${unit.id}] 执行操作: ${action}`);
  };

  return (
    <div 
      onClick={() => onSelectUnit(unit.id)}
      className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all flex flex-col min-h-[280px]"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-slate-800">{unit.name}</h2>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowControls(!showControls); }}
            className={`p-1.5 rounded-lg transition-colors ${showControls ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
            title="快捷操作"
          >
            <Settings2 size={20} />
          </button>
        </div>
        <StatusBadge status={unit.status} />
      </div>
      
      {showControls && (
        <div className="flex gap-2 mb-6 animate-in slide-in-from-top-2 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => handleAction(e, '开门')}
            className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Unlock size={16} /> 开门
          </button>
          <button 
            onClick={(e) => handleAction(e, '关门')}
            className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Lock size={16} /> 关门
          </button>
          <button 
            onClick={(e) => handleAction(e, '复位')}
            className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw size={16} /> 复位
          </button>
        </div>
      )}
      
      <div className="flex-1 flex flex-col justify-center">
        {unit.status === 'Running' && (
          <div className="flex flex-col gap-4 mt-2">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">检测项目</span>
                <span className="text-sm font-bold text-slate-800 truncate max-w-[160px] text-right" title={unit.testItem || '未设置'}>
                  {unit.testItem || '未设置'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">剩余时间</span>
                <span className="text-sm font-bold text-slate-800 font-mono">{unit.remainingTime || '--:--:--'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">运行进度</span>
                <span className="text-sm font-bold text-blue-600">{unit.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${unit.progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
        {unit.status === 'Available' && (
          <div className="text-slate-500 text-lg flex items-center justify-center h-full bg-slate-50 rounded-2xl border border-slate-100 border-dashed mt-2">
            设备空闲，点击进行样本配置
          </div>
        )}
        {unit.status === 'Finished' && (
          <div className="text-emerald-600 text-lg flex items-center justify-center h-full bg-emerald-50 rounded-2xl border border-emerald-100 border-dashed mt-2">
            运行完成，请取出耗材
          </div>
        )}
        {unit.status === 'Error' && (
          <div className="text-red-500 text-lg flex items-center justify-center h-full bg-red-50 rounded-2xl border border-red-100 border-dashed mt-2">
            设备异常，请检查模块状态
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'Available':
      return <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-base font-medium"><PlayCircle size={20} /> 空闲</span>;
    case 'Running':
      return <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-base font-medium shadow-sm"><Activity size={20} /> 运行中</span>;
    case 'Finished':
      return <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-base font-medium shadow-sm"><CheckCircle size={20} /> 已完成</span>;
    case 'Error':
      return <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-base font-medium shadow-sm"><AlertCircle size={20} /> 故障</span>;
    default:
      return null;
  }
}
