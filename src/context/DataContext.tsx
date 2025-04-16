
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SellingRequest, Product, Buyer, Seller } from "../types";

interface DataContextType {
  buyers: Buyer[];
  sellers: Seller[];
  products: Product[];
  requests: SellingRequest[];
  addProduct: (product: Omit<Product, "id">) => Product;
  createSellingRequest: (request: Omit<SellingRequest, "id" | "createdAt" | "status">) => void;
  updateRequestStatus: (requestId: string, status: 'accepted' | 'rejected') => void;
  getSellerProducts: (sellerId: string) => Product[];
  getSellerRequests: (sellerId: string) => SellingRequest[];
  getBuyerRequests: (buyerId: string) => SellingRequest[];
  getBuyerById: (buyerId: string) => Buyer | undefined;
  getSellerById: (sellerId: string) => Seller | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data for demonstration
const mockBuyers: Buyer[] = [
  {
    id: "buyer-1",
    name: "Green Grocery",
    mobile: "1234567890",
    email: "green@example.com",
    role: "buyer",
    shopName: "Green Grocery Store",
    location: "123 Market Street",
    openingTime: "08:00",
    closingTime: "18:00",
    holidays: ["Sunday"],
  },
  {
    id: "buyer-2",
    name: "Fresh Mart",
    mobile: "9876543210",
    email: "fresh@example.com",
    role: "buyer",
    shopName: "Fresh Mart Supermarket",
    location: "456 Main Avenue",
    openingTime: "09:00",
    closingTime: "20:00",
    holidays: ["Monday"],
  },
];

const mockSellers: Seller[] = [
  {
    id: "seller-1",
    name: "John Farmer",
    mobile: "5551234567",
    email: "john@example.com",
    role: "seller",
    address: "789 Farm Road",
    crops: ["Tomatoes", "Cucumbers", "Carrots"],
    harvestSeason: "Summer",
  },
  {
    id: "seller-2",
    name: "Mary Grower",
    mobile: "5559876543",
    email: "mary@example.com",
    role: "seller",
    address: "321 Rural Lane",
    crops: ["Potatoes", "Onions", "Garlic"],
    harvestSeason: "Fall",
  },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [buyers, setBuyers] = useState<Buyer[]>(mockBuyers);
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<SellingRequest[]>([]);

  useEffect(() => {
    // Load data from localStorage if available
    const savedProducts = localStorage.getItem('products');
    const savedRequests = localStorage.getItem('requests');
    const savedBuyers = localStorage.getItem('buyers');
    const savedSellers = localStorage.getItem('sellers');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedRequests) setRequests(JSON.parse(savedRequests));
    if (savedBuyers) setBuyers(JSON.parse(savedBuyers));
    if (savedSellers) setSellers(JSON.parse(savedSellers));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('requests', JSON.stringify(requests));
    localStorage.setItem('buyers', JSON.stringify(buyers));
    localStorage.setItem('sellers', JSON.stringify(sellers));
  }, [products, requests, buyers, sellers]);

  const addProduct = (productData: Omit<Product, "id">): Product => {
    const newProduct: Product = {
      ...productData,
      id: `product-${Date.now()}`,
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const createSellingRequest = (requestData: Omit<SellingRequest, "id" | "createdAt" | "status">) => {
    const newRequest: SellingRequest = {
      ...requestData,
      id: `request-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setRequests((prev) => [...prev, newRequest]);
  };

  const updateRequestStatus = (requestId: string, status: 'accepted' | 'rejected') => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  const getSellerProducts = (sellerId: string) => {
    return products.filter((product) => product.sellerId === sellerId);
  };

  const getSellerRequests = (sellerId: string) => {
    return requests.filter((request) => request.sellerId === sellerId);
  };

  const getBuyerRequests = (buyerId: string) => {
    return requests.filter((request) => request.buyerId === buyerId);
  };

  const getBuyerById = (buyerId: string) => {
    return buyers.find((buyer) => buyer.id === buyerId);
  };

  const getSellerById = (sellerId: string) => {
    return sellers.find((seller) => seller.id === sellerId);
  };

  return (
    <DataContext.Provider
      value={{
        buyers,
        sellers,
        products,
        requests,
        addProduct,
        createSellingRequest,
        updateRequestStatus,
        getSellerProducts,
        getSellerRequests,
        getBuyerRequests,
        getBuyerById,
        getSellerById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
