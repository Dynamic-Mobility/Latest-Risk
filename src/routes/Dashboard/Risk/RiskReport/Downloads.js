import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Downloads = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className="space-y-2">
        <Typography
          sx={{ color: "primary.main" }}
          fontWeight={"bold"}
          fontSize={"20px"}
        >
          Uploaded Files
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <Box className="bg-white shadow-2xl rounded-xl py-4 px-2 space-y-4">
              <Box className="flex items-center justify-between">
                <FileCopyIcon sx={{ color: "primary.main" }} />
                <div>
                  <MoreVertIcon
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer"
                  />
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Download</MenuItem>
                    <MenuItem onClick={handleClose}>Open</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Typography>filename.pdf</Typography>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box className="bg-white shadow-2xl rounded-xl py-4 px-2 space-y-4">
              <Box className="flex items-center justify-between">
                <FileCopyIcon sx={{ color: "primary.main" }} />
                <div>
                  <MoreVertIcon
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer"
                  />
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Download</MenuItem>
                    <MenuItem onClick={handleClose}>Open</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Typography>filename.pdf</Typography>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box className="bg-white shadow-2xl rounded-xl py-4 px-2 space-y-4">
              <Box className="flex items-center justify-between">
                <FileCopyIcon sx={{ color: "primary.main" }} />
                <div>
                  <MoreVertIcon
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer"
                  />
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Download</MenuItem>
                    <MenuItem onClick={handleClose}>Open</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Typography>filename.pdf</Typography>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box className="bg-white shadow-2xl rounded-xl py-4 px-2 space-y-4">
              <Box className="flex items-center justify-between">
                <FileCopyIcon sx={{ color: "primary.main" }} />
                <div>
                  <MoreVertIcon
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer"
                  />
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Download</MenuItem>
                    <MenuItem onClick={handleClose}>Open</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Typography>filename.pdf</Typography>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box className="bg-white shadow-2xl rounded-xl py-4 px-2 space-y-4">
              <Box className="flex items-center justify-between">
                <FileCopyIcon sx={{ color: "primary.main" }} />
                <div>
                  <MoreVertIcon
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer"
                  />
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Download</MenuItem>
                    <MenuItem onClick={handleClose}>Open</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Typography>filename.pdf</Typography>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box className="bg-white shadow-2xl rounded-xl py-4 px-2 space-y-4">
              <Box className="flex items-center justify-between">
                <FileCopyIcon sx={{ color: "primary.main" }} />
                <div>
                  <MoreVertIcon
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer"
                  />
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Download</MenuItem>
                    <MenuItem onClick={handleClose}>Open</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Typography>filename.pdf</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Downloads;
