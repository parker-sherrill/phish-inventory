'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import ReportsTable from '../../components/ReportsTable';
import { useReports, Report } from '../../context/ReportsContext';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ArrowUpDown } from 'lucide-react';

export default function Reports() {
  const { reports, loading } = useReports();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReports = reports.filter((report: Report) => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort the filtered reports
  const sortedReports = [...filteredReports].sort((a: Report, b: Report) => {
    const dateA = new Date(a.submittedAt).getTime();
    const dateB = new Date(b.submittedAt).getTime();
    
    switch (sortBy) {
      case 'newest':
        return dateB - dateA; // Newest first
      case 'oldest':
        return dateA - dateB; // Oldest first
      default:
        return dateB - dateA; // Default to newest first
    }
  });

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
              <div className="flex gap-2">
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
                
                <Select.Root value={sortBy} onValueChange={setSortBy}>
                  <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[160px]">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      <Select.Value placeholder="Sort by date" />
                    </div>
                    <Select.Icon asChild>
                      <ChevronDownIcon className="w-4 h-4" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 min-w-[160px]">
                      <Select.Viewport className="p-1">
                        <Select.Item value="newest" className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                          <Select.ItemText>Newest First</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="oldest" className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                          <Select.ItemText>Oldest First</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
          </div>
          
          <ReportsTable reports={sortedReports} />
        </div>
      </div>
    </Layout>
  );
}
