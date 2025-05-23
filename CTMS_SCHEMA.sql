
-- Creating Object Types
CREATE OR REPLACE TYPE Review_Type AS OBJECT (
    rating NUMBER(1),
    comment VARCHAR2(500)
);

CREATE OR REPLACE TYPE Message_Type AS OBJECT (
    sender_id NUMBER,
    receiver_id NUMBER,
    message_text VARCHAR2(1000),
    sent_at TIMESTAMP
);

-- Creating Main Tables
CREATE TABLE Agency (
    agency_id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    email VARCHAR2(100),
    phone VARCHAR2(20),
    created_at DATE DEFAULT SYSDATE
);

CREATE TABLE Trips (
    trip_id NUMBER PRIMARY KEY,
    agency_id NUMBER REFERENCES Agency(agency_id),
    destination VARCHAR2(100),
    price NUMBER,
    date_from DATE,
    date_to DATE,
    itinerary CLOB,
    available_slots NUMBER
);

CREATE TABLE Customers (
    customer_id NUMBER PRIMARY KEY,
    full_name VARCHAR2(100),
    email VARCHAR2(100),
    phone VARCHAR2(20),
    password VARCHAR2(100)
);

CREATE TABLE Bookings (
    booking_id NUMBER PRIMARY KEY,
    customer_id NUMBER REFERENCES Customers(customer_id),
    trip_id NUMBER REFERENCES Trips(trip_id),
    booking_date DATE DEFAULT SYSDATE,
    status VARCHAR2(20) DEFAULT 'confirmed'
);

CREATE TYPE Message_List AS TABLE OF Message_Type;

CREATE TABLE Messages (
    agency_id NUMBER REFERENCES Agency(agency_id),
    customer_id NUMBER REFERENCES Customers(customer_id),
    messages Message_List
) NESTED TABLE messages STORE AS messages_nt;

CREATE TABLE Reviews (
    review_id NUMBER PRIMARY KEY,
    customer_id NUMBER REFERENCES Customers(customer_id),
    trip_id NUMBER REFERENCES Trips(trip_id),
    review Review_Type
) NESTED TABLE review STORE AS review_nt;