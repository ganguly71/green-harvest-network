
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterSeller() {
  const navigate = useNavigate();
  const { user, registerSeller } = useAuth();
  
  const [formData, setFormData] = useState({
    address: "",
    crops: "",
    harvestSeason: "",
    preferredItems: "",
  });
  
  const [errors, setErrors] = useState({
    address: "",
    crops: "",
    harvestSeason: "",
  });
  
  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/");
    }
  }, [user, navigate]);
  
  const seasons = ["Spring", "Summer", "Fall", "Winter", "Year-round"];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSeasonChange = (season: string) => {
    setFormData((prev) => ({ ...prev, harvestSeason: season }));
    if (season && errors.harvestSeason) {
      setErrors((prev) => ({ ...prev, harvestSeason: "" }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    
    if (!formData.crops.trim()) {
      newErrors.crops = "Please enter at least one crop";
      isValid = false;
    }
    
    if (!formData.harvestSeason) {
      newErrors.harvestSeason = "Please select a harvest season";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process crops as an array from comma-separated string
      const cropsArray = formData.crops
        .split(',')
        .map(crop => crop.trim())
        .filter(crop => crop.length > 0);
      
      // Process preferred items as an array from comma-separated string
      const preferredItemsArray = formData.preferredItems
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      registerSeller({
        ...user,
        address: formData.address,
        crops: cropsArray,
        harvestSeason: formData.harvestSeason,
        preferredItems: preferredItemsArray,
        role: "seller",
      });
      
      navigate("/seller-dashboard");
    }
  };
  
  if (!user || user.role !== "seller") {
    return null;
  }
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.9), rgba(254, 249, 195, 0.9)), url('https://images.unsplash.com/photo-1593543250404-18fde41be189?auto=format&fit=crop&w=1920&q=60')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Farmer Registration</h1>
          <p className="text-muted-foreground">Tell us about your farm</p>
        </div>
        
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Farm Details</CardTitle>
            <CardDescription className="text-center">
              Complete your profile as a seller
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Farm Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your farm address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "border-red-500" : ""}
                  rows={3}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="crops">Crops You Grow</Label>
                <Textarea
                  id="crops"
                  name="crops"
                  placeholder="Enter crops separated by commas (e.g., Tomatoes, Potatoes, Onions)"
                  value={formData.crops}
                  onChange={handleChange}
                  className={errors.crops ? "border-red-500" : ""}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter the crops you grow, separated by commas
                </p>
                {errors.crops && (
                  <p className="text-sm text-red-500">{errors.crops}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="harvestSeason">Primary Harvest Season</Label>
                <Select
                  value={formData.harvestSeason}
                  onValueChange={handleSeasonChange}
                >
                  <SelectTrigger id="harvestSeason" className={errors.harvestSeason ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.harvestSeason && (
                  <p className="text-sm text-red-500">{errors.harvestSeason}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredItems">Items You Sell</Label>
                <Textarea
                  id="preferredItems"
                  name="preferredItems"
                  placeholder="Enter items you sell, separated by commas"
                  value={formData.preferredItems}
                  onChange={handleChange}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter all items that you regularly sell, separated by commas
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
