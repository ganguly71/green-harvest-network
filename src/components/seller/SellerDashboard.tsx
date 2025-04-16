
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MapPin, Leaf, CalendarClock } from "lucide-react";
import RequestsList from "@/components/shared/RequestsList";
import CreateRequestForm from "@/components/seller/CreateRequestForm";
import AppHeader from "@/components/shared/AppHeader";
import { Seller } from "@/types";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getSellerRequests } = useData();
  const [activeTab, setActiveTab] = useState("create");
  
  // Type guard and redirect if not a seller
  if (!user || user.role !== "seller") {
    navigate("/");
    return null;
  }
  
  const seller = user as Seller;
  const requests = getSellerRequests(seller.id);
  
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
      <AppHeader title="Seller Dashboard" onLogout={handleLogout} />
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
                  <AvatarFallback>{getInitials(seller.name)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-1">{seller.name}</h3>
                <Badge className="bg-green-600 mb-3">Farmer</Badge>
                
                <div className="w-full space-y-3 mt-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">{seller.address}</p>
                      <p className="text-sm text-muted-foreground">Farm Address</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Leaf className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">{seller.crops.join(", ")}</p>
                      <p className="text-sm text-muted-foreground">Crops Grown</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CalendarClock className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">{seller.harvestSeason}</p>
                      <p className="text-sm text-muted-foreground">Primary Harvest Season</p>
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
                  <p className="font-medium">{seller.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{seller.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <Card className="border-green-100">
              <CardHeader className="pb-4">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger 
                    value="create" 
                    className="flex items-center gap-1"
                    onClick={() => setActiveTab("create")}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create Request
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending" 
                    className="relative"
                    onClick={() => setActiveTab("pending")}
                  >
                    Pending
                    {pendingRequests.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-yellow-500">{pendingRequests.length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accepted"
                    onClick={() => setActiveTab("accepted")}
                  >
                    Accepted
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rejected"
                    onClick={() => setActiveTab("rejected")}
                  >
                    Rejected
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent>
                {activeTab === "create" && (
                  <CreateRequestForm />
                )}
                
                {activeTab === "pending" && (
                  <RequestsList 
                    requests={pendingRequests}
                    viewType="seller"
                    emptyMessage="No pending requests"
                  />
                )}
                
                {activeTab === "accepted" && (
                  <RequestsList 
                    requests={acceptedRequests}
                    viewType="seller"
                    emptyMessage="No accepted requests"
                  />
                )}
                
                {activeTab === "rejected" && (
                  <RequestsList 
                    requests={rejectedRequests}
                    viewType="seller"
                    emptyMessage="No rejected requests"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
