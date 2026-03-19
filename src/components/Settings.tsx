import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Wifi, Database, Wrench, Save, RefreshCw, Download, Trash2, UserPlus } from 'lucide-react';

type SettingsTab = 'device' | 'network' | 'users' | 'data';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('device');
  const [volume, setVolume] = useState(70);

  const renderTabButton = (id: SettingsTab, icon: React.ReactNode, label: string) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-lg transition-colors ${
          isActive 
            ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
            : 'text-slate-600 hover:bg-slate-100 border border-transparent'
        }`}
      >
        {icon} {label}
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-8 border-b border-slate-200 bg-slate-50 shrink-0">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <SettingsIcon size={32} className="text-blue-600" /> 系统设置
        </h2>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-slate-200 bg-slate-50/50 p-6 space-y-3 overflow-y-auto shrink-0">
          {renderTabButton('device', <Wrench size={24}/>, '设备参数')}
          {renderTabButton('network', <Wifi size={24}/>, '网络配置')}
          {renderTabButton('users', <Shield size={24}/>, '用户权限')}
          {renderTabButton('data', <Database size={24}/>, '数据管理')}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-10 overflow-y-auto bg-white">
          
          {/* Device Parameters */}
          {activeTab === 'device' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">设备参数配置</h3>
              <div className="space-y-8 max-w-3xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-700">设备名称</label>
                    <input 
                      type="text" 
                      defaultValue="高通量核酸提取扩增仪" 
                      className="w-full px-5 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-700">设备编号</label>
                    <input 
                      type="text" 
                      defaultValue="EQ-2026-001" 
                      disabled 
                      className="w-full px-5 py-3 text-lg border border-slate-200 bg-slate-50 text-slate-500 rounded-xl cursor-not-allowed" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-700">默认运行模式</label>
                  <select className="w-full px-5 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white">
                    <option>全流程 (提取 + PCR)</option>
                    <option>仅核酸提取</option>
                    <option>仅PCR扩增</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-700">蜂鸣器提示音量</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume} 
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <span className="text-lg font-medium text-slate-600 w-12 text-right">{volume}%</span>
                  </div>
                </div>

                <div className="pt-10 mt-10 border-t border-slate-100 flex justify-end">
                  <button className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
                    <Save size={20} /> 保存配置
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Network Configuration */}
          {activeTab === 'network' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">网络配置</h3>
              <div className="space-y-8 max-w-3xl">
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-700">网络连接方式</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 p-4 border border-blue-200 bg-blue-50 rounded-xl cursor-pointer flex-1">
                      <input type="radio" name="networkType" defaultChecked className="w-5 h-5 text-blue-600" />
                      <span className="text-lg font-medium text-blue-800">以太网 (Ethernet)</span>
                    </label>
                    <label className="flex items-center gap-2 p-4 border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer flex-1 transition-colors">
                      <input type="radio" name="networkType" className="w-5 h-5 text-blue-600" />
                      <span className="text-lg font-medium text-slate-700">Wi-Fi (无线网络)</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-700">IP 地址分配</label>
                    <select className="w-full px-5 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white">
                      <option>自动获取 (DHCP)</option>
                      <option>静态 IP (Static)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-700">IP 地址</label>
                    <input 
                      type="text" 
                      defaultValue="192.168.1.100" 
                      className="w-full px-5 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-700">子网掩码</label>
                    <input 
                      type="text" 
                      defaultValue="255.255.255.0" 
                      className="w-full px-5 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-700">默认网关</label>
                    <input 
                      type="text" 
                      defaultValue="192.168.1.1" 
                      className="w-full px-5 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" 
                    />
                  </div>
                </div>

                <div className="pt-10 mt-10 border-t border-slate-100 flex justify-between items-center">
                  <button className="flex items-center gap-2 px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl text-lg font-bold transition-colors">
                    <RefreshCw size={20} /> 测试连接
                  </button>
                  <button className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
                    <Save size={20} /> 保存配置
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Permissions */}
          {activeTab === 'users' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800">用户权限管理</h3>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm">
                  <UserPlus size={20} /> 新增用户
                </button>
              </div>
              
              <div className="overflow-hidden border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 text-lg">
                      <th className="py-4 px-6 font-semibold">用户名</th>
                      <th className="py-4 px-6 font-semibold">角色</th>
                      <th className="py-4 px-6 font-semibold">状态</th>
                      <th className="py-4 px-6 font-semibold">最后登录</th>
                      <th className="py-4 px-6 font-semibold">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors text-lg">
                      <td className="py-4 px-6 font-medium text-slate-800">admin</td>
                      <td className="py-4 px-6"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold">管理员</span></td>
                      <td className="py-4 px-6"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold">正常</span></td>
                      <td className="py-4 px-6 text-slate-500">2026-03-19 10:23</td>
                      <td className="py-4 px-6">
                        <button className="text-blue-600 hover:text-blue-800 font-medium mr-4">编辑</button>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors text-lg">
                      <td className="py-4 px-6 font-medium text-slate-800">operator_1</td>
                      <td className="py-4 px-6"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold">操作员</span></td>
                      <td className="py-4 px-6"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold">正常</span></td>
                      <td className="py-4 px-6 text-slate-500">2026-03-18 14:45</td>
                      <td className="py-4 px-6">
                        <button className="text-blue-600 hover:text-blue-800 font-medium mr-4">编辑</button>
                        <button className="text-red-600 hover:text-red-800 font-medium">禁用</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors text-lg">
                      <td className="py-4 px-6 font-medium text-slate-800">viewer_1</td>
                      <td className="py-4 px-6"><span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm font-bold">观察员</span></td>
                      <td className="py-4 px-6"><span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-lg text-sm font-bold">已禁用</span></td>
                      <td className="py-4 px-6 text-slate-500">2026-03-10 09:12</td>
                      <td className="py-4 px-6">
                        <button className="text-blue-600 hover:text-blue-800 font-medium mr-4">编辑</button>
                        <button className="text-emerald-600 hover:text-emerald-800 font-medium">启用</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Data Management */}
          {activeTab === 'data' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">数据管理与维护</h3>
              
              <div className="grid grid-cols-2 gap-8 max-w-4xl">
                <div className="p-8 border border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-start">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Download size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">导出检测记录</h4>
                  <p className="text-slate-500 mb-8 flex-1">将历史检测记录导出为 CSV 或 Excel 格式，以便在其他设备上进行分析和存档。</p>
                  <button className="w-full py-3 bg-white border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 rounded-xl font-bold transition-colors">
                    导出全部记录
                  </button>
                </div>

                <div className="p-8 border border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-start">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                    <Trash2 size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">清理历史数据</h4>
                  <p className="text-slate-500 mb-8 flex-1">清理超过指定时间的旧检测记录，释放设备存储空间。此操作不可逆，请谨慎操作。</p>
                  <button className="w-full py-3 bg-white border-2 border-red-200 hover:bg-red-50 text-red-600 rounded-xl font-bold transition-colors">
                    清理 30 天前数据
                  </button>
                </div>

                <div className="p-8 border border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-start col-span-2">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <Database size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">系统日志与备份</h4>
                  <p className="text-slate-500 mb-8">备份系统配置、模板文件和运行日志。在设备维护或升级时使用。</p>
                  <div className="flex gap-4 w-full">
                    <button className="flex-1 py-3 bg-white border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-700 rounded-xl font-bold transition-colors">
                      备份系统数据
                    </button>
                    <button className="flex-1 py-3 bg-white border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 rounded-xl font-bold transition-colors">
                      导出运行日志
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
