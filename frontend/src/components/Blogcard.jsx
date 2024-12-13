import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
/*
dùng để tạo link giữa các trang (giống với thẻ a trong html) nhưng được dùng với các Route của 
react-router-dom (tức có thể đưa người dùng đến các trang trong App,jsx)
*/
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "bootstrap/dist/css/bootstrap.min.css";

function Blogcard(Props) {
  const { post } = Props;
  if (!post) {
    return null;
  }
  //Cần phải hạn chế số lượng content được viết ra ngoài description
  //Đây là hàm giúp hạn chế số lượng content
  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }
    //Nếu content dài hơn maxLength thì cắt bớt và thêm dấu "..."
    return content.slice(0, maxLength) + "...";
  };
  return (
    <Card>
      <CardHeader
        id="blogHeader"
        avatar={
          <Avatar sx={{ bgcolor: "var(--main-color)" }} aria-label="recipe">
            {post.username ? post.username[0] : "UK"}
          </Avatar>
        }
        action={
          <Checkbox
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            sx={{
              "&.Mui-checked": {
                color: "secondary.main",
              },
            }}
          />
        }
        title={post.username}
        subheader={new Date(post.postcreatedat).toLocaleDateString()}
        sx={{
          "& .MuiCardHeader-title": {
            fontFamily: "Montserrat",
            fontWeight: "600",
          },
          "& .MuiCardHeader-subheader": {
            fontFamily: "Lato",
            color: "#615561",
          },
        }}
      />
      <Link to={`/blog/${post.postid}`} className="stretched-link" style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="194"
          image={post.bannerimageurl || assets.defaultthumbnail}
          alt={post.title}
        />
        <CardContent className="mb-4">
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              color: "#131113",
              overflow: "hidden",
              height: "3em",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, //giới hạn trong 2 dòng
              webkitBoxOrient: "vertical",
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: "Lato",
              color: "#615561",
              height: "4em",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3, //giới hạn trong 2 dòng
              webkitBoxOrient: "vertical",
            }}
          >
            {truncateContent(post.content, 200)}
          </Typography>
        </CardContent>
      </Link>
      <ul style={{ listStyleType: "none" }} className="d-flex gap-2 p-3">
        {post.topics.map((topic) => (
          <li key={topic}>
            <span
              className="badge rounded-pill"
              style={{ backgroundColor: "var(--secondary-color)", color: "var(--dark-color)" }}
            >
              {topic}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default Blogcard;
