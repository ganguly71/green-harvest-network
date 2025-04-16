
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function CreateRequestForm() {
  const { user } = useAuth();
  const { buyers, addProduct, createSellingRequest } = useData();
  
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    quantity: "",
    unit: "kg",
    buyerId: "",
    transportationCost: "",
  });
  
  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    quantity: "",
    unit: "",
    buyerId: "",
    transportationCost: "",
  });
  
  const units = ["kg", "gram", "dozen", "piece", "bundle", "crate"];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
      isValid = false;
    }
    
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
      isValid = false;
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid quantity";
      isValid = false;
    }
    
    if (!formData.unit) {
      newErrors.unit = "Unit is required";
      isValid = false;
    }
    
    if (!formData.buyerId) {
      newErrors.buyerId = "Please select a buyer";
      isValid = false;
    }
    
    if (!formData.transportationCost.trim()) {
      newErrors.transportationCost = "Transportation cost is required";
      isValid = false;
    } else if (isNaN(Number(formData.transportationCost)) || Number(formData.transportationCost) < 0) {
      newErrors.transportationCost = "Please enter a valid transportation cost";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (!user) return;
      
      // Create product first
      const product = addProduct({
        name: formData.productName,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        unit: formData.unit,
        sellerId: user.id,
      });
      
      // Create selling request
      createSellingRequest({
        product,
        sellerId: user.id,
        buyerId: formData.buyerId,
        transportationCost: Number(formData.transportationCost),
      });
      
      // Reset form
      setFormData({
        productName: "",
        price: "",
        quantity: "",
        unit: "kg",
        buyerId: "",
        transportationCost: "",
      });
      
      // Show success message
      toast({
        title: "Selling Request Created",
        description: "Your request has been sent to the buyer",
      });
    }
  };
  
  return (
    <Card className="p-6 border-none shadow-none">
      <h3 className="text-xl font-bold mb-4">Create Selling Request</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={formData.productName}
            onChange={handleChange}
            className={errors.productName ? "border-red-500" : ""}
          />
          {errors.productName && (
            <p className="text-sm text-red-500">{errors.productName}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              name="price"
              placeholder="Price per unit"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select
            value={formData.unit}
            onValueChange={(value) => handleSelectChange("unit", value)}
          >
            <SelectTrigger id="unit" className={errors.unit ? "border-red-500" : ""}>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.unit && (
            <p className="text-sm text-red-500">{errors.unit}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buyerId">Select Buyer</Label>
          <Select
            value={formData.buyerId}
            onValueChange={(value) => handleSelectChange("buyerId", value)}
          >
            <SelectTrigger id="buyerId" className={errors.buyerId ? "border-red-500" : ""}>
              <SelectValue placeholder="Select a buyer" />
            </SelectTrigger>
            <SelectContent>
              {buyers.map((buyer) => (
                <SelectItem key={buyer.id} value={buyer.id}>
                  {buyer.shopName} - {buyer.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.buyerId && (
            <p className="text-sm text-red-500">{errors.buyerId}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transportationCost">Transportation Cost (₹)</Label>
          <Input
            id="transportationCost"
            name="transportationCost"
            placeholder="Enter transportation cost"
            value={formData.transportationCost}
            onChange={handleChange}
            className={errors.transportationCost ? "border-red-500" : ""}
          />
          {errors.transportationCost && (
            <p className="text-sm text-red-500">{errors.transportationCost}</p>
          )}
        </div>
        
        <Button type="submit" className="w-full gradient-green text-white">
          Create Selling Request
        </Button>
      </form>
    </Card>
  );
}
