import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LangIcon from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import logo from '~/public/images/crypto-logo.png';
import brand from '~/public/text/brand';
import imgApi from '~/public/images/imgAPI';
import languageDetector from '../../lib/languageDetector';
import i18nextConfig from '../../next-i18next.config';
import useStyles from './footer-style';

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp;
      {brand.crypto.footerText}
    </Typography>
  );
}

const footer = {
  description: ['Privacidade', 'Termos de Uso', 'Condições'],
  link: ['#privacy-policy', '#terms-of-use', 'conditions'],
};

const news = [
  {
    text: 'Energia solar se torna a terceira maior fonte de energia do Brasil',
    img: imgApi.photo[5],
    url: 'https://g1.globo.com/jornal-da-globo/noticia/2022/07/20/energia-solar-se-torna-a-terceira-maior-fonte-da-matriz-eletrica-brasileira.ghtml'
  },
  {
    text: 'Futuro da sociedade envolverá criptomoedas para as mais diversas funções',
    img: imgApi.photo[6],
    url: 'https://exame.com/future-of-money/futuro-da-sociedade-envolvera-criptomoedas-para-as-mais-diversas-funcoes-diz-especialista/'
  },
  {
    text: 'Energia eólica deve quadruplicar no Brasil até o fim da década.',
    img: imgApi.photo[7],
    url: 'https://gazetadetoledo.com.br/energia-eolica-deve-quadruplicar-no-brasil-ate-o-fim-da-decada-dizem-fabricantes/'
  }
];

function Footer(props) {
  const [ctn, setCtn] = useState(null);
  const classes = useStyles();
  const { invert } = props;

  // Translation Function
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [values, setValues] = useState({
    lang: i18n.language
  });

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  }, []);

  function handleChange(event) {
    const lang = event.target.value;
    let href = router.asPath;
    let pName = router.pathname;
    Object.keys(router.query).forEach((k) => {
      if (k === 'locale') {
        pName = pName.replace(`[${k}]`, lang);
        return;
      }
      pName = pName.replace(`[${k}]`, router.query[k]);
    });
    if (lang) {
      href = pName;
    }

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: lang,
    }));

    router.push(href);
    languageDetector.cache(lang);
    if (lang === 'ar') {
      props.toggleDir('rtl');
    } else {
      props.toggleDir('ltr');
    }
  }

  return (
    <Container fixed component="footer">
      <div className={clsx(classes.footer, invert && classes.invert)}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <div className={classes.logo}>
              <img src={logo} alt="logo" style={{ borderRadius: 500 }} />
              <Typography variant="h6" color="textPrimary">
                {brand.crypto.projectName}
              </Typography>
            </div>
            <Typography color="textPrimary" className={classes.footerDesc} gutterBottom>
              {t('crypto-landing.banner_title')}
            </Typography>
            <div className={classes.quickLinks}>
              <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
                {t('crypto-landing.footer_link')}
              </Typography>
              <ul>
                {footer.description.map((item, index) => (
                  <li key={item}>
                    <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </Grid>
          <Grid item xs={12} md={4}>
            {news.map((item, index) => (
              <ButtonBase className={classes.blogItem} onClick={() => window.open(item.url, '_blank')} key={index.toString()}>
                <figure>
                  <img src={item.img} alt="thumb" />
                </figure>
                <div className={classes.listText}>
                  <Typography variant="button" className={classes.category}>
                    {t('crypto-landing.footer_news')}
                  </Typography>
                  <Typography display="block" component="span">{item.text}</Typography>
                </div>
              </ButtonBase>
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.socmed}>
              <IconButton aria-label="FB" className={classes.margin} onClick={() => window.open('https://twitter.com/sollarcoin')} size="small">
                <i className="ion-logo-twitter" />
              </IconButton>
              <IconButton aria-label="TW" className={classes.margin} onClick={() => window.open('https://www.facebook.com/sollarcoin')} size="small">
                <i className="ion-logo-facebook" />
              </IconButton>
              <IconButton aria-label="IG" className={classes.margin} onClick={() => window.open('https://www.instagram.com/sollarcoin/')} size="small">
                <i className="ion-logo-instagram" />
              </IconButton>
              <IconButton aria-label="LI" className={classes.margin} onClick={() => window.open('https://google.com')} size="small">
                <i className="ion-logo-linkedin" />
              </IconButton>
            </div>
            <Select
              value={values.lang}
              onChange={handleChange}
              MenuProps={{
                container: ctn
              }}
              startAdornment={(
                <InputAdornment className={classes.icon} position="start">
                  <LangIcon />
                </InputAdornment>
              )}
              className={classes.selectLang}
              classes={{
                selectMenu: classes.selectMenu
              }}
              input={<OutlinedInput labelWidth={200} name="lang" id="outlined-lang-simple" />}
            >
              {i18nextConfig.i18n.locales.map((locale) => (
                <MenuItem key={locale} value={locale}>{t(locale)}</MenuItem>
              ))}
            </Select>
            <Copyright />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

Footer.propTypes = {
  invert: PropTypes.bool,
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  invert: false,
  toggleDir: () => {},
};

export default Footer;
