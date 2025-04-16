
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterBuyer() {
  const navigate = useNavigate();
  const { user, registerBuyer } = useAuth();
  
  const [formData, setFormData] = useState({
    shopName: "",
    location: "",
    openingTime: "09:00",
    closingTime: "18:00",
    availableDays: "",
    holidays: "",
  });
  
  const [errors, setErrors] = useState({
    shopName: "",
    location: "",
    availableDays: "",
    holidays: "",
  });
  
  useEffect(() => {
    if (!user || user.role !== "buyer") {
      navigate("/");
    }
  }, [user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    if (!formData.availableDays.trim()) {
      newErrors.availableDays = "Working days are required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      registerBuyer({
        ...user,
        ...formData,
        role: "buyer",
      });
      
      navigate("/buyer-dashboard");
    }
  };
  
  if (!user || user.role !== "buyer") {
    return null;
  }
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.9), rgba(254, 249, 195, 0.9)), url('https://images.unsplash.com/photo-1563699182-29219d4f0fba?auto=format&fit=crop&w=1920&q=60')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Shop Registration</h1>
          <p className="text-muted-foreground">Tell us about your business</p>
        </div>
        
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Shop Details</CardTitle>
            <CardDescription className="text-center">
              Complete your profile as a buyer
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name</Label>
                <Input
                  id="shopName"
                  name="shopName"
                  placeholder="Enter your shop name"
                  value={formData.shopName}
                  onChange={handleChange}
                  className={errors.shopName ? "border-red-500" : ""}
                />
                {errors.shopName && (
                  <p className="text-sm text-red-500">{errors.shopName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter your shop address"
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <Input
                    id="openingTime"
                    name="openingTime"
                    type="time"
                    value={formData.openingTime}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <Input
                    id="closingTime"
                    name="closingTime"
                    type="time"
                    value={formData.closingTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availableDays">Working Days</Label>
                <Textarea
                  id="availableDays"
                  name="availableDays"
                  placeholder="Enter working days (e.g., Monday, Tuesday, Wednesday)"
                  value={formData.availableDays}
                  onChange={handleChange}
                  className={errors.availableDays ? "border-red-500" : ""}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter the days your shop is open, separated by commas
                </p>
                {errors.availableDays && (
                  <p className="text-sm text-red-500">{errors.availableDays}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="holidays">Weekly Holidays</Label>
                <Textarea
                  id="holidays"
                  name="holidays"
                  placeholder="Enter holidays (e.g., Sunday)"
                  value={formData.holidays}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter the days your shop remains closed, separated by commas
                </p>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full gradient-green text-white hover:opacity-90">
                Complete Registration
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
