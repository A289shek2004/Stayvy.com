-- PostgreSQL schema for Airbnb clone
-- Users table: stores guest, host and admin information
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  roles TEXT[] NOT NULL,
  profile_picture TEXT,
  phone_number VARCHAR(20),
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Properties table: contains listing details for each property
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  host_id INT NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  location_lat DECIMAL,
  location_lng DECIMAL,
  price_per_night DECIMAL(10,2) NOT NULL,
  property_type VARCHAR(50),
  room_type VARCHAR(50),
  bed_type VARCHAR(50),
  max_guests INT,
  bedrooms INT,
  beds INT,
  bathrooms DECIMAL(4,1),
  cancellation_policy VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Amenities table: catalog of available amenity types
CREATE TABLE amenities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Junction table linking properties and amenities (many-to-many)
CREATE TABLE property_amenities (
  property_id INT NOT NULL REFERENCES properties(id),
  amenity_id INT NOT NULL REFERENCES amenities(id),
  PRIMARY KEY (property_id, amenity_id)
);

-- Booking records: reservations of properties by users
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  guest_id INT NOT NULL REFERENCES users(id),
  property_id INT NOT NULL REFERENCES properties(id),
  checkin_date DATE NOT NULL,
  checkout_date DATE NOT NULL,
  num_guests INT,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  cancelled_at TIMESTAMP,
  cancellation_reason TEXT
);

-- Payments for bookings
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  method VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  payment_date TIMESTAMP DEFAULT NOW()
);

-- Reviews and ratings from users
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL REFERENCES bookings(id),
  reviewer_id INT NOT NULL REFERENCES users(id),
  rating INT CHECK (rating >=1 AND rating <=5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messaging between users (guest and host) (Optional)
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL REFERENCES users(id),
  receiver_id INT NOT NULL REFERENCES users(id),
  booking_id INT REFERENCES bookings(id),
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- In-app notifications
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  booking_id INT REFERENCES bookings(id),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  sent_at TIMESTAMP DEFAULT NOW()
);

-- Wishlists created by users
CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Junction table between wishlists and properties
CREATE TABLE wishlist_items (
  wishlist_id INT NOT NULL REFERENCES wishlists(id),
  property_id INT NOT NULL REFERENCES properties(id),
  PRIMARY KEY (wishlist_id, property_id)
);

-- Additional tables
-- Property photos: stores URLs of images for each property
CREATE TABLE property_photos (
  id SERIAL PRIMARY KEY,
  property_id INT NOT NULL REFERENCES properties(id),
  photo_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Dynamic pricing: per-date price adjustments for properties
CREATE TABLE dynamic_pricing (
  id SERIAL PRIMARY KEY,
  property_id INT NOT NULL REFERENCES properties(id),
  date DATE NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Availability calendar: availability status for properties by date
CREATE TABLE availability_calendar (
  id SERIAL PRIMARY KEY,
  property_id INT NOT NULL REFERENCES properties(id),
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT TRUE
);

-- Audit logs: track changes made to records
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  record_id INT NOT NULL,
  action VARCHAR(50) NOT NULL,
  changed_at TIMESTAMP DEFAULT NOW(),
  changed_by INT REFERENCES users(id)
);


-- Vendor related tables
-- Vendors: external service providers (barbers, massage, car rental)
CREATE TABLE vendors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  vendor_type VARCHAR(50) NOT NULL, -- e.g. barber, massage, car_rental
  contact_phone VARCHAR(50),
  contact_email VARCHAR(255),
  description TEXT
);

-- Vendor services: services offered by each vendor
CREATE TABLE vendor_services (
  id SERIAL PRIMARY KEY,
  vendor_id INT NOT NULL REFERENCES vendors(id),
  service_name VARCHAR(255) NOT NULL,
  service_description TEXT,
  price DECIMAL(10,2) NOT NULL
);

-- Service bookings: bookings of vendor services by users
CREATE TABLE service_bookings (
  id SERIAL PRIMARY KEY,
  service_id INT NOT NULL REFERENCES vendor_services(id),
  user_id INT NOT NULL REFERENCES users(id),
  booking_date DATE NOT NULL,
  booking_time TIME,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);

