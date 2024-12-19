import React, { useState } from "react";
import { Button, Modal, Container, Form } from "react-bootstrap";
import axios from "axios";
import Loader from "../utils/Loader";
import { RiGeminiFill } from "react-icons/ri";
const OpenAi = ({ show, handleClose }) => {
    const [ques, setQues] = useState("");
    const [ans, setAns] = useState("");
    const [loading, setLoading] = useState(false);

    const generateGeminiAns = async () => {
        setLoading(true);
        const res = await axios({
          url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA31pXQ9bnHYmkU8qcTP33AlQH2dtfPRvs",
          method: "post",
          data: {
            contents: [
              {
                parts: [
                  {
                    text: ques,
                  },
                ],
              },
            ],
          },
        });
        setLoading(false);
        setAns(res.data.candidates[0].content.parts[0].text);
      };
  return (
    <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Gemini</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container style={{ overflow: "auto" }} className="rounded">
        <RiGeminiFill />
        <pre className="p-3 poppins-semibold" style={{ height: "17rem", whiteSpace: "pre-wrap" }}>
          {loading ? <Loader /> : ans}
        </pre>
      </Container>
      <Container className="mt-2 itim-regular rounded">
        <Form>
          <Form.Group>
            <Form.Label>Question:</Form.Label>
            <Form.Control
              value={ques}
              onChange={(e) => setQues(e.target.value)}
              type="text"
              placeholder="Ask your question"
            />
          </Form.Group>
          <Button onClick={generateGeminiAns} disabled={loading} variant="outline-primary" className="mt-2">
            Generate
          </Button>
        </Form>
      </Container>
    </Modal.Body>
  </Modal>
  )
}

export default OpenAi