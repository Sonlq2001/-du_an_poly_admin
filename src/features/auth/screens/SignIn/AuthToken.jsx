import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from './../../redux/auth.slice';

const AuthToken = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const token = params.token;
  useEffect(() => {
    dispatch(getToken(token));
  }, [dispatch, token]);
  return null;
};

export default AuthToken;
