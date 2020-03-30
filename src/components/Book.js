import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Colors from "./Colors";

const Main = styled.div`
  &.dark-mode {
    .MuiCard-root {
      background-color: ${Colors.grey800};
      color: #fff;
    }
  }
`;

const BookCover = styled(CardMedia)`
  height: 50%;
`;

const BookContainer = styled(Card)``;

const BookCard = styled(CardActionArea)`
  height: 500px;
`;

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Main className={this.props.dark ? "dark-mode" : "light-mode"}>
        <BookContainer>
          <BookCard>
            <BookCover
              image={`http://books.google.com/books/content?id=${this.props.book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <h1>{this.props.book.volumeInfo.title}</h1>
              <Typography gutterBottom variant="h5" component="h5">
                {this.props.book.volumeInfo.authors &&
                  this.props.book.volumeInfo.authors.map(author => author)}
              </Typography>
            </CardContent>
          </BookCard>
        </BookContainer>
      </Main>
    );
  }
}
