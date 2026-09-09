// Thin GA4 helper — safe no-ops when gtag isn't loaded (e.g. before the
// measurement ID is configured). Keeps analytics from ever breaking the app.
export function trackEvent(name, params = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, { currency: "PKR", ...params });
    }
  } catch {
    // analytics must never break a user flow
  }
}

// Maps a product (or cart line) to the GA4 item shape with category for
// top-selling-category reporting.
export function productToItem(product, opts = {}) {
  return {
    item_id: product.id || product.key,
    item_name: product.name || "",
    item_category: product.category || opts.category || "",
    item_brand: "ROOH E RANG",
    price: Number(product.price) || 0,
    quantity: opts.qty || product.qty || 1,
    item_variant: opts.color || product.color || "",
  };
}