import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import EnrollUserForm from '../components/forms/EnrollUserForm';

import apiInstance from '../instance';

export default function Inscriptions() {
  return (
    <div className="">
      <div className="mb-8">
        <Link to="/inscriptions/create" className="btn capitalize">
          Enroll User to Course
        </Link>
      </div>
    </div>
  );
}
