export type WardType =
    | 'ICU'
    | 'CCU'
    | 'NICU'
    | 'Medical Ward'
    | 'Surgical Ward'
    | 'Emergency'
    | 'Maternity'
    | 'Pediatric'
    | 'Geriatric'
    | 'Oncology'
    | 'Rehabilitation'
    | 'Psychiatric';

export type AccommodationType =
    | 'General'
    | 'Private'
    | 'Semi-Private'
    | 'Day Unit';

export type RoomStatus = 'Available' | 'Occupied' | 'Cleaning' | 'Reserved' | 'Unavailable';

export interface Room {
    id: string;
    roomNumber: string;
    wardType: WardType;
    accommodationType: AccommodationType;
    status: RoomStatus;
    capacity: number;
    occupiedBeds: number;
    floor: number;
    lastCleaned: string;
    assignedDoctor?: string;
    currentPatient?: string;
}

export const MOCK_ROOMS: Room[] = [
    // ICU
    { id: 'r1', roomNumber: 'ICU-101', wardType: 'ICU', accommodationType: 'Private', status: 'Occupied', capacity: 1, occupiedBeds: 1, floor: 1, lastCleaned: '2024-02-21 10:00 AM', assignedDoctor: 'Dr. Sarah Smith', currentPatient: 'Balraj' },
    { id: 'r2', roomNumber: 'ICU-102', wardType: 'ICU', accommodationType: 'Private', status: 'Available', capacity: 1, occupiedBeds: 0, floor: 1, lastCleaned: '2024-02-21 11:30 AM' },
    { id: 'r3', roomNumber: 'ICU-103', wardType: 'ICU', accommodationType: 'Private', status: 'Cleaning', capacity: 1, occupiedBeds: 0, floor: 1, lastCleaned: '2024-02-21 09:15 AM' },

    // Medical Ward
    { id: 'r4', roomNumber: 'MED-201', wardType: 'Medical Ward', accommodationType: 'General', status: 'Occupied', capacity: 4, occupiedBeds: 3, floor: 2, lastCleaned: '2024-02-21 08:00 AM' },
    { id: 'r5', roomNumber: 'MED-202', wardType: 'Medical Ward', accommodationType: 'Semi-Private', status: 'Reserved', capacity: 2, occupiedBeds: 0, floor: 2, lastCleaned: '2024-02-21 12:00 PM' },
    { id: 'r6', roomNumber: 'MED-203', wardType: 'Medical Ward', accommodationType: 'Private', status: 'Available', capacity: 1, occupiedBeds: 0, floor: 2, lastCleaned: '2024-02-21 01:20 PM' },
    { id: 'r7', roomNumber: 'MED-204', wardType: 'Medical Ward', accommodationType: 'General', status: 'Occupied', capacity: 4, occupiedBeds: 4, floor: 2, lastCleaned: '2024-02-21 07:30 AM' },

    // Emergency
    { id: 'r8', roomNumber: 'ER-G01', wardType: 'Emergency', accommodationType: 'Day Unit', status: 'Occupied', capacity: 1, occupiedBeds: 1, floor: 0, lastCleaned: '2024-02-21 11:00 AM', assignedDoctor: 'Dr. Michael Green' },
    { id: 'r9', roomNumber: 'ER-G02', wardType: 'Emergency', accommodationType: 'Day Unit', status: 'Available', capacity: 1, occupiedBeds: 0, floor: 0, lastCleaned: '2024-02-21 02:45 PM' },

    // Maternity
    { id: 'r10', roomNumber: 'MAT-301', wardType: 'Maternity', accommodationType: 'Private', status: 'Occupied', capacity: 1, occupiedBeds: 1, floor: 3, lastCleaned: '2024-02-21 09:00 AM', currentPatient: 'Jane Smith' },
    { id: 'r11', roomNumber: 'MAT-302', wardType: 'Maternity', accommodationType: 'Semi-Private', status: 'Cleaning', capacity: 2, occupiedBeds: 0, floor: 3, lastCleaned: '2024-02-21 10:45 AM' },

    // Pediatric
    { id: 'r12', roomNumber: 'PED-105', wardType: 'Pediatric', accommodationType: 'General', status: 'Occupied', capacity: 6, occupiedBeds: 2, floor: 1, lastCleaned: '2024-02-21 08:30 AM' },

    // Add more mock rooms for visualization
    ...Array.from({ length: 20 }, (_, i) => ({
        id: `r-auto-${i}`,
        roomNumber: `W-${100 + i}`,
        wardType: (['Medical Ward', 'Surgical Ward', 'Oncology', 'Geriatric'] as WardType[])[i % 4],
        accommodationType: (['General', 'Semi-Private', 'Private'] as AccommodationType[])[i % 3],
        status: (['Available', 'Occupied', 'Cleaning', 'Reserved'] as RoomStatus[])[Math.floor(Math.random() * 4)],
        capacity: [1, 2, 4, 6][i % 4],
        occupiedBeds: Math.floor(Math.random() * 2),
        floor: Math.floor(i / 10) + 1,
        lastCleaned: '2024-02-21 10:00 AM'
    }))
];
