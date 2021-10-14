import React from 'react';
import {
  PageSingIn,
  PageSingInLeft,
  PageSingInRight,
  FormLogin,
} from './SignInScreen.styles';
import LogoFpt from './../../../../assets/images/logo.png';
import { AiOutlineGoogle } from 'react-icons/ai';
const SignInScreen = () => {

  return (
    <PageSingIn>
      <PageSingInLeft></PageSingInLeft>
      <PageSingInRight className="content">
        <FormLogin>
          <img src={LogoFpt} alt="" className="logo-from" />
          <p className="des-from">Cao đẳng thực hành Fpolytechnic</p>
              <button
                className="button-form"
              >
                <span className="icon-form">
                  <AiOutlineGoogle />
                </span>
                Google
              </button>
        </FormLogin>
      </PageSingInRight>
    </PageSingIn>
  );
};

export default SignInScreen;
