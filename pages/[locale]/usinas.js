import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import RegisterForm from '../../components/Forms/Register';

function Register() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Register
        </title>
      </Head>
      <div>
        <RegisterForm />
      </div>
    </Fragment>
  );
}

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default Register;
