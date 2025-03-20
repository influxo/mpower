import React from "react";
import contact from "../../assets/images/contact.png";
import topRight from "../../assets/images/top-right.png";
import { MButton } from "../global";

const Contact: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-[#1A1A1A] text-white">
      <section className="w-full">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={contact}
              alt="Vintage typewriter"
              className="object-cover"
            />
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              <img
                src={topRight}
                alt="Vintage typewriter"
                className="absolute top-0 right-0"
              />
            </div>
            <div className="md:p-12 p-4">
              <h1 className="text-3xl mb-6">Contactez-nous</h1>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 my-16">
                <ContactInfo
                  icon="email"
                  label="Email"
                  text="Mpowerauto38@gmail.com"
                />
                <ContactInfo icon="phone" label="Téléphone" text="0617542587" />
                <ContactInfo
                  icon="location"
                  label="Adresse"
                  text="123 Rue XYZ, France"
                />
                <ContactInfo
                  icon="clock"
                  label="Horaires"
                  text="Lundi - Samedi 08:30 – 19:00"
                />
              </div>

              <form className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Full Name" placeholder="John Doe" />
                  <InputField label="Email" placeholder="john@example.com" />
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm text-white">
                    Send a message
                  </label>
                  <textarea
                    className="w-full h-32 px-5 py-2.5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="flex justify-center my-6">
                  <MButton text="Send a message" className="mt-4" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactInfo = ({
  icon,
  label,
  text,
}: {
  icon: string;
  label: string;
  text: string;
}) => {
  const icons: Record<string, string> = {
    email:
      "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    phone:
      "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
    location:
      "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0M15 10.5a3 3 0 11-6 0 3 3 0 016 0z",
    clock:
      "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  };
  return (
    <div className="flex items-center">
      <span className="p-3 rounded-full bg-[#2d2d30]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d={icons[icon]}
          />
        </svg>
      </span>
      <div className="ml-4">
        <h2 className="text-sm font-medium text-gray-400">{label}</h2>
        <p className="text-white">{text}</p>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div>
    <label className="block mb-2 text-sm text-white">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-5 py-2.5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default Contact;
