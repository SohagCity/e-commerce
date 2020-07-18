import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  title: {
    flexGrow: 1,
  },
});

class EmptyCart extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="container mt-5">
        <div className="row">
          <Typography
            variant="h2"
            align="center"
            className={`col-10 mx-auto text-center ${classes.title}`}
          >
            Your Cart is Currently Empty
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EmptyCart);
