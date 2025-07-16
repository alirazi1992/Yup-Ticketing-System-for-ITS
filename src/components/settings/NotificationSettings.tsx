import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  form: {
    notifyEmail: boolean;
    notifySMS: boolean;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  clearCache: () => void;
}

export default function NotificationSettings({ form, handleChange, clearCache }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="notifyEmail"
            checked={form.notifyEmail}
            onChange={handleChange}
            className="mr-2"
          />
          {t('اعلان از طریق ایمیل ')}
        </label>
      </div>
      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="notifySMS"
            checked={form.notifySMS}
            onChange={handleChange}
            className="mr-2"
          />
          {t('اعلان از طریق پیامک ')}
        </label>
      </div>

      <div className="text-right mt-4">
        <button
          type="button"
          onClick={clearCache}
          className="text-blue-600 hover:underline"
        >
          {t('پاک سازی کش ')}
        </button>
      </div>
    </>
  );
}
