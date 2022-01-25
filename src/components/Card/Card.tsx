import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import CardView from '../CardView';
import "./Card.css";

interface MyFormValues {
  cardNumber: string;
  cardHolder: string;
  CVV: string;
  month: string;
  year: string;
}

type CardProps = {
  isDarkModeActive: boolean
}

function Card({isDarkModeActive}: CardProps) {
  const initialValues: MyFormValues = { cardNumber: '', cardHolder: '', CVV: '', month: '', year: '' };
  return (
    <div>
        <h2 className={isDarkModeActive ? "header light-text" : "header"}>Visa Card</h2>
        <CardView />
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            cardNumber: Yup.string()
              .label('Card Number')
              .max(16)
              .min(16)
              .matches(/^[0-9]*$/, 'Only digits')
              .required('Required'),
            cardHolder: Yup.string()
              .label('Card Holder')
              .max(20, 'Must be 20 characters or less')
              .min(2, 'Must be 2 characters or more')
              .matches(/^[aA-zZ\s]+$/, 'Wrong format')
              .required('Required'),
            month: Yup.string()
              .label('Month')
              .max(2)
              .min(2)
              .required('Required'),
            year: Yup.string()
              .label('Year')
              .max(4)
              .min(4)
              .required('Required'),
            CVV: Yup.string().label('CVV Number').min(3).max(4).required('Required'),
          })}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500)
          }}
        >
          {({ isSubmitting }) => (
            <Form className='card-fields'>
              <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="cardNumber">Card Number</label>
              <Field className='card-field' name="cardNumber" type="text" />
              <ErrorMessage name="cardNumber" />
            
              <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="cardHolder">Card Holder</label>
              <Field className='card-field' name="cardHolder" type="text" />
              <ErrorMessage name="cardHolder" />

              <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="month">Expiration Date</label>
              <Field className='card-field expDate' name="month" type="text" />
              <ErrorMessage name="month" />

              <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="year"></label>
              <Field className='card-field expDate' name="year" type="text" />
              <ErrorMessage name="year" />
            
              <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="CVV">CVV</label>
              <Field className='card-field cvv expDate' name="CVV" type="text" />
              <ErrorMessage name="CVV" />
            
              <button className={isDarkModeActive ? "submit-btn light": "submit-btn dark"} type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
    </div>
  );
}

export default Card;