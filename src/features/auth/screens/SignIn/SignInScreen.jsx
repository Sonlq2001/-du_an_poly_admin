import React, { useEffect, useState } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import Select from 'react-select';

import {
  PageSingIn,
  PageSingInLeft,
  PageSingInRight,
  FormLogin,
} from './SignInScreen.styles';
import LogoFpt from 'assets/images/logo.png';
import useRedirectAfterLogin from './../../hooks/useRedirectAfterLogin';
import { postAccessToken } from './../../redux/auth.slice';
import { getCampuses } from 'features/campuses/redux/campuses.slice';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const [codeCampus, setCodeCampus] = useState(null);
  const [message, setMessage] = useState(false);

  useRedirectAfterLogin();

  useEffect(() => {
    dispatch(getCampuses());
  }, [dispatch]);

  const { listCampuses } = useSelector((state) => ({
    listCampuses: state.campuses.listCampuses.map((campus) => ({
      label: campus.name,
      value: campus.code,
    })),
  }));

  const responseGoogle = (response) => {
    const { accessToken } = response;
    if (accessToken) {
      dispatch(
        postAccessToken({
          codeCampus,
          accessToken,
        })
      );
    }
  };

  const handleClickLogin = () => {
    if (!codeCampus) {
      setMessage(true);
    }
  };

  return (
    <PageSingIn>
      <PageSingInLeft></PageSingInLeft>
      <PageSingInRight className="content">
        <FormLogin>
          <img src={LogoFpt} alt="" className="logo-from" />
          <p className="des-from">Cao đẳng thực hành Fpolytechnic</p>

          <div className="group-select">
            <Select
              options={listCampuses || []}
              placeholder="Lựa chọn cơ sở"
              name="campuses_code"
              onChange={(option) => {
                setMessage(false);
                setCodeCampus(option.value);
              }}
            />
            {message && <div className="msg-error">Vui lòng chọn cơ sở !</div>}
          </div>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => {
              return (
                <button
                  className="button-form"
                  onClick={
                    !message && codeCampus
                      ? renderProps.onClick
                      : handleClickLogin
                  }
                  disabled={renderProps.disabled}
                >
                  <span className="icon-form">
                    <AiOutlineGoogle />
                  </span>
                  Google
                </button>
              );
            }}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </FormLogin>
      </PageSingInRight>
    </PageSingIn>
  );
};

export default SignInScreen;
