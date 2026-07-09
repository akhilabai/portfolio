import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CONTACT_TEMPLATE = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE =
  import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendContactEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}) => {
  const templateParams = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    subject: data.subject,
    title: data.subject, // for templates using {{title}}
    message: data.message,
  };

  // Send email to you
  await emailjs.send(
    SERVICE_ID,
    CONTACT_TEMPLATE,
    templateParams,
    PUBLIC_KEY
  );

  // Send auto reply
  await emailjs.send(
    SERVICE_ID,
    AUTOREPLY_TEMPLATE,
    templateParams,
    PUBLIC_KEY
  );
};