
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import type { Address } from "@/lib/types";
import { useAuth } from "./AuthContext";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";


interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Promise<Address>;
  updateAddress: (address: Address) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  getAddress: (id: string) => Address | undefined;
  loading: boolean;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const firestore = useFirestore();

  const addressesRef = useMemoFirebase(
    () => (firestore && user ? collection(firestore, 'users', user.uid, 'addresses') : null),
    [firestore, user]
  );
  
  const { data: addresses, isLoading } = useCollection<Address>(addressesRef);

  const addAddress = async (addressData: Omit<Address, 'id'>): Promise<Address> => {
    if (!addressesRef) throw new Error("Addresses collection not available.");
    const docRef = await addDoc(addressesRef, addressData);
    const newAddress = { ...addressData, id: docRef.id };
    toast({ title: "Address added successfully!" });
    return newAddress;
  };

  const updateAddress = async (updatedAddress: Address) => {
    if (!firestore || !user) return;
    const addressDoc = doc(firestore, 'users', user.uid, 'addresses', updatedAddress.id);
    await updateDoc(addressDoc, updatedAddress);
    toast({ title: "Address updated successfully!" });
  };

  const removeAddress = async (id: string) => {
    if (!firestore || !user) return;
    const addressDoc = doc(firestore, 'users', user.uid, 'addresses', id);
    await deleteDoc(addressDoc);
    toast({ title: "Address removed." });
  };
  
  const getAddress = (id: string) => {
    return addresses?.find(addr => addr.id === id);
  }

  return (
    <AddressContext.Provider
      value={{ 
        addresses: addresses || [], 
        addAddress, 
        updateAddress, 
        removeAddress, 
        getAddress,
        loading: isLoading 
      }}
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
