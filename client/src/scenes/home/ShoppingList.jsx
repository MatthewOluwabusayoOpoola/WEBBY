import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography, Alert, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { API_BASE_URL } from "../../config";
import { mockItemsResponse } from "../../data/mockItems";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/items?populate=image`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const itemsJson = await response.json();
      dispatch(setItems(itemsJson.data));
      setIsOffline(false);
    } catch (error) {
      // backend unreachable (asleep, deployed, network issue) -> show demo catalog
      // instead of leaving the page blank
      dispatch(setItems(mockItemsResponse.data));
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems =
    items.filter((item) => item.attributes.category === "topRated") || null;
  const newArrivalsItems =
    items.filter((item) => item.attributes.category === "newArrivals") || null;
  const bestSellersItems =
    items.filter((item) => item.attributes.category === "bestSellers") || null;

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      {isOffline && (
        <Alert severity="info" sx={{ m: "20px auto", maxWidth: "600px" }}>
          Our live store is unreachable right now, so you're seeing a demo
          catalog. Browsing works, but checkout won't process real orders
          until the connection is back.
        </Alert>
      )}
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      {isLoading ? (
        <Box display="flex" justifyContent="center" m="40px 0">
          <CircularProgress />
        </Box>
      ) : (
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {value === "all" &&
            items.map((item) => (
              <Item item={item} key={`${item.attributes.name}-${item.id}`} />
            ))}
          {value === "newArrivals" &&
            newArrivalsItems.map((item) => (
              <Item item={item} key={`${item.attributes.name}-${item.id}`} />
            ))}
          {value === "bestSellers" &&
            bestSellersItems.map((item) => (
              <Item item={item} key={`${item.attributes.name}-${item.id}`} />
            ))}
          {value === "topRated" &&
            topRatedItems.map((item) => (
              <Item item={item} key={`${item.attributes.name}-${item.id}`} />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;
