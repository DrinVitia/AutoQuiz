export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'road-signs' | 'traffic-rules' | 'first-aid' | 'scenarios';
}

export const questionDatabase: Question[] = [
  // Road Signs
  {
    id: 'rs1',
    question: 'What does a red octagonal sign with white letters reading "STOP" mean?',
    options: [
      'Slow down and proceed with caution',
      'Come to a complete stop',
      'Yield to oncoming traffic',
      'Stop only if other vehicles are present'
    ],
    correctAnswer: 1,
    explanation: 'A STOP sign requires drivers to come to a complete stop before proceeding, regardless of whether other vehicles are present.',
    category: 'road-signs'
  },
  {
    id: 'rs2',
    question: 'What does a triangular sign with a red border and white interior mean?',
    options: [
      'Stop completely',
      'Merge lanes',
      'Yield right of way',
      'No entry'
    ],
    correctAnswer: 2,
    explanation: 'A triangular YIELD sign means you must give right of way to other traffic and pedestrians.',
    category: 'road-signs'
  },
  {
    id: 'rs3',
    question: 'What does a yellow diamond-shaped sign typically indicate?',
    options: [
      'Regulatory information',
      'Warning of hazard ahead',
      'Directional information',
      'Service information'
    ],
    correctAnswer: 1,
    explanation: 'Yellow diamond-shaped signs are warning signs that alert drivers to potential hazards or changes in road conditions ahead.',
    category: 'road-signs'
  },
  
  // Traffic Rules
  {
    id: 'tr1',
    question: 'When approaching a four-way stop, who has the right of way?',
    options: [
      'The largest vehicle',
      'The vehicle that arrived first',
      'The vehicle turning right',
      'The vehicle on the right'
    ],
    correctAnswer: 1,
    explanation: 'At a four-way stop, the vehicle that arrives first has the right of way. If vehicles arrive simultaneously, the vehicle on the right goes first.',
    category: 'traffic-rules'
  },
  {
    id: 'tr2',
    question: 'What is the general speed limit in residential areas unless otherwise posted?',
    options: [
      '20 mph',
      '25 mph',
      '30 mph',
      '35 mph'
    ],
    correctAnswer: 1,
    explanation: 'The typical speed limit in residential areas is 25 mph unless otherwise posted.',
    category: 'traffic-rules'
  },
  {
    id: 'tr3',
    question: 'When is it legal to pass another vehicle on the right?',
    options: [
      'Never',
      'When the vehicle ahead is turning left',
      'Only on highways',
      'When traffic is moving slowly'
    ],
    correctAnswer: 1,
    explanation: 'You may pass on the right when the vehicle ahead is making a left turn, on multi-lane roads, or when directed by traffic signs.',
    category: 'traffic-rules'
  },
  
  // First Aid
  {
    id: 'fa1',
    question: 'What is the first thing you should do when arriving at an accident scene?',
    options: [
      'Move injured people to safety',
      'Check for hazards and ensure scene safety',
      'Start CPR immediately',
      'Call for witnesses'
    ],
    correctAnswer: 1,
    explanation: 'Scene safety is the top priority. You must assess hazards like fire, unstable vehicles, or traffic before providing aid.',
    category: 'first-aid'
  },
  {
    id: 'fa2',
    question: 'How should you position an unconscious but breathing accident victim?',
    options: [
      'On their back with head tilted back',
      'Sitting upright against a wall',
      'In the recovery position on their side',
      'Standing up to keep them conscious'
    ],
    correctAnswer: 2,
    explanation: 'The recovery position on their side helps keep the airway clear and prevents choking if they vomit.',
    category: 'first-aid'
  },
  {
    id: 'fa3',
    question: 'What should you do if someone is bleeding heavily from a wound?',
    options: [
      'Apply a tourniquet immediately',
      'Apply direct pressure with a clean cloth',
      'Pour water on the wound to clean it',
      'Give them aspirin for pain'
    ],
    correctAnswer: 1,
    explanation: 'Apply direct pressure with a clean cloth or bandage to control bleeding. Elevate the injured area if possible.',
    category: 'first-aid'
  },
  
  // Scenarios
  {
    id: 'sc1',
    question: 'You are driving in heavy rain and your car starts to skid. What should you do?',
    options: [
      'Brake hard immediately',
      'Turn the wheel in the opposite direction',
      'Ease off the gas and steer in the direction you want to go',
      'Accelerate to regain control'
    ],
    correctAnswer: 2,
    explanation: 'In a skid, ease off the gas pedal and steer gently in the direction you want the car to go. Avoid sudden movements.',
    category: 'scenarios'
  },
  {
    id: 'sc2',
    question: 'Your brakes fail while driving downhill. What should you do first?',
    options: [
      'Pull the parking brake hard',
      'Pump the brake pedal rapidly',
      'Shift to a lower gear',
      'Turn off the engine'
    ],
    correctAnswer: 1,
    explanation: 'First, pump the brake pedal rapidly to try to build pressure. If that fails, use the parking brake gradually and look for a safe escape route.',
    category: 'scenarios'
  },
  {
    id: 'sc3',
    question: 'You are approaching an intersection and the traffic light turns yellow. What should you do?',
    options: [
      'Always stop immediately',
      'Speed up to clear the intersection',
      'Stop if you can do so safely, proceed if stopping would be dangerous',
      'Slow down and proceed with caution'
    ],
    correctAnswer: 2,
    explanation: 'A yellow light means the signal is about to turn red. Stop if you can do so safely; if stopping would cause an accident, proceed through the intersection.',
    category: 'scenarios'
  },
  
  // Additional Road Signs
  {
    id: 'rs4',
    question: 'What does a circular sign with a red border and white interior typically indicate?',
    options: [
      'Warning of danger ahead',
      'Mandatory instruction',
      'Prohibition or restriction',
      'Information about services'
    ],
    correctAnswer: 2,
    explanation: 'Circular signs with red borders indicate prohibitions or restrictions, such as "No Entry" or speed limits.',
    category: 'road-signs'
  },
  {
    id: 'rs5',
    question: 'What does a blue circular sign typically indicate?',
    options: [
      'Warning',
      'Prohibition',
      'Mandatory instruction',
      'Information'
    ],
    correctAnswer: 2,
    explanation: 'Blue circular signs give mandatory instructions that must be followed, such as "Turn left ahead" or "Use this lane".',
    category: 'road-signs'
  },
  {
    id: 'rs6',
    question: 'What does a rectangular sign with white text on blue background indicate?',
    options: [
      'Warning sign',
      'Regulatory sign',
      'Information sign',
      'Construction sign'
    ],
    correctAnswer: 2,
    explanation: 'Rectangular signs with white text on blue background provide information about services, facilities, or directions.',
    category: 'road-signs'
  },
  
  // Additional Traffic Rules
  {
    id: 'tr4',
    question: 'What is the minimum following distance you should maintain behind another vehicle?',
    options: [
      '1 second',
      '2 seconds',
      '3 seconds',
      '5 seconds'
    ],
    correctAnswer: 2,
    explanation: 'The 3-second rule is the minimum safe following distance in normal conditions. Increase this in poor weather or visibility.',
    category: 'traffic-rules'
  },
  {
    id: 'tr5',
    question: 'When must you use your headlights?',
    options: [
      'Only at night',
      'From sunset to sunrise and when visibility is poor',
      'Only when it\'s raining',
      'Only on highways'
    ],
    correctAnswer: 1,
    explanation: 'Headlights must be used from sunset to sunrise and whenever visibility is reduced due to weather, fog, or other conditions.',
    category: 'traffic-rules'
  },
  {
    id: 'tr6',
    question: 'What should you do when approaching a school bus with flashing red lights?',
    options: [
      'Slow down and proceed with caution',
      'Stop at least 20 feet away',
      'Change lanes and pass quickly',
      'Honk your horn to alert the driver'
    ],
    correctAnswer: 1,
    explanation: 'When a school bus has flashing red lights, you must stop at least 20 feet away and wait until the lights stop flashing.',
    category: 'traffic-rules'
  },
  
  // Additional First Aid
  {
    id: 'fa4',
    question: 'What is the correct ratio of chest compressions to rescue breaths in CPR for adults?',
    options: [
      '15:2',
      '30:2',
      '5:1',
      '10:1'
    ],
    correctAnswer: 1,
    explanation: 'For adult CPR, perform 30 chest compressions followed by 2 rescue breaths, then repeat this cycle.',
    category: 'first-aid'
  },
  {
    id: 'fa5',
    question: 'How should you treat a burn injury?',
    options: [
      'Apply ice directly to the burn',
      'Use butter or oil on the burn',
      'Cool with running water for 10-20 minutes',
      'Pop any blisters that form'
    ],
    correctAnswer: 2,
    explanation: 'Cool burns with running water for 10-20 minutes. Never use ice, butter, or oil, and don\'t pop blisters.',
    category: 'first-aid'
  },
  {
    id: 'fa6',
    question: 'What should you do if someone is choking and cannot speak or cough?',
    options: [
      'Give them water to drink',
      'Perform the Heimlich maneuver',
      'Lay them down flat',
      'Wait for them to clear it themselves'
    ],
    correctAnswer: 1,
    explanation: 'If someone is choking and cannot speak or cough, perform the Heimlich maneuver (abdominal thrusts) immediately.',
    category: 'first-aid'
  },
  
  // Additional Scenarios
  {
    id: 'sc4',
    question: 'You are driving on a highway and notice a vehicle merging from an on-ramp. What should you do?',
    options: [
      'Speed up to prevent them from merging',
      'Maintain your speed and position',
      'Adjust your speed or change lanes to allow safe merging',
      'Honk your horn to warn them'
    ],
    correctAnswer: 2,
    explanation: 'Help merging vehicles by adjusting your speed or changing lanes when safe to do so. Cooperation makes traffic flow smoother and safer.',
    category: 'scenarios'
  },
  {
    id: 'sc5',
    question: 'What should you do if you encounter a funeral procession?',
    options: [
      'Pass it as quickly as possible',
      'Join the procession if going the same direction',
      'Pull over and wait for it to pass',
      'Drive through the middle of it'
    ],
    correctAnswer: 2,
    explanation: 'Show respect by pulling over and allowing the funeral procession to pass. Never break up or drive through a procession.',
    category: 'scenarios'
  },
  {
    id: 'sc6',
    question: 'You are driving in fog with very limited visibility. What should you do?',
    options: [
      'Use high beam headlights',
      'Follow the car ahead closely for guidance',
      'Use low beam headlights and reduce speed',
      'Turn on hazard lights and maintain normal speed'
    ],
    correctAnswer: 2,
    explanation: 'In fog, use low beam headlights (high beams reflect off fog), reduce speed significantly, and increase following distance.',
    category: 'scenarios'
  },
  
  // More Road Signs
  {
    id: 'rs7',
    question: 'What does a diamond-shaped orange sign indicate?',
    options: [
      'School zone',
      'Construction or work zone',
      'Hospital zone',
      'Residential area'
    ],
    correctAnswer: 1,
    explanation: 'Orange diamond-shaped signs indicate construction or work zones where you should reduce speed and be extra cautious.',
    category: 'road-signs'
  },
  {
    id: 'rs8',
    question: 'What does a sign with a bicycle symbol mean?',
    options: [
      'Bicycles prohibited',
      'Bicycle repair shop ahead',
      'Bicycle lane or path',
      'Bicycle crossing'
    ],
    correctAnswer: 2,
    explanation: 'Signs with bicycle symbols typically indicate bicycle lanes, paths, or areas where bicycles are expected.',
    category: 'road-signs'
  },
  
  // More Traffic Rules
  {
    id: 'tr7',
    question: 'When are you required to yield the right of way?',
    options: [
      'Only at yield signs',
      'When entering a highway from a ramp',
      'When turning left across traffic',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'You must yield right of way in many situations: at yield signs, when merging, when turning left, and to pedestrians in crosswalks.',
    category: 'traffic-rules'
  },
  {
    id: 'tr8',
    question: 'What is the purpose of anti-lock brakes (ABS)?',
    options: [
      'To stop the car faster',
      'To prevent wheels from locking during hard braking',
      'To reduce brake wear',
      'To make braking quieter'
    ],
    correctAnswer: 1,
    explanation: 'ABS prevents wheels from locking up during hard braking, allowing you to maintain steering control while stopping.',
    category: 'traffic-rules'
  }
];

export const getQuestionsByCategory = (category: string): Question[] => {
  if (category === 'all') {
    return questionDatabase;
  }
  return questionDatabase.filter(q => q.category === category);
};

export const getRandomQuestions = (count: number, category?: string): Question[] => {
  const questions = category ? getQuestionsByCategory(category) : questionDatabase;
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getQuestionById = (id: string): Question | undefined => {
  return questionDatabase.find(q => q.id === id);
};