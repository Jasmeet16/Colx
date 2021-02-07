import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const SearchBar = ({ history }) => {
  const [searchKey, setsearchKey] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKey.trim()) {
      history.push(`/search/${searchKey}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="ml-5 align-center text-center w-50"
      inline
    >
      <Form.Control
        variant="outline-light"
        type="text"
        placeholder="Find Books, Lab Coats and more..."
        className="ml-auto w-75"
        name="q"
        onChange={(e) => setsearchKey(e.target.value)}
      >
      </Form.Control>
      <Button type="submit" variant="outline-light" className='py-2'>
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBar;
