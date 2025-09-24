'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import ReportForm from '../../components/ReportForm';
import * as Toast from '@radix-ui/react-toast';

export default function Submit() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Report submitted:', formData);
    setIsSubmitting(false);
    
    // Show success toast
    setShowToast(true);
    
    // Redirect to reports page after a short delay
    setTimeout(() => {
      router.push('/reports');
    }, 2000);
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
      
      <Toast.Root 
        open={showToast} 
        onOpenChange={setShowToast}
        className="bg-green-600 text-white rounded-lg px-4 py-3 shadow-lg"
      >
        <Toast.Title className="font-semibold">Report submitted successfully!</Toast.Title>
        <Toast.Description className="text-sm opacity-90">
          Thank you for helping keep users safe. Redirecting to reports...
        </Toast.Description>
      </Toast.Root>
      
      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-80" />
    </Toast.Provider>
  );
}
