import FooterInfoBlock from './FooterInfoBlock/FooterInfoBlock';
import FooterMenu from './FooterMenu/FooterMenu';
import FooterBottom from './FooterBottom/FooterBottom';
import './Footer.scss';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-top container">
        <FooterInfoBlock />
        <FooterMenu />
      </div>
      <FooterBottom />
    </div>
  );
}
