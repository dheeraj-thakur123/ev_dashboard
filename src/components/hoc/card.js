import React from "react"

import { Card,CardBody, CardHeader, CardText, CardTitle } from "reactstrap"
const CustomCard = React.memo(({title,data}) =>{

    return (
        <Card
        className="my-2"
        color="success"
        inverse
        style={{
          width: '18rem'
        }}
      >
        <CardBody>
          <CardTitle tag="h5">
            {title?title:''}    
          </CardTitle>
          <CardText>
           {data?data:''}
          </CardText>
        </CardBody>
      </Card>
    )
});
export default CustomCard;