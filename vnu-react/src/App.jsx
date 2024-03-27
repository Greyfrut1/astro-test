import React, {lazy, Suspense, useContext, useEffect, useRef, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Layout from './components/Layout';
import {LoadingContext} from './context/loading-context';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.scss';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

const PhotoAlbumsPage = lazy(() => import('./pages/PhotoAlbumsPage/PhotoAlbumsPage'));
const PhotoAlbumsViewPage = lazy(() => import('./views/PhotoAlbumsView/PhotoAlbumsView'));

const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage/InfrastructurePage'));
const InfrastructureViewPage = lazy(() => import('./views/InfrastructureView/InfrastructureView'));

const Rectorate = lazy(() => import('./views/RectorateView'));
const StaffPage = lazy(() => import('./pages/StaffPage/StaffPage'));
const AcademicCouncil = lazy(() => import('./views/AcademicBoardView'));
const Staff = lazy(() => import('./views/AllStaffView/AllStaffView'));

const Museums = lazy(() => import('./pages/MuseumsPage'));
const Units = lazy(() => import('./pages/UnitsPage'));
const Branches = lazy(() => import('./pages/AllBranchesPage'));
const BranchesPage = lazy(() => import('./pages/BranchesPage/BranchesPage'));

const GeneralInfoPage = lazy(() => import('./pages/GeneralInformationPage/GeneralInformationPage'));
const PublicInfoPage = lazy(() => import('./pages/PublicInformationPage/PublicInformationPage'));

const DepartmentPage = lazy(() => import('./pages/DepartmentPage/DepartmentPage'));
const DepartmentsView = lazy(() => import('./views/DepartmentsView/DepartmentsView'));

const Faculties = lazy(() => import('./views/FacultyView/FacultyView'));
const FacultyPage = lazy(() => import('./pages/FacultyPage/FacultyPage'));

const UkraineAboveAllPage = lazy(() => import('./pages/UkraineAboveAll/UkraineAboveAll'));
const EnsemblesView = lazy(() => import('./views/EnsemblesView/EnsemblesView'));
const EnsemblesPage = lazy(() => import('./pages/EnsemblesPage/EnsemblesPage'));

const UniversityRating = lazy(() => import('./pages/UniversityRating/UniversityRating'));
const Search = lazy(() => import('./pages/Search'));

const UnSubscribe = lazy(() => import('./blocks/Subscriber/UnSubscriber'));

const EducationalProgramsView = lazy(() => import('./views/EducationalProgramsView'));

const News = lazy(() => import('./pages/NewsPage/NewsPage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsSinglePage'));

const Events = lazy(() => import('./pages/EventPage/EventPage'));
const EventsPage = lazy(() => import('./pages/EventPage/EventSinglePage'));

const PollsPage = lazy(() => import('./pages/PollsPage/PollsPage'));

const EventsCalendar = lazy(() => import('./views/EventsCalendar/EventsCalendar'));
const AccreditationPage = lazy(() => import('./pages/AccreditationPage/AccreditationPage'));
const AdvertisementView = lazy(() => import('./views/AdvertisementView/AdvertisementView'));

const EducationsProgram = lazy(() => import('./pages/EducationalPrograms/EducationsProgram'));
export default function App() {
    const [loading, setLoading] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const getNetworkSpeed = () => {
        const connection =
            navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return connection ? connection.downlink : null;
    };
    const calculateTimeout = () => {
        const networkSpeed = getNetworkSpeed();
        return networkSpeed ? Math.max(400, 5000 / networkSpeed) : 400;
    };;
    useEffect(() => {
    }, []);
    useEffect(() => {
        // Display the "Back to Top" button if the page is scrolled down.
        const handleScroll = () => {
            if (window.pageYOffset > 250) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // A function to scroll the page up.
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <BrowserRouter>
            <Layout>
                <Suspense>
                    <Routes>
                        <Route path="/en" element={<HomePage/>}/>
                        <Route path="/uk" element={<HomePage/>}/>
                        {/* <Route path="/" element={<Navigate to="/uk"/>}/>

                        <Route path="/:lang/photoalbums" element={<PhotoAlbumsViewPage/>}/>
                        <Route path="/:lang/photoalbums/:alias" element={<PhotoAlbumsPage/>}/>

                        <Route path="/:lang/infrastructure" element={<InfrastructureViewPage/>}/>
                        <Route path="/:lang/infrastructure/:alias" element={<InfrastructurePage/>}/>

                        <Route path="/:lang/rectorate" element={<Rectorate/>}/>
                        <Route path="/:lang/academic-council" element={<AcademicCouncil/>}/>
                        <Route path="/:lang/staff/:alias" element={<StaffPage/>}/>
                        <Route path="/:lang/staff" element={<Staff/>}/>

                        <Route path="/:lang/museums" element={<Museums/>}/>
                        <Route path="/:lang/units" element={<Units/>}/>
                        <Route path="/:lang/branches-and-representative-offices" element={<Branches/>}/>
                        <Route
                            path="/:lang/branches-and-representative-offices/:alias"
                            element={<BranchesPage type={'branches-and-representative-offices'}/>}
                        />
                        <Route
                            path="/:lang/units/:alias"
                            element={<BranchesPage type={'units'}/>}
                        />
                        <Route
                            path="/:lang/museums/:alias"
                            element={<BranchesPage type={'museums'}/>}
                        />

                        <Route path="/:lang/general-information/:alias" element={<GeneralInfoPage/>}/>
                        <Route path="/:lang/public-information" element={<PublicInfoPage/>}/>
                        <Route path="/:lang/accreditation" element={<AccreditationPage/>}/>

                        <Route path="/:lang/departments/:alias" element={<DepartmentPage/>}/>
                        <Route path="/:lang/departments" element={<DepartmentsView/>}/>
                        <Route path="/:lang/faculties" element={<Faculties/>}/>
                        <Route path="/:lang/faculties/:alias" element={<FacultyPage/>}/>

                        <Route path="/:lang/ukraine_above_all" element={<UkraineAboveAllPage/>}/>
                        <Route path="/:lang/ensembles/:alias" element={<EnsemblesPage/>}/>
                        <Route path="/:lang/ensembles" element={<EnsemblesView/>}/>

                        <Route path="/:lang/university-rating" element={<UniversityRating/>}/>
                        <Route path="/:lang/search/:result" element={<Search/>}/>

                        <Route
                            path="/:lang/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash"
                            element={<UnSubscribe/>}
                        />

                        <Route path="/:lang/educational-programs" element={<EducationalProgramsView/>}/>
                        <Route path="/:lang/educational-programs/:alias" element={<EducationsProgram/>}/>

                        <Route path="/:lang/news" element={<News/>}/>
                        <Route path="/:lang/news/:alias" element={<NewsPage/>}/>

                        <Route path="/:lang/events" element={<Events/>}/>
                        <Route path="/:lang/events-calendar" element={<EventsCalendar/>}/>
                        <Route path="/:lang/events/:alias" element={<EventsPage/>}/>

                        <Route path="/:lang/polls" element={<PollsPage/>}/>

                        <Route path="/:lang/advertisement" element={<AdvertisementView/>}/> */}
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Suspense>
            </Layout>
            <button
                type="button"
                className={`back-to-top ${showBackToTop ? 'show' : 'hide'}`}
                onClick={scrollToTop}
                aria-label="Back to Top"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="back-to-top__icon"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5"/>
                </svg>
            </button>
            {!loading && (
                <div className="loader-block">
                    <img src={'teste'} alt="loader-logo" loading={'lazy'}/>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </BrowserRouter>
    );
}
