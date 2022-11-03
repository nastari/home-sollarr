import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './form-style';

function SocialAuth() {
  const classes = useStyles();

//   <IconButton aria-label="FB" className={classes.margin} onClick={() => window.open('https://twitter.com/sollarcoin')} size="small">
//   <i className="ion-logo-twitter" />
// </IconButton>
// <IconButton aria-label="TW" className={classes.margin} onClick={() => window.open('https://www.facebook.com/sollarcoin')} size="small">
//   <i className="ion-logo-facebook" />
// </IconButton>
// <IconButton aria-label="IG" className={classes.margin} onClick={() => window.open('https://www.instagram.com/sollarcoin/')} size="small">
//   <i className="ion-logo-instagram" />
// </IconButton>
// <IconButton aria-label="LI" className={classes.margin} onClick={() => window.open('https://google.com')} size="small">
//   <i className="ion-logo-linkedin" />
// </IconButton>

  return (
    <div className={classes.socmedSideLogin}>
      <Button
        variant="contained"
        className={classes.naviBtn}
        type="button"
        size="large"
        onClick={() => window.open('https://facebook.com/sollarcoin')}
      >
        <i className="ion-logo-facebook" />
        Facebook
      </Button>
      <Button
        variant="contained"
        className={classes.blueBtn}
        type="button"
        size="large"
        onClick={() => window.open('https://www.twitter.com/sollarcoin')}
      >
        <i className="ion-logo-twitter" />
        Twitter
      </Button>
      <Button
        variant="contained"
        className={classes.redBtn}
        type="button"
        size="large"
        onClick={() => window.open('https://instagram.com/sollarcoin')}
      >
        <i className="ion-logo-instagram" />
        Instagram
      </Button>
    </div>
  );
}

export default SocialAuth;
