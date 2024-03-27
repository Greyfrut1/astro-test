import { useTopHeaderMenuQuery } from '../../services/api';
import './TopHeaderMenu.scss';

export default function TopHeaderMenu() {
  const { data } = useTopHeaderMenuQuery();
  return (
    <div className="second-menu">
      <ul>
        {data?.data?.map((item) => (
          <li key={item?.id}>
            <a href={item?.attributes?.url}>{item?.attributes?.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
