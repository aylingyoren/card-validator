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
  const initialValues: MyFormValues = { cardNumber: '', cardHolder: '', CVV: '', expDate: '' };
  return (
    <div>
        <h2 className={isDarkModeActive ? "header light-text" : "header"}>Visa Card</h2>
        <CardView />
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
                <span className={isDarkModeActive ? 'err-msg light-err' : 'err-msg'}><ErrorMessage name="cardNumber" /></span>
              
                <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="cardHolder">Card Holder</label>
                <Field className='card-field' name="cardHolder" type="text" />
                <span className={isDarkModeActive ? 'err-msg light-err' : 'err-msg'}><ErrorMessage name="cardHolder" /></span>

                <div className="expDate-cvv">
                  <div className="expDate-set">
                    <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="month">Expiration Date</label>
                    <div className="expDate-field">
                      <Field className='card-field expDate-input' as="select" name="expDate">
                        <option value="month" selected>Month</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                      </Field>

                      <Field className='card-field expDate-input' as="select" name="expDate">
                        <option value="year" selected>Year</option>
                        <option value="2027">2027</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                      </Field>
                    </div>
                    
                    <span className={isDarkModeActive ? 'err-msg light-err' : 'err-msg'}><ErrorMessage name="expDate" /></span>
                  </div>
                
                  <div className="cvv-set">
                    <label className={isDarkModeActive ? 'card-field-label light-text' : 'card-field-label dark-text'} htmlFor="CVV">CVV</label>
                    <Field className='card-field cvv-input' name="CVV" type="text" />
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