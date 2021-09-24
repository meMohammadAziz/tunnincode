import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#E6E6E6",
    border: "none",
    boxShadow: "none",
    borderBottom: "1px dotted #51527c",
    borderRadius: "0",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  sub: {
    color: "#E6E6E6",
  },
}));

export default function Comment({ title, subTitle, img }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.sub}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {img}
          </Avatar>
        }
        title={title}
        subheader={
          <span style={{ color: "#b9b9b9e0" }}>
            {subTitle}
          </span>
        }
      />
    </Card>
  );
}
