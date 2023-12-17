import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css'

const Breadcrumb = ({ path }) => {
  const currentPath = useLocation().pathname;

  return (
    <div className='text'>
        {path.map((item, index) => (
        <span key={index}>
          {index < path.length - 1 ? (
            <Link
              to={item.route}
              className={`breadcrumb-text ${currentPath === item.route ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ) : (
            <span className="breadcrumb-text">{item.name}</span>
          )}
          {index < path.length - 1 && <span> / </span>}
        </span>
      ))}
        
        </div>
  );
};

export default Breadcrumb;
