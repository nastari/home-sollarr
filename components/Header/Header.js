/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Settings from './Settings';
// import MarketPrice from './MarketPrice';
import MobileMenu from './MobileMenu';
import routeLink from '~/public/text/link';
import logo from '~/public/images/crypto-logo.png';
import useStyles from './header-style';
import navMenu from './menu';

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <AnchorLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function Header(props) {
  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = (scroll > 80);
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const {
    onToggleDark,
    onToggleDir,
    invert,
  } = props;
  const { t } = useTranslation('common');

  const router = useRouter();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuList] = useState([
    createData(navMenu[0], '#' + navMenu[0], 100),
    createData(navMenu[1], 'usinas'),
    createData(navMenu[2], '#' + navMenu[2]),
    // createData(navMenu[3], '#' + navMenu[3]),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <Fragment>
      { isMobile && (<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />) }
      {/* {!invert && (
        <Hidden mdDown>
          <MarketPrice />
        </Hidden>
      )} */}
      <AppBar
        component="header"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          fixed && classes.fixed,
          invert && classes.invert,
          openDrawer && classes.openDrawer
        )}
      >

        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav className={clsx(classes.navMenu, invert && classes.invert)}>
              { isMobile && (
                <IconButton
                  onClick={handleOpenDrawer}
                  className={clsx('hamburger hamburger--spin', classes.mobileMenu, openDrawer && 'is-active')}
                >
                  <span className="hamburger-box">
                    <span className={clsx(classes.bar, 'hamburger-inner')} />
                  </span>
                </IconButton>
              )}
              <div className={classes.logo}>
                {invert ? (
                  <a href={routeLink.crypto.home}>
                    <img src={logo} alt="logo" style={{ borderRadius: 500 }} />
                  </a>
                ) : (
                  <AnchorLink href="#home">
                    <img src={logo} alt="logo" style={{ borderRadius: 500 }} />
                  </AnchorLink>
                )}
              </div>
              {isDesktop && (
                <Scrollspy
                  items={navMenu}
                  currentClassName="active"
                >
                  {menuList.map(item => (
                    <>
                      {
                      item.url === 'usinas' ? (
                        <Button onClick={() => router.push('usinas')}>
                          {t('crypto-landing.header_' + item.name)}
                        </Button>
                      ) : (

                        <li key={item.id.toString()}>

                          {invert ? (
                          // eslint-disable-next-line
                          <Button offset={item.offset || 0} href={'/' + item.url}>
                            {t('crypto-landing.header_' + item.name)}
                          </Button>
                        ) : (
                          // eslint-disable-next-line
                          <Button component={AnchorLink} offset={item.offset || 0} href={item.url}>
                            {t('crypto-landing.header_' + item.name)}
                          </Button>
                        )}
                        </li>
                      )
                    }

                    </>

                  ))}
                  <li>
                    <Button href={routeLink.crypto.contact}>
                      {t('crypto-landing.header_contact')}
                    </Button>
                  </li>
                </Scrollspy>
              )}
            </nav>
            <Hidden mdDown>
              <Divider className={classes.divider} />
            </Hidden>
            <nav className={clsx(classes.navMenu, classes.navAuth)}>
              <Hidden xsDown>
                <Button href={routeLink.crypto.login}>
                  {/* {t('crypto-landing.header_login')} */}
                </Button>
                <Button href={routeLink.crypto.login}>
                  {/* {t('crypto-landing.header_login')} */}
                </Button>
                {/* <Button href={routeLink.crypto.register} variant="contained" color="secondary" className={classes.button}>
                  {t('crypto-landing.header_register')}
                </Button> */}
              </Hidden>
              {/* <Settings toggleDark={onToggleDark} toggleDir={onToggleDir} invert={invert} /> */}
            </nav>
          </div>
        </Container>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

Header.defaultProps = {
  sticky: false,
  invert: false
};

export default Header;
