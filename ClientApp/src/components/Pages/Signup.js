import { Fragment } from 'react';
import Stripes from '../Design/Stripes';
import SignupForm from '../Form/Signup-Form';

const Signup = () => {
  return (
    <Fragment>
      <SignupForm />
      <Stripes />
    </Fragment>
  );
};

export default Signup;
