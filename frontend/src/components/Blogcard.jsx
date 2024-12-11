import { assets } from "../assets/assets";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
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
          <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
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
      <CardMedia component="img" height="194" image={post.bannerimageurl || assets.defaultthumbnail} alt={post.title} />
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: "Montserrat", fontWeight: "500", color: "#131113" }}>
          {post.title}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "Lato", color: "#615561" }}>
          {truncateContent(post.content, 100)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Blogcard;
