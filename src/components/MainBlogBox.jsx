import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
const MainBlogBox = ({ id, title, postImage, content, author, date, user }) => {
  return (
    <div className="page-body rounded boxShadow" style={{width:"fit-content",height:"fit-content"}}  >  
    <Card className="p-1 mb-2  page-body card-Body shadow text-hover" id={id} style= {{ width: "15rem"}} >
      <Card.Img variant="top" src={user.photo} className="h-100 w-100" />
      <Card.Body className="p-1 card-Body">
        <Card.Title style={{fontSize:"15px"}} className="py-2 text-primary">{ title}</Card.Title>
        <Card.Text style={{fontSize:"11px"}}>
          { content.substring(0,70)}
        </Card.Text>
        <Card.Footer>
          <Row className="p-0">
            <Col className="p-0">
              <Image
                src={postImage}
                roundedCircle
                style={{ height: "25px", width: "25px" }}
              />
              <span style={{ fontSize: "10px" }} className="ms-1 itim-regular">
                  {author}
                

                </span>
                <span className="ms-2" style={{fontSize:"10px"}}>
                  {date }
                </span>
          
              </Col>
           
            </Row>
          
        </Card.Footer>
      </Card.Body>
    </Card>
    </div>
  );
};

export default MainBlogBox;
