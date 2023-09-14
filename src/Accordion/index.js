import React, { useState, useEffect } from "react";
import { Accordion } from "reactstrap";
import { initialData } from "../initial-data";
import AccordionSection from "./AccordionSection";
import DataContext from "../Context/DataContext";

const AccordionComponent = () => {
  const [open, setOpen] = useState('0');
  const [initialState, setinitialState] = useState(initialData);
  const [editableAccordionIndex, setEditableAccordionIndex] = useState(0);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };  

  const handleChangeChildToParent = (accordionId, questionId, ans) => {
    setinitialState((prevState) => {
      const newData = prevState.map((state) => {
        if (state.id === accordionId) {
          return {
            ...state,
            questions: state.questions.map((question) => {
              if (question.quesID === questionId) {
                return {
                  ...question,
                  ans: ans,
                };
              }
              return question;
            }),
          };
        }
        return state;
      });
      return newData;
    });
    setEditableAccordionIndex(accordionId)
  };

  const handleSave = (editAccordionIndex) => {
    const currentAccordion = initialState[editAccordionIndex];
    const allAnswersYesOrNA = currentAccordion.questions.every(
      (question) => question.ans === 0 || question.ans === 2
    );

    if (allAnswersYesOrNA) {
      setEditableAccordionIndex(editAccordionIndex + 1);
    }
  };

  const contextValue = {
    handleChangeChildToParent,
    open,
    editableAccordionIndex
  }

  return (
    <div>
      <DataContext.Provider value={contextValue}>
        <Accordion open={open} toggle={toggle}>
          {initialState.map((accordionData, index) => (
            <AccordionSection
              accordionData={accordionData}
              key={accordionData.id}
              index={index}
              editableAccordionIndex={editableAccordionIndex}
              handleSave={handleSave}
            />
          ))}
        </Accordion>
      </DataContext.Provider>
    </div>
  );
};

export default AccordionComponent;
