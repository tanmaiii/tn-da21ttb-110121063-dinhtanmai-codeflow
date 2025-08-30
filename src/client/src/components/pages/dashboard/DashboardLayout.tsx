'use client';
import { DashboardFullSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ROLE } from "@/constants/enum";
import { ROLE_USER } from "@/constants/object";
import { useUserStore } from "@/stores/user_store";
import {
  IconChevronRight,
  IconSparkles,
  IconTrendingUp,
  IconUser
} from "@tabler/icons-react";
import { useTranslations } from 'next-intl';
import Dashboard_CardUser from "./DashboardCardUser";
import DashboardStudentView from "./DashboardStudentView";
import DashboardTeacherView from "./DashboardTeacherView";

export default function DashboardLayoutDashboard() {
  const { user } = useUserStore();
  const tDashboard = useTranslations('dashboard');
  const t = useTranslations();


  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return tDashboard('morningGreeting');
    if (hour < 18) return tDashboard('afternoonGreeting');
    return tDashboard('eveningGreeting');
  };

  // Get user role info
    const userRole = ROLE_USER.find(role => role.value === user?.role);

  // Determine which dashboard view to render based on user role
  const renderDashboardContent = () => {
    if (!user) {
      return <DashboardFullSkeleton />;
    }
    switch (user && user.role) {
      case ROLE.TEACHER:
        return <DashboardTeacherView />;
      case ROLE.ADMIN:
        return <DashboardTeacherView />; // Admin uses same view as teacher for now
      case ROLE.USER:
      default:
        return <DashboardStudentView />;
    }
  };

  return (
    <div className="min-h-screen b">
      <div className="mx-auto">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {user && (
              <>
                {/* Welcome Header */}
                <Card className="mb-6 p-0 border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <IconSparkles className="h-6 w-6 text-yellow-300" />
                          <span className="text-blue-100 font-medium">
                            {getGreeting()}
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold">
                          {user.name}
                        </h1>
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant="secondary" 
                            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                          >
                            <IconUser className="h-3 w-3 mr-1" />
                            {userRole?.labelKey ? t(userRole.labelKey) : user?.role}
                          </Badge>
                          <div className="flex items-center text-blue-100 text-sm">
                            <IconTrendingUp className="h-4 w-4 mr-1" />
                            {tDashboard('activeActivity')}
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="hidden md:flex items-center space-x-4 opacity-20">
                        <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                  <span>{tDashboard('home')}</span>
                  <IconChevronRight className="h-4 w-4" />
                  <span className="text-foreground font-medium">{tDashboard('dashboard')}</span>
                </div>
              </>
            )}

            {/* Dashboard Content */}
            <div className="space-y-6 min-h-[90vh]">
              {renderDashboardContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-16">
              <Dashboard_CardUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
