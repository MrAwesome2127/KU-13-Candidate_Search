import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  useEffect(() => {
    const getCandidates = () => {
      const savedCandidates = localStorage.getItem("candidates") ? JSON.parse(localStorage.getItem("candidates")!) : [];
      setCandidates(savedCandidates);
    }
    getCandidates();
  }, [])
  const removeCandidate = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };
  return (
    <>
      <h1>Potential Candidates</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Login</th>
            <th>Bio</th>
            <th>Company</th>
            <th>Location</th>
            <th>Remove Candidate</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <th>{candidate.avatar_url ? (<img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width="50" />) : "https://placehold.co/400"}</th>
              <th>{candidate.login}</th>
              <th>{candidate?.bio ? candidate.bio : "No bio provided"}</th>
              <th>{candidate.company}</th>
              <th>{candidate.location}</th>
              <th><button className='redButton' onClick={() => removeCandidate(index)}>-</button></th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default SavedCandidates;