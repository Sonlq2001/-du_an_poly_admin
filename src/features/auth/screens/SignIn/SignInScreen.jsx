import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';

import {
  PageSingIn,
  PageSingInLeft,
  PageSingInRight,
  FormLogin,
} from './SignInScreen.styles';
import LogoFpt from 'assets/images/logo.png';
import { postAccessToken } from './../../redux/auth.slice';
import useRedirectAfterLogin from './../../hooks/useRedirectAfterLogin';
import ElementSelect from 'components/FormElements/ElementSelect/ElementSelect';
// import { getCampuses } from './../../redux/auth.slice';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useRedirectAfterLogin();

  // useEffect(() => {
  //   dispatch(getCampuses());
  // }, [dispatch]);

  // const { listCampus } = useSelector((state) => ({
  //   listCampus: state.auth.listCampus,
  // }));

  // console.log(listCampus);

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
          <Formik>
            {() => {
              return (
                <Form>
                  <ElementSelect
                    name="campus_code"
                    options={[]}
                    placeholder="Lựa chọn cở sở"
                  />
                  <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    render={(renderProps) => {
                      console.log(renderProps);
                      return (
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
                      );
                    }}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </Form>
              );
            }}
          </Formik>
        </FormLogin>
      </PageSingInRight>
    </PageSingIn>
  );
};

export default SignInScreen;
