"use client";

import ProductListingPage from "@/components/ProductListingPage";

export default function StylesphereJacketsPage() {
  return (
    <ProductListingPage
      apiEndpoint="/api/jackets"
      basePath="/jackets"
      type="jacket"
      fallbackIcon="🧥"
      pageTitle="Jackets"
    />
  );
}
