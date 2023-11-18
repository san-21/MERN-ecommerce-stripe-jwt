import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { correctEmail } from "../../validate/AuthValidation";
import { instance } from "../../services/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setForgotPasswordClose } from "../../redux/slices/auth/authModalReducer";
import { useTheme } from "@emotion/react";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const open = useSelector((state) => state.authModal.forgotPasswordOpen);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 0 for client side erro and 1 for server side error
  const [errorFlag, setErrorFlag] = useState(null);

  // Email Validation
  const isEmail = [email].every(Boolean);
  const handleErrorMessageDisapear = () => {
    setErrorMessage("");
  };
  const handleFogotPassword = async (e) => {
    e.preventDefault();
    if (isEmail) {
      if (correctEmail(email)) {
        setLoading(true);
        try {
          const response = await instance.post("/services/forgot-password", {
            email,
          });
          const data = await response.data;

          setIsSuccess(true);
          setSuccessMessage(data?.message);
          toast.success(data?.message, {
            autoClose: 1500,
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
        } catch (error) {
          setErrorFlag(1);
          setIsSuccess(false);
          toast.error(error?.response?.data.message, {
            autoClose: 1500,
            position: toast.POSITION.TOP_RIGHT,
            onClose: handleErrorMessageDisapear,
          });
          setErrorMessage(error?.response?.data.message);
          setLoading(false);
        }
      } else {
        setErrorFlag(0);
        setErrorMessage("Email To short or Format Not correct");
      }
    } else {
      setErrorFlag(0);
      setErrorMessage("Enter Email Address ");
    }
  };

  useEffect(() => {
    if (errorMessage && errorFlag === 0) {
      toast.warning(errorMessage, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
        onClose: handleErrorMessageDisapear,
      });
    }
  }, [errorMessage]);
  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  }, [isSuccess]);

  const handleForgotPasswordClose = () => {
    if (loading) {
      setLoading(false);
      setErrorFlag(0);
      setErrorMessage("Request cancel by user");
    }
    dispatch(setForgotPasswordClose());
  };
  return (
    <Dialog
      disableEscapeKeyDown
      fullScreen={fullScreen}
      open={open}
      onClose={handleForgotPasswordClose}
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
          height: "500px",
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
          <IconButton onClick={handleForgotPasswordClose}>
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
          variant="h6"
          sx={{
            fontWeight: "400 italic",
            textAlign: "center",
            color: `${theme.palette.text[400]}`,
          }}
        >
          Enter your Email to reset
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
          <form method="post" onSubmit={handleFogotPassword}>
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
                type="text"
                sx={{ marginTop: 1, mb: 3 }}
              />
            </FormControl>
            {isSuccess && (
              <Box
                sx={{
                  width: "95%",
                  height: "60px",
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
            {errorMessage && (
              <Box
                sx={{
                  width: "95%",
                  height: "60px",
                  border: `1px solid ${theme.palette.red[600]}`,
                  borderRadius: "6px",

                  color: `${theme.palette.red[600]}`,
                  textAlign: "center",
                  p: 1,
                }}
              >
                <Typography>{errorMessage}</Typography>
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
                <CircularProgress thickness={5} color="inherit" size={30} />
              ) : (
                " Send Email"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ForgotPassword;
