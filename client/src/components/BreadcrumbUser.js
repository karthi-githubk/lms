import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import "./Breadcrumbuser.css";

const BreadcrumbUser = ({ items }) => {
  const location = useLocation();

  return (
    <nav className="breadcrumbs bg-light">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index}>
            {index > 0 && (
              <span className="separator text-dark">
                <BsChevronRight />
              </span>
            )}
            {index === items.length - 1 ? (
              <span className="breadcrumb-item active-link text-primary"> {/* Updated class for active item */}
                {item.text}
              </span>
            ) : (
              <Link
                to={item.url}
                className={`breadcrumb-link${
                  location.pathname === item.url ? ' active-link' : ''
                } breadcrumb-item`}
              >
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbUser;
