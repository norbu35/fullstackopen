import { Entry } from '../types';

const Diagnoses = ({ entry }: { entry: Entry }) => {
  const style = {
    marginTop: '1em',
    padding: '1em',
    border: '1px solid black',
    borderRadius: '5px',
  };
  return (
    <div style={style}>
      {entry.date} <br />
      {entry.description} <br />
      {entry.specialist}
    </div>
  );
};

export default Diagnoses;
