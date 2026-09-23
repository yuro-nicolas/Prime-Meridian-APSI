export const EMPTY_PROPERTY = {
  property_code: "",
  title: "",
  property_type: "",
  category: "",
  address: "",
  city: "",
  map_url: "",
  price: "",
  status: "For Sale",
  lot_area_sqm: "",
  floor_area_sqm: "",
  beds: "",
  baths: "",
  other_features: "",
  photo_urls: "",
  video_url: "",
  blurb: "",
  description: "",
  other_info: "",
  style: "cottage",
  is_public: true,
};

// Active/marketable statuses vs. completed ones — used to split the
// Admin listings view into "Active" and "Archive" tabs.
export const ACTIVE_STATUSES = ["For Sale", "For Rent", "For Lease", "Pending"];
export const ARCHIVE_STATUSES = ["Sold", "Rented", "Leased"];
export const STATUSES = [...ACTIVE_STATUSES, ...ARCHIVE_STATUSES];

// Shown in the public-facing filter — deliberately narrower than the
// full STATUSES list, since browsing for "Sold" or "Rented" isn't a
// public-facing use case; those live in the Admin archive instead.
export const PUBLIC_STATUSES = ["For Sale", "For Rent", "For Lease"];

export const CATEGORIES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Lot / Land",
  "Agricultural",
  "Special Purpose",
  "Mixed-Use",
];

export const STYLES = ["craftsman", "modern", "farmhouse", "townhouse", "colonial", "cottage"];
