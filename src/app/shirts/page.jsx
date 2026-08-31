"use client";

import ProductListingPage from "@/components/ProductListingPage";

export default function StylesphereShirtsPage() {
  return (
    <ProductListingPage
      apiEndpoint="/api/shirts"
      basePath="/shirts"
      type="shirt"
      fallbackIcon="👔"
      pageTitle="Shirts"
    />
  );
}
