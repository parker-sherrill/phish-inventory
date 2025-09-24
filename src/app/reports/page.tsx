'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ReportsTable from '../../components/ReportsTable';
import mockReports from '../../data/mockReports.json';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';

export default function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Phishing Reports</h1>
          <p className="text-gray-600">
            View and manage all submitted phishing reports.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Select.Root value={filter} onValueChange={setFilter}>
                <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[160px]">
                  <Select.Value placeholder="Filter by status" />
                  <Select.Icon asChild>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 min-w-[160px]">
                    <Select.Viewport className="p-1">
                      <Select.Item value="all" className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>All Reports</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="pending" className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>Pending</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="verified" className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>Verified</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="false_positive" className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>False Positive</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
          
          <ReportsTable reports={filteredReports} />
        </div>
      </div>
    </Layout>
  );
}
