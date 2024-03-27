import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const langCode = 'uk';
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/${langCode}/`;

export const vnuApi = createApi({
    reducerPath: 'vnuApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
    }),
    endpoints: (builder) => ({
        TopHeaderMenu: builder.query({
            query: () => 'jsonapi/menu_items/top-header',
        }),
        HeaderMenu: builder.query({
            query: () => 'entity/menu/main-header-menu/tree',
        }),
        HeaderLogo: builder.query({
            query: () =>
                'jsonapi/block_content/about_the_university/c0bbbd2b-2069-46b6-9ec5-6991020f81e2?include=field_image&jsonapi_include=1',
        }),
        FooterMenu: builder.query({
            query: () => 'entity/menu/footer/tree',
        }),
        FooterPartnersBlock: builder.query({
            query: () =>
                'jsonapi/block_content/footer_bottom_partners/e07c2ab9-e74d-43bf-bcb7-7f5d693b413c?include=field_partner&jsonapi_include=field_image',
        }),
        FooterInfoBlock: builder.query({
            query: () =>
                'jsonapi/block_content/about_the_university/83733dfb-ee52-4c17-8488-9b6ea786377f?include=field_image&jsonapi_include=1',
        }),
        MainSlider: builder.query({
            query: () => 'jsonapi/views/slider/block_1?include=field_image,field_link&jsonapi_include=1',
        }),
        YoutubeBlock: builder.query({
            query: () => 'jsonapi/block_content/block_link/30d6c8b4-fee2-4975-87c6-d88697465050',
        }),
        PollResultBlock: builder.query({
            query: (args) => {
                const {id} = args;
                return `poll-vote-result/rest-export/${id}`;
            },
        }),
        PollBlock: builder.query({
            query: () => 'jsonapi/views/polls/block_1?include=choice&jsonapi_include=1',
        }),
        PollsPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `jsonapi/views/poll_list/page_1?page=${page}&include=choice&jsonapi_include=1`;
            },
        }),
        PopularRequests: builder.query({
            query: () => 'entity/menu/popular-requests/tree',
        }),
        PollChoiceBlock: builder.query({
            query: (args) => {
                const {id} = args;
                return `jsonapi/poll_choice/poll_choice/${id}`;
            },
        }),
        ActualNewsBlock: builder.query({
            query: () => 'jsonapi/views/actual_news/block_1?include=field_image&jsonapi_include=1',
        }),
        LastNewsBlock: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/last_news/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        NewsPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `news/${page}?_format=json`;
            },
        }),
        EventsCalendar: builder.query({
            query: () => `/events-calendar`,
        }),
        InfrastructurePage: builder.query({
            query: (args) => {
                const {page} = args;
                return `infrastructure/${page}?_format=json`;
            },
        }),
        Infrastructure: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/infrastructure/${endpoint}`;
            },
        }),
        PhotoAlbums: builder.query({
            query: (args) => {
                const {page} = args;
                return `jsonapi/views/photoalbums_/block_1?page=${page}&include=field_image&jsonapi_include=1`;
            },
        }),
        PhotoAlbumsPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `photoalbums/${page}?_format=json`;
            },
        }),
        FacebookBlock: builder.query({
            query: () => 'jsonapi/block_content/block_link/ddb2bb36-f0cc-41dd-90c6-cbfaf42dacf6',
        }),
        Staff: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/administrative_units/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        StaffPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `staff/${page}?_format=json`;
            },
        }),
        StaffView: builder.query({
            query: (args) => {
                const {name} = args;
                const {page} = args;
                return `jsonapi/views/administrative_units/page_3?include=field_image&jsonapi_include=1&views-filter[title]=${name}&page=${page}`;
            },
        }),
        Branches: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/branches/${endpoint}&include=field_image&jsonapi_include=1`;
            },
        }),
        BranchesPage: builder.query({
            query: (args) => {
                const {page} = args;
                const {type} = args;
                return `${type}/${page}?_format=json`;
            },
        }),
        GeneralInfoPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `general-information/${page}?_format=json`;
            },
        }),
        Accreditation: builder.query({
            query: (args) => {
                const {page} = args;
                return `accreditation?${page}`;
            },
        }),
        PublicInfoView: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/academic_publications/${endpoint}`;
            },
        }),
        Node: builder.query({
            query: (args) => {
                const {nid} = args;
                return `node/${nid}?_format=json`;
            },
        }),
        UkraineAboveAllView: builder.query({
            query: (args) => {
                const {page} = args;
                return `jsonapi/views/ukraine_above_all/page_1?page=${page}&include=field_image&jsonapi_include=1`;
            },
        }),
        EnsemblesPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `ensembles/${page}?_format=json`;
            },
        }),
        EnsemblesView: builder.query({
            query: () => 'jsonapi/views/ensembles/block_1?include=field_image&jsonapi_include=1',
        }),
        UniversityRatingView: builder.query({
            query: (args) => {
                const {page} = args;
                return `jsonapi/views/university_rating/${page}&include=field_image&jsonapi_include=1`;
            },
        }),
        DepartmentPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `departments/${page}?_format=json`;
            },
        }),
        DepartmentView: builder.query({
            query: (args) => {
                const {id_departments} = args;
                return `jsonapi/views/departments/block_1?views-argument[0]=${id_departments}&include=field_image,field_head_of_department&jsonapi_include=1`;
            },
        }),
        DepartmentsView: builder.query({
            query: (args) => {
                const {title} = args;
                const {faculty} = args;
                const {page} = args;
                return `/departments?page=${page}&title=${title}&field_faculty_target_id=${faculty}`;
            },
        }),
        FacultiesView: builder.query({
            query: () => 'jsonapi/views/faculties/page_1?include=field_image&jsonapi_include=1',
        }),
        FacultyPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `faculties/${page}?_format=json`;
            },
        }),
        NewsView: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/news/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        OtherNewsSlider: builder.query({
            query: (args) => {
                const {id} = args;
                return `/news/other-news/${id}`;
            },
        }),
        NewsViewBlock: builder.query({
            query: (args) => {
                const {currentPage} = args;
                const {date} = args;
                const {category} = args;
                return `jsonapi/views/news/block_1?page=${currentPage}&views-filter[created]=${date}&views-filter[type_news]=${category}&include=field_image&jsonapi_include=1`;
            },
        }),
        EventViewBlock: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `events/${endpoint}`;
            },
        }),
        EventPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `events/${page}?_format=json`;
            },
        }),
        EducationCatalogPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `educational-programs/${page}?_format=json`;
            },
        }),
        EducationCatalogView: builder.query({
            query: () => 'jsonapi/views/satalog_of_educational_programs/block_1',
        }),
        EducationView: builder.query({
            query: (args) => {
                const {title} = args;
                const {page} = args;
                const {field_form_educations_value} = args;
                const {field_educational_level_target_id} = args;
                const {field_validity_value} = args;
                const {field_faculty_target_id} = args;
                return `educational-programs?page=${page}&title=${title}&field_form_educations_value=${field_form_educations_value}&field_educational_level_target_id=${field_educational_level_target_id}&field_validity_value=${field_validity_value}&field_faculty_target_id=${field_faculty_target_id}`;
            },
        }),
        Educations: builder.query({
            query: () => 'educational-programs',
        }),
        TaxonomyTypeInfo: builder.query({
            query: () => 'jsonapi/taxonomy_term/type_information',
        }),
        NewsLetterSubscriber: builder.query({
            query: () =>
                'jsonapi/block_content/basic/a35ad0a8-5f0a-4ce0-a9fe-1dca0c60b033?include=field_image&jsonapi_include=1',
        }),
        AfterSubscribeText: builder.query({
            query: () => 'jsonapi/block_content/basic/0e0cbf93-a1b1-4674-b34f-3ae975a52441',
        }),
        AdvertisementView: builder.query({
            query: (args) => {
                const {page} = args;
                return `jsonapi/views/advertisement/${page}&include=field_content&jsonapi_include=1`;
            },
        }),
        Disciplines: builder.query({
            query: (args) => {
                const {id} = args;
                const {type} = args;
                return `${type}-disciplines/${id}`;
            },
        }),
        NewsLetterUnSubscriber: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `entity/simplenews_subscriber/${endpoint}`;
            },
        }),
        SocialLinks: builder.query({
            query: () => 'jsonapi/block_content/social_links/7313e65c-2023-4b4c-96d6-e51cd3c8c416',
        }),
        EntityData: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/${endpoint}`;
            },
        }),
        Pager: builder.query({
            query: (args) => {
                const {page} = args;
                const {endpoint} = args;
                return `jsonapi/views/${endpoint}/page_1?page=${page}`;
            },
        }),
        Paragraph: builder.query({
            query: (args) => {
                const {targetUuid} = args;
                const {targetRevisionId} = args;
                return `jsonapi/paragraph/section/${targetUuid}?${targetRevisionId && `resourceVersion=id%3A${targetRevisionId}`}`;
            },
        }),
        Search: builder.query({
            query: (args) => {
                const {result} = args;
                return `search?search_api_fulltext=${result}`;
            },
        }),
        MetaTags: builder.query({
            query: () => 'jsonapi/metatag_defaults/metatag_defaults/c83d2f3a-7988-4ca5-9200-db72b073bdb2',
        }),
        SiteInfo: builder.query({
            query: () => 'site/info?_format=json',
        }),
        FilePreview: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `https://back.vnu.ms1-wishdesk.com/uk/jsonapi/paragraph/file_preview/${endpoint}/field_file`;
            },
        }),
        File: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `file/${endpoint}?_format=json`;
            },
        }),
        Media: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `/media/${endpoint}/edit?_format=json`;
            },
        }),
    }),
});

