import React from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button
} from "reactstrap";
import Question from "./Question";

const AccordionSection = ({
  accordionData,
  index,
  editableAccordionIndex,
  handleSave,
}) => {
  return (
    <div key={accordionData.id}>
      <AccordionItem>
        <AccordionHeader
          targetId={`${accordionData.id}`}
        >{`${accordionData.title} ${accordionData.id + 1}`}</AccordionHeader>
        <AccordionBody accordionId={`${accordionData.id}`}>
          {accordionData.questions.map((ques, innerIndex) => (
            <div key={innerIndex}>
              <Question
                ques={ques}
                index={index}
                accordionData={accordionData}
              />
            </div>
          ))}
          {editableAccordionIndex === index && (
            <div className="d-flex">
              <Button
                color="success"
                className="mx-1"
                onClick={() => {
                  handleSave(editableAccordionIndex);
                }}
              >
                Save
              </Button>
              <Button color="danger">Cancel</Button>
            </div>
          )}
        </AccordionBody>
      </AccordionItem>
    </div>
  );
};

export default AccordionSection;
