import React from "react";

const Footer = () => {
  return (
    <footer className="bg-edem-footer py-9 px-4">
      <div className="container mx-auto max-w-[1362px]">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/03b6822b2085525f1e1a0940ab68661b8364add1?width=72"
            alt="Indonesia Flag Logo"
            className="w-9 h-10"
          />
          <h3 className="text-edem-dark font-poppins text-4xl font-bold">
            E-DEMOKRASI
          </h3>
        </div>

        {/* Description */}
        <p className="text-edem-dark font-poppins text-sm font-normal leading-relaxed mb-6 max-w-[399px]">
          Ketika Setiap Suara Berarti, Teknologi Harus Hadir untuk Melindunginya
          – Aman, Transparan, dan Tanpa Celah.
        </p>

        {/* Social Media Icons */}
        <div className="flex items-center gap-8 mb-8">
          {/* Twitter */}
          <a
            href="#"
            className="text-edem-dark hover:text-edem-teal transition-colors"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <mask
                id="mask0_1_47"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="19"
                height="19"
              >
                <path d="M0 0.125H18.75V18.875H0V0.125Z" fill="white" />
              </mask>
              <g mask="url(#mask0_1_47)">
                <path
                  d="M14.7656 1.00366H17.6411L11.3598 8.20098L18.75 17.9965H12.9643L8.42946 12.0568L3.24643 17.9965H0.368304L7.08616 10.2956L0 1.005H5.93304L10.0259 6.43313L14.7656 1.00366ZM13.7545 16.2715H15.3482L5.0625 2.63893H3.35357L13.7545 16.2715Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="text-edem-dark hover:text-edem-teal transition-colors"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M8.875 2.08325H17.625C20.9583 2.08325 23.6667 4.79159 23.6667 8.12492V16.8749C23.6667 18.4773 23.0301 20.014 21.8971 21.147C20.7641 22.2801 19.2274 22.9166 17.625 22.9166H8.875C5.54167 22.9166 2.83334 20.2083 2.83334 16.8749V8.12492C2.83334 6.52257 3.46987 4.98585 4.6029 3.85282C5.73593 2.71978 7.27265 2.08325 8.875 2.08325ZM8.66667 4.16659C7.67211 4.16659 6.71828 4.56167 6.01502 5.26493C5.31176 5.9682 4.91667 6.92202 4.91667 7.91658V17.0833C4.91667 19.1562 6.59375 20.8333 8.66667 20.8333H17.8333C18.8279 20.8333 19.7817 20.4382 20.485 19.7349C21.1882 19.0316 21.5833 18.0778 21.5833 17.0833V7.91658C21.5833 5.84367 19.9063 4.16659 17.8333 4.16659H8.66667ZM18.7188 5.72909C19.0641 5.72909 19.3953 5.86627 19.6395 6.11046C19.8837 6.35464 20.0208 6.68583 20.0208 7.03117C20.0208 7.3765 19.8837 7.70769 19.6395 7.95188C19.3953 8.19607 19.0641 8.33325 18.7188 8.33325C18.3734 8.33325 18.0422 8.19607 17.798 7.95188C17.5539 7.70769 17.4167 7.3765 17.4167 7.03117C17.4167 6.68583 17.5539 6.35464 17.798 6.11046C18.0422 5.86627 18.3734 5.72909 18.7188 5.72909ZM13.25 7.29158C14.6313 7.29158 15.9561 7.84032 16.9328 8.81707C17.9096 9.79382 18.4583 11.1186 18.4583 12.4999C18.4583 13.8813 17.9096 15.206 16.9328 16.1828C15.9561 17.1595 14.6313 17.7083 13.25 17.7083C11.8687 17.7083 10.5439 17.1595 9.56715 16.1828C8.5904 15.206 8.04167 13.8813 8.04167 12.4999C8.04167 11.1186 8.5904 9.79382 9.56715 8.81707C10.5439 7.84032 11.8687 7.29158 13.25 7.29158ZM13.25 9.37492C12.4212 9.37492 11.6263 9.70416 11.0403 10.2902C10.4542 10.8763 10.125 11.6711 10.125 12.4999C10.125 13.3287 10.4542 14.1236 11.0403 14.7096C11.6263 15.2957 12.4212 15.6249 13.25 15.6249C14.0788 15.6249 14.8737 15.2957 15.4597 14.7096C16.0458 14.1236 16.375 13.3287 16.375 12.4999C16.375 11.6711 16.0458 10.8763 15.4597 10.2902C14.8737 9.70416 14.0788 9.37492 13.25 9.37492Z"
                fill="currentColor"
              />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            className="text-edem-dark hover:text-edem-teal transition-colors"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M23.6667 12.4999C23.6667 6.74992 19 2.08325 13.25 2.08325C7.5 2.08325 2.83334 6.74992 2.83334 12.4999C2.83334 17.5416 6.41667 21.7395 11.1667 22.7083V15.6249H9.08334V12.4999H11.1667V9.89575C11.1667 7.88533 12.8021 6.24992 14.8125 6.24992H17.4167V9.37492H15.3333C14.7604 9.37492 14.2917 9.84367 14.2917 10.4166V12.4999H17.4167V15.6249H14.2917V22.8645C19.5521 22.3437 23.6667 17.9062 23.6667 12.4999Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-edem-gray-secondary mb-4"></div>

        {/* Copyright */}
        <p className="text-edem-dark font-poppins text-xs font-normal">
          ©2025, Web2Chain. All right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
