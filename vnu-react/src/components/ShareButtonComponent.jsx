import React from 'react';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton } from 'react-share';
import { Icon } from '@iconify/react';

export default function ShareButtonComponent({ data }) {
  const shareUrl = `${window.location.origin}${data?.path?.[0]?.alias}`;
  const title = data?.title?.[0]?.value;

  return (
    <div className="share-link">
      <FacebookShareButton url={shareUrl} quote={title}>
        <Icon icon="entypo-social:facebook" />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <Icon icon="ri:twitter-x-fill" />
      </TwitterShareButton>
      <TelegramShareButton url={shareUrl} title={title}>
        <Icon icon="mingcute:send-plane-line" />
      </TelegramShareButton>
    </div>
  );
}
