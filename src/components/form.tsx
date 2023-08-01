"use client";
import React, { FormEvent, useRef } from "react";

interface FormProps {
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ action, children, ...props }) => {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await action(formData);
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <form {...props} ref={formRef} onSubmit={handleAction}>
      {children}
    </form>
  );
};

export default Form;
