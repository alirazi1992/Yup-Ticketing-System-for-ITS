'use client';

import { useState } from 'react';

type SignUpData = {
  nameFa: string;
  titleFa: string;
  nationalId: string;
  country: string;
  province: string;
  city: string;
  nameEn: string;
  titleEn: string;
  phone: string;
  phoneType: string;
  address: string;
  addressType: string;
};

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpData>({
    nameFa: '',
    titleFa: '',
    nationalId: '',
    country: '',
    province: '',
    city: '',
    nameEn: '',
    titleEn: '',
    phone: '',
    phoneType: '',
    address: '',
    addressType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ثبت اطلاعات کاربر:', formData);
    // Add form validation or Firebase submit here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">ثبت‌ نام کاربر جدید</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="nameFa" placeholder="نام فارسی" onChange={handleChange} value={formData.nameFa} className="p-2 border rounded" required />
          <input name="titleFa" placeholder="عنوان فارسی" onChange={handleChange} value={formData.titleFa} className="p-2 border rounded" required />
          <input name="nationalId" placeholder="شماره ملی" onChange={handleChange} value={formData.nationalId} className="p-2 border rounded" required />
          <input name="country" placeholder="کشور" onChange={handleChange} value={formData.country} className="p-2 border rounded" required />
          <input name="province" placeholder="استان" onChange={handleChange} value={formData.province} className="p-2 border rounded" required />
          <input name="city" placeholder="شهر" onChange={handleChange} value={formData.city} className="p-2 border rounded" required />
          <input name="nameEn" placeholder="Name" onChange={handleChange} value={formData.nameEn} className="p-2 border rounded" required />
          <input name="titleEn" placeholder="Title" onChange={handleChange} value={formData.titleEn} className="p-2 border rounded" required />
          <input name="phone" type="tel" placeholder="شماره تماس" onChange={handleChange} value={formData.phone} className="p-2 border rounded" required />

          <select name="phoneType" onChange={handleChange} value={formData.phoneType} className="p-2 border rounded">
            <option value="">نوع شماره</option>
            <option value="mobile">موبایل</option>
            <option value="landline">تلفن ثابت</option>
            <option value="work">تلفن محل کار</option>
          </select>

          <select name="addressType" onChange={handleChange} value={formData.addressType} className="p-2 border rounded">
            <option value="">نوع آدرس</option>
            <option value="home">منزل</option>
            <option value="office">محل کار</option>
            <option value="other">سایر</option>
          </select>
        </div>

        <textarea
          name="address"
          placeholder="آدرس کامل"
          onChange={handleChange}
          value={formData.address}
          className="w-full p-2 border rounded mt-2"
          rows={3}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          ثبت‌ نام
        </button>
      </form>
    </div>
  );
}
