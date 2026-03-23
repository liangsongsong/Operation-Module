import React from 'react';
import { Blocks, RotateCcw, Info, Layout, MousePointer2, Thermometer } from 'lucide-react';

export default function Overview() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-4">
          <Info size={16} /> 交互原型演示版本 v1.2
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">
          高通量独立控制单元 <span className="text-blue-600">设计规范</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          本网页旨在展示 6 通道核酸检测模块的 UI 交互逻辑与硬件映射关系，供团队评审与优化建议。
        </p>
      </section>

      {/* Key Features Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Layout size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">6 通道独立控制</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            每个单元（A-F）拥有完全独立的生命周期管理，支持不同步的启动、停止与参数配置。
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <Thermometer size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">PCR 孔位映射</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            严格遵循硬件接口定义的 2x8 映射关系，采用逆时针旋转编号逻辑，确保软硬件一致性。
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <MousePointer2 size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">极简交互体验</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            通过 Dashboard 直观展示运行进度与剩余时间，支持快捷操作菜单，减少层级跳转。
          </p>
        </div>
      </div>

      {/* PCR Mapping Logic Detail */}
      <section className="bg-slate-900 rounded-[40px] p-12 text-white overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <RotateCcw className="text-blue-400" /> PCR 孔位映射逻辑 (2x8)
            </h2>
            <div className="space-y-4 text-slate-400 text-lg">
              <p>针对每个样本区域，4 个 PCR 孔位采用以下排列规则：</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><span className="text-white font-bold">右下角</span> 定义为起始位 <span className="text-blue-400">1</span></li>
                <li><span className="text-white font-bold">逆时针旋转</span> 进行后续编号</li>
                <li>右上角为 2，左上角为 3，左下角为 4</li>
              </ul>
              <p className="text-sm bg-white/10 p-4 rounded-xl border border-white/10">
                💡 这种设计是为了匹配下位机步进电机的物理运动轨迹，减少复位行程。
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-6">
                <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center text-2xl font-black text-white/40">3</div>
                <div className="w-20 h-20 rounded-full border-4 border-blue-500 bg-blue-500/20 flex items-center justify-center text-2xl font-black text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]">2</div>
                <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center text-2xl font-black text-white/40">4</div>
                <div className="w-20 h-20 rounded-full border-4 border-blue-500 bg-blue-500/20 flex items-center justify-center text-2xl font-black text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse">1</div>
              </div>
              <div className="mt-8 flex justify-between items-center px-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Start</span>
                </div>
                <div className="h-[2px] flex-1 mx-4 bg-gradient-to-r from-blue-500 to-transparent"></div>
                <RotateCcw size={16} className="text-slate-500" />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full"></div>
      </section>

      {/* Feedback Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">优化建议征集</h2>
        <p className="text-slate-500">
          请同事在体验过程中重点关注以下维度，并提出您的宝贵建议：
        </p>
        <div className="flex justify-center gap-4">
          {['UI 辨识度', '操作流程度', '异常报警提醒', '数据录入效率'].map(tag => (
            <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
