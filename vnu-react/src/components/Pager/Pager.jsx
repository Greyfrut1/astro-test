import {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {PaginationItem} from '@mui/material';
import PropTypes from "prop-types";
import './Pager.scss'

// Custom SVG components for the pagination buttons.
function CustomPreviousIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
    );
}

function CustomNextIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
        </svg>
    );
}

function CustomFirstIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
        </svg>
    );
}

function CustomLastIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}

export default function Pager({totalPages, onPageChange}) {
    // State variable for the current page.
    const [page, setPage] = useState(0);

    // Function to handle page changes and call 'onPageChange' prop.
    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1);
        onPageChange(newPage - 1);
    };

    // Render the Pager component with MUI Pagination and custom icons.
    return (
        <div className="vnu-pager">
            <Pagination
                page={page + 1}
                shape="rounded"
                count={totalPages}
                showFirstButton
                showLastButton
                onChange={handlePageChange}
                renderItem={(item) => (
                    // Render PaginationItem with custom SVG icons.
                    <PaginationItem
                        slots={{
                            previous: CustomPreviousIcon,
                            next: CustomNextIcon,
                            first: CustomFirstIcon,
                            last: CustomLastIcon,
                        }}
                        {...item}
                    />
                )}
            />
        </div>
    );
}

// PropTypes block to define the expected types for props
Pager.propTypes = {
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
