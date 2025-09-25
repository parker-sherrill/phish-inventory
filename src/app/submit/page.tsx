'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import ReportForm from '../../components/ReportForm';
import * as Toast from '@radix-ui/react-toast';
import { useReports, Report } from '../../context/ReportsContext';

export default function Submit() {
  const router = useRouter();
  const { addReport } = useReports();   // 👈 use context
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; success: boolean }>({
    open: false,
    success: true,
  });

  const handleSubmit = async (formData: Omit<Report, 'id' | 'submittedAt' | 'status'>) => {
    setIsSubmitting(true);
    try {
      // Call backend + update context
      await addReport(formData);

      setToast({ open: true, success: true });

      // Redirect after short delay
      setTimeout(() => {
        router.push('/reports');
      }, 2000);
    } catch (err: any) {
      console.error('Submit failed:', err);
      setToast({ open: true, success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Toast.Provider swipeDirection="right">
      <Layout>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Phishing Report</h1>
            <p className="text-gray-600">
              Help protect others by reporting phishing attempts you've encountered.
            </p>
          </div>

          <ReportForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </Layout>

      {/* ✅ Toast for success/failure */}
      <Toast.Root
        open={toast.open}
        onOpenChange={(open) => setToast((prev) => ({ ...prev, open }))}
        className={`rounded-lg px-4 py-3 shadow-lg ${
          toast.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}
      >
        <Toast.Title className="font-semibold">
          {toast.success
            ? 'Report submitted successfully!'
            : 'Failed to submit report'}
        </Toast.Title>
        <Toast.Description className="text-sm opacity-90">
          {toast.success
            ? 'Thank you for helping keep users safe. Redirecting to reports...'
            : 'Please try again later or contact support.'}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-80" />
    </Toast.Provider>
  );
}
