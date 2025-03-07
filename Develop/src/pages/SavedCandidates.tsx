import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const savedCandidates = localStorage.getItem('savedCandidates');
  const candidates: Candidate[] = savedCandidates ? JSON.parse(savedCandidates) : [];
  
  const handleDelete = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <tbody className="saved-candidates" >
          <tr >
            <th className="table-column">Image</th>
            <th className="table-column">Name</th>
            <th className="table-column">Location</th>
            <th className="table-column">Email</th>
            <th className="table-column">Company</th>
            <th className="table-column">Bio</th>
            <th className="table-column">Reject</th>
          </tr>
          {candidates.map((candidate: Candidate, index: number) => (
            <tr key={index}>
              <th className="table-column"><img src={candidate.avatar_url || ''} alt={candidate.name || candidate.login} width="100" /></th>
              <th className="table-column">{candidate.login}</th>
              <th className="table-column">{candidate.location}</th>
              <th className="table-column">{candidate.email}</th>
              <th className="table-column">{candidate.company}</th>
              <th className="table-column">{candidate.bio}</th>
              <th className="table-column"><button className='redButton' onClick={() => handleDelete(index)}>-</button></th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;