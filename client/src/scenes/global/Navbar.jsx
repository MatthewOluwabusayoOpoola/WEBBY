import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgb(0, 0, 0, 0.4)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <Box color="white">WATCH</Box>
          <Box color="white">BRACELET</Box>
          <Box color="white">STRAP</Box>
        </Box>
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color="white"
        >
          <Typography variant="h2">WEBBY</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "white" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "white" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
