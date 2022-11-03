/* eslint-disable react/jsx-props-no-multi-spaces */
import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ButtonBase from '@material-ui/core/ButtonBase';
import NextIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slider from 'react-animated-slider';
import { useTranslation } from 'next-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import useStyles from './promotion-style';
import imgAPI from '~/public/images/imgAPI';
import { useText } from '~/theme/common';

// const sliderData = [
//   {
//     image: imgAPI.crypto[0],
//     title: 'Missão',
//     desc: 'A SollarCoin é uma criptomoeda verde criada pelo Instituto Aprove para alavancar de forma ágil e eficiente a maneira de captação  financeira, para implantação de projetos de Fazendas de  produção de Energia Solar para distribuição direta e autoconsumo, e de preservação de áreas ambientais produzindo credito de carbono ,  na primeira fase no Brasil e depois no mundo.',
//     date: '2023'
//   },
//   {
//     image: imgAPI.crypto[1],
//     title: 'Segurança',
//     desc: 'A grande segurança da SollarCoin e que terá dois lastros financeiros reais em  commodities: Produção e comercialização da energia elétrica através do sistema  solar implantada pela SCP FAZENDAS SOLLAR. E a preservação de 45 mil hectares de bioma nativo através de RPPNs do projeto Matuto do Instituto Aprove.',
//     date: '2023'
//   },
//   {
//     image: imgAPI.crypto[2],
//     title: 'Geração de Energia',
//     desc: 'Capacidade para gerar 75MW de Energia limpa, que será comercializado pelas industrias parceiras e a comunidade.',
//     date: '2023'
//   },
//   {
//     image: imgAPI.crypto[3],
//     title: 'Mineração',
//     desc: 'Criação de 3 Centros para Mineração de criptomoedas.',
//     date: '2023'
//   }
// ];

const sliderData = [];

function Promotion() {
  const classes = useStyles();
  const { t } = useTranslation('common');

  const text = useText();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div
      className={classes.root}
    >
      <div
        // className={classes.sliderWrap}
        style={{
 display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'flex-start', marginBottom: '30vh', padding: isMobile ? '0px 12px' : '2vw 5vw'
}}
      >
        {/* <div style={{ padding: '5vh 0px' }}> */}

        <img style={{ width: isMobile ? '90vw' : '30vw', marginBottom: '12vh', borderRadius: '12px' }} src="/insta1.jpeg" alt="" />

        <div style={{
 display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: 'rgb(0, 0, 0, 0.2)', borderRadius: 12, alignItems: 'flex-start', padding: isMobile ? 0 : 40
}}
        >
          <Typography component="h5" className={text.title2}>
            Segurança
          </Typography>

          <Typography component="h5" style={{ padding: 10 }}>
            A grande segurança da SOLLARCOIN e que terá dois lastros financeiros reais em  commodities:
            <div style={{ marginBottom: 30 }} />
            <small>
              1) Produção e comercialização da energia elétrica através do sistema  solar implantada pela SCP FAZENDAS SOLLAR.
            </small>
            <div style={{ marginBottom: 10 }} />
            <small>     2) Preservação de 45 mil hectares de bioma nativo através de RPPNs do projeto Matuto do Instituto Aprove.</small>

            <div style={{ marginBottom: 30 }} />
            Todo processo feito através de um protocolo que otimiza a negociação de finanças descentralizadas, as DeFis em  plataformas de  smart  contracts em blockchain construída para facilitar a criação de aplicativos descentralizados (Apps).Trazendo  a escalabilidade do projeto.

            <div style={{ marginBottom: 10 }} />
            <small>
              FAZENDAS SOLLAR - SCP -> PRODUÇÃO DE  75MW DE ENERGIA LIMPA FOTOVOLTAICA, FATURAMENTO DE R$ 100.000.000,00

              <div style={{ marginBottom: 10 }} />
              TIR 22% , 20 ANOS DE EXPLORAÇÃO ⚡️☀️
            </small>
          </Typography>

        </div>
        {/* <Slider
          className="slider-wrapper"
          previousButton={(
            // <NextIcon />
            <div />
          )}

          nextButton={(
            // <NextIcon />
            <div />
          )}
        >
          {sliderData.map((item, index) => (
            <div className={clsx(classes.item, index % 2 === 1 ? classes.odd : classes.even)} key={index.toString()}>
              <Grid container>
                <Grid item xs={12} lg={4}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} lg={7}>
                  <Hidden mdDown>
                    <section>
                      <div className={classes.imgWrap}>
                        <figure style={{ zIndex: 10 }}>
                          <img
                            src={item.image}
                            style={{
 borderRadius: '50%', marginLeft: 20, width: 330, height: 330
}}
                            alt={item.title}
                          />
                        </figure>
                        <div className={classes.decoration}>
                          <svg>
                            <use xlinkHref="/images/crypto/deco-promo.svg#main" />
                          </svg>
                        </div>

                      </div>
                    </section>
                  </Hidden>
                  <Paper className={classes.paper}>
                    <Typography variant="h1">
                      <ButtonBase>
                        {item.title}
                      </ButtonBase>
                    </Typography>
                    <Typography component="p">
                      {item.desc}
                    </Typography>
                    <section className={classes.time}>
                      <Typography component="h6">
                        {t('crypto-landing.promo_periode')}

                        :&nbsp;
                        {item.date}
                      </Typography>
                    </section>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          ))}
        </Slider> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Promotion;
