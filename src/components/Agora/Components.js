import { Typography } from "@material-ui/core";
import Toogle from "./Toogle";
import Comment from "./Card";

import "./style.css";

const Comments = ({comments}) => {
  // const comments = [
  //   {
  //     img: "M",
  //     title: "Maggi Luttengen",
  //     subTitle:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  //   },
  //   {
  //     img: "B",
  //     title: "Bret Emmard",
  //     subTitle:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur",
  //   },
  //   {
  //     img: "E",
  //     title: "Easton Schmeler",
  //     subTitle:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  //   },
  //   {
  //     img: "K",
  //     title: "Kennith Keihn",
  //     subTitle:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  //   },
   
  // ];

  const commentsMapper = comments.map(comment => {

    return (
        <Comment img={comment.img} title={comment.title} subTitle={comment.subTitle} ></Comment>
    )
  })

  return (
    <div className="carde">
      <div className="header">
        <Typography
          className="header-heading"
          style={{ color: "#E6E6E6", padding: "10px" }}
          variant="h5"
        >
          Comments
        </Typography>
        <Toogle className="header-toogle" />
      </div>
      <div className="comments">
        {/* <Comment img="R"></Comment> */}
        {commentsMapper}
      </div>
    </div>
  );
};

export default Comments;
