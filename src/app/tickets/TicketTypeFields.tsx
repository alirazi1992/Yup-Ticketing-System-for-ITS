'use client';

import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { TicketType, TicketFormFields } from '@/types/ticket';

interface Props {
  type: TicketType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const TicketTypeFields = ({ type, register, errors }: Props) => {
  if (type === 'software') {
    const r = register as unknown as UseFormRegister<TicketFormFields['software']>;
    const e = errors as unknown as FieldErrors<TicketFormFields['software']>;
    return (
      <>
        <input {...r('softwareName')} placeholder="Software Name" />
        <p>{e?.softwareName?.message as string}</p>

        <input {...r('version')} placeholder="Version" />
        <p>{e?.version?.message as string}</p>

        <textarea {...r('description')} placeholder="Description" />
        <p>{e?.description?.message as string}</p>
      </>
    );
  }

  if (type === 'hardware') {
    const r = register as unknown as UseFormRegister<TicketFormFields['hardware']>;
    const e = errors as unknown as FieldErrors<TicketFormFields['hardware']>;
    return (
      <>
        <input {...r('deviceType')} placeholder="Device Type" />
        <p>{e?.deviceType?.message as string}</p>

        <input {...r('serialNumber')} placeholder="Serial Number" />
        <p>{e?.serialNumber?.message as string}</p>

        <textarea {...r('description')} placeholder="Description" />
        <p>{e?.description?.message as string}</p>
      </>
    );
  }

  if (type === 'network') {
    const r = register as unknown as UseFormRegister<TicketFormFields['network']>;
    const e = errors as unknown as FieldErrors<TicketFormFields['network']>;
    return (
      <>
        <input {...r('ip')} placeholder="IP Address" />
        <p>{e?.ip?.message as string}</p>

        <input {...r('connectionType')} placeholder="Connection Type" />
        <p>{e?.connectionType?.message as string}</p>

        <textarea {...r('description')} placeholder="Description" />
        <p>{e?.description?.message as string}</p>
      </>
    );
  }

  if (type === 'other') {
    const r = register as unknown as UseFormRegister<TicketFormFields['other']>;
    const e = errors as unknown as FieldErrors<TicketFormFields['other']>;
    return (
      <>
        <textarea {...r('description')} placeholder="Description" />
        <p>{e?.description?.message as string}</p>
      </>
    );
  }

  return null;
};

export default TicketTypeFields;
