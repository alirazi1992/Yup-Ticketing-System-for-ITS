'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TicketTypeFields from './TicketTypeFields';
import TicketFeed from '@/components/TicketFeed';
import useWebSocket from '@/hooks/useWebSocket';
import {
  TicketType,
  TicketStatus,
  SoftwareFields,
  HardwareFields,
  NetworkFields,
  OtherFields,
} from '@/types/ticket';
import { getSchemaByType } from '@/utils/validationSchemas';

export default function TicketPage() {
  const [type, setType] = useState<TicketType>('software');

  const [lastTicket, setLastTicket] = useState<
    | (SoftwareFields & { type: TicketType; createdAt: string; status: TicketStatus })
    | (HardwareFields & { type: TicketType; createdAt: string; status: TicketStatus })
    | (NetworkFields & { type: TicketType; createdAt: string; status: TicketStatus })
    | (OtherFields & { type: TicketType; createdAt: string; status: TicketStatus })
    | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(getSchemaByType(type)),
  });

  const { sendMessage } = useWebSocket('ws://localhost:3001');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const base = {
      type,
      createdAt: new Date().toISOString(),
      status: 'open' as TicketStatus,
    };

    let fullPayload:
      | (SoftwareFields & typeof base)
      | (HardwareFields & typeof base)
      | (NetworkFields & typeof base)
      | (OtherFields & typeof base);

    switch (type) {
      case 'software':
        fullPayload = { ...(data as SoftwareFields), ...base };
        break;
      case 'hardware':
        fullPayload = { ...(data as HardwareFields), ...base };
        break;
      case 'network':
        fullPayload = { ...(data as NetworkFields), ...base };
        break;
      case 'other':
        fullPayload = { ...(data as OtherFields), ...base };
        break;
    }

    sendMessage({
      event: 'new_ticket',
      data: fullPayload,
    });

    setLastTicket(fullPayload);
    toast.success('✅ Ticket submitted successfully!');
    reset();
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">ارسال تیکت پشتیبانی</h2>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as TicketType)}
        className="border p-2 rounded mb-6 w-full"
      >
        <option value="software">نرم‌افزاری</option>
        <option value="hardware">سخت‌افزاری</option>
        <option value="network">شبکه</option>
        <option value="other">متفرقه</option>
      </select>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TicketTypeFields type={type} register={register} errors={errors} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ارسال تیکت
        </button>
      </form>

      {lastTicket && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h4 className="font-bold mb-2">خلاصه آخرین تیکت:</h4>
          <pre className="text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(lastTicket, null, 2)}
          </pre>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />

      <TicketFeed />
    </div>
  );
}
