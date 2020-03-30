import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import Colors from "./Colors";

const Main = styled.div`
&.dark-mode {
    .MuiCard-root {
      background-color: ${Colors.grey800};
      color: #fff;
    }
  }
`

const BookCover = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }
`;

export default class SelectedBook extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Main className={this.props.dark ? "dark-mode" : "light-mode"}>
        <Card>
          <Flex flexWrap="wrap" justifyContent="center">
            <Box width={[1 / 2]}>
              <BookCover>
                <img
                  alt={this.props.book && this.props.book.volumeInfo.title}
                  src={`http://books.google.com/books/content?id=${this.props.book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />
              </BookCover>
            </Box>
            <Box width={[1 / 2]}>
              <h1>{this.props.book && this.props.book.volumeInfo.title}</h1>
              <h2>
                {" "}
                {this.props.book.volumeInfo.authors &&
                  this.props.book.volumeInfo.authors.map(
                    author => author + " "
                  )}
              </h2>
              <p>{this.props.book.volumeInfo.description}</p>
            </Box>
          </Flex>
        </Card>
      </Main>
    );
  }
}
