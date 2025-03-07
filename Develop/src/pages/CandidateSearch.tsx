import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    login: '',
    avatar_url: '',
    name: '',
    location: '',
    email: '',
    company: '',
    bio: '',
  });

  const [userLoginData, setUserLoginData] = useState<Candidate[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const searchForUser = async () => {
      const user = await searchGithub();
      setUserLoginData(user);
    };
    if (userLoginData.length === 0) {
      searchForUser();
    }
  }, [userLoginData.length]);

  useEffect(() => {
    const searchUserDetails = async () => {
      if (userLoginData[index]) {
        const userData = await searchGithubUser(userLoginData[index].login);
        setCurrentCandidate(userData);
      }
    };
    searchUserDetails();
  }, [userLoginData, index]);

  console.log(currentCandidate);

  return( 
    <>
      <h1>CandidateSearch</h1>
      <br />
      {currentCandidate.login?
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <img className="candidate-image" src={currentCandidate.avatar_url} alt={currentCandidate.name || currentCandidate.login} width="400" />
              <h2>{currentCandidate.login || ''}</h2>
              <p>Location: {currentCandidate.location  || ''}</p>
              <p>Email: {currentCandidate.email  || ''}</p>
              <p>Company: {currentCandidate.company  || ''}</p>
              <p>Bio: {currentCandidate.bio  || ''}</p>
            </td>
          </tr>
          <th className="table-row">
            
              <button className ="redButton" onClick={() => {
                setIndex(index - 1)
                window.location.reload() // Reload the page 
                }}>-</button>
            
              <button className="greenButton" onClick={ () => {
                setIndex(index + 1);
                const existingCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
                const updatedCandidates = [...existingCandidates, currentCandidate];
                localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
              }}>+</button>
            
          </th>
        </tbody>
      </table>
      : <h1>Loading...</h1>}
    </>
  )
};

export default CandidateSearch;
