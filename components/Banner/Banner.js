import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useText } from '~/theme/common';
import useStyles from './banner-style';

function Banner() {
  const classes = useStyles();
  const text = useText();
  const elem = useRef(null);

  const { t } = useTranslation('common');
  const theme = useTheme();

  const [hide, setHide] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleScroll = () => {
    if (!elem.current) {
      return;
    }
    const doc = document.documentElement;
    const elTop = elem.current.offsetTop - 200;
    const elBottom = elTop + elem.current.getBoundingClientRect().height;
    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (window.particlesJS !== 'undefined') {
      window.particlesJS('particles_background', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  const router = useRouter();
  return (
    <div className={classes.root} ref={elem}>
      <div className={classes.canvasWrap}>
        <div className={classes.overlay}>
          <div className={clsx(classes.decoInner, hide && classes.hide)}>
            <div id="particles_background" className={classes.particleBackground} />
          </div>
        </div>
      </div>
      <Container fixed>
        <div className={classes.bannerWrap}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={8}>
              <div className={classes.text}>
                <Typography variant="h4" className={text.title2}>
                  Garanta seu lugar ao Sol
                  {' '}
                  <br />
                  com SollarCoin!
                  {' '}
                  ????????????
                </Typography>
                <Typography component="p" className={text.subtitle2}>
                  {/* {t('crypto-landing.banner_subtitle')} */}
                  <small style={{ letterSpacing: 0.7, lineHeight: 1 }}>

                    Uma empresa que busca unir a
                    {' '}
                    <div style={{ display: 'inline', color: 'orange' }}>sustentabilidade e blockchain </div>
                    , implantando projetos de fazendas de produ????o de energia solar, assim preservando ??reas ambientais produzindo credito de carbono!

                    <div style={{ marginTop: 10 }} />
                    <div style={{ display: 'inline', color: 'orange' }}>
                      Assim nasceu o token SollarCoin! O futuro ?? agora!
                    </div>
                    {/*
                    <div style={{ display: 'inline', color: 'orange' }}>SollarCoin</div>
                    {' '}
                    ?? uma criptomoeda verde criada pelo Instituto Aprove para alavancar de forma ??gil e eficiente a maneira de capta????o financeira, para implanta????o de projetos de Fazendas de
                    {' '}
                    <div style={{ display: 'inline', color: 'orange' }}>produ????o de Energia Solar</div>
                    {' '}
                    para distribui????o direta e auto-consumo, e de preserva????o de ??reas ambientais produzindo credito de carbono, na primeira fase no Brasil e depois no mundo. */}
                  </small>

                </Typography>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="secondary" onClick={() => window.open('https://comprar.sollarcoin.com.br')} size="large" fullWidth={isMobile}>
                  {t('crypto-landing.banner_getstarted')}
                </Button>
                <Button variant="outlined" className={classes.invert} onClick={() => router.push('usinas')} size="large" fullWidth={isMobile}>
                  {t('crypto-landing.banner_viewmarket')}
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <figure className={classes.objectArt}>
                <img src="/images/crypto/banner-art.png" alt="illustration" />
              </figure>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className={classes.decoBottom}>
        <svg>
          <use xlinkHref="/images/crypto/deco-banner.svg#main" />
        </svg>
      </div>
    </div>
  );
}

export default Banner;
