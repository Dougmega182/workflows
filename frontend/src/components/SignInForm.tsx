import React from "react";
import { Formik, Form, Field } from "formik";
import { signIn } from "./services/api";

const SignInForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        mobile: "",
        company: "",
        swms: false, // Default should be false
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await signIn(values);  // Send correct data
          alert("Sign-in successful!");
        } catch (error) {
          console.error("Error:", error);
          alert("Sign-in failed!");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="name" placeholder="Name" required />
          <Field type="text" name="mobile" placeholder="Mobile" required />
          <Field type="text" name="company" placeholder="Company" required />
          <label>
            <Field type="checkbox" name="swms" /> Acknowledge SWMS
          </label>
          <button type="submit" disabled={isSubmitting}>Sign In</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
