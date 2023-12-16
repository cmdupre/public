import { useState } from 'react'
import General from '../components/General'
import Education from '../components/Education'
import Experience from '../components/Experience'
import './App.css'

function App() {
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  function onClickAddEducation() {
    const newEducations = [];
    let i = 0;
    for (i; i < educations.length; i++)
      newEducations.push(educations[i]);
    newEducations.push(<Education key={i} />);
    setEducations(newEducations);
  }

  function onClickAddExperience() {
    const newExperiences = [];
    let i = 0;
    for (i; i < experiences.length; i++)
      newExperiences.push(experiences[i]);
    newExperiences.push(<Experience key={i} />);
    setExperiences(newExperiences);
  }

  return (
    <>
      <div id="general">
        <h1>General</h1>
        <General />
      </div>
      <div id="education">
        <h1>Education</h1>
        {educations}
        <button type='button' className='add' onClick={onClickAddEducation}>Add</button>
      </div>
      <div id="experience">
        <h1>Experience</h1>
        {experiences}
        <button type='button' className='add' onClick={onClickAddExperience}>Add</button>
      </div>
    </>
  )
}

export default App
