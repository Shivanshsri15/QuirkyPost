import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
const MainBlogBox = ({ id, title, postImage, content, author, date, user }) => {
  return (
    <div className="page-body rounded boxShadow" style={{width:"fit-content",height:"fit-content"}}  >  
    <Card className="p-1 mb-2  page-body card-Body shadow text-hover" id={id} style= {{ width: "15rem"}} >
      <Card.Img variant="top" src={postImage} className="h-100 w-100" />
      <Card.Body className="p-1 card-Body">
        <Card.Title style={{fontSize:"15px"}} className="py-2 text-primary">{ title}</Card.Title>
        <Card.Text style={{fontSize:"11px"}}>
          { content.substring(0,70)}
        </Card.Text>
        <Card.Footer>
          <Row className="p-0">
            <Col className="p-0">
              <Image
                src={user.photo}
                roundedCircle
                style={{ height: "25px", width: "25px" }}
              />
              <span style={{ fontSize: "12px" }} className="ms-1 itim-regular">
                  {author}
                

                </span>
                <p className="ms-5 ps-5 pt-3 mb-0 text-end" style={{fontSize:"10px"}}>
                  {date }
                </p>
          
              </Col>
           
            </Row>
          
        </Card.Footer>
      </Card.Body>
    </Card>
    </div>
  );
};

export default MainBlogBox;
