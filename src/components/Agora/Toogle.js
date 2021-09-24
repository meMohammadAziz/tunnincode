import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 62,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(35px)",
      backgroundColor: "#3d3e64d3",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#3d3e64d3",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#D8A48F",
      backgroundColor: "#D8A48F",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: "#D8A48F",
  },
  track: {
    borderRadius: 26 / 2,
    backgroundColor: "#3d3e64d3",

    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function Toogle() {
  const [state, setState] = React.useState({
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControlLabel
      control={
        <IOSSwitch
          checked={state.checkedB}
          onChange={handleChange}
          name="checkedB"
        />
      }
    />
  );
}
