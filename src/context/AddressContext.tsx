
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import type { Address } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Address;
  updateAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  getAddress: (id: string) => Address | undefined;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const ADDRESS_STORAGE_KEY = "hyderabad-reads-addresses";

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  const [addresses, setAddresses] = useState<Address[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(ADDRESS_STORAGE_KEY);
      // Sample address for demo
      const sampleAddress = {
          id: '1',
          type: 'Home' as const,
          firstName: 'John',
          lastName: 'Doe',
          address: '123, Jubilee Hills',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500033',
          phone: '9876543210'
      };
      return stored ? JSON.parse(stored) : [sampleAddress];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (addressData: Omit<Address, 'id'>): Address => {
    const newAddress = { ...addressData, id: crypto.randomUUID() };
    setAddresses((prev) => [...prev, newAddress]);
    toast({ title: "Address added successfully!" });
    return newAddress;
  };

  const updateAddress = (updatedAddress: Address) => {
    setAddresses((prev) => 
      prev.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr)
    );
    toast({ title: "Address updated successfully!" });
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter(addr => addr.id !== id));
    toast({ title: "Address removed." });
  };
  
  const getAddress = (id: string) => {
    return addresses.find(addr => addr.id === id);
  }

  return (
    <AddressContext.Provider
      value={{ addresses, addAddress, updateAddress, removeAddress, getAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

    