'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Settings, 
  Trash2, 
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Define interfaces for our data types
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  read: boolean;
}

interface NotificationSetting {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
}

// Mock data for notifications
const notifications: Notification[] = [
  { 
    id: 1, 
    title: 'New user registration', 
    message: 'A new user has registered on your platform.', 
    time: '2 minutes ago', 
    type: 'user', 
    read: false 
  },
  { 
    id: 2, 
    title: 'Payment received', 
    message: 'You have received a payment of $499.00.', 
    time: '1 hour ago', 
    type: 'payment', 
    read: false 
  },
  { 
    id: 3, 
    title: 'System update completed', 
    message: 'The system update has been completed successfully.', 
    time: '3 hours ago', 
    type: 'system', 
    read: true 
  },
  { 
    id: 4, 
    title: 'New comment on your post', 
    message: 'John Doe commented on your recent post.', 
    time: '5 hours ago', 
    type: 'comment', 
    read: true 
  },
  { 
    id: 5, 
    title: 'Subscription renewal', 
    message: 'Your subscription will renew in 3 days.', 
    time: '1 day ago', 
    type: 'subscription', 
    read: true 
  },
  { 
    id: 6, 
    title: 'New feature available', 
    message: 'Check out our new analytics dashboard feature.', 
    time: '2 days ago', 
    type: 'feature', 
    read: true 
  },
  { 
    id: 7, 
    title: 'Security alert', 
    message: 'Unusual login attempt detected from a new device.', 
    time: '2 days ago', 
    type: 'security', 
    read: true 
  },
  { 
    id: 8, 
    title: 'Scheduled maintenance', 
    message: 'System maintenance scheduled for July 20, 2023.', 
    time: '3 days ago', 
    type: 'maintenance', 
    read: true 
  },
];

const notificationSettings = [
  { id: 1, category: 'Account', type: 'Email', enabled: true },
  { id: 2, category: 'Account', type: 'Push', enabled: true },
  { id: 3, category: 'Account', type: 'SMS', enabled: false },
  { id: 4, category: 'Billing', type: 'Email', enabled: true },
  { id: 5, category: 'Billing', type: 'Push', enabled: true },
  { id: 6, category: 'Billing', type: 'SMS', enabled: true },
  { id: 7, category: 'System', type: 'Email', enabled: true },
  { id: 8, category: 'System', type: 'Push', enabled: false },
  { id: 9, category: 'System', type: 'SMS', enabled: false },
  { id: 10, category: 'Marketing', type: 'Email', enabled: false },
  { id: 11, category: 'Marketing', type: 'Push', enabled: false },
  { id: 12, category: 'Marketing', type: 'SMS', enabled: false },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState(notificationSettings);
  const [notificationsList, setNotificationsList] = useState(notifications);

  const filteredNotifications = notificationsList.filter(notification => {
    // Filter by search term
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && !notification.read) ||
                      (activeTab === 'read' && notification.read);
    
    return matchesSearch && matchesTab;
  });

  const markAsRead = (id: number) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationsList(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const toggleSetting = (id: number) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Manage your notifications and preferences.
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Notification Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark All as Read
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Your Notifications</CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                    <TabsTrigger value="read" className="text-xs">Read</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                You have {notificationsList.filter(n => !n.read).length} unread notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 flex items-start gap-4 ${notification.read ? '' : 'bg-muted/30'}`}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {notification.type === 'user' && <Users className="h-5 w-5 text-primary" />}
                        {notification.type === 'payment' && <DollarSign className="h-5 w-5 text-primary" />}
                        {notification.type === 'system' && <Settings className="h-5 w-5 text-primary" />}
                        {notification.type === 'comment' && <MessageSquare className="h-5 w-5 text-primary" />}
                        {notification.type === 'subscription' && <Calendar className="h-5 w-5 text-primary" />}
                        {notification.type === 'feature' && <Bell className="h-5 w-5 text-primary" />}
                        {notification.type === 'security' && <AlertCircle className="h-5 w-5 text-primary" />}
                        {notification.type === 'maintenance' && <Clock className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as read
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send to email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-red-500"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No notifications found</p>
                  </div>
                )}
              </div>
            </CardContent>
            {filteredNotifications.length > 0 && (
              <CardFooter className="flex justify-center p-4 border-t">
                <Button variant="outline">Load More</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Notifications</h3>
                  <div className="space-y-2">
                    {settings.filter(s => s.category === 'Account').map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {setting.type === 'Email' && <Mail className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'Push' && <Bell className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'SMS' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                          <span>{setting.type} Notifications</span>
                        </div>
                        <Switch 
                          checked={setting.enabled} 
                          onCheckedChange={() => toggleSetting(setting.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing Notifications</h3>
                  <div className="space-y-2">
                    {settings.filter(s => s.category === 'Billing').map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {setting.type === 'Email' && <Mail className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'Push' && <Bell className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'SMS' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                          <span>{setting.type} Notifications</span>
                        </div>
                        <Switch 
                          checked={setting.enabled} 
                          onCheckedChange={() => toggleSetting(setting.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Notifications</h3>
                  <div className="space-y-2">
                    {settings.filter(s => s.category === 'System').map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {setting.type === 'Email' && <Mail className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'Push' && <Bell className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'SMS' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                          <span>{setting.type} Notifications</span>
                        </div>
                        <Switch 
                          checked={setting.enabled} 
                          onCheckedChange={() => toggleSetting(setting.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Marketing Notifications</h3>
                  <div className="space-y-2">
                    {settings.filter(s => s.category === 'Marketing').map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {setting.type === 'Email' && <Mail className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'Push' && <Bell className="h-4 w-4 text-muted-foreground" />}
                          {setting.type === 'SMS' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                          <span>{setting.type} Notifications</span>
                        </div>
                        <Switch 
                          checked={setting.enabled} 
                          onCheckedChange={() => toggleSetting(setting.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Missing component definitions
function Users(props: React.SVGProps<SVGSVGElement>) {
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

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function Image(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}