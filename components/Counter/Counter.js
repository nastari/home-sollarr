import React, { useState } from 'react';
import CountUp from 'react-countup';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'next-i18next';
import routeLink from '~/public/text/link';
import { useText } from '~/theme/common';
import useStyles from './counter-style';

function Counter() {
  const classes = useStyles();
  const text = useText();
  const { t } = useTranslation('common');
  const [play, setPlay] = useState(false);

  const countup = (val, isPlay) => (
    <span>
      {isPlay ? <CountUp end={val} /> : 0}
    </span>
  );

  const handlePlay = visible => {
    if (visible.inViewport) {
      setTimeout(() => { setPlay(true); }, 500);
    }
  };

  return (
    <div className={classes.counterWrap}>
      <Container maxWidth="md">
        <ScrollAnimation
          animateOnce
          animateIn="fadeIn"
          offset={10}
          afterAnimatedIn={handlePlay}
        >
          <Typography variant="h3" className={text.title}>
            {countup(3, play)}
            &nbsp;
            {countup(100, play)}
            &nbsp;
            {countup(530, play)}
          </Typography>
          <Typography component="p" className={text.subtitle}>
            {t('crypto-landing.footer_counter')}
          </Typography>
        </ScrollAnimation>
        <div className={classes.callAction}>
          <Typography variant="h4" gutterBottom className={text.subtitle}>
            {t('crypto-landing.footer_waiting')}
          </Typography>
          <Button variant="contained" onClick={() => window.open('https://comprar.sollarcoin.com.br')} color="secondary" size="large" className={classes.button}>
            {/* {t('crypto-landing.getstarted')} */}
            Investir
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Counter;
