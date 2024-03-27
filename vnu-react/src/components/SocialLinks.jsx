import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSocialLinksQuery } from '../services/api';

export default function SocialLinks() {
  const { data: socialLinksBlock } = useSocialLinksQuery();

  return (
    <div className="social-links_block">
      <Link
        target="_blank"
        to={`https://www.facebook.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.facebook?.value}`}
      >
        <Icon icon="entypo-social:facebook" />
      </Link>
      <Link
        target="_blank"
        to={`https://www.twitter.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.twitter?.value}`}
      >
        <Icon icon="ri:twitter-x-fill" />
      </Link>
      <Link
        target="_blank"
        to={`https://www.instagram.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.instagram?.value}`}
      >
        <Icon icon="mdi:instagram" />
      </Link>
      <Link
        target="_blank"
        to={`https://www.youtube.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.youtube?.value}`}
      >
        <Icon icon="grommet-icons:youtube" />
      </Link>
    </div>
  );
}
