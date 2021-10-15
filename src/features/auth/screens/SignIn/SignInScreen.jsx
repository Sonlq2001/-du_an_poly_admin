import React, { useEffect } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import {
  PageSingIn,
  PageSingInLeft,
  PageSingInRight,
  FormLogin,
} from './SignInScreen.styles';
import LogoFpt from './../../../../assets/images/logo.png';
import { getLinkSocialLogin } from './../../redux/auth.slice';

const SignInScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLinkSocialLogin());
  }, [dispatch]);

  const { linkSocial } = useSelector((state) => state.auth);
  return (
    <PageSingIn>
      <PageSingInLeft></PageSingInLeft>
      <PageSingInRight className="content">
        <FormLogin>
          <img src={LogoFpt} alt="" className="logo-from" />
          <p className="des-from">Cao đẳng thực hành Fpolytechnic</p>
          <a
            href="http://api.duanpoly.ml/api/login/google"
            className="button-form"
          >
            <span className="icon-form">
              <AiOutlineGoogle />
            </span>
            Google
          </a>
        </FormLogin>
      </PageSingInRight>
    </PageSingIn>
  );
};

export default SignInScreen;
