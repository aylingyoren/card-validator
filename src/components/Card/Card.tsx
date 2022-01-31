import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import CardView from "../CardView";
import "./Card.css";

export interface MyFormValues {
  cardNumber: string;
  cardHolder: string;
  CVV: string;
  month: string;
  year: string;
}

export type CardProps = {
  isDarkModeActive: boolean;
  onSubmit: Function;
};

const ValidationSchema = Yup.object({
  cardNumber: Yup.string()
    .label("Card Number")
    .matches(/^[0-9]*$/, "Only digits")
    .max(16)
    .min(16)
    .required("Required"),
  cardHolder: Yup.string()
    .label("Card Holder")
    .matches(/^((?:[A-Za-z]+ ?){1,3})$/, "Wrong format")
    .max(20, "Must be 20 characters or less")
    .min(4, "Must be 4 characters or more")
    .required("Required"),
  month: Yup.string().label("Expiration Date").required("Required"),
  year: Yup.string().label("Expiration Date").required("Required"),
  CVV: Yup.string()
    .label("CVV Number")
    .matches(/^[0-9]*$/, "Only digits")
    .min(3, "Must be 3 or 4 digits")
    .max(4, "Must be 3 or 4 digits")
    .required("Required"),
}); 

function Card({ isDarkModeActive, onSubmit }: CardProps) {
  const initialValues: MyFormValues = {
    cardNumber: "",
    cardHolder: "",
    CVV: "",
    month: "",
    year: "",
  };

  const handleSubmit = (values: MyFormValues, { setSubmitting }: FormikHelpers<MyFormValues>) => {
    console.log("values", values);
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <div>
      <h2
        className={isDarkModeActive ? "header light-text" : "header"}
        data-testid="header"
      >
        Visa Card
      </h2>

      <div
        className={
          isDarkModeActive ? "card-validator light-border" : "card-validator"
        }
      >
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="card-fields" data-testid="card-fields">
              <CardView values={values} isDarkModeActive={isDarkModeActive} />
              <label
                className={`card-field-label 
                  ${isDarkModeActive
                    ? " light-text"
                    : "dark-text"}
                `}
                htmlFor="cardNumber"
              >
                Card Number
              </label>
              <Field
                className="card-field"
                name="cardNumber"
                type="text"
                data-testid="cardNumberInput"
              />
              <span
                className={isDarkModeActive ? "err-msg light-err" : "err-msg"}
                data-testid="errorCardNumber"
              >
                <ErrorMessage name="cardNumber" />
              </span>

              <label
                className={`card-field-label 
                ${isDarkModeActive
                  ? " light-text"
                  : "dark-text"}
              `}
                htmlFor="cardHolder"
              >
                Card Holder
              </label>
              <Field
                className="card-field"
                name="cardHolder"
                type="text"
                data-testid="cardHolderInput"
              />
              <span
                className={isDarkModeActive ? "err-msg light-err" : "err-msg"}
              >
                <ErrorMessage name="cardHolder" />
              </span>

              <div className="expDate-cvv">
                <div className="expDate-set">
                  <label
                    className={`card-field-label 
                    ${isDarkModeActive
                      ? " light-text"
                      : "dark-text"}
                  `}
                    htmlFor="month"
                  >
                    Expiration Date
                  </label>
                  <div className="expDate-field">
                    <div className="month-field">
                      <Field
                        className="card-field expDate-input"
                        as="select"
                        name="month"
                        data-testid="monthInput"
                      >
                        <option value="">Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </Field>
                      <span
                        className={
                          isDarkModeActive ? "err-msg light-err" : "err-msg"
                        }
                      >
                        <ErrorMessage name="month" />
                      </span>
                    </div>

                    <div className="year-field">
                      <Field
                        className="card-field expDate-input"
                        as="select"
                        name="year"
                        data-testid="yearInput"
                      >
                        <option value="">Year</option>
                        <option value="27">2027</option>
                        <option value="26">2026</option>
                        <option value="25">2025</option>
                        <option value="24">2024</option>
                        <option value="23">2023</option>
                        <option value="22">2022</option>
                      </Field>
                      <span
                        className={
                          isDarkModeActive ? "err-msg light-err" : "err-msg"
                        }
                      >
                        <ErrorMessage name="year" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cvv-set">
                  <label
                    className={`card-field-label 
                    ${isDarkModeActive
                      ? " light-text"
                      : "dark-text"}
                  `}
                    htmlFor="CVV"
                  >
                    CVV
                  </label>
                  <Field
                    className="card-field cvv-input"
                    name="CVV"
                    type="text"
                    data-testid="cvvInput"
                  />
                  <span
                    className={
                      isDarkModeActive ? "err-msg light-err" : "err-msg"
                    }
                  >
                    <ErrorMessage name="CVV" />
                  </span>
                </div>
              </div>

              <button
                className={`submit-btn 
                  ${isDarkModeActive ? "light-btn" : "dark"}
                `}
                type="submit"
                disabled={isSubmitting}
                data-testid="submit-btn"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Card;