-- Calendar sync for property and vendor services
-- Calendar events: unified calendar for property and vendor service availability
CREATE TABLE calendar_events (
  id SERIAL PRIMARY KEY,
  property_id INT REFERENCES properties(id),
  vendor_service_id INT REFERENCES vendor_services(id),
  event_date DATE NOT NULL,
  event_time TIME,
  is_available BOOLEAN DEFAULT TRUE
);

-- Static content pages
-- Static content pages (Home, About, FAQ, etc.)
CREATE TABLE content_pages (
  id SERIAL PRIMARY KEY,
  page_slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- AI Chatbot messages
-- Chatbot messages: interactions between AI bot and users
CREATE TABLE chatbot_messages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  sender VARCHAR(20) NOT NULL, -- 'user' or 'bot'
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- Admin panel metrics (basic tracking)
-- Admin metrics: basic statistics for admin dashboard
CREATE TABLE admin_metrics (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC,
  recorded_at TIMESTAMP DEFAULT NOW()
);


-- Roles & Authorization
-- Roles: defines role types (admin, host, vendor, guest)
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- User roles: assigns roles to users
CREATE TABLE user_roles (
  user_id INT NOT NULL REFERENCES users(id),
  role_id INT NOT NULL REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);

-- Stripe Integration tables
-- Stripe accounts: connected accounts for payments
CREATE TABLE stripe_accounts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  stripe_account_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payouts: payout records to hosts/vendors
CREATE TABLE payouts (
  id SERIAL PRIMARY KEY,
  stripe_account_id INT NOT NULL REFERENCES stripe_accounts(id),
  amount DECIMAL(10,2) NOT NULL,
  payout_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending'
);

-- Transfers: split payment transfers per booking
CREATE TABLE transfers (
  id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL REFERENCES bookings(id),
  stripe_transfer_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transfer_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending'
);

-- Sample seed data for users (USA region)
INSERT INTO users (full_name, email, password_hash, roles, profile_picture, phone_number, bio) VALUES
('John Smith','john.smith@example.com','hash1', ARRAY['guest'], NULL,'+1-212-555-0101','Traveler from New York'),
('Emily Davis','emily.davis@example.com','hash2', ARRAY['host'], NULL,'+1-310-555-0111','Host based in Los Angeles'),
('Michael Johnson','michael.j@example.com','hash3', ARRAY['guest'], NULL,'+1-312-555-0103','Enjoys coastal stays'),
('Sarah Williams','sarah.w@example.com','hash4', ARRAY['host'], NULL,'+1-415-555-0105','San Francisco host'),
('David Brown','david.b@example.com','hash5', ARRAY['guest'], NULL,'+1-718-555-0106','From Brooklyn'),
('Jessica Miller','jessica.m@example.com','hash6', ARRAY['host'], NULL,'+1-503-555-0107','Portland property owner'),
('Daniel Wilson','daniel.w@example.com','hash7', ARRAY['guest'], NULL,'+1-702-555-0108','Frequent business traveler'),
('Ashley Anderson','ashley.a@example.com','hash8', ARRAY['host'], NULL,'+1-617-555-0109','Boston host'),
('James Thomas','james.t@example.com','hash9', ARRAY['guest'], NULL,'+1-480-555-0110','Phoenix resident'),
('Olivia Martinez','olivia.m@example.com','hash10', ARRAY['host'], NULL,'+1-404-555-0111','Atlanta host'),
('Ethan Taylor','ethan.t@example.com','hash11', ARRAY['guest'], NULL,'+1-214-555-0112','Dallas traveler'),
('Sophia Moore','sophia.m@example.com','hash12', ARRAY['host'], NULL,'+1-305-555-0113','Miami host'),
('Matthew Garcia','matthew.g@example.com','hash13', ARRAY['guest'], NULL,'+1-713-555-0114','From Houston'),
('Isabella Rodriguez','isabella.r@example.com','hash14', ARRAY['guest'], NULL,'+1-503-555-0115','Portland traveler'),
('Christopher Lee','christopher.l@example.com','hash15', ARRAY['guest'], NULL,'+1-212-555-0116','New York resident');

-- Sample seed data for properties
INSERT INTO properties (host_id, title, description, address, location_lat, location_lng, price_per_night, property_type, room_type, bed_type, max_guests, bedrooms, beds, bathrooms, cancellation_policy) VALUES
(2,'Cozy LA Apartment','Modern apartment in downtown Los Angeles','123 Sunset Blvd, Los Angeles, CA',34.0522,-118.2437,150,'Apartment','Entire place','Queen',4,2,2,1.0,'flexible'),
(4,'San Francisco Loft','Stylish loft with bay view','456 Market St, San Francisco, CA',37.7749,-122.4194,200,'Loft','Entire place','Queen',3,1,1,1.0,'strict'),
(6,'Portland Cottage','Charming cottage near park','789 Elm St, Portland, OR',45.5051,-122.6750,120,'Cottage','Entire place','Double',2,1,1,1.0,'flexible'),
(8,'Boston Townhouse','Spacious townhouse in Boston','321 Beacon St, Boston, MA',42.3601,-71.0589,180,'Townhouse','Entire place','Queen',5,3,3,2.0,'moderate'),
(10,'Atlanta Condo','Luxury condo in midtown Atlanta','654 Peachtree Rd, Atlanta, GA',33.7490,-84.3880,140,'Condo','Entire place','Queen',4,2,2,1.5,'flexible'),
(12,'Miami Beach House','Beachfront house with pool','987 Ocean Dr, Miami, FL',25.7617,-80.1918,300,'House','Entire place','King',6,3,4,2.0,'strict'),
(2,'LA Studio','Compact studio near Hollywood','100 Vine St, Los Angeles, CA',34.0928,-118.3287,110,'Studio','Entire place','Double',2,1,1,1.0,'flexible'),
(4,'SF Victorian Home','Victorian style home','200 Castro St, San Francisco, CA',37.7680,-122.4313,250,'House','Entire place','Queen',5,3,3,2.0,'strict'),
(6,'Portland Apartment','Apartment close to downtown','400 Burnside St, Portland, OR',45.5231,-122.6765,130,'Apartment','Entire place','Queen',3,2,2,1.0,'moderate'),
(8,'Boston Studio','Historic studio in city center','30 Cambridge St, Boston, MA',42.3610,-71.0577,125,'Studio','Entire place','Double',2,1,1,1.0,'flexible'),
(10,'Atlanta Loft','Modern loft','80 Ivy St, Atlanta, GA',33.7480,-84.3900,160,'Loft','Entire place','Queen',4,2,2,1.5,'flexible'),
(12,'Miami Condo','Luxury condo near beach','70 Collins Ave, Miami, FL',25.7920,-80.1350,220,'Condo','Entire place','King',5,2,2,2.0,'strict'),
(2,'Hollywood Bungalow','Bungalow in Hollywood','15 Hollywood Blvd, Los Angeles, CA',34.1016,-118.3269,170,'Bungalow','Entire place','Queen',4,2,2,1.0,'moderate'),
(4,'Bay Area Apartment','Apartment with bay view','300 Bay St, San Francisco, CA',37.8060,-122.4100,210,'Apartment','Entire place','Queen',4,2,2,1.5,'flexible'),
(6,'Portland Loft','Industrial loft','777 Couch St, Portland, OR',45.5234,-122.6700,145,'Loft','Entire place','Queen',3,1,1,1.0,'flexible');

-- Sample seed data for amenities
INSERT INTO amenities (name) VALUES
('Wifi'),('Air Conditioning'),('Parking'),('Kitchen'),('Pool');

-- Sample seed data for property_amenities
INSERT INTO property_amenities (property_id, amenity_id) VALUES
(1,1),(1,2),(2,1),(2,3),(3,1),(4,1),(4,4),(5,1),(5,2),(6,1),(6,5),(7,1),(8,1),(8,4),(9,1),(10,1),(10,2),(11,1),(12,1),(12,5),(13,1),(14,1),(14,3),(15,1);

-- Sample seed data for bookings
INSERT INTO bookings (guest_id, property_id, checkin_date, checkout_date, num_guests, total_price, status) VALUES
(1,1,'2025-09-01','2025-09-05',2,600,'confirmed'),
(3,2,'2025-09-03','2025-09-06',1,600,'confirmed'),
(5,3,'2025-09-10','2025-09-12',2,240,'confirmed'),
(7,4,'2025-09-15','2025-09-17',3,360,'confirmed'),
(9,5,'2025-09-20','2025-09-23',2,420,'confirmed'),
(11,6,'2025-09-05','2025-09-08',4,900,'confirmed'),
(13,7,'2025-09-07','2025-09-10',2,330,'confirmed'),
(15,8,'2025-09-18','2025-09-20',3,500,'confirmed'),
(1,9,'2025-09-12','2025-09-14',2,260,'confirmed'),
(3,10,'2025-09-20','2025-09-22',2,320,'confirmed'),
(5,11,'2025-09-25','2025-09-28',2,480,'confirmed'),
(7,12,'2025-09-26','2025-09-28',2,600,'confirmed'),
(9,13,'2025-09-05','2025-09-07',2,340,'confirmed'),
(11,14,'2025-09-10','2025-09-13',2,630,'confirmed'),
(13,15,'2025-09-14','2025-09-17',2,435,'confirmed');

-- Sample seed data for payments
INSERT INTO payments (booking_id, amount, method, status) VALUES
(1,600,'card','completed'),(2,600,'card','completed'),(3,240,'card','completed'),(4,360,'card','completed'),(5,420,'card','completed'),(6,900,'card','completed'),(7,330,'card','completed'),(8,500,'card','completed'),(9,260,'card','completed'),(10,320,'card','completed'),(11,480,'card','completed'),(12,600,'card','completed'),(13,340,'card','completed'),(14,630,'card','completed'),(15,435,'card','completed');

-- Sample seed data for reviews
INSERT INTO reviews (booking_id, reviewer_id, rating, comment) VALUES
(1,1,5,'Great stay!'),(2,3,4,'Nice place'),(3,5,4,'Good experience'),(4,7,5,'Loved it'),(5,9,3,'Average'),(6,11,5,'Excellent'),(7,13,4,'Comfortable'),(8,15,5,'Amazing host'),(9,1,4,'Nice stay'),(10,3,3,'Okay stay');

-- Sample seed data for messages
INSERT INTO messages (sender_id, receiver_id, booking_id, content) VALUES
(1,2,1,'Hello, is early check-in possible?'),(2,1,1,'Yes, you can check-in at 1PM'),(3,4,2,'Is parking available?'),(4,3,2,'Yes, free parking on site');

-- Sample seed data for vendors
INSERT INTO vendors (name, vendor_type, contact_phone, contact_email, description) VALUES
('City Barber','barber','+1-212-555-1001','barber1@example.com','Barber in LA'),
('Relax Massage','massage','+1-310-555-1002','massage1@example.com','Massage services'),
('FastCar Rental','car_rental','+1-312-555-1003','car1@example.com','Car rental'),
('Urban Barber','barber','+1-415-555-1004','barber2@example.com','San Francisco barber'),
('Zen Spa','massage','+1-503-555-1005','massage2@example.com','Portland massage'),
('DriveNow Rentals','car_rental','+1-617-555-1006','car2@example.com','Boston car rental'),
('Premium Barber','barber','+1-404-555-1007','barber3@example.com','Atlanta barber'),
('Ocean Massage','massage','+1-305-555-1008','massage3@example.com','Miami massage'),
('SmartCar Rental','car_rental','+1-713-555-1009','car3@example.com','Houston car rental'),
('Deluxe Spa','massage','+1-503-555-1010','massage4@example.com','Portland deluxe spa');

-- Sample vendor services
INSERT INTO vendor_services (vendor_id, service_name, service_description, price) VALUES
(1,'Haircut','Standard haircut',30),(2,'Full Massage','Relaxing massage',80),(3,'SUV Rental','SUV rental per day',120),(4,'Shave','Shaving service',20),(5,'Spa Session','Spa package',90),(6,'Sedan Rental','Sedan per day',100),(7,'Haircut Deluxe','Deluxe haircut',40),(8,'Massage Therapy','Therapeutic massage',85),(9,'Compact Car Rental','Compact car per day',80),(10,'Premium Spa','Premium spa session',110);

-- Sample service bookings
INSERT INTO service_bookings (service_id, user_id, booking_date, booking_time, total_price, status) VALUES
(1,1,'2025-09-03','10:00',30,'completed'),(2,3,'2025-09-04','14:00',80,'completed'),(3,5,'2025-09-11','09:00',120,'completed'),(4,7,'2025-09-16','15:00',20,'completed'),(5,9,'2025-09-21','16:00',90,'completed');

-- Calendar events
INSERT INTO calendar_events (property_id, event_date, is_available) VALUES
(1,'2025-09-01',FALSE),(2,'2025-09-03',FALSE),(3,'2025-09-10',FALSE),(4,'2025-09-15',FALSE),(5,'2025-09-20',FALSE);

-- Static content pages
INSERT INTO content_pages (page_slug, title, content) VALUES
('home','Home','Welcome to our booking site'),('about','About','About us'),('faq','FAQ','Frequently asked questions'),('contact','Contact','Contact information'),('support','Support','Support page');

-- Chatbot messages
INSERT INTO chatbot_messages (user_id, sender, message) VALUES
(1,'user','Hello'),(1,'bot','Hi, how can I assist you?'),(3,'user','Need help with booking');

-- Roles and user_roles
INSERT INTO roles (name) VALUES ('guest'),('host'),('admin');
INSERT INTO user_roles (user_id, role_id) VALUES (1,1),(2,2),(3,1),(4,2),(5,1),(6,2),(7,1),(8,2),(9,1),(10,2),(11,1),(12,2),(13,1),(14,1),(15,1);

-- Stripe data
INSERT INTO stripe_accounts (user_id, stripe_account_id) VALUES (2,'acct_001'),(4,'acct_002'),(6,'acct_003');
INSERT INTO payouts (stripe_account_id, amount, status) VALUES (1,200,'completed'),(2,300,'completed'),(3,150,'completed');
INSERT INTO transfers (booking_id, stripe_transfer_id, amount, status) VALUES
(1,'tr_001',600,'completed'),(2,'tr_002',600,'completed'),(3,'tr_003',240,'completed');

-- Admin metrics
INSERT INTO admin_metrics (metric_name, metric_value) VALUES ('total_users',15),('total_bookings',15),('total_revenue',7935);


-- View all users
SELECT * FROM users;

-- View all properties
SELECT * FROM properties;

-- View all amenities
SELECT * FROM amenities;

-- View property-amenity mappings
SELECT * FROM property_amenities;

-- View bookings
SELECT * FROM bookings;

-- View payments
SELECT * FROM payments;

-- View reviews
SELECT * FROM reviews;

-- View messages
SELECT * FROM messages;

-- View notifications
SELECT * FROM notifications;

-- View wishlists
SELECT * FROM wishlists;

-- View wishlist items
SELECT * FROM wishlist_items;

-- View property photos
SELECT * FROM property_photos;

-- View dynamic pricing
SELECT * FROM dynamic_pricing;

-- View availability calendar
SELECT * FROM availability_calendar;

-- View audit logs
SELECT * FROM audit_logs;

-- View vendors
SELECT * FROM vendors;

-- View vendor services
SELECT * FROM vendor_services;

-- View service bookings
SELECT * FROM service_bookings;

-- View calendar events (availability for properties / vendor services)
SELECT * FROM calendar_events;

-- View content pages (Home, FAQ, etc.)
SELECT * FROM content_pages;

-- View chatbot messages
SELECT * FROM chatbot_messages;

-- View admin metrics
SELECT * FROM admin_metrics;

-- View roles
SELECT * FROM roles;

-- View user-role mappings
SELECT * FROM user_roles;

-- View stripe accounts
SELECT * FROM stripe_accounts;

-- View payouts
SELECT * FROM payouts;

-- View transfers
SELECT * FROM transfers;

