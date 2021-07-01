import React, { useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router-dom";

import { AppBar } from "@material-ui/core";

import DeskTopNav from "./DeskTopNav";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [mobileDrawer, setMobileDrawer] = useState({
    drawerOpen: false,
    mobileView: false,
  });

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900 && window.innerWidth > 100
        ? setMobileDrawer((prevState) => ({ ...prevState, mobileView: true }))
        : setMobileDrawer((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();

    window.addEventListener("resize", setResponsiveness);
  }, []);



  return (
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    //     <a className="navbar-brand" href="/dashboard">Quizzo</a>
    //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarColor01">
    //         <ul className="navbar-nav mr-auto">
    //           <li className="nav-item" style={{marginRight:"5%"}}>
    //             <Link to="/" >
    //               <button className="btn btn-success">Home</button>
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/about">
    //               <button className="btn btn-success">About</button>
    //             </Link>
    //           </li>
    //         </ul>

    //         {
    //           user?(
    //             <>
    //             <Link to="/profile" style={{marginRight:"5%"}} >
    //               <button className="btn btn-success">Profile</button>
    //             </Link>
    //             <button onClick={logout} className="btn btn-secondary">Logout</button>
    //             </>
    //           ):null
    //         }
    //     </div>
    // </nav>
    <AppBar position="fixed">
      {mobileDrawer.mobileView ? (
        <MobileNav
          mobileDrawer={mobileDrawer}
          setMobileDrawer={setMobileDrawer}
        />
      ) : (
        <DeskTopNav />
      )}
    </AppBar>
  );
};

export default Header;
