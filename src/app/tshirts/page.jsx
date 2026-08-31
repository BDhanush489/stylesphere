"use client";

import ProductListingPage from "@/components/ProductListingPage";

export default function StylesphereTShirtsPage() {
  return (
    <ProductListingPage
      apiEndpoint="/api/tshirts"
      basePath="/tshirts"
      type="tshirt"
      fallbackIcon="👕"
      pageTitle="T-Shirts"
    />
  );
}
