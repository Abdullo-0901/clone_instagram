import AddBoxIcon from "@mui/icons-material/AddBox";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
export const navbar = [
  {
    title: "Главная",
    id: 1,
    icons: <HomeIcon />,
    path: "/home",
  },
  {
    title: "Поисковый запрос",
    id: 2,
    icons: <SearchIcon />,
    path: "",
  },
  {
    title: "Интересное",
    id: 3,
    icons: <ExploreIcon />,
    path: "/intersting",
  },
  {
    title: "Reels",
    id: 4,
    icons: <VideoCameraBackIcon />,
    path: "/reels",
  },
  {
    title: "Сообщения",
    id: 5,
    icons: <MessageIcon />,
    path: "/messages",
  },
  {
    title: "Уведомления",
    id: 6,
    icons: <FavoriteBorderIcon />,
    path: "/notifications",
  },
  {
    title: "Создать",
    id: 7,
    icons: <AddBoxIcon />,
    path: "/create",
  },
];
