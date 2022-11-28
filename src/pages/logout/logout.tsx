import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth_context';

function Logout() {
  const { logout } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => navigate('/', { replace: true }));
  }, []);

  return <></>;
}

export default Logout;
