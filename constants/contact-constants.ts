import {
  type ContactField,
  type ContactFormData,
} from "@/types/contact-types";

export const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export const REQUIRED_FIELDS: ContactField[] = ["name", "email", "message"];

export const ALERT_DURATION = 5000;
