"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { classes, consentCopy, countryCode, enquiryErrors, enquiryFields, enquiryHeading, enquiryStatusCopy, states } from "@/data/enquiry";

interface FormValues {
  fullName: string;
  email: string;
  mobile: string;
  className: string;
  state: string;
  consent: boolean;
}

type FieldName = keyof FormValues;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  mobile: "",
  className: "",
  state: "",
  consent: false,
};

export function EnquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLSelectElement>>>({});

  const updateText = (field: "fullName" | "email" | "mobile", value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!values.fullName.trim()) nextErrors.fullName = enquiryErrors.fullName;
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = enquiryErrors.email;
    if (!/^\d{10}$/.test(values.mobile.trim())) nextErrors.mobile = enquiryErrors.mobile;
    if (!values.className) nextErrors.className = enquiryErrors.className;
    if (!values.state) nextErrors.state = enquiryErrors.state;
    if (!values.consent) nextErrors.consent = enquiryErrors.consent;

    setErrors(nextErrors);
    const firstInvalidField = (Object.keys(initialValues) as FieldName[]).find((field) => nextErrors[field]);
    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
  };

  const renderError = (field: FieldName) => errors[field]
    ? <p id={`${field}-error`} role="alert" className="mt-1 text-sm font-medium text-primary-text">{errors[field]}</p>
    : null;

  return (
    <form id="enquire" noValidate onSubmit={submit} className="space-y-4" aria-labelledby="enquiry-form-title">
      <h3 id="enquiry-form-title" className="font-display text-2xl font-bold uppercase">{enquiryHeading[0]}</h3>
      {enquiryFields.map((field) => {
        if (field.id === "class" || field.id === "state") {
          const key = field.id === "class" ? "className" : "state";
          const options = field.id === "class" ? classes : states;
          return (
            <div key={field.id}>
              <label htmlFor={field.id} className="mb-1 block text-sm font-semibold">{field.label}</label>
              <select
                ref={(element) => { if (element) fieldRefs.current[key] = element; }}
                id={field.id}
                required={field.required}
                value={values[key]}
                onChange={(event) => {
                  setValues((current) => ({ ...current, [key]: event.target.value }));
                  if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
                }}
                aria-invalid={Boolean(errors[key])}
                aria-describedby={errors[key] ? `${key}-error` : undefined}
                className="min-h-11 w-full rounded-sm border border-line bg-bg px-3 text-fg"
              >
                <option value="">{field.placeholder}</option>
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              {renderError(key)}
            </div>
          );
        }

        if (field.id === "mobile") {
          return (
            <div key={field.id}>
              <label htmlFor="mobile" className="mb-1 block text-sm font-semibold">{field.label}</label>
              <div className="grid grid-cols-[3.5rem_1fr]">
                <span className="grid min-h-11 place-items-center border border-r-0 border-line bg-surface text-sm">{countryCode[0]}</span>
                <input
                  ref={(element) => { if (element) fieldRefs.current.mobile = element; }}
                  id="mobile"
                  required={field.required}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={values.mobile}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(errors.mobile)}
                  aria-describedby={errors.mobile ? "mobile-error" : undefined}
                  onChange={(event) => updateText("mobile", event.target.value.replace(/\D/g, ""))}
                  className="min-h-11 w-full rounded-r-sm border border-line bg-bg px-3 text-fg placeholder:text-muted"
                />
              </div>
              {renderError("mobile")}
            </div>
          );
        }

        const key = field.id === "full-name" ? "fullName" : "email";
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="mb-1 block text-sm font-semibold">{field.label}</label>
            <input
              ref={(element) => { if (element) fieldRefs.current[key] = element; }}
              id={field.id}
              required={field.required}
              type={field.id === "email" ? "email" : "text"}
              autoComplete={field.id === "email" ? "email" : "name"}
              value={values[key]}
              placeholder={field.placeholder}
              aria-required={field.required}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              onChange={(event) => updateText(key, event.target.value)}
              className="min-h-11 w-full rounded-sm border border-line bg-bg px-3 text-fg placeholder:text-muted"
            />
            {renderError(key)}
          </div>
        );
      })}
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={(element) => { if (element) fieldRefs.current.consent = element; }}
            id="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => {
              setValues((current) => ({ ...current, consent: event.target.checked }));
              if (errors.consent) setErrors((current) => ({ ...current, consent: undefined }));
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-primary"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed">{consentCopy[0]}</label>
        </div>
        {renderError("consent")}
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full">{enquiryHeading[0]}</Button>
      {submitted && <p role="status" aria-live="polite" className="font-semibold text-accent-text">{enquiryStatusCopy[0]}</p>}
    </form>
  );
}