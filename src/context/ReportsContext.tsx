// context/ReportsContext.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchReports, createReport, deleteReport } from '../utils/api';

export interface Report {
  id: string;
  url: string;
  type: string;
  description: string;
  severity: string;
  status: string;
  submittedAt: string;
  reporterName: string;
  reporterEmail: string;
}

interface ReportsContextType {
  reports: Report[];
  loading: boolean;
  setReports: (reports: Report[]) => void;
  addReport: (newReport: Omit<Report, 'id' | 'submittedAt' | 'status'>) => Promise<Report>;
  removeReport: (id: string) => Promise<void>;
}

const ReportsContext = createContext<ReportsContextType | null>(null);

export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchReports();
        setReports(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function addReport(newReport: Omit<Report, 'id' | 'submittedAt' | 'status'>) {
    const saved = await createReport(newReport);
    // ✅ update local state immediately
    setReports((prev) => [...prev, saved]);
    return saved;
  }

  async function removeReport(id: string) {
    await deleteReport(id);
    // ✅ update local state immediately
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <ReportsContext.Provider value={{ reports, loading, setReports, addReport, removeReport }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}
