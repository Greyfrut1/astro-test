import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useMetaTagsQuery, useSiteInfoQuery } from '../../services/api';

export default function MetaTags({ type, data, viewUrl }) {
  const frontUrl = import.meta.env.VITE_FRONTEND_URL;
  const { data: metaTagBlock } = useMetaTagsQuery();
  const { data: siteInfo } = useSiteInfoQuery();
  const description = data?.field_description?.[0]?.summary;
  const metaTitle = data?.title?.[0]?.value;
  const nodeUrl = `${frontUrl}${data?.path?.[0]?.langcode}${data?.path?.[0]?.alias}`;
  const keywords = metaTagBlock?.data?.attributes?.tags?.keywords;
  const viewTitle = data?.meta?.title;
  return (
    <Helmet>
      {type === 'view' && viewTitle && siteInfo && (
        <title>{`${viewTitle} | ${siteInfo.name}`}</title>
      )}

      {type === 'content' && metaTitle && siteInfo && (
        <title>{`${metaTitle} | ${siteInfo.name}`}</title>
      )}

      {type !== 'view' && type !== 'content' && siteInfo && (
        <title>{`${siteInfo.name} | ${siteInfo.slogan}`}</title>
      )}

      {description && type === 'content' && <meta name="description" content={description} />}

      {type === 'front' && frontUrl && <link rel="shortlink" href={frontUrl} />}
      {type === 'front' && frontUrl && keywords && <meta name="keywords" content={keywords} />}

      {type === 'content' && <link rel="canonical" href={nodeUrl} />}
      {frontUrl && type === 'front' && <link rel="canonical" href={frontUrl} />}
      {frontUrl && type === 'view' && viewUrl && (
        <link rel="canonical" href={`${frontUrl}${viewUrl}`} />
      )}
    </Helmet>
  );
}

MetaTags.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string,
          }),
        ),
        field_metatags_image: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          }),
        ),
        field_image: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          }),
        ),
        field_description: PropTypes.arrayOf(
          PropTypes.shape({
            summary: PropTypes.string,
          }),
        ),
        path: PropTypes.arrayOf(
          PropTypes.shape({
            langcode: PropTypes.string,
            alias: PropTypes.string,
          }),
        ),
      }),
    ),
  ]),
  viewUrl: PropTypes.string,
};
