-- Drop existing tables if they exist (SQLite syntax)
DROP TABLE IF EXISTS Surgery;
DROP TABLE IF EXISTS DoctorSpecialization;
DROP TABLE IF EXISTS Doctor;
DROP TABLE IF EXISTS Specialization;

-- Create Specialization table
CREATE TABLE Specialization (
    SpecializationCode TEXT PRIMARY KEY,
    SpecializationName TEXT NOT NULL
);

-- Insert data into Specialization
INSERT INTO Specialization (SpecializationCode, SpecializationName) VALUES ('GYN', 'Gynecologist');
INSERT INTO Specialization (SpecializationCode, SpecializationName) VALUES ('CAR', 'Cardiologist');
INSERT INTO Specialization (SpecializationCode, SpecializationName) VALUES ('ANE', 'Anesthesiologist');

-- Create Doctor table
-- AUTOINCREMENT will start from 1, SQLite does not support IDENTITY(1001,1) directly
CREATE TABLE Doctor (
    DoctorID INTEGER PRIMARY KEY AUTOINCREMENT,
    DoctorName TEXT NOT NULL
);

-- Insert data into Doctor
INSERT INTO Doctor (DoctorName) VALUES ('Albert');
INSERT INTO Doctor (DoctorName) VALUES ('Olivia');
INSERT INTO Doctor (DoctorName) VALUES ('Susan');
INSERT INTO Doctor (DoctorName) VALUES ('Harry');
INSERT INTO Doctor (DoctorName) VALUES ('Alice');

-- Create DoctorSpecialization table
CREATE TABLE DoctorSpecialization (
    DoctorID INTEGER NOT NULL,
    SpecializationCode TEXT NOT NULL,
    SpecializationDate TEXT NOT NULL,
    PRIMARY KEY (DoctorID, SpecializationCode),
    FOREIGN KEY (DoctorID) REFERENCES Doctor (DoctorID),
    FOREIGN KEY (SpecializationCode) REFERENCES Specialization (SpecializationCode)
);

-- Insert data into DoctorSpecialization
-- Adjust IDs based on AUTOINCREMENT (Albert=1, Olivia=2, Susan=3, etc.)
INSERT INTO DoctorSpecialization (DoctorID, SpecializationCode, SpecializationDate) VALUES (1, 'ANE', '2010-01-01');
INSERT INTO DoctorSpecialization (DoctorID, SpecializationCode, SpecializationDate) VALUES (2, 'CAR', '2010-01-01');
INSERT INTO DoctorSpecialization (DoctorID, SpecializationCode, SpecializationDate) VALUES (3, 'CAR', '2010-01-01');

-- Create Surgery table
CREATE TABLE Surgery (
    SurgeryID INTEGER PRIMARY KEY AUTOINCREMENT,
    DoctorID INTEGER,
    SurgeryDate TEXT NOT NULL,
    StartTime REAL NOT NULL,
    EndTime REAL NOT NULL,
    SurgeryCategory TEXT,
    FOREIGN KEY (DoctorID) REFERENCES Doctor (DoctorID),
    FOREIGN KEY (SurgeryCategory) REFERENCES Specialization (SpecializationCode)
);

-- Insert data into Surgery
INSERT INTO Surgery (DoctorID, SurgeryDate, StartTime, EndTime, SurgeryCategory) VALUES (1, '2025-07-25', 9.00, 14.00, 'ANE');
INSERT INTO Surgery (DoctorID, SurgeryDate, StartTime, EndTime, SurgeryCategory) VALUES (2, '2025-07-25', 10.00, 16.00, 'CAR');
