import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import apiInstance from "../instance";

export default function Inscriptions() {
  const [isLoading, setIsLoading] = useState(null);
  const [inscriptions, setInscriptions] = useState(null);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchInscriptions = async () => {
      let result = null;
      result = await apiInstance.get("/inscriptions/read.php");
      const inscriptions = result.data.inscriptions;
      setInscriptions(inscriptions);
      setIsLoading(false);
    };

    const fetchCourses = async () => {
      let result = null;
      result = await apiInstance.get("/courses/read.php");
      console.log(result);
      const courses = result.data.courses;
      setCourses(courses);
      setIsLoading(false);
    };

    fetchCourses();
    fetchInscriptions();
  }, []);

  return (
    <div className="">
      <div className="mb-8">
        <Link to="/inscriptions/create" className="btn capitalize">
          Enroll User to Course
        </Link>
        {isLoading ? (
          <p>Loading</p>
        ) : inscriptions && courses ? (
          <div className="mt-5">
            <h3>Inscriptions by course:</h3>
            <div className="flex flex-wrap gap-4 justify-between">
              {courses.map((course) => {
                return (
                  <div key={course.id} className="flex flex-col mb-4 w-5/12">
                    <div className="border border-base-300 bg-base-100 rounded-box">
                      <div className="flex text-primary-white collapse-title text-xl font-medium">{course.name}</div>
                      <div className="content text-primary-white">
                        <div id="user_info" className="flex flex-col gap-x-4 p-4">
                          {inscriptions.map((inscription) => {
                            if (inscription.course_id === course.id) {
                              return (
                                <div key={inscription.id} className="flex gap-x-2 items-baseline ">
                                  <p className="text-base font-medium">
                                    {inscription.user_name} (id: {inscription.user_id}).
                                  </p>
                                  <p className="text-base font-medium">Inscription ID: {inscription.id}</p>
                                  <Link to={`/inscriptions/delete/${inscription.id}`} className="mt-2 inline">
                                    ❌
                                  </Link>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>No inscriptions</p>
        )}
      </div>
    </div>
  );
}
