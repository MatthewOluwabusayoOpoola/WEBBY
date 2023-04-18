import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import { shades } from "../../theme";

// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            borderRadius="1px"
            textAlign="center"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            padding="20px"
            top="25%"
            width="50%"
            alignItems="center"
            left={isNonMobile ? "25%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            minWidth={isNonMobile ? undefined : "100%"}
          >
            <Typography color="white">LEARN , BUY, COMMUNITY</Typography>
            <Typography variant="h1">
              World's Leading Online Watch Store
            </Typography>
          </Box>
          <Box
            color="white"
            borderRadius="1px"
            textAlign="center"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            display="flex"
            bottom="0px"
            width="100%"
            alignItems="center"
            left={isNonMobile ? "0" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            minWidth={isNonMobile ? undefined : "100%"}
          >
            <Box
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="center"
              backgroundColor="rgb(0, 0, 0, 0.4)"
              bottom="0px"
              borderRight="10px"
              height="100%"
              width="100%"
              left={isNonMobile ? "1" : "0"}
              right={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
            >
              <Typography variant="h3">BRACELET</Typography>
              <Typography variant="h4">-- coming soon --</Typography>
            </Box>
            <Box
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="center"
              backgroundColor="rgb(0, 0, 0, 0.4)"
              bottom="0px"
              borderRight="10px"
              height="100%"
              width="100%"
              left={isNonMobile ? "1" : "0"}
              right={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
            >
              <Typography color={shades.secondary[200]}>
                <WatchOutlinedIcon sx={{ fontSize: 40 }} />
              </Typography>
              <Typography variant="h3">WATCH</Typography>
            </Box>
            <Box
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="center"
              backgroundColor="rgb(0, 0, 0, 0.4)"
              bottom="0px"
              borderRight="10px"
              height="100%"
              width="100%"
              left={isNonMobile ? "1" : "0"}
              right={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
            >
              <Typography variant="h3">STRAPS</Typography>
              <Typography variant="h4">-- coming soon --</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
