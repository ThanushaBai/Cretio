'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight, 
  BarChart3, 
  Building2,
  DollarSign, 
  ImageIcon,
  Users, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Activity 
} from "lucide-react";
import { useState } from "react";

// Mock data for the overview page
const performanceData = [
  { month: 'Jan', revenue: 4000, users: 2400, agencies: 1200 },
  { month: 'Feb', revenue: 3000, users: 1398, agencies: 900 },
  { month: 'Mar', revenue: 2000, users: 9800, agencies: 1800 },
  { month: 'Apr', revenue: 2780, users: 3908, agencies: 1500 },
  { month: 'May', revenue: 1890, users: 4800, agencies: 1700 },
  { month: 'Jun', revenue: 2390, users: 3800, agencies: 1400 },
  { month: 'Jul', revenue: 3490, users: 4300, agencies: 1900 },
];

const recentActivities = [
  { id: 1, type: 'user', title: 'New user signed up', time: '2 hours ago' },
  { id: 2, type: 'agency', title: 'New agency created', time: '4 hours ago' },
  { id: 3, type: 'funnel', title: 'Funnel published', time: '6 hours ago' },
  { id: 4, type: 'payment', title: 'Payment received', time: '1 day ago' },
  { id: 5, type: 'media', title: 'New media uploaded', time: '1 day ago' },
];

const upcomingEvents = [
  { id: 1, title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'meeting' },
  { id: 2, title: 'Product Launch', date: 'Tomorrow, 10:00 AM', type: 'launch' },
  { id: 3, title: 'Client Presentation', date: 'Jul 15, 3:30 PM', type: 'presentation' },
  { id: 4, title: 'Marketing Campaign', date: 'Jul 20, All day', type: 'campaign' },
];

export default function OverviewPage() {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          A comprehensive overview of your platform's performance and activities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+20.1%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+15.3%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.6%</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+2.4%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 32s</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+12.3%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Metrics</CardTitle>
              <div className="flex items-center space-x-2">
                <TabsList className="grid grid-cols-3 h-8">
                  <TabsTrigger 
                    value="daily" 
                    className="text-xs h-7"
                    onClick={() => setTimeframe('daily')}
                    data-state={timeframe === 'daily' ? 'active' : ''}
                  >
                    Daily
                  </TabsTrigger>
                  <TabsTrigger 
                    value="weekly" 
                    className="text-xs h-7"
                    onClick={() => setTimeframe('weekly')}
                    data-state={timeframe === 'weekly' ? 'active' : ''}
                  >
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger 
                    value="monthly" 
                    className="text-xs h-7"
                    onClick={() => setTimeframe('monthly')}
                    data-state={timeframe === 'monthly' ? 'active' : ''}
                  >
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <CardDescription>
              {timeframe === 'daily' ? 'Last 7 days' : timeframe === 'weekly' ? 'Last 12 weeks' : 'Last 12 months'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Performance chart placeholder</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Showing {timeframe} data for revenue, users, and agencies
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities across your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.type === 'user' && <Users className="h-4 w-4 text-primary" />}
                    {activity.type === 'agency' && <Building2 className="h-4 w-4 text-primary" />}
                    {activity.type === 'funnel' && <ArrowUpRight className="h-4 w-4 text-primary" />}
                    {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-primary" />}
                    {activity.type === 'media' && <ImageIcon className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled events and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>System performance and health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Server Uptime</p>
                  <p className="text-sm font-medium">99.9%</p>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[99.9%] rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">API Response Time</p>
                  <p className="text-sm font-medium">120ms</p>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Database Load</p>
                  <p className="text-sm font-medium">42%</p>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[42%] rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Memory Usage</p>
                  <p className="text-sm font-medium">68%</p>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[68%] rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}