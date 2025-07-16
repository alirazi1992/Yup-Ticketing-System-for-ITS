'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemas, TicketType } from '@/app/validationSchemas/ticketSchemas';
import { useState } from 'react';

type TicketFormData = {
  title: string;
  description: string;
  os?: string;
  version?: string;
  deviceType?: string;
  serialNumber?: string;
  ipAddress?: string;
  location?: string;
};

export default function TicketForm() {
  const [ticketType, setTicketType] = useState<TicketType>('software');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: yupResolver(schemas[ticketType]),
  });

  const onSubmit: SubmitHandler<TicketFormData> = (data) => {
    console.log('🟢 Ticket Submitted:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <select
        className="border p-2 rounded w-full"
        value={ticketType}
        onChange={(e) => setTicketType(e.target.value as TicketType)}
      >
        <option value="software">نرم‌افزار</option>
        <option value="hardware">سخت‌افزار</option>
        <option value="network">شبکه</option>
        <option value="other">سایر</option>
      </select>

      <input {...register('title')} placeholder="عنوان" className="input" />
      <p className="text-red-500">{errors.title?.message}</p>

      <textarea {...register('description')} placeholder="توضیحات" className="input" />
      <p className="text-red-500">{errors.description?.message}</p>

      {ticketType === 'software' && (
        <>
          <input {...register('os')} placeholder="سیستم عامل" className="input" />
          <p className="text-red-500">{errors.os?.message}</p>

          <input {...register('version')} placeholder="ورژن نرم‌افزار" className="input" />
          <p className="text-red-500">{errors.version?.message}</p>
        </>
      )}

      {ticketType === 'hardware' && (
        <>
          <input {...register('deviceType')} placeholder="نوع دستگاه" className="input" />
          <p className="text-red-500">{errors.deviceType?.message}</p>

          <input {...register('serialNumber')} placeholder="شماره سریال" className="input" />
          <p className="text-red-500">{errors.serialNumber?.message}</p>
        </>
      )}

      {ticketType === 'network' && (
        <>
          <input {...register('ipAddress')} placeholder="آی‌پی" className="input" />
          <p className="text-red-500">{errors.ipAddress?.message}</p>

          <input {...register('location')} placeholder="مکان" className="input" />
          <p className="text-red-500">{errors.location?.message}</p>
        </>
      )}

      <button type="submit" className="bg-violet-600 text-white px-4 py-2 rounded">
        ارسال تیکت
      </button>
    </form>
  );
}
