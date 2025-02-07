import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share'

const ShareComponent = ({ productTitle, productUrl }) => {
  const shareUrl =
    productUrl || (typeof window !== 'undefined' && window.location.href)

  return (
    <div className='flex gap-3'>
      <FacebookShareButton
        url={shareUrl}
        quote={`Check out this product: ${productTitle}`}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={`Check out this product: ${productTitle}`}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={`Check out this product: ${productTitle}`}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  )
}

export default ShareComponent
