import React, { useContext } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import DataContext from "../Context/DataContext";

const Question = ({ ques, index, accordionData }) => {
    
  const { handleChangeChildToParent, open, editableAccordionIndex } =
    useContext(DataContext);
  return (
    <Row className="flex-column w-75">
      <Col lg="12" className="d-flex">
        <p className="mb-0">
          <strong>Q</strong>
          {`${ques.quesID}. ${ques.question}`}
        </p>
      </Col>
      <Col lg="12" className="my-1">
        <div className="w-50 ms-5 d-flex justify-content-between">
          {["Yes", "No", "NA"].map((radio, radioIndex) => (
            <FormGroup key={radioIndex}>
              <Input
                id={`radio-${accordionData.id}${ques.quesID}${radioIndex}`}
                disabled={
                  editableAccordionIndex < index &&
                  editableAccordionIndex !== index
                }
                checked={open == accordionData.id && ques.ans === radioIndex}
                value={radioIndex}
                name={`radio-${ques.quesID}`}
                onChange={() => {
                  handleChangeChildToParent(
                    accordionData.id,
                    ques.quesID,
                    radioIndex
                  );
                }}
                type="radio"
              />{" "}
              <Label
                for={`radio-${accordionData.id}${ques.quesID}${radioIndex}`}
              >
                {radio}
              </Label>
            </FormGroup>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default Question;
