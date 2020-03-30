import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, Input, Container } from "@material-ui/core";
import { Flex, Box } from "reflexbox";
import Book from "./components/Book";
import Grid from "@material-ui/core/Grid";
import SelectedBook from "./components/SelectedBook";
import { ReactComponent as LightIcon } from "./lightmode.svg";
import { ReactComponent as DarkIcon } from "./darkmode.svg";
import Colors from "./components/Colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const HomeContainer = styled(Container)``;

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const Top = styled(Flex)`
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  text-align: center;
`;

const Main = styled.div`
  width: 100%;
  min-height: 100vh;

  &.light-mode svg {
    max-width: 100%;
    fill: #000;
  }

  &.dark-mode {
    background-color: ${Colors.grey900};
    color: ${Colors.grey300};

    input::placeholder {
      color: ${Colors.grey300};
    }

    input,
    select,
    textarea {
      color: ${Colors.grey300};
    }

    input[type=button] {
      color: ${Colors.grey300};
    }

    button span {
      color: ${Colors.grey300};
    }
  }

  &.dark-mode svg {
    max-width: 100%;
    fill: ${Colors.grey300};
  }

  &.dark-mode {
    .theme svg {
      width: 58px;
      height: 53px;
      fill: #fff;
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
    }
  }

  &.light-mode {
    .theme svg {
      width: 58px;
      height: 53px;
      fill: #000;
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
    }
  }

  .theme {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SearchSection = styled.div`
  width: 100%;
  form {
  }

  input {
    width: 50vw;
  }

  @media (min-width: 900px) {
    input {
      width: 25vw;
    }
  }
`;

const App = () => {
  const [isDark, setTheme] = useState(false);
  const [selected, setSelected] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const onInputChange = e => {
    setSearchTerm(e.target.value);
    e.preventDefault();
    fetchBooks();
  };

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    const result = await axios.get(`${API_URL}?q=${searchTerm}&maxResults=16`);
    setBooks(result.data);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchBooks();
  };

  const changeTheme = () => setTheme(!isDark);

  return (
    <Main className={isDark ? "dark-mode" : "light-mode"}>
      <HomeContainer>
        <Top flexWrap="wrap" justifyContent="center">
          <Box width={[1]}>
            <div className="theme">
              {isDark ? (
                <LightIcon onClick={changeTheme} />
              ) : (
                <DarkIcon onClick={changeTheme} />
              )}
            </div>
            {/* <Logo /> */}
            <h1>search for a book</h1>{" "}
            <SearchSection>
              <form onSubmit={onSubmitHandler}>
                <label>
                  <Input
                    type="search"
                    placeholder="search for a book"
                    value={searchTerm}
                    onChange={onInputChange}
                  />
                  <Button onClick={onSubmitHandler} type="submit">
                    Search
                  </Button>
                </label>
              </form>
            </SearchSection>
          </Box>
        </Top>
        {selected != null && <SelectedBook dark={isDark} book={selected} />}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignContent="center"
        >
          {books.items.map((book, index) => {
            return (
              <Grid
                onClick={() => setSelected(book)}
                item
                sm={3}
                xs={12}
                key={index}
              >
                <Book dark={isDark} book={book} />
              </Grid>
            );
          })}
        </Grid>
      </HomeContainer>
    </Main>
  );
};

export default App;
