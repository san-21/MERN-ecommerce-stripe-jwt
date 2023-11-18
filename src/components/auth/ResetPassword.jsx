import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { instance } from "../../services/axiosClient";
import { useDispatch } from "react-redux";
import { setLoginOpen } from "../../redux/slices/auth/authModalReducer";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;
  const dispatch = useDispatch();
  const theme = useTheme();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 0 for client side erro and 1 for server side error
  const [errorFlag, setErrorFlag] = useState(null);

  const handleErrorMessageDisapear = () => {
    setValidationError("");
  };
  const handleHidePassword = () => {
    setShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await instance.post("/services/reset-password", {
        token,
        password,
      });
      const data = response.data;
      toast.success(data?.message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
      navigate("/");
      dispatch(setLoginOpen());
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
        onClose: handleErrorMessageDisapear,
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(password, e.target.value);
  };

  const validatePassword = (newPassword, newConfirmPassword) => {
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexNumber = /\d/;
    const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (
      newPassword.length >= 8 &&
      regexUpperCase.test(newPassword) &&
      regexLowerCase.test(newPassword) &&
      regexNumber.test(newPassword) &&
      regexSpecialChar.test(newPassword)
    ) {
      setValidationError("");
    } else {
      setValidationError(
        "Password must be at least 8 characters long and include at least one uppercase letter, lowercase letter, number and special character."
      );
    }

    if (newPassword !== newConfirmPassword) {
      setValidationError("Passwords don't match.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "500px",
          height: "500px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "400 italic",
            textAlign: "center",
            color: `${theme.palette.text[400]}`,
          }}
        >
          Reset Password
        </Typography>
        {/* form started */}
        <Box
          sx={{
            pl: 8,
            pr: 8,
            pt: 6,

            "& .MuiInputBase-root": {
              height: "47px",
              border: "none",
            },
            "& .MuiOutlinedInput-input": {
              height: "15px",
              border: "none",
            },
          }}
        >
          <form method="post" onSubmit={handleResetPassword}>
            <FormControl
              fullWidth
              sx={{
                mt: 2,
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: `${theme.palette.text[600]}`,
                }}
              >
                Password
              </label>

              <TextField
                onChange={handlePasswordChange}
                position="relative"
                required
                id="outlined-basic"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                sx={{ marginTop: 1 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 27,
                  bottom: 0,
                }}
              >
                {!showPassword && (
                  <IconButton
                    onClick={handleShowPassword}
                    sx={{
                      "&:hover": {
                        color: `${theme.palette.indigo[500]}`,
                      },
                    }}
                  >
                    <VisibilityOffOutlinedIcon />
                  </IconButton>
                )}
                {showPassword && (
                  <IconButton
                    onClick={handleHidePassword}
                    sx={{
                      "&:hover": {
                        color: `${theme.palette.blue[500]}`,
                      },
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                )}
              </Box>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                mt: 2,
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: `${theme.palette.text[600]}`,
                }}
              >
                Confirm Password
              </label>

              <TextField
                onChange={handleConfirmPasswordChange}
                position="relative"
                required
                id="outlined-basic"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                sx={{ marginTop: 1 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 27,
                  bottom: 0,
                }}
              ></Box>
            </FormControl>
            {isSuccess && (
              <Box
                sx={{
                  width: "95%",
                  height: "40px",
                  border: `1px solid ${theme.palette.green[600]}`,
                  borderRadius: "6px",

                  color: `${theme.palette.green[600]}`,
                  textAlign: "center",
                  p: 1,
                }}
              >
                <Typography>{successMessage}</Typography>
              </Box>
            )}
            {validationError && (
              <Box
                sx={{
                  width: "95%",
                  height: "auto",
                  border: `1px solid ${theme.palette.red[600]}`,
                  borderRadius: "6px",
                  mt: 3,
                  color: `${theme.palette.red[600]}`,
                  textAlign: "center",
                  p: 1,
                }}
              >
                <Typography sx={{ fontSize: "11px" }}>
                  {validationError}
                </Typography>
              </Box>
            )}
            <Button
              disabled={loading}
              type="submit"
              variant="outlilned"
              fullWidth
              sx={{
                height: "48px",
                mt: 3,
                mb: 2,
                fontSize: "15px",
                textTransform: "capitalize",
                color: `${theme.palette.white[500]}`,
                backgroundColor: `${theme.palette.indigo[500]}`,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: `${theme.palette.indigo[600]}`,
                },
              }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                " Change Password"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
