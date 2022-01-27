import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import CardView from '../CardView';
import "./Card.css";

interface MyFormValues {
  cardNumber: string;
  cardHolder: string;
  CVV: string;
  expDate: string;
}

type CardProps = {
  isDarkModeActive: boolean
}

function Card({isDarkModeActive}: CardProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [CVV, setCVV] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const initialValues: MyFormValues = { cardNumber: '', cardHolder: '', CVV: '', expDate: '' };
  return (
    <div>
        <h2 className={isDarkModeActive ? "header light-text" : "header"}>Visa Card</h2>
        <CardView cardNumber={cardNumber} cardHolder={cardHolder} CVV={CVV} month={month} year={year} />
        <div className={isDarkModeActive ? "card-validator light-border" : "card-validator"}>
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
              expDate: Yup.string()
                .label('Expiration Date')
                .required('Required'),
              CVV: Yup.string()
                .label('CVV Number')
                .min(3, 'Must be 3 or 4 digits')
                .max(4, 'Must be 3 or 4 digits')
                .required('Required'),
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
                <Field className='card-field' name="cardNumber" type="text" value={cardNumber} onChange={(e: any) => setCardNumber(e.target.value)} />
                <span className={isDarkModeActive ? 'err-msg light-err' : 'err-msg'}><ErrorMessage name="cardNumber" /></span>
              
                <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="cardHolder">Card Holder</label>
                <Field className='card-field' name="cardHolder" type="text" value={cardHolder} onChange={(e: any) => setCardHolder(e.target.value)} />
                <span className={isDarkModeActive ? 'err-msg light-err' : 'err-msg'}><ErrorMessage name="cardHolder" /></span>

                <div className="expDate-cvv">
                  <div className="expDate-set">
                    <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="month">Expiration Date</label>
                    <div className="expDate-field">
                      <Field className='card-field expDate-input' as="select" name="expDate" value={month} onChange={(e: any) => setMonth(e.target.value)}>
                        <option value="month" selected>Month</option>
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

                      <Field className='card-field expDate-input' as="select" name="expDate" value={year} onChange={(e: any) => setYear(e.target.value)}>
                        <option value="year" selected>Year</option>
                        <option value="27">2027</option>
                        <option value="26">2026</option>
                        <option value="25">2025</option>
                        <option value="24">2024</option>
                        <option value="23">2023</option>
                        <option value="22">2022</option>
                      </Field>
                    </div>
                    
                    <span className={isDarkModeActive ? 'err-msg light-err' : 'err-msg'}><ErrorMessage name="expDate" /></span>
                  </div>
                
                  <div className="cvv-set">
                    <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="CVV">CVV</label>
                    <Field className='card-field cvv-input' name="CVV" type="text" value={CVV} onChange={(e: any) => setCVV(e.target.value)} />
                    <span className={isDarkModeActive ? 'err-msg light-err' : 'err-msg'}><ErrorMessage name="CVV" /></span>
                  </div>
                </div>
              
                <button className={isDarkModeActive ? "submit-btn light-btn": "submit-btn dark"} type="submit" disabled={isSubmitting}>Submit</button>
              </Form>
            )}
          </Formik>
        </div>
    </div>
  );
}

export default Card;