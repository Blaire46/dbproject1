-- Create a new user
CREATE USER your_new_user IDENTIFIED BY your_password;

-- Grant the necessary permissions to the new user
GRANT CREATE SESSION TO your_new_user;
GRANT CREATE TABLE TO your_new_user;
GRANT CREATE TYPE TO your_new_user;
GRANT UNLIMITED TABLESPACE TO your_new_user;
