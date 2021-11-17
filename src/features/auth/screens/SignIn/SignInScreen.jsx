import React, { useEffect, useCallback, useState } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';

import Select from 'react-select';
import {
  PageSingIn,
  PageSingInLeft,
  PageSingInRight,
  FormLogin,
  BoxSelect,
} from './SignInScreen.styles';
import LogoFpt from 'assets/images/logo.png';
import { postAccessToken, getCampus } from './../../redux/auth.slice';
import useRedirectAfterLogin from './../../hooks/useRedirectAfterLogin';
import { MapOptionsCampuses } from 'helpers/convert/map-options';
const SignInScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { messenger } = useSelector((state) => state.auth);
  const [Campuses_Code, setCampusesCode] = useState(null);
  const [message, setMessage] = useState(false);
  const [messageLogin, setMessageLogin] = useState(messenger);
  const { listCampuses } = useSelector((state) => state.auth);
  const optionCampuses = MapOptionsCampuses(listCampuses);

  const fetchCampuses = useCallback(() => {
    dispatch(getCampus());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCampus());
  }, [dispatch, fetchCampuses]);

  useRedirectAfterLogin();
  const responseGoogle = (response) => {
    const { accessToken } = response;
    const data = { campus_code: Campuses_Code, access_token: accessToken };
    setMessageLogin('');
    if (!Campuses_Code) {
      setMessage(true);
    } else {
      dispatch(postAccessToken(data))
        .then(() => history.push('/'))
        .catch((error) => setMessageLogin(error.response.data.errors));
    }
  };
  const handleCampuses = (data) => {
    setCampusesCode(data.value);
    setMessage(false);
  };
  return (
    <PageSingIn>
      <PageSingInLeft></PageSingInLeft>
      <PageSingInRight className="content">
        <FormLogin>
          <img src={LogoFpt} alt="" className="logo-from" />
          <p className="des-from">Cao đẳng thực hành Fpolytechnic</p>
          <BoxSelect className="campuses">
            <Select
              onChange={(e) => handleCampuses(e)}
              className="select-option input-search"
              placeholder="Lựa chọn cơ sở "
              options={optionCampuses}
            />
            {message && <p className="error">Vui lòng chọn cơ sở </p>}
          </BoxSelect>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <button
                className="button-form"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <span className="icon-form">
                  <AiOutlineGoogle />
                </span>
                Google
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          {messageLogin && <div className="error"> {messageLogin} </div>}
        </FormLogin>
      </PageSingInRight>
    </PageSingIn>
  );
};

export default SignInScreen;
