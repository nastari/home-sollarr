import React, { useState } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'next-i18next';
import { Button } from '@material-ui/core';
import { useText } from '~/theme/common';
import Title from '../Title';
import useStyles from './feature-style';

const coinData = [
  {
    name: 'Empresa',
    logo: '/images/crypto/btc.png',
    progress: 7.5,
    color: '#54b175'
  },
  {
    name: 'Airdrop',
    logo: '/images/crypto/dash.png',
    progress: 10,
    color: '#2bad47'
  },
  {
    name: 'Inovação',
    logo: '/images/crypto/nan.png',
    progress: 2.5,
    color: '#3cb35e'
  },
  {
    name: 'ICO',
    logo: '/images/crypto/mnr.png',
    progress: 80,
    color: '#2c9c39'
  },
  // {
  //   name: 'IOT',
  //   logo: '/images/crypto/iot.png',
  //   progress: 80,
  //   color: '#CE07D4'
  // }
];

function MoreFeature() {
  const classes = useStyles();
  const text = useText();
  const [play, setPlay] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');

  const themeProgress = color => createTheme({
    palette: {
      primary: {
        main: color
      }
    }
  });

  const handlePlay = visible => {
    if (visible.inViewport) {
      setTimeout(() => { setPlay(true); }, 500);
    }
  };

  return (
    <div className={classes.moreFeature}>
      <Container fixed={isDesktop}>
        <div className={classes.item}>
          <Grid container spacing={6} alignItems="center">
            <Grid item md={6} xs={12}>
              <div className={clsx(classes.text, isMobile && classes.center)}>
                <span className="ion-ios-lock-outline" />
                <Title text={t('crypto-landing.morefeature_title1')} align={isMobile ? 'center' : 'left'} />
                <Typography className={text.subtitle2} display="block" align={isMobile ? 'center' : 'left'}>
                  {t('crypto-landing.morefeature_subtitle1')}
                </Typography>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <ScrollAnimation
                animateOnce
                animateIn="fadeInLeftShort"
                delay={300}
                duration={0.3}
              >
                <figure className={classes.illustration}>
                  <img src="/images/ico.svg" alt="feature" />
                </figure>
              </ScrollAnimation>
            </Grid>
          </Grid>
        </div>
        <div className={classes.item}>
          <Grid
            container
            direction={isMobile ? 'column-reverse' : 'row'}
            spacing={6}
            alignItems="center"
          >
            <Grid item md={6} xs={12}>
              <ScrollAnimation
                animateOnce
                animateIn="fadeInRightShort"
                offset={-100}
                delay={300}
                duration={0.3}
              >
                <figure className={classes.illustration}>
                  <img src="/images/crypto/illustration2.png" alt="feature" />
                </figure>
              </ScrollAnimation>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={clsx(classes.text, isMobile && classes.center)}>
                <span className="ion-ios-analytics-outline" />
                <Title text={t('crypto-landing.morefeature_title2')} align={isMobile ? 'center' : 'left'} />
                <Typography className={text.subtitle2} display="block" align={isMobile ? 'center' : 'left'}>
                  {t('crypto-landing.morefeature_subtitle2')}
                </Typography>

                <Button style={{ marginTop: isMobile ? '2vh' : '5vh' }} variant="contained" color="secondary" size="large" fullWidth={isMobile} onClick={() => window.open('https://globebank.io', '_blank')}>Depositar SLLC</Button>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={classes.item}>
          <Grid container>
            <Grid item sm={12}>
              <div className={clsx(classes.text, classes.center)}>
                <span className="ion-ios-flash-outline" />
                <Title className={text.subtitle2} text="Tokenomics" align="center" />
                <Typography display="block" align="center" className={text.subtitle2}>
                  <small>
                    O token Sollarcoin é um token deflacionário que surge como uma porta de entrada para que pessoas comuns ou investidores possam obter lucro expondo-se ao fabuloso mercado ascendente de geração de energia limpa e obter desconto na “conta de luz”.
                    O lançamento do token Sollarcoin será feito em etapas rápidas, cada etapa com seu respectivo preço.
                  </small>
                </Typography>
              </div>

            </Grid>
          </Grid>
        </div>

        <div className={classes.item}>
          <Grid container>
            <Grid item sm={12}>
              <div className={clsx(classes.text, classes.center)}>
                <span className="ion-ios-flash-outline" />
                <Title className={text.subtitle2} text={t('crypto-landing.morefeature_title3')} align="center" />
                <Typography display="block" align="center" className={text.subtitle2}>
                  {t('crypto-landing.morefeature_subtitle3')}
                </Typography>
              </div>
              <Container maxWidth="md">
                <ScrollAnimation
                  animateOnce
                  animateIn="fadeIn"
                  offset={-100}
                  duration={1}
                  afterAnimatedIn={handlePlay}
                >
                  <ul className={classes.progressWrap}>
                    {coinData.map((item, index) => (
                      <li key={index.toString()}>
                        <div className={classes.coin}>
                          {/* <Avatar className={classes.logo} src={item.logo} alt={item.name} /> */}
                          <Typography variant="h5">
                            {item.name}
                          </Typography>
                        </div>
                        <div className={classes.progress} style={{ marginLeft: 20 }}>
                          <div className={classes.unit}>
                            <Typography style={{ marginLeft: 5 }} variant="h6">

                              {item.progress}
                              {' '}
                              %
                            </Typography>
                            <Typography variant="p">
                              { 22_500_000_000 * item.progress}
                              {' '}
                              SLLC
                            </Typography>
                          </div>
                          <ThemeProvider theme={themeProgress(item.color)}>
                            <LinearProgress
                              variant="determinate"
                              value={play ? item.progress : 0}
                              classes={{
                                root: classes.track,
                                bar: classes.bar
                              }}
                            />
                          </ThemeProvider>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollAnimation>
              </Container>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default MoreFeature;
