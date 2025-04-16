
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Clock, MapPin, Calendar } from "lucide-react";
import RequestsList from "@/components/shared/RequestsList";
import AppHeader from "@/components/shared/AppHeader";
import { Buyer } from "@/types";

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getBuyerRequests } = useData();
  const [activeTab, setActiveTab] = useState("pending");
  
  // Type guard and redirect if not a buyer
  if (!user || user.role !== "buyer") {
    navigate("/");
    return null;
  }
  
  const buyer = user as Buyer;
  const requests = getBuyerRequests(buyer.id);
  
  const pendingRequests = requests.filter(req => req.status === "pending");
  const acceptedRequests = requests.filter(req => req.status === "accepted");
  const rejectedRequests = requests.filter(req => req.status === "rejected");
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <AppHeader title="Buyer Dashboard" onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with profile */}
          <div className="lg:col-span-1">
            <Card className="mb-6 border-green-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4 bg-green-100 text-green-700">
                  <AvatarFallback>{getInitials(buyer.name)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-1">{buyer.name}</h3>
                <Badge className="bg-yellow-500 mb-3">Shop Owner</Badge>
                
                <div className="w-full space-y-3 mt-3">
                  <div className="flex items-start">
                    <ShoppingBag className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">{buyer.shopName}</p>
                      <p className="text-sm text-muted-foreground">Shop Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">{buyer.location}</p>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">{buyer.openingTime} - {buyer.closingTime}</p>
                      <p className="text-sm text-muted-foreground">Opening Hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">{buyer.holidays.join(", ") || "None"}</p>
                      <p className="text-sm text-muted-foreground">Holidays</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Mobile</p>
                  <p className="font-medium">{buyer.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{buyer.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <Card className="border-green-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Selling Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="pending" className="relative">
                      Pending
                      {pendingRequests.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-yellow-500">{pendingRequests.length}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pending" className="mt-0">
                    <RequestsList 
                      requests={pendingRequests}
                      viewType="buyer"
                      emptyMessage="No pending requests"
                    />
                  </TabsContent>
                  
                  <TabsContent value="accepted" className="mt-0">
                    <RequestsList 
                      requests={acceptedRequests}
                      viewType="buyer"
                      emptyMessage="No accepted requests"
                    />
                  </TabsContent>
                  
                  <TabsContent value="rejected" className="mt-0">
                    <RequestsList 
                      requests={rejectedRequests}
                      viewType="buyer"
                      emptyMessage="No rejected requests"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
