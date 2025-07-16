'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '@/types/user'; // ✅ Import UserRole

const schema = yup.object().shape({
  email: yup.string().email('ایمیل نامعتبر است').required('ایمیل ضروری است'),
  role: yup
    .mixed<UserRole>()
    .oneOf(['user', 'admin', 'engineer'], 'نقش نامعتبر است')
    .required('نقش را انتخاب کنید'),
});

type FormData = yup.InferType<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const user = {
      id: uuidv4(),
      email: data.email,
      name: data.email.split('@')[0], // ✅ create dummy name
      role: data.role as UserRole, // ✅ Fix: cast as UserRole
    };

    login(user);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        ورود
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">ایمیل</label>
          <input
            {...register('email')}
            type="email"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">نقش</label>
          <select
            {...register('role')}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">انتخاب کنید</option>
            <option value="user">کاربر</option>
            <option value="engineer">مهندس</option>
            <option value="admin">مدیر</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
