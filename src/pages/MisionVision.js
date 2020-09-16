import React from 'react'

//MUI
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent'

//Pages
import { styles } from '../util/theme'
import '../App.css'

const useStyles = makeStyles(styles)

export default function TwoDThreeD(props) {
  //TODO: direct to home incase of not found content

  const classes = useStyles()

  //TODO: video oldugunda video gosterilecek sekilde degistir

  return (
    <div>
      <Grow in timeout={500}>
        <div className={classes.contactContentBox}>
          <Paper className={classes.contactContent} elevation={10}>
            <Card className={classes.contactRoot} elevation={5}>
              <CardContent style={{ justifyContent: 'center' }}>
                <Typography
                  variant='h4'
                  component='h2'
                  style={{
                    margin: '3% 2%',
                    width: '95%',
                  }}>
                  Mission
                </Typography>
                <div
                  style={{
                    margin: '3% 2%',
                    width: '95%',
                    padding: '15px 0 15px 5px',
                    border: '1px solid #202123',
                    borderRadius: '5px',
                  }}>
                  At Zaraca, we knead our limitless capability in visual arts
                  with digital media components in order to boost our clients’
                  visibility on social media platforms.
                </div>
              </CardContent>
            </Card>
            <br />
            <br />
            <Card className={classes.contactRoot} elevation={5}>
              <CardContent style={{ justifyContent: 'center' }}>
                <Typography
                  variant='h4'
                  component='h2'
                  style={{
                    margin: '3% 2%',
                    width: '95%',
                  }}>
                  Vision
                </Typography>
                <div
                  style={{
                    margin: '3% 2%',
                    width: '95%',
                    padding: '15px 0 15px 5px',
                    border: '1px solid #202123',
                    borderRadius: '5px',
                  }}>
                  We are preparing for a smart platform that will allow fully
                  automated visual content production and headless digital media
                  marketing.
                </div>
              </CardContent>
            </Card>
          </Paper>
        </div>
      </Grow>
    </div>
  )
}
