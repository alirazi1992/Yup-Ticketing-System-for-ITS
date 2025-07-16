export type TicketType = 'software' | 'hardware' | 'network' | 'other';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'|'pending';



export interface SoftwareFields {
  softwareName: string;
  version: string;
  description: string;
  status: TicketStatus;
}

export interface HardwareFields {
  deviceType: string;
  serialNumber: string;
  description: string;
  status: TicketStatus;
}

export interface NetworkFields {
  ip: string;
  connectionType: string;
  description: string;
  status: TicketStatus;
}

export interface OtherFields {
  description: string;
  status: TicketStatus;
}

export type TicketFormFields = {
  software: Omit<SoftwareFields, 'status'>;
  hardware: Omit<HardwareFields, 'status'>;
  network: Omit<NetworkFields, 'status'>;
  other: Omit<OtherFields, 'status'>;
};


export interface TicketNote {
  message: string;
  sender: string;
  timestamp: string;
}

export type TicketWithNotes =
  | (SoftwareFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] })
  | (HardwareFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] })
  | (NetworkFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] })
  | (OtherFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] });
