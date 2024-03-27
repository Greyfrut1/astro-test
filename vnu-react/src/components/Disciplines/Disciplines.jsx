import React, { useState } from 'react';
import { useDisciplinesQuery } from '../../services/api.js';
import useLanguagePrefix from "../../services/languagePrefix.jsx";

function Disciplines({ idNode, typeDisplay, titleSection }) {
  const [isActive, setIsActive] = useState(false);
  const { data } = useDisciplinesQuery({ id: `${idNode}`, type: `${typeDisplay}` });
  const langPrefix = useLanguagePrefix();
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="section-wrapper">
      <div onClick={handleClick} className={`section ${isActive ? 'open' : ''}`}>
        <div className="plus" />
        <div className="section-title">{titleSection}</div>
      </div>
      <div className={`subsection-wrapper ${isActive ? 'subsection-wrapper-active' : ''}`}>
        <table>
          <tbody>
            {data?.rows?.map((item) => (
                <tr>
                    <td dangerouslySetInnerHTML={{__html: item?.field_name_discipline}}/>
                    <td dangerouslySetInnerHTML={{__html: item?.field_syllabus}}/>
                    <td>{item?.field_start_of_the_academic_year}</td>
                    <td>{item?.field_course_of_study} {langPrefix === 'en' ? 'Course' : 'Курс'}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Disciplines;
