
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Screen } from '../types';

const hiringData = [
  { name: 'Nov 2025', engineering: 20, product: 15, design: 10, sales: 8, hr: 5 },
  { name: 'Dec 2025', engineering: 25, product: 18, design: 12, sales: 10, hr: 6 },
  { name: 'Jan 2026', engineering: 45, product: 22, design: 15, sales: 12, hr: 8 },
];

const workforceData = [
  { name: 'Engineering', value: 5, color: '#2563eb' },
  { name: 'Product', value: 2, color: '#10b981' },
  { name: 'Design', value: 2, color: '#8b5cf6' },
  { name: 'Sales', value: 1, color: '#f59e0b' },
  { name: 'HR', value: 1, color: '#ef4444' },
];

interface DashboardProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentScreen, setScreen }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8 flex gap-8">
      <Sidebar currentScreen={currentScreen} setScreen={setScreen} />
      
      <main className="flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Good morning, Jordan</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's what's happening at Consigo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Contributors', value: '11', change: '+12%', icon: 'groups', color: 'green' },
            { label: 'Open Roles', value: '19', change: '+8%', icon: 'work', color: 'blue' },
            { label: 'New Hires', value: '2', change: '+10%', icon: 'leaderboard', color: 'purple' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex justify-between items-start shadow-sm">
              <div>
                <div className={`p-2 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-lg inline-block mb-3`}>
                  <span className={`material-symbols-outlined text-${stat.color}-600 text-[20px]`}>{stat.icon}</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-3">{stat.change} from last quarter</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">
                <span className="material-symbols-outlined text-[12px] mr-0.5 font-bold">trending_up</span> {stat.change.replace('+','')}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden shadow-sm">
          <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold">Hiring trends</h2>
            <button onClick={() => setScreen('jobs')} className="text-primary text-xs font-semibold hover:underline">View Jobs</button>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-6">
              <span className="font-bold text-sm block mb-1">Key Insights</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Engineering hiring increased by 75% in January compared to November. Product and Design roles show steady month-over-month growth.</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hiringData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="engineering" stroke="#2563eb" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="product" stroke="#10b981" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="design" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center flex-wrap gap-6 mt-6 text-xs font-medium">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Engineering</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Product</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>Design</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>Sales</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>HR</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden shadow-sm">
          <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold">Workforce distribution by function</h2>
            <button className="text-primary text-xs font-semibold hover:underline">View Team</button>
          </div>
          <div className="p-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workforceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workforceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold">11</span>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">January 2026</span>
              </div>
            </div>
            <div className="flex-grow w-full max-md:max-w-md">
              <div className="grid grid-cols-3 text-[10px] text-gray-400 font-bold uppercase mb-4 px-2">
                <span>Function</span>
                <span className="text-right">Headcount</span>
                <span className="text-right">% of Total</span>
              </div>
              <div className="space-y-4">
                {workforceData.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-sm items-center px-2">
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </span>
                    <span className="text-right font-medium">{item.value}</span>
                    <span className="text-right text-gray-500">{(item.value / 11 * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <aside className="w-80 flex-shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm sticky top-24">
          <h2 className="font-bold text-lg mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Create Job', icon: 'post_add', onClick: () => setScreen('post-job') },
              { label: 'Find Talent', icon: 'search' },
              { label: 'Find Investors', icon: 'monetization_on' },
              { label: 'Share Feedback', icon: 'rate_review' },
            ].map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">{action.icon}</span>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
