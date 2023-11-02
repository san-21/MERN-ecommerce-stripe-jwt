import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import GoogleIcon from "@mui/icons-material/Google";
import LogInButton from "./Buttons/LogInButton";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import {
  setDialogClose,
  setLoginDialogOpen,
} from "../../redux/slices/authModalSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const isRegisterDialogOpen = useSelector(
    (state) => state.authModal.registerDialogOpen
  );
  const registerError = useSelector((state) => state.auth.registerError);
  const registerStatus = useSelector((state) => state.auth.registerStatus);
  const _id = useSelector((state) => state.auth._id);

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);

  const handleHidePassword = () => {
    setShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
    dispatch(setLoginDialogOpen());
  };
  const handleRegisterDialogClose = () => {
    dispatch(setDialogClose());
  };
  useEffect(() => {
    if (registerStatus === "success") {
      dispatch(setDialogClose());
      dispatch(setLoginDialogOpen());
    }
  }, [registerStatus]);
  return (
    <Dialog
      backdropClick
      disableEscapeKeyDown
      fullScreen={fullScreen}
      open={isRegisterDialogOpen}
      onClose={handleRegisterDialogClose}
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
          height: "100vh",
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
          <IconButton onClick={handleRegisterDialogClose}>
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
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <label
                htmlFor="name"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                NAME
              </label>
              <TextField
                required
                placeholder="your name"
                id="outlined-basic"
                variant="outlined"
                name="name"
                type="text"
                sx={{ marginTop: 1 }}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                mt: 2,
              }}
            >
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
                required
                placeholder="name@email.com"
                id="outlined-basic"
                variant="outlined"
                name="email"
                type="email"
                sx={{ marginTop: 1 }}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                position="relative"
                required
                placeholder="Enter your password"
                id="outlined-basic"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                sx={{ marginTop: 1 }}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                        color: `${theme.palette.primary[500]}`,
                      },
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                )}
              </Box>
            </FormControl>

            <Button
              variant="outlilned"
              fullWidth
              type="submit"
              sx={{
                height: "48px",
                mt: 3,
                mb: 2,
                fontSize: "15px",
                textTransform: "capitalize",
                color: `${theme.palette.common.white}`,
                backgroundColor: `${theme.palette.indigo[500]}`,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: `${theme.palette.indigo[600]}`,
                },
              }}
            >
              {registerStatus === "pending" ? (
                <CircularProgress
                  sx={{
                    color: theme.palette.common.white,
                  }}
                />
              ) : (
                "Register"
              )}
            </Button>
          </form>
          {registerStatus === "rejected" && (
            <Typography
              sx={{
                fontWeight: "400 italic",
                textAlign: "center",
                color: `${theme.palette.warning.main}`,
                mb: 2,
              }}
            >
              {registerError?.error.message}
            </Typography>
          )}
          {registerStatus === "pending" && (
            <Typography
              sx={{
                fontWeight: "400 italic",
                textAlign: "center",
                color: `${theme.palette.warning.main}`,
                mb: 2,
              }}
            >
              Registering.....
            </Typography>
          )}
          {registerStatus === "success" && (
            <Typography
              sx={{
                fontWeight: "400 italic",
                textAlign: "center",
                color: `${theme.palette.green[500]}`,
                mb: 2,
              }}
            >
              Successfully registered!
            </Typography>
          )}
          <Typography
            sx={{
              color: "warnings",
            }}
          ></Typography>
          <Divider
            sx={{
              fontSize: "14px",
              fontWeight: 300,
            }}
          >
            or
          </Divider>

          {/* login option start here */}
          <Box
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
          </Box>
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
                Already Have Account?
              </Typography>
              <Button
                onClick={() => {
                  dispatch(setDialogClose());
                  dispatch(setLoginDialogOpen());
                }}
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
                Sign In
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
              <Button
                style={{
                  color: `${theme.palette.text[400]}`,
                  textDecoration: "underline",
                  textTransform: "capitalize",
                }}
              >
                Privacy Policy
              </Button>{" "}
              and{" "}
              <Button
                style={{
                  color: `${theme.palette.text[400]}`,
                  textDecoration: "underline",
                  textTransform: "capitalize",
                }}
              >
                Terms of Service
              </Button>{" "}
              apply.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Register;
