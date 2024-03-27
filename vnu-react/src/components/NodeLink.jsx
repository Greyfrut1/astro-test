import PropTypes from 'prop-types';
import useDrupalData from '../services/api';
import useLanguagePrefix from '../services/languagePrefix';
import ReadMore from '../views/ReadMore/ReadMore';

// Functional component for rendering a link to a Drupal node based on its URL
export default function NodeLink({ url, className }) {
  // Destructuring values from the useDrupalData hook, fetching data for the specified URL
  const { data: nodeData, isLoading: isNodeLoading, error: nodeError } = useDrupalData(url);
  const langPrefix = useLanguagePrefix();

  // Rendering a link with the specified URL and link text
  return (
    <a className={className} href={`/${langPrefix}${nodeData?.data?.attributes?.path?.alias}`}>
      <ReadMore />
    </a>
  );
}

NodeLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};
