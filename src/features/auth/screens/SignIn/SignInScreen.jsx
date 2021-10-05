import React from 'react';
import {
  PageSingIn,
  PageSingInLeft,
  PageSingInRight,
  FormLogin,
} from './SignInScreen.styles';
import LogoFpt from './../../../../assets/images/logo.png';
import { AiOutlineGoogle } from 'react-icons/ai';
import { GoogleLogin } from 'react-google-login';
const SignInScreen = () => {
  const responseGoogle = (response) => {
    console.log('ở đây ', response);
  };

  return (
    <PageSingIn>
      <PageSingInLeft></PageSingInLeft>
      <PageSingInRight className="content">
        <FormLogin>
          <img src={LogoFpt} alt="" className="logo-from" />
          <p className="des-from">Cao đẳng thực hành Fpolytechnic</p>
          <GoogleLogin
            clientId="231695115576-r5jrpmc72fh2o5kfs4h4pdgsuahkr9io.apps.googleusercontent.com"
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
