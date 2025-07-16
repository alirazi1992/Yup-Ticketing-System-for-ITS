import * as Yup from 'yup';

export const ticketSchemas: Record<string, Yup.AnySchema> = {
  software: Yup.object({
    softwareName: Yup.string().required('نام نرم‌افزار الزامی است'),
    version: Yup.string().required('نسخه نرم‌افزار الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
  }),
  hardware: Yup.object({
    deviceType: Yup.string().required('نوع دستگاه الزامی است'),
    serialNumber: Yup.string()
      .matches(/^[A-Za-z0-9]{8,12}$/, 'سریال باید بین ۸ تا ۱۲ کاراکتر و فقط شامل حروف و عدد باشد')
      .required('شماره سریال الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
  }),
  network: Yup.object({
    ip: Yup.string()
      .matches(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\1)\.(\1)\.(\1)$/,
        'آی‌پی باید به صورت معتبر وارد شود (مثلاً 192.168.0.1)'
      )
      .required('آی‌پی الزامی است'),
    connectionType: Yup.string().required('نوع اتصال الزامی است'),
    description: Yup.string(),
  }),
  other: Yup.object({
    description: Yup.string().required('لطفاً توضیحات را وارد کنید'),
  }),
};

export const getSchemaByType = (type: string) => {
  return ticketSchemas[type] || Yup.object({});
};
