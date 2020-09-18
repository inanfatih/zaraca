import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'

//MUI stuff
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import BackupIcon from '@material-ui/icons/Backup'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { styles } from '../util/theme'
import '../App.css'
import IsAuthenticated from '../util/IsAuthenticated'

import DeleteContentData from '../util/DeleteContentData'

import firebase, { firebaseConfig } from '../firebase/firebase'

const useStyles = makeStyles(styles)

const CreateContent = (props) => {
  if (!IsAuthenticated()) {
    props.history.push('/login')
  }
  const classes = useStyles()

  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    type: 1,
    description: '',
    thumbnail: {},
    mainImage: '',
    imageList: [],
    videoUrl: '',
    etsyUrl: '',
    orderNo: 0,
  })

  const [imageList, setImageList] = useState([''])

  const [validators, setValidators] = useState({
    errors: {},
    loading: false,
    isSuccessfull: false,
    isFailed: false,
  })

  const {
    title,
    subtitle,
    type,
    description,
    thumbnail,
    mainImage,
    videoUrl,
    etsyUrl,
    orderNo,
  } = content

  const { errors, loading, isSuccessfull, isFailed } = validators

  const [contentId, setContentId] = useState('')

  const imageUploader = async (file, uploadType, index, contentIdReturned) => {
    // let reader = new FileReader();
    // let file = event.target.files[0];
    let fileName = ''
    let fileExtension = file.name.split('.')[file.name.split('.').length - 1]
    if (uploadType === 'imageList') {
      fileName = 'imageList' + index
    } else {
      fileName = uploadType
    }
    // Create a root reference

    var storageRef = firebase.storage().ref()
    console.log(
      'filepath, filename and extension',
      `${contentIdReturned}/${fileName}`,
    )
    // Create a reference to 'images/mountains.jpg'
    var imageRef = storageRef.child(
      `${contentIdReturned}/${fileName}.${fileExtension}`,
    )

    return await imageRef.put(file).then((snapshot) => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${contentIdReturned}%2F${fileName}.${fileExtension}?alt=media`
      console.log('Uploaded a blob or file!', snapshot)
      console.log('imageUrl', imageUrl)

      postContentLinks(
        contentIdReturned,
        uploadType,
        fileName,
        fileExtension,
        index,
      )
      return contentIdReturned
    })
  }

  const uploadThumbnail = (event) => {
    const image = event.target.files[0]

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setContent({ ...content, thumbnail: { image: image } })
    } else {
      window.alert('Please select images only in jpg, jpeg or png extensions')
      document.getElementById('thumbnailInput').value = null
    }
  }

  const uploadMainImage = (event) => {
    const image = event.target.files[0]

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setContent({ ...content, mainImage: { image: image } })
    } else {
      window.alert('Please select images only in jpg, jpeg or png extensions')
      document.getElementById('mainImageInput').value = null
    }
  }

  const uploadImageList = (event, index) => {
    const image = event.target.files[0]

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setImageList([
        ...imageList.slice(0, index),
        image,
        ...imageList.slice(index + 1),
      ])
    } else {
      window.alert('Please select images with only jpg, jpeg or png formats')
      document.getElementById(`imageListInput${index}`).value = null
    }
  }

  const failContentUpload = (err) => {
    DeleteContentData(contentId)
    setValidators({
      ...validators,
      loading: false,
      errors: err,
      isSuccessfull: false,
      isFailed: false,
    })
    console.log('fail content upload', err)
  }

  // app.post('/image/:contentId/:imageType/:imageFileName/:imageExtension/:index',
  const postContentLinks = async (
    contentId,
    imageType,
    imageFileName,
    imageExtension,
    index,
  ) => {
    try {
      const res = await axios.post(
        `/image/${contentId}/${imageType}/${imageFileName}/${imageExtension}/${index}`,
      )
      console.log('content link for ' + imageType + ' updated', res)
      return res
    } catch (err) {
      console.log(
        'content link for ' + imageType + ' could not be updated',
        err,
      )
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!thumbnail.image) {
      window.alert('Please select a Thumbnail image')
    } else if (IsAuthenticated()) {
      setValidators({
        ...validators,
        loading: true,
      })

      axios
        .post('/product', content)
        .then((res) => {
          setContentId(res.data.content.contentId)
          return res.data.content.contentId
        })
        .then((contentIdReturned) => {
          try {
            return imageUploader(
              thumbnail.image,
              'thumbnail',
              0,
              contentIdReturned,
            )
          } catch (error) {
            console.log('error in thumbnail upload', error)
            setValidators({
              ...validators,
              isFailed: true,
            })
          }
        })
        .then((contentIdReturned) => {
          if (mainImage.image) {
            try {
              return imageUploader(
                mainImage.image,
                'mainImage',
                0,
                contentIdReturned,
              )
            } catch (error) {
              console.log('error in main Image upload', error)
              return setValidators({
                ...validators,
                isFailed: true,
              })
            }
          }
        })
        .then((contentIdReturned) => {
          for (const key in imageList) {
            if (imageList[key] !== '') {
              try {
                imageUploader(
                  imageList[key],
                  'imageList',
                  key,
                  contentIdReturned,
                )
              } catch (error) {
                console.log('error in imageList upload', error)
                setValidators({
                  ...validators,
                  isFailed: true,
                })
              }
            }
          }
          return contentIdReturned
        })
        .then(() => {
          setValidators({
            ...validators,
            loading: false,
            isSuccessfull: !isFailed,
          })

          console.log('submit successfull')
        })
        .catch((err) => {
          setValidators({
            ...validators,
            loading: false,
            isSuccessfull: !isFailed,
          })
          console.log('submit failed')

          return failContentUpload(err)
        })
    } else {
      window.alert('Session expired. Login again')
    }
  }
  useEffect(() => {}, [content, imageList])

  const clearForm = () => {
    setContent({
      ...content,
      title: '',
      subtitle: '',
      type: 1,
      description: '',
      thumbnail: {},
      mainImage: '',
      imageList: [],
      videoUrl: '',
      etsyUrl: '',
      orderNo: 0,
    })
    setImageList([''])

    setValidators({
      ...validators,
      errors: {},
      loading: false,
      isSuccessfull: false,
      isFailed: false,
    })
    setContentId('')

    if (!!document.getElementById('thumbnailInput'))
      document.getElementById('thumbnailInput').value = null
    if (!!document.getElementById('mainImageInput'))
      document.getElementById('mainImageInput').value = null
    if (!!document.getElementById('imageListInput0'))
      document.getElementById('imageListInput0').value = null
  }

  const logout = () => {
    localStorage.removeItem('ZaracaToken')
    delete axios.defaults.headers.common['Authorization']
  }

  const removeFromImageList = (index) => {
    setImageList([...imageList.slice(0, index), ...imageList.slice(index + 1)])
  }

  const addToImageList = () => {
    setImageList([...imageList, ''])
  }
  const onInput = (e) => {
    if (e.target.name === 'type' || e.target.name === 'orderNo') {
      setContent({
        ...content,
        [e.target.name]: Number(e.target.value),
      })
    } else {
      setContent({
        ...content,
        [e.target.name]: e.target.value,
      })
    }
  }

  return (
    <div>
      <Grow in timeout={500}>
        <div className={classes.contactContentBox}>
          <Paper className={classes.contactContent} elevation={10}>
            <Card elevation={5}>
              <CardContent
                style={{
                  justifyContent: 'center',
                }}>
                <form onSubmit={handleSubmit} className={classes.contactForm}>
                  <Typography
                    variant='h4'
                    component='h2'
                    style={{
                      marginBottom: '1%',
                      marginLeft: '2%',
                      width: '95%',
                    }}>
                    Create Product
                  </Typography>
                  <TextField
                    id='title'
                    name='title'
                    label='Title'
                    variant='outlined'
                    helperText={errors.title}
                    error={errors.title ? true : false}
                    value={title}
                    required
                    onInput={onInput}
                    fullWidth
                  />
                  <TextField
                    id='subtitle'
                    name='subtitle'
                    label='Subtitle'
                    variant='outlined'
                    required
                    helperText={errors.subtitle}
                    error={errors.subtitle ? true : false}
                    value={subtitle}
                    onChange={onInput}
                    fullWidth
                  />
                  <TextField
                    id='outlined-multiline-static'
                    name='description'
                    label='Description'
                    variant='outlined'
                    required
                    multiline
                    rows={4}
                    helperText={errors.description}
                    error={errors.description ? true : false}
                    value={description}
                    onChange={onInput}
                    fullWidth
                  />
                  <TextField
                    id='orderNo'
                    name='orderNo'
                    label='Display Priority'
                    type='number'
                    required
                    variant='outlined'
                    error={errors.orderNo ? true : false}
                    helperText="Products will be sorted by the Displaying priority. Higher number means higher priority. When the priority matches another product's priority, the product created later will have higher priority."
                    value={orderNo}
                    onChange={onInput}
                    fullWidth
                  />
                  <div
                    style={{
                      marginBottom: '2%',
                      marginLeft: '2%',
                      marginTop: '2%',
                      width: '95%',
                      border: '1px solid #C4C4C4',
                      borderRadius: '4px',
                    }}>
                    <FormControl
                      component='fieldset'
                      style={{
                        marginBottom: '2%',
                        marginLeft: '2%',
                        marginTop: '2%',
                        width: '95%',
                      }}>
                      <FormLabel component='legend'>Content Type</FormLabel>
                      <RadioGroup
                        aria-label='contentType'
                        name='type'
                        value={type}
                        onChange={onInput}>
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label='Apple Watch Band'
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label='Apple Airpod Case'
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {/* <TextField
                    id='videoUrl'
                    name='videoUrl'
                    label='Video Url'
                    variant='outlined'
                    helperText={errors.videoUrl}
                    error={errors.videoUrl ? true : false}
                    value={videoUrl}
                    onChange={onInput}
                    fullWidth
                  /> */}
                  <TextField
                    id='etsyUrl'
                    name='etsyUrl'
                    label='Etsy Url'
                    variant='outlined'
                    helperText={errors.etsyUrl}
                    error={errors.etsyUrl ? true : false}
                    value={etsyUrl}
                    onChange={onInput}
                    fullWidth
                  />
                  <div
                    style={{
                      margin: '3% 2%',
                      width: '91%',
                      border: '1px solid #C4C4C4',
                      borderRadius: '4px',
                      padding: '2%',
                      color: 'grey',
                    }}>
                    <div
                      style={{
                        marginBottom: '1%',
                      }}>
                      Upload Thumbnail Image to be used in the home page
                    </div>

                    <div
                      style={{
                        marginBottom: '1%',
                      }}>
                      <Button variant='contained' component='label'>
                        <BackupIcon style={{ marginRight: '1rem' }} />

                        <input
                          id='thumbnailInput'
                          type='file'
                          accept='image/*'
                          style={{ display: 'none' }}
                          onChange={uploadThumbnail}
                        />

                        <p>
                          {Object.keys(thumbnail).length !== 0
                            ? thumbnail.image.name
                            : '***Select Image***'}
                        </p>
                      </Button>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: '3% 2%',
                      width: '91%',
                      border: '1px solid #C4C4C4',
                      borderRadius: '4px',
                      padding: '2%',
                      color: 'grey',
                    }}>
                    <div
                      style={{
                        marginBottom: '1%',
                      }}>
                      Upload Main Image (The image to be displayed on the top in
                      the product page or under the video)
                    </div>

                    <div
                      style={{
                        marginBottom: '1%',
                      }}>
                      <Button variant='contained' component='label'>
                        <BackupIcon style={{ marginRight: '1rem' }} />

                        <input
                          id='mainImageInput'
                          type='file'
                          style={{ display: 'none' }}
                          accept='image/*'
                          onChange={uploadMainImage}
                        />
                        <p>
                          {Object.keys(mainImage).length !== 0
                            ? mainImage.image.name
                            : '***Select Image***'}
                        </p>
                      </Button>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: '3% 2%',
                      width: '91%',
                      border: '1px solid #C4C4C4',
                      borderRadius: '4px',
                      padding: '2%',
                      color: 'grey',
                    }}>
                    <div
                      style={{
                        marginBottom: '1%',
                      }}>
                      Upload additional images. These images will be displayed
                      under the main image
                    </div>
                    {imageList.map((item, index) => (
                      <div
                        style={{
                          marginBottom: '1%',
                        }}
                        key={index}>
                        <Button variant='contained' component='label'>
                          <BackupIcon style={{ marginRight: '1rem' }} />
                          <input
                            id={`imageListInput${index}`}
                            type='file'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={(event) => {
                              uploadImageList(event, index)
                            }}
                          />
                          <p>
                            {imageList[index]
                              ? imageList[index].name
                              : '***Select Image***'}
                          </p>
                        </Button>
                        <Button>
                          <RemoveCircleIcon
                            onClick={() => removeFromImageList(index)}
                          />
                        </Button>
                      </div>
                    ))}

                    <Button onClick={addToImageList}>
                      Add more images <AddCircleIcon />
                    </Button>
                  </div>
                  <Button
                    size='large'
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{
                      margin: '2%',
                      width: '95%',
                      padding: '1%',
                    }}
                    disabled={!loading && (isSuccessfull || isFailed)}>
                    {loading ? (
                      <CircularProgress
                        color='secondary'
                        size={30}></CircularProgress>
                    ) : (
                      'Create Product'
                    )}
                  </Button>
                  <Button
                    size='large'
                    variant='contained'
                    color='secondary'
                    style={{ margin: '1% 2%', width: '95%', padding: '1%' }}
                    component={Link}
                    to='/'
                    onClick={logout}>
                    Logout
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Paper>
        </div>
      </Grow>
      <Dialog
        open={loading || isSuccessfull || isFailed}
        keepMounted
        onClose={() => {
          setValidators({
            ...validators,
            isSuccessfull: false,
            isFailed: false,
            loading: false,
          })
        }}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>
          {!isSuccessfull && !isFailed
            ? 'Uploading product images - Please wait'
            : isFailed
            ? 'Failed'
            : 'Successful'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {!isSuccessfull && !isFailed ? (
              <CircularProgress
                color='secondary'
                size={50}
                style={{ display: 'block', margin: 'auto' }}
              />
            ) : isFailed ? (
              `Failed - Try again ${contentId}`
            ) : (
              `Good job!!! Product is created with Product ID:  ${contentId}`
            )}
          </DialogContentText>
        </DialogContent>
        {(isSuccessfull || isFailed) && (
          <DialogActions>
            <Button onClick={clearForm} color='primary'>
              Dismiss
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  )
}

export default CreateContent
