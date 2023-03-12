import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string().trim().max(255, 'Too long!').required('Required'),
  surname: Yup.string().trim().max(255, 'Too long!').required('Required'),
  dni: Yup.number()
    .min(1, 'Must be between 1 and 99999999')
    .max(99999999, 'Must be between 1 and 99999999')
    .required('Required'),
  gender: Yup.string()
    .trim()
    .matches(/^[FM]$/, 'Must be F (Female) or M (Male)')
    .required('Required'),
  age: Yup.number()
    .min(1, 'Must be between 1 and 199')
    .max(199, 'Must be between 1 and 199')
    .required('Required'),
});

export const courseSchema = Yup.object().shape({
  legajo: Yup.string().trim().max(100, 'Too long!').required('Required'),
  name: Yup.string().trim().max(100, 'Too long!').required('Required'),
  description: Yup.string().trim().max(200, 'Too long!').required('Required'),
  modality_id: Yup.number().min(1, 'Please choose a modality').required('Required'),
});
