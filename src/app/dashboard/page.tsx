'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import MetricsCharts from '../../components/MetricsCharts';
import mockReports from '../../data/mockReports.json';

export default function Dashboard() {
  const [reports, setReports] = useState(mockReports);

  // Calculate metrics
  const totalReports = reports.length;
  const verifiedReports = reports.filter(r => r.status === 'verified').length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const falsePositives = reports.filter(r => r.status === 'false_positive').length;

  // Calculate reports by month
  const reportsByMonth = reports.reduce((acc, report) => {
    const month = new Date(report.submittedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate reports by type
  const reportsByType = reports.reduce((acc, report) => {
    acc[report.type] = (acc[report.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const metrics = {
    total: totalReports,
    verified: verifiedReports,
    pending: pendingReports,
    falsePositives,
    reportsByMonth,
    reportsByType
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Analytics and metrics for phishing reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[color:var(--color-brand-100)] rounded-lg">
                <svg className="w-6 h-6 text-[color:var(--color-brand-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-semibold text-gray-900">{metrics.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[color:var(--color-brand-100)] rounded-lg">
                <svg className="w-6 h-6 text-[color:var(--color-brand-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-semibold text-gray-900">{metrics.verified}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[color:var(--color-brand-100)] rounded-lg">
                <svg className="w-6 h-6 text-[color:var(--color-brand-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{metrics.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className="p-2 bg-[color:var(--color-brand-100)] rounded-lg">
                <svg className="w-6 h-6 text-[color:var(--color-brand-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">False Positives</p>
                <p className="text-2xl font-semibold text-gray-900">{metrics.falsePositives}</p>
              </div>
            </div>
          </div>
        </div>

        <MetricsCharts metrics={metrics} />
      </div>
    </Layout>
  );
}
