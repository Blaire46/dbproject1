
-- Agency Table
CREATE TABLE Agency (
    agency_id INT PRIMARY KEY,
    agency_name VARCHAR(255) NOT NULL,
    agency_profile CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips Table
CREATE TABLE Trips (
    trip_id INT PRIMARY KEY,
    agency_id INT,
    trip_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    trip_date DATE NOT NULL,
    itinerary CLOB,
    price DECIMAL(10, 2),
    available_slots INT,
    FOREIGN KEY (agency_id) REFERENCES Agency(agency_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers Table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE Bookings (
    booking_id INT PRIMARY KEY,
    customer_id INT,
    trip_id INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'confirmed',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (trip_id) REFERENCES Trips(trip_id) ON DELETE CASCADE
);

-- Messages Table
CREATE TABLE Messages (
    message_id INT PRIMARY KEY,
    agency_id INT,
    customer_id INT,
    message CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agency_id) REFERENCES Agency(agency_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY,
    trip_id INT,
    customer_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    feedback CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES Trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);
DROP  TABLE Agency1;
INSERT INTO Agency (agency_id, agency_name, agency_profile)
VALUES (1, 'Travel Agency A', 'We specialize in adventure trips.');