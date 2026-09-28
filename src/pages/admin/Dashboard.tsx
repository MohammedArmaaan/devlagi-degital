import React from 'react';
import { Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl mr-5">
          <Activity size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">System Status</p>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Active
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        Welcome to the Admin Dashboard.
      </div>
    </div>
  );
};

export default Dashboard;
