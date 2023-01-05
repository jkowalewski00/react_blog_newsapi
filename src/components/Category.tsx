import React from "react";
import {MDBCard, MDBListGroup, MDBListGroupItem} from 'mdb-react-ui-kit';

interface CategoryTypes{
    handleCategory:any,
    options:any,
}

const Category = ({handleCategory, options} : CategoryTypes) => {
    return(
        <MDBCard style={{width: "18rem", marginTop: "20px"}}>
            <h4>Categories</h4>
            <MDBListGroup flush>
                {options.map((item:any, index:number) => (
                    <MDBListGroupItem key={index} style={{cursor: "pointer"}} onClick={() => handleCategory(item)}>
                        {item}
                    </MDBListGroupItem>
                ))}
            </MDBListGroup>
        </MDBCard>
    )
}

export default Category;