import React, { Component } from 'react'
import ThumbnailCards from '../components/ThumbnailCards'

class Home extends Component {
  render() {
    return <ThumbnailCards dataPath='/product' />
  }
}

export default Home
