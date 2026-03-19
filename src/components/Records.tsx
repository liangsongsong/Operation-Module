import React, { useState } from 'react';
import { RecordData } from '../types';
import { Search, FileText, X, Calendar, User, Activity, Clock, MapPin, UserCheck } from 'lucide-react';

const MOCK_RECORDS: RecordData[] = [
  { id: 'REC-20260318-001', unitName: '单元 A', sampleId: 'SMP-001', patientName: '张三', assayType: 'COVID-19', startTime: '2026-03-18 08:00', endTime: '2026-03-18 09:30', result: 'Negative', operator: '李医生' },
  { id: 'REC-20260318-002', unitName: '单元 B', sampleId: 'SMP-002', patientName: '李四', assayType: 'HBV', startTime: '2026-03-18 08:15', endTime: '2026-03-18 09:45', result: 'Positive', operator: '李医生' },
  { id: 'REC-20260318-003', unitName: '单元 C', sampleId: 'SMP-003', patientName: '王五', assayType: 'HPV', startTime: '2026-03-18 09:00', endTime: '2026-03-18 10:30', result: 'Negative', operator: '王护士' },
  { id: 'REC-20260318-004', unitName: '单元 A', sampleId: 'SMP-004', patientName: '赵六', assayType: 'COVID-19', startTime: '2026-03-18 10:00', endTime: '2026-03-18 11:30', result: 'Invalid', operator: '李医生' },
  { id: 'REC-20260318-005', unitName: '单元 D', sampleId: 'SMP-005', patientName: '孙七', assayType: 'HBV', startTime: '2026-03-18 10:15', endTime: '2026-03-18 11:45', result: 'Negative', operator: '王护士' },
  { id: 'REC-20260318-006', unitName: '单元 E', sampleId: 'SMP-006', patientName: '周八', assayType: 'HPV', startTime: '2026-03-18 11:00', endTime: '2026-03-18 12:30', result: 'Positive', operator: '李医生' },
];

export default function Records() {
  const [selectedRecord, setSelectedRecord] = useState<RecordData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = MOCK_RECORDS.filter(rec => 
    rec.sampleId.includes(searchTerm) || 
    rec.patientName.includes(searchTerm) || 
    rec.id.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-8 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <FileText size={32} className="text-blue-600" /> 检测记录查询
        </h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索样本编号/患者姓名..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 border border-slate-300 rounded-xl w-80 focus:ring-2 focus:ring-blue-500 outline-none text-lg" 
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 border-b-2 border-slate-200 text-lg">
              <th className="pb-4 font-semibold">记录编号</th>
              <th className="pb-4 font-semibold">运行单元</th>
              <th className="pb-4 font-semibold">样本编号</th>
              <th className="pb-4 font-semibold">患者姓名</th>
              <th className="pb-4 font-semibold">检测项目</th>
              <th className="pb-4 font-semibold">检测结果</th>
              <th className="pb-4 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(rec => (
              <tr key={rec.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors text-lg">
                <td className="py-5 text-slate-800 font-medium">{rec.id}</td>
                <td className="py-5 text-slate-600">{rec.unitName}</td>
                <td className="py-5 text-slate-600">{rec.sampleId}</td>
                <td className="py-5 text-slate-600">{rec.patientName}</td>
                <td className="py-5 text-slate-600">{rec.assayType}</td>
                <td className="py-5">
                  <span className={`px-4 py-1.5 rounded-full text-base font-medium ${rec.result === 'Positive' ? 'bg-red-100 text-red-700' : rec.result === 'Negative' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                    {rec.result === 'Positive' ? '阳性' : rec.result === 'Negative' ? '阴性' : '无效'}
                  </span>
                </td>
                <td className="py-5">
                  <button 
                    onClick={() => setSelectedRecord(rec)} 
                    className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 text-lg">
                  没有找到匹配的记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-2xl font-bold text-slate-800">记录详情 - {selectedRecord.id}</h3>
              <button onClick={() => setSelectedRecord(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X size={28} />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 flex items-center gap-2"><User size={18}/> 患者姓名</div>
                  <div className="text-xl font-bold text-slate-800">{selectedRecord.patientName}</div>
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 flex items-center gap-2"><Activity size={18}/> 检测项目</div>
                  <div className="text-xl font-bold text-slate-800">{selectedRecord.assayType}</div>
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 flex items-center gap-2"><Clock size={18}/> 运行时间</div>
                  <div className="text-lg font-medium text-slate-800">{selectedRecord.startTime} - {selectedRecord.endTime}</div>
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 flex items-center gap-2"><MapPin size={18}/> 运行单元</div>
                  <div className="text-lg font-medium text-slate-800">{selectedRecord.unitName}</div>
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 flex items-center gap-2"><FileText size={18}/> 样本编号</div>
                  <div className="text-lg font-medium text-slate-800">{selectedRecord.sampleId}</div>
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 flex items-center gap-2"><UserCheck size={18}/> 操作员</div>
                  <div className="text-lg font-medium text-slate-800">{selectedRecord.operator}</div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
                <div className="text-lg text-slate-600 font-medium">最终检测结果</div>
                <div className={`inline-flex items-center px-6 py-3 rounded-xl text-2xl font-bold shadow-sm ${
                  selectedRecord.result === 'Positive' ? 'bg-red-100 text-red-700 border border-red-200' : 
                  selectedRecord.result === 'Negative' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                  'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {selectedRecord.result === 'Positive' ? '阳性 (Positive)' : 
                   selectedRecord.result === 'Negative' ? '阴性 (Negative)' : '无效 (Invalid)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
