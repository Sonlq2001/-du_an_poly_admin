import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import {
  PageSingIn,
  PageSingInLeft,
  PageSingInRight,
  FormLogin,
} from './SignInScreen.styles';
import LogoFpt from 'assets/images/logo.png';
import { postAccessToken } from './../../redux/auth.slice';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const responseGoogle = (response) => {
    const { accessToken } = response;
    if (accessToken) {
      dispatch(postAccessToken(accessToken)).then(() => history.goBack());
    }
  };

  return (
    <PageSingIn>
      <PageSingInLeft></PageSingInLeft>
      <PageSingInRight className="content">
        <FormLogin>
          <img src={LogoFpt} alt="" className="logo-from" />
          <p className="des-from">Cao đẳng thực hành Fpolytechnic</p>
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
        </FormLogin>
      </PageSingInRight>
    </PageSingIn>
  );
};

export default SignInScreen;
