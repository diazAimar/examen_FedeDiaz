import { useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";

import { toast } from "react-toastify";

import apiInstance from "../../instance";

import { userSchema } from "../../utils/yupSchemas.js";

export default function CreateUserForm() {
  const navigate = useNavigate();

  const inputsArray = [
    { name: "name", type: "text" },
    { name: "surname", type: "text" },
    { name: "dni", type: "number" },
    { name: "age", type: "number" },
    { name: "gender", type: "string" },
  ];

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          name: "",
          surname: "",
          dni: "",
          age: "",
          gender: "",
        }}
        validationSchema={userSchema}
        onSubmit={async (values, helpers) => {
          const { name, surname, dni, gender, age } = values;
          const result = await apiInstance.post("/users/create.php", {
            name: name,
            surname: surname,
            dni: dni,
            age: age,
            gender: gender,
          });
          /* If statement for react-toastify */
          if (result?.data.error === false) {
            toast.success(result.data.message + " Navigating to dashboard.");
            setTimeout(() => {
              navigate("/users");
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
                      <span className={"capitalize bg-[#3d4451] text-primary-white " + (errors[input.name] && touched[input.name] ? " bg-red-700" : "")}>{input.name}</span>
                      <Field name={input.name} type={input.type} className={"py-2 px-4 rounded-[.5rem] " + (errors[input.name] && touched[input.name] ? " border-2 border-red-700" : " ")} />
                    </label>
                  </div>{" "}
                  {errors[input.name] && touched[input.name] ? <p className="text-red-700 font-medium text-[.9rem]">{errors[input.name]}</p> : null}
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
