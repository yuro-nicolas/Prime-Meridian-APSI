INSERT INTO properties (
  address, city, price, beds, baths, status, style, blurb, description, is_public
) VALUES
('214 Wynwood Lane', 'Elmsford', 485000, 4, 3, 'For Sale', 'craftsman',
 'A craftsman bungalow with a deep front porch and original woodwork.',
 'Set back from the street behind mature oaks, this craftsman bungalow keeps its original tapered porch columns and quarter-sawn oak trim.',
 false),

('88 Harbor Ridge Ct', 'Elmsford', 612000, 3, 2, 'Pending', 'modern',
 'A flat-roofed single-level with a wall of west-facing glass.',
 'Built in 2019, this single-level home trades a pitched roof for clean horizontal lines and a bank of west-facing windows over the living room.',
 false),

('1407 Maple Grove Rd', 'Fairview', 349000, 3, 2, 'For Sale', 'farmhouse',
 'A wraparound porch and a half-acre lot at the edge of town.',
 'The wraparound porch faces west, catching the evening light across a half-acre of mostly flat, usable yard.',
 false),

('56 Prescott Ave, Unit 4B', 'Fairview', 279000, 2, 1, 'For Sale', 'townhouse',
 'A ground-floor unit in a four-unit row, two blocks from the transit stop.',
 'A ground-floor two-bedroom in a well-kept four-unit building, an easy two-block walk to the Fairview transit stop.',
 false),

('902 Kestrel Hill Dr', 'Northgate', 734000, 5, 4, 'Sold', 'colonial',
 'A symmetrical colonial that closed 12% over asking.',
 'This five-bedroom colonial drew six offers in its first weekend and closed twelve percent over asking.',
 false),

('33 Linden Court', 'Northgate', 399000, 3, 2, 'For Sale', 'cottage',
 'A steep-roofed cottage on a quiet cul-de-sac.',
 'A tidy, steep-roofed cottage on a no-outlet street, recently repainted with a new roof installed in 2023.',
 false);

INSERT INTO properties (
  property_code, property_type, address, city,
  price, status, lot_area_sqm, floor_area_sqm, beds, baths,
  other_features, description, style, is_public
) VALUES (
  '0001',
  '2-Storey House and Lot',
  'Pilar Village, San Isidro',
  'City of San Fernando',
  5200000,
  'For Sale',
  188,
  200,
  3,
  2,
  'Corner Lot, Morning sun',
  '"AS IS, WHERE IS — SALE IN PRESENT CONDITION"',
  'cottage',
  true
);
