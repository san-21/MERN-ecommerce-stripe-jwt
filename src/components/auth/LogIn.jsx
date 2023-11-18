import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
// import GoogleIcon from "@mui/icons-material/Google";
// import LogInButton from "./Buttons/LogInButton";
import { useDispatch, useSelector } from "react-redux";

import {
  setForgotPasswordOpen,
  setLoginClose,
  setSignupOpen,
} from "../../redux/slices/auth/authModalReducer";
import { setToken } from "../../redux/slices/auth/authReducer";
import { useNavigate } from "react-router-dom";

import { correctEmail } from "../../validate/AuthValidation";
import { instance } from "../../services/axiosClient";
import { setUserAuthenticated } from "../../redux/slices/auth/authenticateReducer";
const LogIn = () => {
  const open = useSelector((state) => state.authModal.loginOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canLogin = [email, password].every(Boolean);
  const [rememberMe, setRememberMe] = useState(false);
  console.log(email, password);
  const handleHidePassword = () => {
    setShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword(true);
  };
  const handleRememberMe = () => {
    setRememberMe((rememberMe) => !rememberMe);
  };
  const handleLoginClose = () => {
    dispatch(setLoginClose());
  };

  const navigateToSignup = () => {
    dispatch(setLoginClose());
    dispatch(setSignupOpen());
  };
  const handleSignin = async (e) => {
    e.preventDefault();

    if (canLogin) {
      setIsLoading(true);
      if (email.length < 3) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setErrMessage("Email must be more character");
      }
      if (!correctEmail(email)) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setErrMessage("Email must be in correct format");
      }
      if (password.length < 8) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setErrMessage("Password must be at least 7 characters");
      }
      if (email.length !== 0 && password.length > 7) {
        try {
          const response = await instance.post("/auth/login", {
            email,
            password,
            rememberMe,
          });

          setIsLoading(false);
          const { token, message } = response.data;

          console.log(message, token);
          dispatch(setUserAuthenticated());
          dispatch(setLoginClose());
          navigate("/");
          dispatch(setToken({ token: token }));
        } catch (error) {
          setIsLoading(false);
          setError(true);
          setErrMessage(error?.response?.data.message);
          setTimeout(() => {
            setError(false);
          }, 4000);
          console.log(error?.message);
        }
      }
    }
  };

  const handleForgotPassword = () => {
    dispatch(setLoginClose());
    dispatch(setForgotPasswordOpen());
  };
  return (
    <Dialog
      disableEscapeKeyDown
      fullScreen={fullScreen}
      open={open}
      onClose={handleLoginClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "6px",
        },
        "& .MuiBackdrop-root": {},
      }}
    >
      <Box
        sx={{
          width: "500px",
          height: "700px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            pr: 2,
            pt: 1,
          }}
        >
          <IconButton onClick={handleLoginClose}>
            <CloseIcon
              fontSize="medium"
              sx={{
                fontWeight: 300,
                color: `${theme.palette.text[400]}`,
              }}
            />
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "400 italic",
            textAlign: "center",
            color: `${theme.palette.text[400]}`,
          }}
        >
          Welcome
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
          <form method="post" onSubmit={handleSignin}>
            <FormControl fullWidth>
              <label
                htmlFor="email"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                EMAIL
              </label>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                required
                id="outlined-basic"
                variant="outlined"
                name="email"
                type="email"
                sx={{ marginTop: 1 }}
              />
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
                }}
              >
                PASSWORD
              </label>

              <TextField
                onChange={(e) => setPassword(e.target.value)}
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
            <Button
              onClick={handleForgotPassword}
              disableFocusRipple
              disableElevation
              sx={{
                color: `${theme.palette.indigo[500]}`,
                fontSize: "12px",
                fontWeight: "500 italic",
                textTransform: "capitalize",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: `${theme.palette.background[500]}`,
                  color: `${theme.palette.indigo[700]}`,
                },
              }}
            >
              Forgot password?
            </Button>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Checkbox
                checked={rememberMe}
                sx={{
                  color: `${theme.palette.text[400]}`,
                  "&.Mui-checked": {
                    color: `${theme.palette.indigo[500]}`,
                  },
                }}
                onChange={handleRememberMe}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: `${theme.palette.text[400]}`,
                }}
              >
                Remember Me
              </Typography>
            </Box>
            <Button
              disabled={isLoading}
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
              {isLoading ? (
                <CircularProgress
                  sx={{
                    color: `${theme.palette.background[500]}`,
                  }}
                  size={30}
                />
              ) : (
                "Sign In"
              )}
            </Button>
            {err && errMessage && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: `${theme.palette.red[500]}`,
                  fontSize: "16px",
                }}
              >
                {errMessage}
              </Typography>
            )}
          </form>
          <Divider
            sx={{
              fontSize: "14px",
              fontWeight: 300,
            }}
          >
            or
          </Divider>

          {/* login option start here */}
          {/* <Box
            sx={{
              mt: 2,
              "& .MuiButton-startIcon": {},
              "& .MuiButtonBase-root": {},
            }}
          >
            <LogInButton
              title="Continue with Google"
              imgUrl="https://img.icons8.com/fluency/48/google-logo.png"
              altTitle="google-logo"
            />
            <LogInButton
              title="Continue with Facebook"
              imgUrl="https://img.icons8.com/fluency/48/facebook.png"
              altTitle="facebook-logo"
            />
            <LogInButton
              title="Continue with Apple"
              imgUrl="https://img.icons8.com/ios-glyphs/30/mac-os.png"
              altTitle="apple-logo"
            />
          </Box> */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: `${theme.palette.text[600]}`,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: `${theme.palette.text[400]}`,
                }}
              >
                New To This Site?
              </Typography>
              <Button
                onClick={navigateToSignup}
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",

                  textDecoration: "underline",
                  color: `${theme.palette.indigo[500]}`,
                  "&:hover": {
                    color: `${theme.palette.indigo[700]}`,
                    textDecoration: "underline",
                    backgroundColor: `${theme.palette.background[500]}`,
                  },
                }}
              >
                Sign up
              </Button>
            </Box>
            <Divider />
            <Typography
              sx={{
                p: 2,
                textAlign: "center",
                mt: 4,
                fontSize: "13px",
              }}
            >
              This site is protected by reCAPTCHA Enterprise and the Google{" "}
              <a
                style={{
                  color: `${theme.palette.text[400]}`,
                }}
                href="#"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                style={{
                  color: `${theme.palette.text[400]}`,
                }}
                href="#"
              >
                Terms of Service
              </a>{" "}
              apply.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LogIn;
