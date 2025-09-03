'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Download, 
  FileText, 
  Filter, 
  Calendar, 
  Search, 
  BarChart3, 
  PieChart, 
  LineChart, 
  RefreshCw,
  Mail,
  Share2
} from "lucide-react";

// Mock data for reports
const savedReports = [
  { id: 1, name: 'Monthly Revenue Report', type: 'financial', lastRun: '2023-07-01', schedule: 'Monthly' },
  { id: 2, name: 'User Acquisition Report', type: 'users', lastRun: '2023-07-05', schedule: 'Weekly' },
  { id: 3, name: 'Conversion Funnel Analysis', type: 'conversion', lastRun: '2023-07-10', schedule: 'Weekly' },
  { id: 4, name: 'Agency Performance Report', type: 'performance', lastRun: '2023-07-12', schedule: 'Monthly' },
  { id: 5, name: 'Content Engagement Report', type: 'engagement', lastRun: '2023-07-15', schedule: 'Bi-weekly' },
];

const reportTemplates = [
  { id: 1, name: 'Financial Overview', description: 'Revenue, expenses, and profit metrics', icon: 'financial' },
  { id: 2, name: 'User Analytics', description: 'User growth, retention, and behavior', icon: 'users' },
  { id: 3, name: 'Conversion Metrics', description: 'Conversion rates and funnel analysis', icon: 'conversion' },
  { id: 4, name: 'Agency Performance', description: 'Agency growth and performance metrics', icon: 'performance' },
  { id: 5, name: 'Content Engagement', description: 'Content views, shares, and engagement', icon: 'engagement' },
  { id: 6, name: 'Custom Report', description: 'Build a custom report from scratch', icon: 'custom' },
];

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState('last30days');
  const [reportFormat, setReportFormat] = useState('pdf');

  const filteredReports = savedReports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate, schedule, and manage reports for your business.
        </p>
      </div>

      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Access and manage your saved reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell className="capitalize">{report.type}</TableCell>
                        <TableCell>{report.lastRun}</TableCell>
                        <TableCell>{report.schedule}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No reports found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Choose a template to create a new report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.icon === 'financial' && <BarChart3 className="h-5 w-5 text-muted-foreground" />}
                        {template.icon === 'users' && <Users className="h-5 w-5 text-muted-foreground" />}
                        {template.icon === 'conversion' && <LineChart className="h-5 w-5 text-muted-foreground" />}
                        {template.icon === 'performance' && <Activity className="h-5 w-5 text-muted-foreground" />}
                        {template.icon === 'engagement' && <PieChart className="h-5 w-5 text-muted-foreground" />}
                        {template.icon === 'custom' && <FileText className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Manage your automated report schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Revenue Report</TableCell>
                    <TableCell>Monthly (1st day)</TableCell>
                    <TableCell>3 recipients</TableCell>
                    <TableCell>Aug 1, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit Schedule</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Weekly User Report</TableCell>
                    <TableCell>Weekly (Monday)</TableCell>
                    <TableCell>2 recipients</TableCell>
                    <TableCell>Jul 24, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit Schedule</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Conversion Funnel Analysis</TableCell>
                    <TableCell>Weekly (Friday)</TableCell>
                    <TableCell>5 recipients</TableCell>
                    <TableCell>Jul 21, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit Schedule</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create a custom report with your selected metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Name</label>
                <Input placeholder="Enter report name" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="last30days">Last 30 days</SelectItem>
                      <SelectItem value="thisMonth">This month</SelectItem>
                      <SelectItem value="lastMonth">Last month</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Format</label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Metrics</label>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="revenue" className="rounded border-gray-300" />
                    <label htmlFor="revenue">Revenue</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="users" className="rounded border-gray-300" />
                    <label htmlFor="users">User Growth</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="conversion" className="rounded border-gray-300" />
                    <label htmlFor="conversion">Conversion Rate</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="engagement" className="rounded border-gray-300" />
                    <label htmlFor="engagement">Engagement</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="retention" className="rounded border-gray-300" />
                    <label htmlFor="retention">Retention</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="churn" className="rounded border-gray-300" />
                    <label htmlFor="churn">Churn Rate</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Dimensions</label>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="time" className="rounded border-gray-300" />
                    <label htmlFor="time">Time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="device" className="rounded border-gray-300" />
                    <label htmlFor="device">Device</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="location" className="rounded border-gray-300" />
                    <label htmlFor="location">Location</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="source" className="rounded border-gray-300" />
                    <label htmlFor="source">Traffic Source</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="campaign" className="rounded border-gray-300" />
                    <label htmlFor="campaign">Campaign</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="product" className="rounded border-gray-300" />
                    <label htmlFor="product">Product</label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Template</Button>
              <div className="flex gap-2">
                <Button variant="outline">Schedule</Button>
                <Button>Generate Report</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Missing component definitions
function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Activity(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}