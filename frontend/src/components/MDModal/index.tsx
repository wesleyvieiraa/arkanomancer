import React from "react";
import { Modal, Box, Typography, Button, Backdrop } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
};

const MDModal: React.FC<ReusableModalProps> = ({ open, onClose, title, children, footer }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <MDBox sx={style} bgColor="dark">
        <MDTypography variant="h6" component="h2">
          {title}
        </MDTypography>
        <MDBox mt={2}>{children}</MDBox>
        {footer && (
          <MDBox mt={3} display="flex" justifyContent="center">
            {footer}
          </MDBox>
        )}
      </MDBox>
    </Modal>
  );
};

export default MDModal;
