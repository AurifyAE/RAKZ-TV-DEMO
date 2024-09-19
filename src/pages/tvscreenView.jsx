import React, { useCallback, useEffect, useState, useRef } from "react";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import LimitExceededModal from "../components/LimitExceededModal";
import SpotRate from "../components/SpotRate";
import CommodityTable from "../components/CommodityTable";
import NewsTicker from "../components/News";
import logo from "../assets/logo.png";
import Clock from "../components/Clock";
import BuyerSeller from "../components/BuyerSeller";
import {
  fetchSpotRates,
  fetchServerURL,
  fetchNews,
  fetchTVScreenData,
} from "../api/api";
import io from "socket.io-client";
import { useSpotRate } from "../context/SpotRateContext";

const SECRET_KEY = "aurify@123";
const DEFAULT_SYMBOLS = ["GOLD", "SILVER"];

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
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
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
        // console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    // Fetch TV screen data (you can leave this as a separate call)
    fetchTVScreenData(adminId)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          // Allow TV screen view
          setShowLimitModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setShowLimitModal(true); // Show the modal on 403 status
        } else {
          // console.error("Error:", error.message);
          alert("An unexpected error occurred.");
        }
      });
  }, [adminId]);

  // Function to Fetch Market Data Using Socket
  // useEffect(() => {
  //   if (serverURL) {
  //     const socket = io(serverURL, {
  //       query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET_KEY },
  //       transports: ["websocket"],
  //       withCredentials: true,
  //     });

  //     socket.on("connect", () => {
  //       // console.log("Connected to WebSocket server");
  //       socket.emit("request-data", symbols);
  //     });

  //     socket.on("disconnect", () => {
  //       // console.log("Disconnected from WebSocket server");
  //     });

  //     socket.on("market-data", (data) => {
  //       if (data && data.symbol) {
  //         setMarketData((prevData) => ({
  //           ...prevData,
  //           [data.symbol]: {
  //             ...prevData[data.symbol],
  //             ...data,
  //             bidChanged:
  //               prevData[data.symbol] && data.bid !== prevData[data.symbol].bid
  //                 ? data.bid > prevData[data.symbol].bid
  //                   ? "up"
  //                   : "down"
  //                 : null,
  //           },
  //         }));
  //       } else {
  //         console.warn("Received malformed market data:", data);
  //       }
  //     });

  //     socket.on("error", (error) => {
  //       // console.error("WebSocket error:", error);
  //       setError("An error occurred while receiving data");
  //     });

  //     // Cleanup function to disconnect the socket
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [serverURL, symbols]);

  // Function to connect to WebSocket after server URL is fetched
  const connectSocket = useCallback(() => {
    console.log("count");
    if (!serverURL) return;

    console.log("Connecting to WebSocket server:", serverURL);

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(serverURL, {
      query: { secret: SECRET_KEY },
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket server");
      socketRef.current.emit("request-data", symbols);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      // Attempt to reconnect
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = setInterval(connectSocket, 5000);
    });

    socketRef.current.on("market-data", (data) => {
      // console.log(data);

      if (data && data.symbol) {
        // Update the market data state by merging with previous data
        setMarketData((prevData) => ({
          ...prevData,
          [data.symbol]: {
            ...prevData[data.symbol], // Keep the existing data for the symbol
            ...data, // Overwrite with new data from the event
            bidChanged:
              prevData[data.symbol] && data.bid !== prevData[data.symbol].bid
                ? data.bid > prevData[data.symbol].bid
                  ? "up"
                  : "down"
                : null, // Track bid change direction
          },
        }));
      } else {
        console.warn("Received malformed market data:", data);
      }
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });
  }, [serverURL, symbols]);

  useEffect(() => {
    if (serverURL) {
      connectSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectSocket]);

  const refreshData = useCallback(() => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("request-data", symbols);
    } else {
      connectSocket();
    }
  }, [symbols, connectSocket]);

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
        {/* Side: SpotRate and Logo */}
        <Grid item xs={12} md={5}>
          {/* World Clock */}
          <Clock />

          {/* SpotRate Component */}
          <SpotRate />

          {/* Buyer Seller Component */}
          {/* <BuyerSeller /> */}
        </Grid>

        {/* Side: DateTime + Commodity Table */}
        <Grid item xs={12} md={7}>
          {/* Date and Time with Background Box */}
          <Box
            className="flex flex-col items-center rounded-lg mb-6 p-5"
            sx={{
              boxShadow: "0px 5px 10px rgba(200, 200, 205, 0.4)",
              borderRadius: "35px",
            }}
          >
            <Box
              className="flex items-center justify-between rounded-lg"
              sx={{ width: "100%" }}
            >
              <Typography
                fontWeight="bold"
                sx={{ color: "#FFFFFF", fontSize: "2vw" }}
              >
                {dateTime.toLocaleTimeString()}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={logo} alt="Logo" className="w-28 h-28 ml-5" />
              </Box>
              <Box className="flex flex-col items-center justify-between mr-8">
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "2vw",
                    textTransform: "uppercase",
                  }}
                >
                  {getDayName(dateTime)}
                </Typography>
                <Typography
                  fontWeight="bold"
                  sx={{ color: "#FFFFFF", fontSize: "1.5vw" }}
                >
                  {getFormattedDate(dateTime)}
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{ fontSize: "3vw", fontWeight: "600", color: "#D8BE70" }}
            >
              RAKZ GOLD & DIAMOND
            </Typography>
          </Box>

          {/* Commodity Table */}
          <CommodityTable commodities={commodities} />

          <Box className="flex flex-col justify-center items-center">
            {/* <img src={aurifyLogo} alt="" className="w-12 h-12 mt-4" /> */}
            <Typography sx={{ fontSize: "1.5vw", marginTop: "15px" }}>
              Powered by www.aurify.ae
            </Typography>
          </Box>
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
