import React, { useState, useEffect } from "react";

import topRight from "../../assets/images/top-right.png";
import { MButton } from "../global";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Reset form when component mounts
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create HTML content for the email
      const htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `;

      const response = await fetch("http://localhost:3001/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `Contact Form: ${formData.name}`,
          html: htmlContent,
          senderEmail: formData.email,
          senderName: formData.name,
        }),
      });

      if (response.ok) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add function to handle WhatsApp redirect
  const handleWhatsAppRedirect = () => {
    // The phone number should be in international format without any special characters
    const phoneNumber = "33650397387"; // French number format: +33 6 17 54 25 87
    const message = encodeURIComponent(
      "Bonjour, je vous contacte depuis votre site web."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Function to check if the device is mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  return (
    <div id="contact">
      <div className="flex justify-center items-center bg-dark-gray text-white">
        <section className="w-full ">
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="md:w-1/2  flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.1234567890123!2d5.273456789012345!3d45.58345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c3c3c3c3c3c3%3A0x47f4c3c3c3c3c3c3!2s39%20Boulevard%20Pr%C3%A9-Pommier%2C%2038300%20Bourgoin-Jallieu!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className=" shadow-lg h-full"
              ></iframe>
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
                  <ContactInfo
                    icon="phone"
                    label="Téléphone"
                    text="0617542587"
                  />
                  <ContactInfo
                    icon="location"
                    label="Adresse"
                    text="39 boulevard Pré-Pommier, 38300 Bourgoin-Jallieu"
                  />
                  <ContactInfo
                    icon="clock"
                    label="Horaires"
                    text="Lundi - Samedi 08:30 – 19:00"
                  />
                </div>

                {/* WhatsApp Button for Mobile */}
                {isMobile() && (
                  <div className="mb-8">
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20M8.39 18.67C9.2 18.89 10.09 19 11 19C15.97 19 20 14.97 20 10C20 9.09 19.89 8.2 19.67 7.39L18.66 8.4C18.83 8.92 18.94 9.46 18.94 10C18.94 14.39 15.39 17.94 11 17.94C10.46 17.94 9.92 17.83 9.4 17.66L8.39 18.67M14.94 13.06L16.33 14.45C16.94 13.54 17.25 12.44 17.25 11.25C17.25 8.01 14.59 5.35 11.35 5.35C10.16 5.35 9.06 5.66 8.15 6.27L9.54 7.66C10.15 7.23 10.84 7 11.59 7C13.73 7 15.47 8.74 15.47 10.88C15.47 11.63 15.24 12.32 14.94 13.06Z" />
                      </svg>
                      Votre devis estimatif en 2 clics
                    </button>
                  </div>
                )}

                <form className="mt-12" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm text-white">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full px-5 py-2.5 text-gray-700 placeholder-gray-400 bg-white border ${
                          errors.name ? "border-red-500" : "border-gray-200"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full px-5 py-2.5 text-gray-700 placeholder-gray-400 bg-white border ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2 text-sm text-white">
                      Send a message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full h-32 px-5 py-2.5 text-gray-700 placeholder-gray-400 bg-white border ${
                        errors.message ? "border-red-500" : "border-gray-200"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      placeholder="Message"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitStatus === "success" && (
                    <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
                      Your message has been sent successfully!
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">
                      There was an error sending your message. Please try again.
                    </div>
                  )}

                  <div className="flex justify-center my-6">
                    <MButton
                      text={isSubmitting ? "Sending..." : "Send a message"}
                      className="mt-4"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
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
    clock: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
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

export default Contact;
