// ✅ File: src/types/ticket.ts

export type TicketFormFields = {
  software: {
    softwareName: string;
    version: string;
    description: string;
  };
  hardware: {
    deviceType: string;
    serialNumber: string;
    description: string;
  };
  network: {
    ip: string;
    connectionType: string;
    description?: string;
  };
  other: {
    description: string;
  };
};

export type TicketType = keyof TicketFormFields;
