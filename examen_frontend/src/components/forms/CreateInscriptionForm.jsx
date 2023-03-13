import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';

import apiInstance from '../../instance';

import { inscriptionSchema } from '../../utils/yupSchemas.js';

export default function EnrollUserForm({ courses, users }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_id: -1,
      course_id: -1,
    },
    validationSchema: inscriptionSchema,
    onSubmit: async (values) => {
      const { user_id, course_id } = values;
      const result = await apiInstance.post('/inscriptions/create.php', {
        user_id: user_id,
        course_id: course_id,
      });
      if (result?.data.error === false) {
        toast.success(result.data.message + ' Navigating to dashboard.');
        setTimeout(() => {
          navigate('/inscriptions');
        }, 1500);
      } else if (result?.data.error === true) {
        toast.error(result.data.message);
      }
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-1/3 mx-auto gap-y-4">
        <label className="input-group input-group-vertical">
          <span
            className={
              'capitalize bg-[#3d4451] text-primary-white ' +
              (formik.errors.user_id && formik.touched.user_id ? ' bg-red-700' : '')
            }
          >
            User
          </span>
          <select
            onChange={(e) => formik.setFieldValue('user_id', e.target.value)}
            className={
              'py-2 px-4 rounded-[.5rem] w-full' +
              (formik.errors.user_id && formik.touched.user_id ? ' border-2 border-red-700' : ' ')
            }
          >
            <option defaultValue={-1} value={-1}>
              None
            </option>
            {users &&
              users.map((user) => {
                return (
                  <option value={user.id} key={user.id} className="overflow-hidden">
                    {user.name}
                  </option>
                );
              })}
          </select>
        </label>
        {formik.errors.user_id && formik.touched.user_id ? (
          <p className="text-red-700 font-medium text-[.9rem]">{formik.errors.user_id}</p>
        ) : null}

        <label className="input-group input-group-vertical">
          <span
            className={
              'capitalize bg-[#3d4451] text-primary-white ' +
              (formik.errors.course_id && formik.touched.course_id ? ' bg-red-700' : '')
            }
          >
            Course
          </span>
          <select
            onChange={(e) => formik.setFieldValue('course_id', e.target.value)}
            className={
              'py-2 px-4 rounded-[.5rem] w-full' +
              (formik.errors.course_id && formik.touched.course_id
                ? ' border-2 border-red-700'
                : ' ')
            }
          >
            <option defaultValue={-1} value={-1}>
              None
            </option>
            {courses &&
              courses.map((course) => {
                return (
                  <option value={course.id} key={course.id} className="overflow-hidden">
                    {course.name}
                  </option>
                );
              })}
          </select>
        </label>
        {formik.errors.course_id && formik.touched.course_id ? (
          <p className="text-red-700 font-medium text-[.9rem]">{formik.errors.course_id}</p>
        ) : null}

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
