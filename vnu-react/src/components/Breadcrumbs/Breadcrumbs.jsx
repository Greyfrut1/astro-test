import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { useContext } from 'react';
import { AliasContext } from '../../context/alias';
import homepage from '../../assets/homepage.png';
import './Breadcrumbs.scss';

// define custom breadcrumbs for certain routes.
// breadcrumbs can be components or strings.
// const langPrefix = useLanguagePrefix()
const hompageBreadCrumb = () => <img src={homepage} alt="homepage" />;
const routes = (alias) => [
  { path: '/uk/photoalbums', breadcrumb: 'Фотоальбоми' },
  { path: '/en/photoalbums', breadcrumb: 'Photo albums' },
  { path: '/:lang/photoalbums/:alias', breadcrumb: alias },

  { path: '/uk/infrastructure', breadcrumb: 'Інфраструктура' },
  { path: '/en/infrastructure', breadcrumb: 'Infrastructure' },
  { path: '/:lang/infrastructure/:alias', breadcrumb: alias },

  { path: '/uk/rectorate', breadcrumb: 'Ректорат' },
  { path: '/en/rectorate', breadcrumb: 'Rectorate' },

  { path: '/uk/academic-council', breadcrumb: 'Вчена рада' },
  { path: '/en/academic-council', breadcrumb: 'Academic council' },

  { path: '/uk/staff', breadcrumb: 'Персонал' },
  { path: '/en/staff', breadcrumb: 'Staff' },
  { path: '/:lang/staff/:alias', breadcrumb: alias },

  { path: '/uk/museums', breadcrumb: 'Музеї' },
  { path: '/en/museums', breadcrumb: 'Museums' },

  { path: '/uk/units', breadcrumb: 'Підрозділи' },
  { path: '/en/units', breadcrumb: 'Units' },

  {
    path: '/uk/branches-and-representative-offices',
    breadcrumb: 'Філії, центри та представництва',
  },
  {
    path: '/en/branches-and-representative-offices',
    breadcrumb: 'Branches and representative offices',
  },
  { path: '/:lang/branches-and-representative-offices/:alias', breadcrumb: alias },

  { path: '/:lang/general-information/:alias', breadcrumb: alias },
  { path: '/:lang/units/:alias', breadcrumb: alias },
  { path: '/:lang/museums/:alias', breadcrumb: alias },

  { path: '/uk/public-information', breadcrumb: 'Публічна інформація' },
  { path: '/en/public-information', breadcrumb: 'Public Information' },

  { path: '/en/departments', breadcrumb: 'Departments' },
  { path: '/uk/departments', breadcrumb: 'Кафедри' },
  { path: '/:lang/departments/:alias', breadcrumb: alias },

  { path: '/en/faculties', breadcrumb: 'Faculties' },
  { path: '/uk/faculties', breadcrumb: 'Факультети' },
  { path: '/:lang/faculties/:alias', breadcrumb: alias },

  { path: '/uk/ensembles', breadcrumb: 'Творчі колективи' },
  { path: '/en/ensembles', breadcrumb: 'Ensembles' },
  { path: '/:lang/ensembles/:alias', breadcrumb: alias },

  { path: '/en/university-rating', breadcrumb: 'University rating' },
  { path: '/uk/university-rating', breadcrumb: 'Університет у рейтингах' },

  {
    path: '/en/all-educations',
    breadcrumb: 'Catalog of educational programs and elective courses',
  },
  { path: '/uk/all-educations', breadcrumb: 'Каталог освітніх програм та вибіркових дисциплін' },
  {
    path: '/en/educational-programs',
    breadcrumb: 'Catalog of educational programs and elective courses',
  },
  {
    path: '/uk/educational-programs',
    breadcrumb: 'Каталог освітніх програм та вибіркових дисциплін',
  },
  { path: '/:lang/educational-programs/:alias', breadcrumb: alias },

  { path: '/en/news', breadcrumb: 'News' },
  { path: '/uk/news', breadcrumb: 'Новини' },
  { path: '/:lang/news/:alias', breadcrumb: alias },

  { path: '/en/events', breadcrumb: 'Events' },
  { path: '/uk/events', breadcrumb: 'Події' },
  { path: '/en/events-calendar', breadcrumb: 'Events calendar' },
  { path: '/uk/events-calendar', breadcrumb: 'Календар подій' },
  { path: '/:lang/events/:alias', breadcrumb: alias },

  { path: '/en/search/*', breadcrumb: 'Search' },
  { path: '/uk/search/*', breadcrumb: 'Пошук' },

  { path: '/en/ukraine_above_all', breadcrumb: 'Ukraine above all' },
  { path: '/uk/ukraine_above_all', breadcrumb: 'Україна понад усе' },
  { path: '/en/polls', breadcrumb: 'Polls' },
  { path: '/uk/polls', breadcrumb: 'Опитування' },
  { path: '/en/accreditation', breadcrumb: 'Accreditation of EP' },
  { path: '/uk/accreditation', breadcrumb: 'Акредитація ОП' },

  { path: '/:lang/*', breadcrumb: '404' },
  { path: '/:lang', breadcrumb: hompageBreadCrumb },
];

export default function Breadcrumbs() {
  const { currentAlias } = useContext(AliasContext);
  const breadcrumbs = useReactRouterBreadcrumbs(routes(currentAlias), {
    excludePaths: [
      '/',
      '/:lang/search',
      '/:lang/general-information',
      '/:lang/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash',
    ],
  });
  return (
    <div className="breadcrumbs">
      {(breadcrumbs?.[1]?.breadcrumb?.props?.children != '404' &&
        breadcrumbs.map(({ match, breadcrumb }) => (
          <a key={match.pathname} href={match.pathname}>
            {breadcrumb}
          </a>
        ))) || <a href={breadcrumbs?.[0]?.match?.pathname}>{breadcrumbs?.[0].breadcrumb}</a>}
    </div>
  );
}
