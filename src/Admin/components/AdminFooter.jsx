import React from "react";
import '../Admin.css'

const AdminFooter = () => {

    const currentYear = new Date().getFullYear();

    return(
        <footer className="main-footer">
        <strong> Copyright {currentYear} MicroHub.</strong>{" "}
        All Rights Reserved.
    </footer>
    );
}


export default AdminFooter;