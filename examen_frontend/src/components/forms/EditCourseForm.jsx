import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';

import apiInstance from '../../instance';

import { courseSchema } from '../../utils/yupSchemas.js';

export default function EditCourseForm({ course }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
      legajo: course.legajo,
      name: course.name,
      description: course.description,
      modality_id: course.modality_id,
    },
    validationSchema: courseSchema,
    onSubmit: async (values) => {
      const { legajo, name, description, modality_id } = values;
      const course_id = parseInt(course.id);
      const result = await apiInstance.put('/courses/update.php', {
        legajo: legajo,
        name: name,
        description: description,
        modality_id: modality_id,
        id: course_id,
      });
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
            // defaultValue={course.modality_id}
            onChange={(e) => {
              formik.setFieldValue('modality_id', e.target.value);
            }}
            className={
              'py-2 px-4 rounded-[.5rem] ' +
              (formik.errors.modality_id && formik.touched.modality_id
                ? ' border-2 border-red-700'
                : ' ')
            }
          >
            {modalities &&
              modalities.map((modality) => {
                return (
                  <option
                    key={modality.id}
                    value={modality.id}
                    selected={course.modality_id == modality.id ? true : false}
                  >
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
