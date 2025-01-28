import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface StepOneData {
  phone: string;
  organizerType: string;
  fullName: string;
  email: string;
  website: string;
  photo: string;
}

interface StepTwoData {
  oppotunityName: string;
  categories: string;
  opportunityType: string;
  assistanceType: string;
  target: string | number;
  region: string;
  adress: string;
  startDate: Date | null;
  endDate: Date | null;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  startPeriod: string;
  endPeriod: string;
  timeDemands: string;
  requiredMaterialsSkills: string;
}

type DocumentType = {
  file: File | null;
  id: number;
};

interface StepThreeData {
  firstFile: File | null;
  secondFile: File | null;
  documents: DocumentType[];
}

interface OpportunityContextType {
  stepOneData: StepOneData;
  setStepOneData: React.Dispatch<React.SetStateAction<StepOneData>>;
  stepTwoData: StepTwoData;
  setStepTwoData: React.Dispatch<React.SetStateAction<StepTwoData>>;
  stepThreeData: StepThreeData;
  setStepThreeData: React.Dispatch<React.SetStateAction<StepThreeData>>;
}

const OpportunityContext = createContext<OpportunityContextType | undefined>(
  undefined,
);

const initialStepOneData: StepOneData = {
  organizerType: '',
  fullName: '',
  email: '',
  phone: '',
  website: '',
  photo: '',
};

const initialStepTwoData: StepTwoData = {
  oppotunityName: '',
  categories: '',
  opportunityType: '',
  assistanceType: '',
  target: '',
  region: '',
  adress: '',
  startDate: null,
  endDate: null,
  startHour: '',
  startMinute: '',
  endHour: '',
  endMinute: '',
  startPeriod: '',
  endPeriod: '',
  timeDemands: '',
  requiredMaterialsSkills: '',
};

const initialStepThreeData: StepThreeData = {
  firstFile: null,
  secondFile: null,
  documents: [{ file: null, id: 1 }],
};

export const OpportunityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stepOneData, setStepOneData] = useLocalStorage<StepOneData>(
    'stepOneData',
    initialStepOneData,
  );

  const [stepTwoData, setStepTwoData] = useLocalStorage<StepTwoData>(
    'stepTwoData',
    initialStepTwoData,
  );

  const [stepThreeData, setStepThreeData] = useLocalStorage<StepThreeData>(
    'stepThreeData',
    initialStepThreeData,
  );

  const value = useMemo(
    () => ({
      stepOneData,
      setStepOneData: setStepOneData as React.Dispatch<
        React.SetStateAction<StepOneData>
      >,
      stepTwoData,
      setStepTwoData: setStepTwoData as React.Dispatch<
        React.SetStateAction<StepTwoData>
      >,
      stepThreeData,
      setStepThreeData: setStepThreeData as React.Dispatch<
        React.SetStateAction<StepThreeData>
      >,
    }),
    [
      stepOneData,
      setStepOneData,
      stepTwoData,
      setStepTwoData,
      stepThreeData,
      setStepThreeData,
    ],
  );

  return (
    <OpportunityContext.Provider value={value}>
      {children}
    </OpportunityContext.Provider>
  );
};

export const useOpportunityContext = () => {
  const context = useContext(OpportunityContext);

  if (!context) {
    new Error(
      'useOpportunityContext must be used within an OpportunityProvider',
    );
  }

  return context;
};
