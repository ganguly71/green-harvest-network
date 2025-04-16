
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SellingRequest } from "@/types";
import { Mail, Phone, DollarSign, PackageCheck, Package, Truck } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface RequestsListProps {
  requests: SellingRequest[];
  viewType: 'buyer' | 'seller';
  emptyMessage?: string;
}

export default function RequestsList({ 
  requests,
  viewType,
  emptyMessage = "No requests found"
}: RequestsListProps) {
  const { updateRequestStatus, getBuyerById, getSellerById } = useData();
  const { user } = useAuth();
  
  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Package className="mx-auto h-12 w-12 mb-3 opacity-30" />
        <p>{emptyMessage}</p>
      </div>
    );
  }
  
  const handleAccept = (requestId: string) => {
    updateRequestStatus(requestId, 'accepted');
  };
  
  const handleReject = (requestId: string) => {
    updateRequestStatus(requestId, 'rejected');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  const formatTimestamp = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  return (
    <div className="space-y-4">
      {requests.map((request) => {
        // Get the buyer or seller info depending on view type
        const otherParty = viewType === 'buyer' 
          ? getSellerById(request.sellerId)
          : getBuyerById(request.buyerId);
        
        if (!otherParty) return null;
        
        return (
          <Card key={request.id} className="border-green-100 overflow-hidden">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-lg">{request.product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {formatTimestamp(request.createdAt)}
                </p>
              </div>
              {getStatusBadge(request.status)}
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <PackageCheck className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium">
                      {request.product.quantity} {request.product.unit}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium">
                      ₹{request.product.price} per {request.product.unit}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium">
                      Transportation: ₹{request.transportationCost}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">
                    {viewType === 'buyer' ? 'Seller' : 'Buyer'} Contact:
                  </h4>
                  <div className="text-sm">
                    <p className="font-medium">{otherParty.name}</p>
                    
                    <div className="flex items-center mt-1.5">
                      <Phone className="h-4 w-4 mr-2 text-green-600" />
                      <a href={`tel:${otherParty.mobile}`} className="hover:text-green-600">
                        {otherParty.mobile}
                      </a>
                    </div>
                    
                    <div className="flex items-center mt-1.5">
                      <Mail className="h-4 w-4 mr-2 text-green-600" />
                      <a href={`mailto:${otherParty.email}`} className="hover:text-green-600">
                        {otherParty.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            {viewType === 'buyer' && request.status === 'pending' && (
              <CardFooter className="bg-muted/30 flex justify-end gap-2 pt-3 pb-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </Button>
                <Button 
                  size="sm" 
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </Button>
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
}
