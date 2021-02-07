import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination className='justify-content-md-center mt-5' >
        <LinkContainer
          key='first'
          to={keyword ? `/search/${keyword}/page/${1}` : `/page/${1}`}
        >
          <Pagination.First disabled={page === 1} ></Pagination.First>
        </LinkContainer>
        <LinkContainer
          key='prev'
          to={
            keyword
              ? `/search/${keyword}/page/${page - 1}`
              : `/page/${page - 1}`
          }
        >
          <Pagination.Prev disabled={page === 1} />
        </LinkContainer>

        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
          >
            <Pagination.Item active={x + 1 === page} >{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        <LinkContainer
          key='next'
          to={
            keyword
              ? `/search/${keyword}/page/${page + 1}`
              : `/page/${page + 1}`
          }
        >
          <Pagination.Next disabled={page === pages} />
        </LinkContainer>

        <LinkContainer
          key='last'
          to={keyword ? `/search/${keyword}/page/${pages}` : `/page/${pages}`}
        >
          <Pagination.Last disabled={page === pages} />
        </LinkContainer>
      </Pagination>
    )
  );
};

export default Paginate;
