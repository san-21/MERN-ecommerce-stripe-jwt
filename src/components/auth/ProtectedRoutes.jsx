import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const userAuthenticated = useSelector(
    (state) => state.authenticated.userAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [userAuthenticated, navigate]);

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ProtectedRoutes;
