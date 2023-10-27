import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import ModuleMcq from "./ModuleMcq";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "react-responsive";

function NewModuleDescription() {
  const { course_id } = useParams();
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showModuleMcqDialog, setShowModuleMcqDialog] = useState(false);

  useEffect(() => {
    fetchModuleDetails();

    async function fetchModuleDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/modules/get?course_id=${course_id}`
        );

        if (response.data.length > 0) {
          setModules(response.data);
        } else {
          console.error("Module data not found for the course.");
          toast.error("Module data not found for the course");
        }
      } catch (error) {
        console.error("Error fetching module data:", error);
        toast.error("Error fetching module data");
      }
    }
  }, [course_id]);

  const [LocalcourseData, setLocalcourseData] = useState([]);
  useEffect(() => {
    const storedTopicData = localStorage.getItem("moduleref");
    if (storedTopicData) {
      setLocalcourseData(JSON.parse(storedTopicData));
    }
  }, []);
  console.log("karthi", LocalcourseData);

  const openModuleMcqDialog = () => {
    setSelectedModule(
      modules.find((module) => module.module_name === LocalcourseData.module_name)
    );
    setShowModuleMcqDialog(true);
  };

  const closeModuleMcqDialog = () => {
    setShowModuleMcqDialog(false);
  };

  // Define media queries for responsiveness
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const isTabletOrMobile = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });

  const breakpoints = {
    mobile: '(max-width: 767px)',
    desktop: '(min-width: 768px)',
  };

  const isMobileScreen = useMediaQuery({ query: breakpoints.mobile });


  return (
    <div>
      <div style={{ marginLeft: "", marginTop: "4%", position: "fixed" }}>
        {modules.map((module) => (
          <div key={module.id}>
            {module.module_name === LocalcourseData.module_name ? (
              <div
                className=""
                style={{
                  width: isDesktopOrLaptop ? "1100px" : "100%",
                  textAlign: "justify",
                }}
              >
                <div
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "white",
                  }}
                >
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Poppins",
                      color: "#e84393",
                      textTransform: "uppercase",
                    }}
                  >
                    {module.module_name}
                  </h1>
                </div>
                <div
                  className="row"
                  style={{
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    marginTop: "",
                    overflowY: "scroll",
                    maxHeight: isDesktopOrLaptop ? "500px" : "auto",
                  }}
                >
                  <div className="col">
                    <p
                      style={{
                        textAlign: "justify",
                        fontSize: "19px",
                        marginTop: isDesktopOrLaptop ? "8%" : "0",
                      }}
                    >
                      {module.module_desc}
                    </p>
                  </div>
                  <div className="col">
                    <img
                      src={`http://localhost:5000/${module.module_img}`}
                      alt={module.module_name}
                      style={{
                        width: "100%",
                          height: isMobileScreen ? "auto" : "auto",
                        padding: "10px",
                        pointerEvents: "none",
                        transition: "none",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{
                        background:
                          "linear-gradient(to right, #5f27cd, #e84393)",
                        width: "16%",
                        height: "45px",
                        color: "#fff",
                        border: "none",
                        marginBottom: "2%",
                      }}
                      onClick={openModuleMcqDialog}
                    >
                      Start your Test
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <Dialog
        open={showModuleMcqDialog}
        onClose={closeModuleMcqDialog}
        fullWidth
        maxWidth="md"
        TransitionComponent={Slide}
        transitionDuration={1000}
      >
        <DialogTitle>
          <h3
            style={{
              marginLeft: "34%",
              textTransform: "uppercase",
              color: "#e84393",
            }}
          >
            Module MCQ Test
          </h3>
          <hr />
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeModuleMcqDialog}
            aria-label="close"
            style={{
              position: "absolute",
              top: "8px",
              right: "4%",
              color: "red",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedModule && <ModuleMcq selectedModule={selectedModule} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewModuleDescription;
