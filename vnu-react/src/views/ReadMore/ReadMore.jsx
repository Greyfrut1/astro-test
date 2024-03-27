import useLanguagePrefix from '../../services/languagePrefix';
import './ReadMore.scss';

export default function ReadMore({ link, img }) {
  const langPrefix = useLanguagePrefix();
  return (
    <a className="read-more" href={link}>
      {langPrefix === 'en' && <>Read more</>}
      {langPrefix === 'uk' && <>Детальніше</>}
      {img}
    </a>
  );
}
