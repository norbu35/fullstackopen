import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Patient, Diagnose } from '../types';
import { setDiagnosesList, updatePatient } from '../state/reducer';
import Diagnoses from '../components/Diagnoses';
import { apiBaseUrl } from '../constants';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patient));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error('Unknown Axios error', e);
        } else {
          console.error('Unknown general error', e);
        }
      }
    };
    fetchPatient();
  }, [dispatch]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/api/diagnoses`
        );
        dispatch(setDiagnosesList(diagnoses));
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.error('Unknown Axios error', e);
        } else {
          console.error('Unknown general error', e);
        }
      }
    };
    fetchDiagnoses();
  });

  if (!id) return <div>Patient not found</div>;
  return (
    <div>
      <h1>{state.patients[id].name}</h1>
      SSN: {state.patients[id].ssn} <br />
      Occupation: {state.patients[id].occupation}
      <h3>Entries:</h3>
      {state.patients[id].entries.map((entry) => (
        <Diagnoses key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;
