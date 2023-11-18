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
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

// import GoogleIcon from "@mui/icons-material/Google";
// import LogInButton from "./Buttons/LogInButton";

import { correctEmail } from "../../validate/AuthValidation";
import {
  setLoginOpen,
  setSignupClose,
} from "../../redux/slices/auth/authModalReducer";
import { useDispatch, useSelector } from "react-redux";

import { instance } from "../../services/axiosClient";
import { toast } from "react-toastify";

const handleSuccessToastify = () => {
  toast.success("Registered Suucessfullly", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 400,
  });
};
const handleErrorToastify = () => {
  toast.error("Registration Failed", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 400,
  });
};
const handleWarningToastify = () => {
  toast.warning("Fill Credential Correctly", {
    position: toast.POSITION.TOP_LEFT,
    delay: 1000,
  });
};

const SignUp = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.authModal.signupOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(user);

  const navigateToSignin = () => {
    dispatch(setSignupClose());
    dispatch(setLoginOpen());
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      user.fullname.length > 6 &&
      user.email.length !== 0 &&
      user.password.length > 7 &&
      correctEmail(user.email)
    ) {
      try {
        const response = await instance.post(
          "/auth/register",
          {
            fullname: user.fullname,
            email: user.email,
            password: user.password,
          }
          // {
          //   withCredentials: true,
          // }
        );
        const result = await response.data;

        setSuccess(result?.message);
        console.log(result.message);
        console.log(result.data);

        setTimeout(() => {
          setSuccess(null);
        }, 3000);
        setIsLoading(false);
        setError(false);
        setUser({
          fullname: "",
          email: "",
          password: "",
        });
        handleSuccessToastify();
        dispatch(setSignupClose());
        dispatch(setLoginOpen());
      } catch (error) {
        handleErrorToastify();
        console.log(error);
        setIsLoading(false);
        setError(true);
        setErrorMessage(error.response?.data.message);
      }
    }
    try {
      if (user.password.length < 8) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
        setErrorMessage("Password must be at least 7 characters");
      }
      if (user.fullname.length < 6) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
        setErrorMessage("Name must be at least 6 characters");
      }
      if (!correctEmail(user.email)) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
        setErrorMessage("Email must be correct format");
      }
      if (user.email.length < 3) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
        setErrorMessage("Email must be more character");
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setErrorMessage(error.response?.data.message);
    }
  };

  const handleSignupClose = () => {
    dispatch(setSignupClose());
  };
  return (
    <Dialog
      disableEscapeKeyDown
      fullScreen={fullScreen}
      open={open}
      onClose={handleSignupClose}
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
          height: "800px",
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
          <IconButton onClick={handleSignupClose}>
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
          <form method="post" onSubmit={handleSignup}>
            <FormControl fullWidth>
              <label
                htmlFor="fullname"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                FULLNAME
              </label>
              <TextField
                onChange={(event) =>
                  setUser({ ...user, fullname: event.target.value })
                }
                required
                id="outlined-basic"
                variant="outlined"
                name="fullname"
                type="text"
                sx={{ marginTop: 1 }}
              />
            </FormControl>
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
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
                required
                id="outlined-basic"
                variant="outlined"
                name="email"
                type="text"
                sx={{ marginTop: 2 }}
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
                onChange={(event) =>
                  setUser({ ...user, password: event.target.value })
                }
                position="relative"
                required
                id="outlined-basic"
                variant="outlined"
                name="email"
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
                    onClick={() => setShowPassword((p) => !p)}
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
                    onClick={() => setShowPassword((p) => !p)}
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
                textAlign: "center",
              }}
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                "Sign Up"
              )}
            </Button>
            {error && !isLoading && (
              <Typography color="error">{errorMessage}</Typography>
            )}
            {success && <Typography color="success">{success}</Typography>}
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
                Already have Account?
              </Typography>
              <Button
                onClick={navigateToSignin}
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
                Sign in
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

export default SignUp;
