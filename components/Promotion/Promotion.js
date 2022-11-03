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
import useStyles from './promotion-style';
import imgAPI from '~/public/images/imgAPI';

const sliderData = [
  {
    image: imgAPI.crypto[0],
    title: 'Missão',
    desc: 'A SollarCoin é uma criptomoeda verde criada pelo Instituto Aprove para alavancar de forma ágil e eficiente a maneira de captação  financeira, para implantação de projetos de Fazendas de  produção de Energia Solar para distribuição direta e autoconsumo, e de preservação de áreas ambientais produzindo credito de carbono ,  na primeira fase no Brasil e depois no mundo.',
    date: '2023'
  },
  {
    image: imgAPI.crypto[1],
    title: 'Segurança',
    desc: 'A grande segurança da SollarCoin e que terá dois lastros financeiros reais em  commodities: Produção e comercialização da energia elétrica através do sistema  solar implantada pela SCP FAZENDAS SOLLAR. E a preservação de 45 mil hectares de bioma nativo através de RPPNs do projeto Matuto do Instituto Aprove.',
    date: '2023'
  },
  {
    image: imgAPI.crypto[2],
    title: 'Geração de Energia',
    desc: 'Capacidade para gerar 75MW de Energia limpa, que será comercializado pelas industrias parceiras e a comunidade.',
    date: '2023'
  },
  {
    image: imgAPI.crypto[3],
    title: 'Mineração',
    desc: 'Criação de 3 Centros para Mineração de criptomoedas.',
    date: '2023'
  }
];

function Promotion() {
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <div className={classes.root}>
      <div className={classes.sliderWrap}>
        {/* <div style={{ padding: '5vh 0px' }}> */}
        <Slider
          className="slider-wrapper"
          previousButton={(
            <NextIcon />
          )}
          nextButton={(
            <NextIcon />
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
        </Slider>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Promotion;
