'use client';

import React from 'react';
import Image from 'next/image';

interface PropTypes {
  className?: string;
}

const Footer: React.FC<PropTypes> = _ => {
  return (
    <footer className="bg-[#303030] relative flex items-center justify-center overflow-hidden">
      {/* Trống đồng xoay */}
      <div className="absolute left-1/2 top-1/2 w-[1800px] h-[1800px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <Image
          src="/trongdong.png"
          alt="Trống đồng quay"
          fill
          className="rotate opacity-15"
          style={{ objectFit: 'contain' }}
          priority={false}
        />
      </div>

      {/* Nội dung chính */}
      <div className="container relative z-10 mx-auto px-4 py-10 space-y-12">
        <div className="grid grid-cols-12 gap-4">
          {/* Cột 1 */}
          <div className="col-span-12 md:col-span-12 lg:pr-8 lg:col-span-3">
            <div className="flex items-start">
              <Image
                src="/logo-white.svg"
                alt="Sinh Phúc Thọ"
                width={50}
                height={50}
                loading="lazy"
                className="mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-white">SINH PHÚC THỌ</h2>
                <p className="text-sm text-white font-semibold">
                  Tận tâm - Chuyên nghiệp - Minh bạch
                </p>
              </div>
            </div>
            <p className="text-sm text-white mt-2">
              Với hơn 20 năm kinh nghiệm, Sinh Phúc Thọ tự hào là một trong những đơn vị uy tín hàng
              đầu tại TP. Hồ Chí Minh trong lĩnh vực tổ chức tang lễ trọn gói.
            </p>
            <div className="flex items-start gap-2 text-sm text-white mt-2">
              <Image
                src={'/assets/images/icons/location.webp'}
                alt="Icon Location"
                width={18}
                height={18}
              />
              <span>
                <strong>Địa chỉ:</strong> Số 119 Nguyễn Du, P1, Gò Vấp, HCM
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-white mt-2">
              <Image
                src={'/assets/images/icons/call.webp'}
                alt="Icon Call"
                width={18}
                height={18}
              />
              <span>
                <strong>Liên hệ:</strong> 0913.673.661 (Thanh Thời)
              </span>
            </div>
          </div>


          {/* Cột 4 - Liên hệ */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-white">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-start gap-2">
                <Image
                  src={'/assets/images/icons/book.webp'}
                  alt="Icon Book"
                  width={18}
                  height={18}
                />
                Mã số hộ KD 8408782580, cấp ngày 12/4/2021
              </li>
              <li className="flex items-start gap-2">
                <Image
                  src={'/assets/images/icons/location.webp'}
                  alt="Icon Location"
                  width={18}
                  height={18}
                />
                119 Nguyễn Du, P1, Gò Vấp, HCM
              </li>
              <li className="flex items-start gap-2">
                <Image
                  src={'/assets/images/icons/sms.webp'}
                  alt="Icon Sms"
                  width={18}
                  height={18}
                />
                nhatthanhtranho@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <Image
                  src={'/assets/images/icons/call.webp'}
                  alt="Icon Call"
                  width={18}
                  height={18}
                />
                0913.673.661 (Thanh Thời)
              </li>
              <li className="flex items-start gap-2">
                <Image
                  src={'/assets/images/icons/call.webp'}
                  alt="Icon Call"
                  width={18}
                  height={18}
                />
                0986.124.780 (Kim Hương)
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6 text-sm text-white gap-4">
          <span>© 2024 - Cơ Sở Mai Táng Trại Hòm Sinh Phúc Thọ Gò Vấp. All rights reserved.</span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
