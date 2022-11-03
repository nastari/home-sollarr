// import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import clsx from 'clsx';
// import Typography from '@material-ui/core/Typography';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Grid from '@material-ui/core/Grid';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import { useTranslation } from 'next-i18next';
// import routeLink from '~/public/text/link';
// import { useText } from '~/theme/common';
// import Checkbox from './Checkbox';
// import SocialAuth from './SocialAuth';
// import Title from '../Title/TitleSecondary';
// import AuthFrame from './AuthFrame';
// import useStyles from './form-style';

// function Register() {
//   const classes = useStyles();
//   const text = useText();
//   const { t } = useTranslation('common');
//   const [check, setCheck] = useState(false);
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   useEffect(() => {
//     ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
//       if (value !== values.password) {
//         return false;
//       }
//       return true;
//     });
//     ValidatorForm.addValidationRule('isTruthy', value => value);
//   });

//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const handleCheck = event => {
//     setCheck(event.target.checked);
//   };

//   const handleSubmit = () => {
//     console.log('data submited');
//   };

//   return (
//     <AuthFrame title={t('register_title')} subtitle={t('register_subtitle')}>
//       <div>
//         <div className={classes.head}>
//           <Title align="left">{t('register')}</Title>
//           <Button size="small" className={classes.buttonLink} href={routeLink.crypto.login}>
//             <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
//             {t('register_already')}
//           </Button>
//         </div>
//         <SocialAuth />
//         <div className={classes.separator}>
//           <Typography>{t('register_or')}</Typography>
//         </div>
//         <ValidatorForm
//           onError={errors => console.log(errors)}
//           onSubmit={handleSubmit}
//         >
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextValidator
//                 variant="filled"
//                 className={classes.input}
//                 label={t('register_name')}
//                 onChange={handleChange('name')}
//                 name="name"
//                 value={values.name}
//                 validators={['required']}
//                 errorMessages={['This field is required']}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextValidator
//                 variant="filled"
//                 className={classes.input}
//                 label={t('register_email')}
//                 onChange={handleChange('email')}
//                 name="email"
//                 value={values.email}
//                 validators={['required', 'isEmail']}
//                 errorMessages={['This field is required', 'Email is not valid']}
//               />
//             </Grid>
//             <Grid item md={6} xs={12}>
//               <TextValidator
//                 variant="filled"
//                 type="password"
//                 className={classes.input}
//                 label={t('register_password')}
//                 validators={['required']}
//                 onChange={handleChange('password')}
//                 errorMessages={['This field is required']}
//                 name="password"
//                 value={values.password}
//               />
//             </Grid>
//             <Grid item md={6} xs={12}>
//               <TextValidator
//                 variant="filled"
//                 type="password"
//                 className={classes.input}
//                 label={t('register_confirm')}
//                 validators={['isPasswordMatch', 'required']}
//                 errorMessages={['Password mismatch', 'This field is required']}
//                 onChange={handleChange('confirmPassword')}
//                 name="confirm"
//                 value={values.confirmPassword}
//               />
//             </Grid>
//           </Grid>
//           <div className={clsx(classes.btnArea, classes.flex)}>
//             <FormControlLabel
//               control={(
//                 <Checkbox
//                   validators={['isTruthy']}
//                   errorMessages="This field is required"
//                   checked={check}
//                   value={check}
//                   onChange={(e) => handleCheck(e)}
//                   color="primary"
//                 />
//               )}
//               label={(
//                 <span className={text.caption}>
//                   {t('form_terms')}
//                   &nbsp;
//                   <a href="#">
//                     {t('form_privacy')}
//                   </a>
//                 </span>
//               )}
//             />
//             <Button variant="contained" type="submit" color="secondary" size="large">
//               {t('continue')}
//             </Button>
//           </div>
//         </ValidatorForm>
//       </div>
//     </AuthFrame>
//   );
// }

// export default Register;

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'next-i18next';
import routeLink from '~/public/text/link';
import { useText } from '~/theme/common';
import Checkbox from './Checkbox';
import SocialAuth from './SocialAuth';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';

function Register() {
  const classes = useStyles();
  const text = useText();
  const { t } = useTranslation('common');
  const [check, setCheck] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== values.password) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isTruthy', value => value);
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleSubmit = () => {
    console.log('data submited');
  };

  return (
    <AuthFrame title={t('register_title')} subtitle={t('register_subtitle')}>
      <div>
        <div className={classes.head}>
          <Title align="left">{t('register')}</Title>
          {/* <Button size="small" className={classes.buttonLink} href={routeLink.crypto.login}>
            <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
            {t('register_already')}
          </Button> */}
        </div>
        <SocialAuth />
        <div className={classes.separator}>
          <Typography>Como SollarCoin funciona?</Typography>
        </div>

        <Typography>
          <div style={{ textAlign: 'justify' }}>
            A SOLLARCOIN é uma criptomoeda verde  criada pelo Instituto Aprove para alavancar de forma ágil e eficiente a maneira de captação  financeira, para implantação de projetos de Fazendas de  produção de Energia Solar para distribuição direta e autoconsumo, e de preservação de áreas ambientais produzindo credito de carbono ,  na primeira fase no Brasil e depois no mundo .
            {' '}
          </div>
          <div style={{ marginBottom: 20 }} />

          <div style={{ textAlign: 'justify' }}>
            A grande segurança da SOLLARCOIN e que terá dois lastros financeiros reais em  commodities:

          </div>
          <div style={{ marginBottom: 30 }} />

          <small>
            1) Produção e comercialização da energia elétrica através do sistema  solar implantada pela SCP FAZENDAS SOLLAR.
          </small>

          <div style={{ marginBottom: 10 }} />
          <small>
            2) Preservação de 45 mil hectares de bioma nativo através de RPPNs do projeto Matuto do Instituto Aprove.
          </small>
        </Typography>
      </div>
    </AuthFrame>
  );
}

export default Register;
