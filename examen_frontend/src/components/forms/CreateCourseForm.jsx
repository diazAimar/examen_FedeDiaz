import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';

import apiInstance from '../../instance';

import { courseSchema } from '../../utils/yupSchemas.js';

export default function CreateCourseForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [modalities, setModalities] = useState(null);

  useEffect(() => {
    const fetchModalities = async () => {
      let result = null;
      result = await apiInstance.get('/modalities/read.php');
      setModalities(result.data.modalities);
      setIsLoading(false);
    };
    fetchModalities();
  }, []);

  const inputsArray = [
    { name: 'legajo', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
  ];

  const formik = useFormik({
    initialValues: {
      legajo: '',
      name: '',
      description: '',
      modality_id: -1,
    },
    validationSchema: courseSchema,
    onSubmit: async (values) => {
      const { legajo, name, description, modality_id } = values;
      const result = await apiInstance.post('/courses/create.php', {
        legajo: legajo,
        name: name,
        description: description,
        modality_id: modality_id,
      });
      /* If statement for react-toastify */
      if (result?.data.error === false) {
        toast.success(result.data.message + ' Navigating to dashboard.');
        setTimeout(() => {
          navigate('/courses');
        }, 1500);
      } else if (result?.data.error === true) {
        toast.error(result.data.message);
      }
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-1/3 mx-auto gap-y-4">
        {inputsArray.map((input, i) => {
          return (
            <div key={input.name + i}>
              <div className="form-control">
                <label className="input-group input-group-vertical">
                  <span
                    className={
                      'capitalize bg-[#3d4451] text-primary-white ' +
                      (formik.errors[input.name] && formik.touched[input.name] ? ' bg-red-700' : '')
                    }
                  >
                    {input.name}
                  </span>
                  <input
                    name={input.name}
                    type={input.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[input.name]}
                    className={
                      'py-2 px-4 rounded-[.5rem] ' +
                      (formik.errors[input.name] && formik.touched[input.name]
                        ? ' border-2 border-red-700'
                        : ' ')
                    }
                  />
                </label>
              </div>{' '}
              {formik.errors[input.name] && formik.touched[input.name] ? (
                <p className="text-red-700 font-medium text-[.9rem]">{formik.errors[input.name]}</p>
              ) : null}
            </div>
          );
        })}
        <label className="input-group input-group-vertical">
          <span
            className={
              'capitalize bg-[#3d4451] text-primary-white ' +
              (formik.errors.modality_id && formik.touched.modality_id ? ' bg-red-700' : '')
            }
          >
            Modality
          </span>
          <select
            onChange={(e) => formik.setFieldValue('modality_id', e.target.value)}
            className={
              'py-2 px-4 rounded-[.5rem] ' +
              (formik.errors.modality_id && formik.touched.modality_id
                ? ' border-2 border-red-700'
                : ' ')
            }
          >
            <option defaultValue={-1} value={-1}>
              None
            </option>
            {modalities &&
              modalities.map((modality) => {
                return (
                  <option key={modality.id} value={modality.id}>
                    {modality.description}
                  </option>
                );
              })}
          </select>
        </label>

        {formik.errors.modality_id && formik.touched.modality_id ? (
          <p className="text-red-700 font-medium text-[.9rem]">{formik.errors.modality_id}</p>
        ) : null}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
