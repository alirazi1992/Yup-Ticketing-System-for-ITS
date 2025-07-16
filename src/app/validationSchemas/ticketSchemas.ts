// src/validationSchemas/ticketSchemas.ts

import * as yup from 'yup';

export const baseSchema = {
  title: yup.string().required('عنوان الزامی است'),
  description: yup.string().required('توضیحات الزامی است'),
};

export const schemas = {
  software: yup.object().shape({
    ...baseSchema,
    os: yup.string().required('سیستم عامل الزامی است'),
    version: yup.string().required('ورژن نرم‌افزار الزامی است'),
  }),
  hardware: yup.object().shape({
    ...baseSchema,
    deviceType: yup.string().required('نوع دستگاه الزامی است'),
    serialNumber: yup.string().required('شماره سریال الزامی است'),
  }),
  network: yup.object().shape({
    ...baseSchema,
    ipAddress: yup.string().required('آی‌پی الزامی است'),
    location: yup.string().required('مکان الزامی است'),
  }),
  other: yup.object().shape({
    ...baseSchema,
  }),
};

export type TicketType = keyof typeof schemas;
