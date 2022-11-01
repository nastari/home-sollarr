import React, { useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-slick';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import imgApi from '~/public/images/imgAPI';
import { useText } from '~/theme/common';
import Title from '../Title';
import TestiCard from '../Cards/Testimonial';
import useStyle from './testi-style';

const testiContent = [
  {
    text: 'SollarCoin é uma criptomoeda criada pelo instituto Aprove para alavancar de forma ágil e eficiente a maneira de capitacão financeira, para implantação de projetos das Fazendas de produção de Energia Solar para distribuição direta, na primeira fase no Brasil e depois no mundo.',
    name: 'John Doe',
    avatar: imgApi.avatar[6],
    title: 'Chief Digital Officer',
  },
  {
    text: 'A grande revolução do SollarCoin e que terá dois lastros financeiro, um real lastreado a produção e comercialização da energia solar implantada pelo financiamento das fazendas solares e créditos de carbono gerados. ',
    name: 'Jean Doe',
    avatar: imgApi.avatar[7],
    title: 'Chief Digital Officer',
  },
  {
    text: 'Segundamente, através do protocolo que otimiza a negociação de finanças descentralizadas, plataformas como Solana (SOL) que facilitam a criação de aplicativos trazendo escalabilidade ao projeto.',
    name: 'Jena Doe',
    avatar: imgApi.avatar[1],
    title: 'Graphic Designer',
  },
  {
    text: 'A primeira captação será de 450 milhoes de reais onde o valor por unidade será de R$ 0,30.',
    name: 'Jovelin Doe',
    avatar: imgApi.avatar[2],
    title: 'Senior Graphic Designer',
  },
  // {
  //   text: 'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
  //   name: 'Jihan Doe',
  //   avatar: imgApi.avatar[3],
  //   title: 'CEO Software House',
  // },
  // {
  //   text: 'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
  //   name: 'John Doe',
  //   avatar: imgApi.avatar[9],
  //   title: 'Senior Graphic Designer',
  // },
];

function Testimonials() {
  const slider = useRef(null);
  const classes = useStyle();
  const text = useText();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation('common');
  const [active, setActive] = useState(0);
  const [activeTransition, setActiveTransition] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 7000,
    afterChange: (current) => setActive(current),
    beforeChange: (current, next) => setActiveTransition(next),
  };

  const slideState = index => {
    if (index === activeTransition - 1 || index === active - 1) {
      return classes.past;
    }
    if (index === activeTransition + 1 || index === active + 1) {
      return classes.future;
    }
    if (index === activeTransition || index === active) {
      return classes.current;
    }
    return classes.slide;
  };

  return (
    <div className={classes.root}>
      <Container fixed={isDesktop}>
        <Title text="Funcionamento das Usinas" align="center" />
        <Typography className={text.subtitle2} align="center">
          {/* {t('crypto-landing.testi_subtitle')} */}
          Veja as etapas
        </Typography>
        <Grid container spacing={6}>
          <Grid item md={1} xs={12} />
          <Grid item md={10} xs={12}>
            <div className={classes.sliderWrap}>
              <div className={classes.carousel}>
                <button
                  type="button"
                  className={clsx(classes.nav, classes.prev)}
                  onClick={() => slider.current.slickPrev()}
                >
                  <i className="ion-ios-arrow-back" />
                </button>
                <Carousel ref={slider} {...settings}>
                  {testiContent.map((item, index) => (
                    <div key={index.toString()} className={clsx(classes.item, slideState(index))}>
                      <div className={classes.slideContent}>
                        <TestiCard
                          text={item.text}
                          name={item.name}
                          title={item.title}
                          avatar={item.avatar}
                          active={index === active}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
                <button
                  type="button"
                  className={clsx(classes.nav, classes.next)}
                  onClick={() => slider.current.slickNext()}
                >
                  <i className="ion-ios-arrow-forward" />
                </button>
              </div>
              <div className={classes.pagination}>
                <ul>
                  {[...Array(testiContent.length)].map((e, index) => (
                    <li
                      key={index.toString()}
                      className={index === active ? classes.active : ''}
                    >
                      <button type="button" onClick={() => slider.current.slickGoTo(index)}>&nbsp;</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Testimonials;
