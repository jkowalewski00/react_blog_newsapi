import { MDBBadge } from 'mdb-react-ui-kit';
import React from 'react';

interface Types{
    children:number,
    styleInfo:string
}

const Badge = ({ children, styleInfo}:Types) => {
    const colorKey:any = {
        "Cat1": "primary",
        "Cat2": "success",
        "Cat3": "danger",
        "Cat4": "warning",
        "Cat5": "info",
        "Cat6": "dark"
    }

    // return(
    //     <h5 style={styleInfo}>
    //         <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    //     </h5>
    // )
}

export default Badge;