export const {
    useTopHeaderMenuQuery,
    useHeaderMenuQuery,
    useHeaderLogoQuery,
    useYoutubeBlockQuery,
    useFooterMenuQuery,
    useFooterPartnersBlockQuery,
    useFooterInfoBlockQuery,
    useMainSliderQuery,
    usePollResultBlockQuery,
    usePollBlockQuery,
    usePollsPageQuery,
    usePollChoiceBlockQuery,
    useActualNewsBlockQuery,
    useLastNewsBlockQuery,
    useNewsPageQuery,
    useEventsCalendarQuery,
    usePopularRequestsQuery,
    useInfrastructurePageQuery,
    useInfrastructureQuery,
    usePhotoAlbumsQuery,
    usePhotoAlbumsPageQuery,
    useFacebookBlockQuery,
    useStaffQuery,
    useStaffPageQuery,
    useStaffViewQuery,
    useBranchesQuery,
    useBranchesPageQuery,
    useGeneralInfoPageQuery,
    useAccreditationQuery,
    usePublicInfoViewQuery,
    useFacultiesViewQuery,
    useNodeQuery,
    useDisciplinesQuery,
    useUkraineAboveAllViewQuery,
    useEnsemblesViewQuery,
    useUniversityRatingViewQuery,
    useEnsemblesPageQuery,
    useDepartmentPageQuery,
    useDepartmentViewQuery,
    useDepartmentsViewQuery,
    useParagraphQuery,
    useFacultyPageQuery,
    useNewsViewQuery,
    useOtherNewsSliderQuery,
    useNewsViewBlockQuery,
    useEventViewBlockQuery,
    useEventPageQuery,
    useEducationsQuery,
    useEducationViewQuery,
    useTaxonomyTypeInfoQuery,
    useEntityDataQuery,
    useEducationCatalogPageQuery,
    useEducationCatalogViewQuery,
    useNewsLetterSubscriberQuery,
    useAfterSubscribeTextQuery,
    useNewsLetterUnSubscriberQuery,
    useSocialLinksQuery,
    useAdvertisementViewQuery,
    useSearchQuery,
    usePagerQuery,
    useMetaTagsQuery,
    useSiteInfoQuery,
    useMediaQuery,
    useFileQuery,
    useFilePreviewQuery,
} = vnuApi;
