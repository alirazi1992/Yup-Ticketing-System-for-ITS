import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  form: {
    name: string;
    email: string;
    password: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProfileSettings({ form, handleChange }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <label className="block mb-2">{t('نام کامل')}</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mt-4 mb-2">{t('ایمیل  ')}</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </>
  );
}
