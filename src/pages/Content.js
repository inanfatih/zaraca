import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import ReactPlayer from 'react-player'

//MUI
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

import 'react-image-lightbox/style.css'
//Pages
import { styles } from '../util/theme'
import '../App.css'
import loadingSipnner from '../layout/loadingSpinner'

//TODO: FOTOLAR VE VIDEOLAR ARASINDA GECIS ICIN KULLANILACAK: https://github.com/rcaferati/react-awesome-slider

//TODO:AWESOME SLIDER REFERANSLARI: https://caferati.me/demo/react-awesome-slider/scaling
//TODO: https://fullpage.caferati.me/

//TODO: Sayfalar arasinda gecis icin bunu kullan: https://github.com/rcaferati/ras-fullpage-strategies

const useStyles = makeStyles(styles)

export default function Content(props) {
  const [contentPage, setContent] = useState({})
  const [images, setImage] = useState([])
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const contentId = props.match.params.contentId

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/product/${contentId}`)
      .then(async (res) => {
        setContent(res.data)
        setImage(res.data.imageList)
      })
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [contentId])

  const markup = (
    <div>
      <Grow in timeout={500}>
        <div className={classes.imageContentBox}>
          <div style={{ background: 'white' }}>
            {/* {contentPage.videoUrl !== '' ? (
              <Card className={classes.mediaRoot} elevation={5}>
                <CardActionArea disableTouchRipple>
                  <div className='player-wrapper'>
                    <ReactPlayer
                      url={contentPage.videoUrl}
                      controls={true}
                      width='100%'
                      height='100%'
                      className='react-player'
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom style={{ fontSize: '2.5em' }}>
                      {contentPage.title}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                      {contentPage.subtitle}
                    </Typography>
                    <p className='with-newlines' style={{ fontSize: '1.2em' }}>
                      {contentPage.description}
                    </p>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <a
                    href={contentPage.etsyUrl}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <Button
                      style={{ backgroundColor: '#DE2548', color: 'white' }}
                      size='large'
                      color='primary'>
                      CLICK TO ORDER ON ETSY
                    </Button>
                  </a>
                </CardActions>

                <CardActionArea
                  style={{
                    cursor: 'default',
                  }}>
                  <CardMedia
                    borderRadius='0px'
                    component='img'
                    className={classes.cardMedia}
                    image={contentPage.mainImage}
                    title={contentPage.title}
                  />
                </CardActionArea>
              </Card>
            ) : ( */}
            <Card className={classes.mediaRoot} elevation={5}>
              <CardActionArea
                style={{
                  cursor: 'default',
                }}>
                <a
                  href={contentPage.etsyUrl}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <CardMedia
                    component='img'
                    className={classes.cardMedia}
                    image={
                      contentPage.mainImage === ''
                        ? contentPage.thumbnail
                        : contentPage.mainImage
                    }
                    title={contentPage.title}
                  />
                </a>
                <CardContent>
                  <Typography gutterBottom style={{ fontSize: '2.5em' }}>
                    {contentPage.title}
                  </Typography>
                  <Typography gutterBottom variant='h5'>
                    {contentPage.subtitle}
                  </Typography>
                  <p className='with-newlines' style={{ fontSize: '1.2em' }}>
                    {contentPage.description}
                  </p>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <a
                  href={contentPage.etsyUrl}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Button
                    style={{ backgroundColor: '#DE2548', color: 'white' }}
                    size='large'
                    color='primary'>
                    CLICK TO ORDER ON ETSY
                  </Button>
                </a>
              </CardActions>
            </Card>
            {/* )} */}
            {images.map(
              (imageLink, index) =>
                imageLink && (
                  <Card key={index} className={classes.mediaRoot}>
                    <a
                      href={contentPage.etsyUrl}
                      target='_blank'
                      rel='noopener noreferrer'>
                      <CardMedia
                        component='img'
                        className={classes.cardMedia}
                        image={imageLink}
                      />
                    </a>
                  </Card>
                ),
            )}
          </div>
        </div>
      </Grow>
    </div>
  )

  return loading ? loadingSipnner : markup
}
