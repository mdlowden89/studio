
import { Suspense } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Loader2 } from 'lucide-react';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { getCurrentUser } from '@/lib/mock-data';

function DashboardLoading() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
            <p className="text-xl mt-4 text-muted-foreground">Loading Dashboard...</p>
        </div>
      </div>
    </AppLayout>
  );
}

export default function DashboardPage() {
  const currentUser = getCurrentUser();
  
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardClient currentUser={currentUser} />
    </Suspense>
  );
}
