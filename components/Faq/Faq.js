import React from 'react';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import Parallax from '../Parallax/Hexagonal';
import Title from '../Title';
import useStyles from './faq-style';

const faqData = [
  {
    q: 'O que é um token?',
    a: 'Token é um resultado do processo de tokenização que consiste em transformar ativos físicos ou produtos financeiros tradicionais em ativos digitais. Sendo assim, facilita sua negociação entre pessoas e empresas e para oferecer novas soluções a diferentes negócios.'
  },
  {
    q: 'O que é Sollarcoin?',
    a: 'É justamente a tokenização de dois ativos baseados em commodities a Energia Elétrica e Créditos de Carbono(CO2). Com o token Sollarcoin, você será capaz de investir em um grande projeto que captará e venderá energia elétrica para industrias, empresas e até mesmo ao governo. Uma ótima oportunidade para investir.'
  },
  {
    q: 'Sollarcoin é confiável?',
    a: 'Sim, é totalmente confiável. Se trata de um ativo lastreado em commodities conforme resposta à pergunta anterior, além disso você terá posse do token e poderá vender em sua valorização.'
  },
  {
    q: 'Como compra a Sollarcoin?',
    a: 'Você será capaz de comprar pela plataforma Web3, totalmente segura em sua Wallet "Metamask", utilizando a BNB Chain(BNB). Para mais informações veja nosso guia de compra no menu "Comprar" do nosso site.'
  },
  {
    q: 'Posso vender minhas Sollarcoin?',
    a: 'Sim, de forma voluntária você poderá vender seus tokens conforme cronograma de fases. Mas devemos informar que se vender, poderá deixar de ter uma boa rentabilidade no decorrer do projeto.'
  },
  {
    q: 'Quando será construída a primeira usina?',
    a: 'Não podemos prometer datas, pois não depende apenas dos desenvolvedores. Também depende da comunidade. Vamos por etapas, começando pela aquisição do terreno.'
  },
  {
    q: 'Como será a transparência sobre os lucros obtidos pela usina quando estiver em operação?',
    a: 'Tudo será conduzido com a máxima transparência e seriedade. O projeto inclui a contratação de uma auditoria independente do grupo empresarial que auditará os resultados e emitirá relatórios públicos.'
  }
];

function Faq() {
  const classes = useStyles();
  const text = useText();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = React.useState(0);
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.parallax}>
        <Parallax />
      </div>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Title text={t('crypto-landing.faq_title')} align={isMobile ? 'center' : 'left'} />
            <Typography className={text.subtitle2} align={isMobile ? 'center' : 'left'} component="p">
              {t('crypto-landing.faq_subtitle')}
            </Typography>
            <Hidden smDown>
              <div className={classes.illustration}>
                <img src="/images/crypto/faq.png" alt="illustration" />
              </div>
            </Hidden>
          </Grid>
          <Grid item md={6}>
            <div className={classes.accordion}>
              {faqData.map((item, index) => (
                <div className={classes.item} key={index.toString()}>
                  <Accordion
                    classes={{
                      root: classes.paper
                    }}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary
                      classes={{
                        content: classes.content,
                        expanded: classes.expanded,
                      }}
                    >
                      <Typography className={classes.heading}>{item.q}</Typography>
                      <ExpandMoreIcon className={classes.icon} />
                    </AccordionSummary>
                    <AccordionDetails
                      classes={{
                        root: classes.detail,
                      }}
                    >
                      <Typography>
                        {item.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Faq;
