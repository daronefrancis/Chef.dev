import React, { Component } from "react";
import postsService from "../../utils/postsService";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MUIRichTextEditor from "mui-rte";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 10),
    // change 3 to 50 when figure out RTE
  },
});
class NewPostPage extends Component {
  state = {
    title: "",
    content: "",
    ingredients: [],
    image: "",
    profile: this.props.profile._id,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postsService.create(this.state);
      this.props.handleCreatePost();
      this.props.history.push("/");
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleMultipleChange = (e, values) => {
    this.setState({
      ingredients: values,
    });
  };

  //   handleChangeContent = (text) => {
  //     console.log(text);
  //     this.setState({
  //       content: text,
  //     });
  //   };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            New Post
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              type="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="header-image"
              label="Image URL"
              name="image"
              autoComplete="image"
              autoFocus
              type="text"
              placeholder="Image URL"
              value={this.state.image}
              onChange={this.handleChange}
            />
            <Autocomplete
              required
              multiple
              id="tags-outlined"
              options={ingredients}
              defaultValue={[ingredients[1]]}
              filterSelectedOptions
              onChange={this.handleMultipleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  variant="outlined"
                  label="Ingredients"
                  placeholder="Ingredients"
                  name="ingredients"
                />
              )}
            />
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={25}
              rowsMax={500}
              placeholder="Chef up a tutorial..."
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            {/* <MUIRichTextEditor
              label="Chef up a tutorial..."
              inlineToolbar={true}
              onSave={this.handleChangeContent}
              name="content"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Post
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const ingredients = [
  "Java",
  "Javascript",
  "Python",
  "Node.js",
  "HTML",
  "CSS",
  "Typescript",
  "MongoDB",
  "PostgreSQL",
  "C",
  "C++",
  "C#",
  "jQuery",
  "PHP",
  "Ruby",
  "SQL",
  "Bootstrap",
  "Materialize",
];

export default withStyles(styles)(NewPostPage);
