
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Screen } from '../types';

export const JobsList: React.FC<{ currentScreen: Screen; setScreen: (s: Screen) => void }> = ({ currentScreen, setScreen }) => {
  const [tab, setTab] = useState<'Active' | 'Drafts' | 'Closed'>('Active');

  const jobs = [
    { title: 'Software Engineer', company: 'TechFlow', location: 'Remote', type: 'Contract', posted: '2 weeks ago', views: 72, applicants: 12 },
    { title: 'Data Scientist', company: 'TechFlow', location: 'Remote', type: 'Contract', posted: '2 weeks ago', views: 98, applicants: 3 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8 flex gap-8">
      <Sidebar currentScreen={currentScreen} setScreen={setScreen} />
      
      <main className="flex-grow">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Jobs', value: '8', icon: 'work', color: 'blue' },
            { label: 'Total Applications', value: '127', icon: 'group', color: 'emerald' },
            { label: 'Hire Rate', value: '23%', icon: 'bar_chart', color: 'purple' },
            { label: 'Avg. Days to Hire', value: '21', icon: 'timer', color: 'orange' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-start shadow-sm">
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-50 dark:bg-${stat.color}-900/30 text-${stat.color}-600 rounded-lg`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold">Jobs</h2>
            <button 
              onClick={() => setScreen('post-job')}
              className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Post a new job
            </button>
          </div>
          
          <div className="px-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex gap-8">
              {['Active', 'Drafts', 'Closed'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t as any)}
                  className={`py-4 border-b-2 text-sm font-semibold transition-all ${
                    tab === t ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">apartment</span>{job.company}</div>
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{job.location}</div>
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work_outline</span>{job.type}</div>
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>Posted {job.posted}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined">more_vert</span></button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-wider">Active</span>
                    <span className="text-sm text-gray-500"><strong>{job.views}</strong> views</span>
                    <span className="text-sm text-gray-500"><strong>{job.applicants}</strong> applicants</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">View Applicants</button>
                    <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">Manage Job</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
