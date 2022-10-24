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
    title: 'Mão de obra qualificada',
    desc: 'Qualificar e gerar mão de obra qualificada é o grande legado que queremos deixar.',
    date: '2023'
  },
  {
    image: imgAPI.crypto[1],
    title: 'O futuro é verde',
    desc: 'Somos uma empresa preocupada com o meio ambiente e preservação ambiental.',
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
      </div>
    </div>
  );
}

export default Promotion;
