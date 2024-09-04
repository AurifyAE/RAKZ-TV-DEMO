import React, { useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import LimitExceededModal from "../components/LimitExceededModal";
import SpotRate from "../components/SpotRate";
import CommodityTable from "../components/CommodityTable";
import NewsTicker from "../components/News";
import logo from "../assets/logo.png";
import aurifyLogo from "../assets/aurifyLogo.png";
import BuyerSeller from "../components/BuyerSeller";
import {
  fetchSpotRates,
  fetchServerURL,
  fetchNews,
  fetchTVScreenData,
} from "../api/api";
import io from "socket.io-client";
import { useSpotRate } from "../context/SpotRateContext";

function TvScreen() {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [serverURL, setServerURL] = useState("");
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [commodities, setCommodities] = useState([]);
  const [goldBidSpread, setGoldBidSpread] = useState("");
  const [goldAskSpread, setGoldAskSpread] = useState("");
  const [silverBidSpread, setSilverBidSpread] = useState("");
  const [silverAskSpread, setSilverAskSpread] = useState("");
  const [symbols, setSymbols] = useState(["GOLD", "SILVER"]);
  const [error, setError] = useState(null);

  const { updateMarketData } = useSpotRate();

  const adminId = import.meta.env.VITE_APP_ADMIN_ID;

  updateMarketData(
    marketData,
    goldBidSpread,
    goldAskSpread,
    silverBidSpread,
    silverAskSpread
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spotRatesRes, serverURLRes, newsRes] = await Promise.all([
          fetchSpotRates(adminId),
          fetchServerURL(),
          fetchNews(adminId),
        ]);

        // Handle Spot Rates
        const {
          commodities,
          goldBidSpread,
          goldAskSpread,
          silverBidSpread,
          silverAskSpread,
        } = spotRatesRes.data.info;
        setCommodities(commodities);
        setGoldBidSpread(goldBidSpread);
        setGoldAskSpread(goldAskSpread);
        setSilverBidSpread(silverBidSpread);
        setSilverAskSpread(silverAskSpread);

        // Handle Server URL
        const { serverURL } = serverURLRes.data.info;
        setServerURL(serverURL);

        // Handle News
        setNews(newsRes.data.news.news);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    // Fetch TV screen data (you can leave this as a separate call)
    fetchTVScreenData(adminId)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          // Allow TV screen view
          setShowLimitModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setShowLimitModal(true); // Show the modal on 403 status
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred.");
        }
      });
  }, [adminId]);

  // Function to Fetch Market Data Using Socket
  useEffect(() => {
    if (serverURL) {
      const socket = io(serverURL, {
        query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET_KEY },
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        socket.emit("request-data", symbols);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("market-data", (data) => {
        if (data && data.symbol) {
          setMarketData((prevData) => ({
            ...prevData,
            [data.symbol]: {
              ...prevData[data.symbol],
              ...data,
              bidChanged:
                prevData[data.symbol] && data.bid !== prevData[data.symbol].bid
                  ? data.bid > prevData[data.symbol].bid
                    ? "up"
                    : "down"
                  : null,
            },
          }));
        } else {
          console.warn("Received malformed market data:", data);
        }
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        setError("An error occurred while receiving data");
      });

      // Cleanup function to disconnect the socket
      return () => {
        socket.disconnect();
      };
    }
  }, [serverURL, symbols]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDayName = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getFormattedDate = (date) => {
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <Box sx={{ minHeight: "100vh", color: "white", padding: "20px" }}>
      <Grid
        container
        spacing={4}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* Left Side: DateTime + Commodity Table */}
        <Grid item xs={12} md={7}>
          {/* Date and Time with Background Box */}
          <Box
            className="flex items-center justify-between bg-[#412601] rounded-lg mb-6 p-4"
            sx={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              fontWeight="bold"
              sx={{ color: "#FFF", fontSize: "2vw" }}
            >
              {dateTime.toLocaleTimeString()}
            </Typography>
            <img src={logo} alt="Logo" className="w-24 h-24 ml-5" />
            <Box className="flex flex-col items-center justify-between mr-8">
              <Typography
                fontWeight="bold"
                sx={{
                  color: "#FFF",
                  fontSize: "2vw",
                  textTransform: "uppercase",
                }}
              >
                {getDayName(dateTime)}
              </Typography>
              <Typography
                fontWeight="bold"
                sx={{ color: "#FFF", fontSize: "1.5vw" }}
              >
                {getFormattedDate(dateTime)}
              </Typography>
            </Box>
          </Box>

          {/* Commodity Table */}
          <CommodityTable commodities={commodities} />

          <Box className="flex flex-col justify-center items-center">
            <img src={aurifyLogo} alt="" className="w-60 h-18 mt-3" />
            <Typography sx={{ fontSize: "1.5vw", marginTop: "5px" }}>
              Powered by www.aurify.ae
            </Typography>
          </Box>
        </Grid>

        {/* Right Side: SpotRate and Logo */}
        <Grid item xs={12} md={5}>
          {/* SpotRate Component */}
          <SpotRate />

          {/* Buyer Seller Component */}
          <BuyerSeller />
        </Grid>
      </Grid>

      {/* News Component */}
      <NewsTicker newsItems={news} />

      {/* Conditional rendering of the modal */}
      {showLimitModal && <LimitExceededModal />}
    </Box>
  );
}

export default TvScreen;
