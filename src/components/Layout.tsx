"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Shield, BarChart3 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: Shield },
    { name: 'Submit', href: '/submit', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="inline-flex items-center group" aria-label="Phish-Fil-A Logo">
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/chick-fil-a-1.svg" 
                    alt="Phish-Fil-A" 
                    className="h-10 w-10 opacity-90 group-hover:opacity-100 transition-all duration-200 group-hover:scale-105" 
                  />
                  <span className="ml-3 text-xl font-bold text-[color:var(--color-brand-700)]">
                    Phish-Fil-A
                  </span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-[color:var(--color-brand-600)] text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-[color:var(--color-brand-200)] hover:text-gray-700'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2 text-[color:var(--color-brand-700)]" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive
                      ? 'bg-[color:var(--color-brand-50)] border-[color:var(--color-brand-600)] text-[color:var(--color-brand-700)]'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-[color:var(--color-brand-200)] hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-4 h-4 mr-3 text-[color:var(--color-brand-700)]" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
