import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { toast } from 'react-toastify';

import apiInstance from '../../instance';

export default function CreateUserForm() {
  const navigate = useNavigate();

  const createUserSchema = Yup.object().shape({
    name: Yup.string().trim().max(255, 'Too long!').required('Required'),
    surname: Yup.string().trim().max(255, 'Too long!').required('Required'),
    dni: Yup.number()
      .min(1, 'Must be between 1 and 99999999')
      .max(99999999, 'Must be between 1 and 99999999')
      .required('Required'),
    gender: Yup.string()
      .trim()
      .max(1, 'Too long!')
      .matches(/^[FM]$/, 'Must be F (Female) or M (Male)')
      .required('Required'),
    age: Yup.number()
      .min(1, 'Must be between 1 and 199')
      .max(199, 'Must be between 1 and 199')
      .required('Required'),
  });

  const inputsArray = [
    { name: 'name', type: 'text' },
    { name: 'surname', type: 'text' },
    { name: 'dni', type: 'number' },
    { name: 'age', type: 'number' },
    { name: 'gender', type: 'string' },
  ];

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          name: '',
          surname: '',
          dni: '',
          age: '',
          gender: '',
        }}
        validationSchema={createUserSchema}
        onSubmit={async (values, helpers) => {
          const { name, surname, dni, gender, age } = values;
          const result = await apiInstance.post('/users/create.php', {
            name: name,
            surname: surname,
            dni: dni,
            age: age,
            gender: gender,
          });
          /* If statement for react-toastify */
          if (result?.data.error === false) {
            toast.success(result.data.message + ' Navigating to dashboard.');
            setTimeout(() => {
              navigate('/users');
            }, 1500);
          } else if (result?.data.error === true) {
            toast.error(result.data.message);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col w-1/3 mx-auto gap-y-4">
            {inputsArray.map((input, i) => {
              return (
                <div key={input.name + i}>
                  <div className="form-control">
                    <label className="input-group input-group-vertical">
                      <span
                        className={
                          'capitalize bg-[#3d4451] text-primary-white ' +
                          (errors[input.name] && touched[input.name] ? ' bg-red-700' : '')
                        }
                      >
                        {input.name}
                      </span>
                      <Field
                        name={input.name}
                        type={input.type}
                        className={
                          'py-2 px-4 rounded-[.5rem] ' +
                          (errors[input.name] && touched[input.name]
                            ? ' border-2 border-red-700'
                            : ' ')
                        }
                      />
                    </label>
                  </div>{' '}
                  {errors[input.name] && touched[input.name] ? (
                    <p className="text-red-700 font-medium text-[.9rem]">{errors[input.name]}</p>
                  ) : null}
                </div>
              );
            })}
            <button type="submit" className="btn">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
