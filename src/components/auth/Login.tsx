
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { UserRole } from "@/types";
import { AGRICULTURAL_ITEMS, DAYS_OF_WEEK } from "@/constants/items";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "buyer" as UserRole,
    preferredItems: [] as string[],
    availableDays: [] as string[],
  });
  
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create user with basic info
      const userData = {
        ...formData,
        id: `user-${Date.now()}`,
      };
      
      // Store basic user info and redirect to role-specific registration
      login(userData);
      
      // Redirect based on role
      if (formData.role === "buyer") {
        navigate("/register-buyer");
      } else {
        navigate("/register-seller");
      }
    }
  };

  const itemOptions = AGRICULTURAL_ITEMS.map(item => ({
    label: item,
    value: item,
  }));

  const dayOptions = DAYS_OF_WEEK.map(day => ({
    label: day,
    value: day,
  }));
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.9), rgba(254, 249, 195, 0.9)), url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=60')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Green Harvest Network</h1>
          <p className="text-muted-foreground">Connect farmers directly with retailers</p>
        </div>
        
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your details to continue
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? "border-red-500" : ""}
                />
                {errors.mobile && (
                  <p className="text-sm text-red-500">{errors.mobile}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup 
                  value={formData.role} 
                  onValueChange={(value) => handleRoleChange(value as UserRole)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer" className="font-normal cursor-pointer">
                      Buyer (Shop/Market/Grocery)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller" className="font-normal cursor-pointer">
                      Seller (Farmer)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Preferred Items</Label>
                <MultiSelect
                  options={itemOptions}
                  selected={formData.preferredItems}
                  onChange={(selected) => 
                    setFormData(prev => ({ ...prev, preferredItems: selected }))
                  }
                  placeholder="Select items you're interested in..."
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Available Days</Label>
                <MultiSelect
                  options={dayOptions}
                  selected={formData.availableDays}
                  onChange={(selected) => 
                    setFormData(prev => ({ ...prev, availableDays: selected }))
                  }
                  placeholder="Select available days..."
                  className="w-full"
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full gradient-green text-white hover:opacity-90">
                Continue
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
