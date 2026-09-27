CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,

  property_code TEXT,         
  title TEXT,                  
  property_type TEXT,          

  address TEXT,            
  city TEXT,
  map_url TEXT,               


  price NUMERIC,                
  status TEXT DEFAULT 'For Sale'
    CHECK (status IN ('For Sale', 'For Rent', 'For Lease', 'Pending', 'Sold', 'Rented', 'Leased')),
  category TEXT
    CHECK (category IN ('Residential', 'Commercial', 'Industrial', 'Lot / Land', 'Agricultural', 'Special Purpose', 'Mixed-Use')),

  lot_area_sqm NUMERIC,
  floor_area_sqm NUMERIC,
  beds INTEGER,
  baths INTEGER,
  other_features TEXT,          

  photo_urls TEXT,             
  video_url TEXT,

  blurb TEXT,                   
  description TEXT,            
  other_info TEXT,              

  style TEXT DEFAULT 'cottage',

  is_public BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interested_in TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
