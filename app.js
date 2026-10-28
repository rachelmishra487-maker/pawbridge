/**
 * PAWBRIDGE NGO DESKTOP APPLICATION - CORE JAVASCRIPT CONTROLLER
 * High-fidelity NGO Operations Platform for Animal Welfare Shelters
 */

// ============================================================
// DATA STORE & INITIAL MOCK STATE
// ============================================================
const PawBridgeStore = {
  activeScreen: 'overview',
  frameMode: 'desktop', // 'desktop' (1440x1024) | 'fluid'
  zoomScale: '100',     // '100' | '90' | '80' | 'fit'
  filterStatus: 'all',
  activeWard: 'all',
  searchQuery: '',
  selectedRescueId: null,

  ngoInfo: {
    name: 'Happy Tails Animal Sanctuary',
    regId: 'AWBI/2021/DL-402',
    taxExempt: '80G & 12A Valid to 2028',
    city: 'Delhi NCR Shelter Campus',
    totalBays: 45,
    occupiedBays: 38,
    activeAnimals: 42,
    criticalCount: 6,
    monthlyRehabs: 31,
    transparencyScore: '98.4%'
  },

  // Realistic rescue cases with high quality, compassionate dog photography
  rescues: [
    {
      id: 'RC-1048',
      name: 'Leo',
      tag: 'IND-DL-8812',
      breed: 'Desi / Indian Pariah Mix',
      age: '5 Months',
      gender: 'Male',
      weight: '8.4 kg',
      intakeDate: '28 Oct 2026',
      intakeTime: '09:15 AM',
      intakeLocation: 'Sector 14 Market Crossing, Gurugram',
      rescuer: 'Meera Sen (Citizen Volunteer)',
      triage: 'critical', // critical | surgery | quarantine | stable | foster | adopted
      triageLabel: 'ICU / Critical Care',
      condition: 'Compound tibia-fibula fracture from vehicular collision, severe shock',
      bay: 'ICU-03',
      ward: 'Ward A: Trauma ICU',
      carer: 'Dr. Ananya Sharma',
      photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.9 °C', hr: '132 bpm', mucous: 'Pale pink', hydration: '8% deficit' },
      medications: ['IV Ceftriaxone 250mg BID', 'Meloxicam 0.2mg/kg', 'Tramadol slow IV'],
      sterilized: false,
      rabiesVaccinated: true,
      legalStatus: 'Police Panchnama #DL-481 filed'
    },
    {
      id: 'RC-1047',
      name: 'Bella',
      tag: 'IND-DL-8809',
      breed: 'Golden Retriever Mix',
      age: '2.5 Years',
      gender: 'Female',
      weight: '19.2 kg',
      intakeDate: '24 Oct 2026',
      intakeTime: '02:30 PM',
      intakeLocation: 'Vasant Kunj Forest Trail',
      rescuer: 'Field Ambulance Unit 1',
      triage: 'surgery',
      triageLabel: 'Post-Op Recovery',
      condition: 'Post-femoral head ostectomy; sutures healing clean, passive physiotherapy initiated',
      bay: 'REC-02',
      ward: 'Ward C: Surgical Recovery',
      carer: 'Dr. Rajesh Verma',
      photoUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.4 °C', hr: '94 bpm', mucous: 'Healthy pink', hydration: 'Normal' },
      medications: ['Carprofen 50mg SID', 'Omega-3 fatty acids', 'Gentamicin wound spray'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'Surrendered Abandonment Case'
    },
    {
      id: 'RC-1046',
      name: 'Sheru',
      tag: 'IND-DL-8798',
      breed: 'Indie Shepherd Mix',
      age: '4 Years',
      gender: 'Male',
      weight: '22.0 kg',
      intakeDate: '19 Oct 2026',
      intakeTime: '11:00 AM',
      intakeLocation: 'Chhatarpur Farms Outer Ring',
      rescuer: 'Community Feeder Network',
      triage: 'stable',
      triageLabel: 'Rehabilitation / Stable',
      condition: 'Deep thermal burn injury now 80% granulated; healthy appetite, gentle leash temperament',
      bay: 'RUN-05',
      ward: 'Ward D: Open Social Runs',
      carer: 'Staff Nurse Vikas',
      photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.2 °C', hr: '82 bpm', mucous: 'Pink', hydration: 'Normal' },
      medications: ['Silver sulfadiazine dressing OD', 'Multivitamin syrup'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'Community Animal Sterilization & Care'
    },
    {
      id: 'RC-1045',
      name: 'Milo & Daisy',
      tag: 'IND-DL-8791',
      breed: 'Indie Pups (Sibling Pair)',
      age: '2 Months',
      gender: 'Male & Female',
      weight: '3.1 kg & 2.9 kg',
      intakeDate: '26 Oct 2026',
      intakeTime: '05:45 PM',
      intakeLocation: 'Dwarka Sector 8 Drainage Ditch',
      rescuer: 'Field Ambulance Unit 2',
      triage: 'quarantine',
      triageLabel: 'Puppy Quarantine',
      condition: 'Severe hypothermia and dehydration; Parvo ELISA negative; deworming completed',
      bay: 'Q-03',
      ward: 'Ward B: Infectious Disease & Quarantine',
      carer: 'Dr. Ananya Sharma',
      photoUrl: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.6 °C', hr: '140 bpm', mucous: 'Pale pink', hydration: '5% deficit' },
      medications: ['Puppy electrolyte formula', 'Pyrantel pamoate', 'Probiotics BID'],
      sterilized: false,
      rabiesVaccinated: false,
      legalStatus: 'Abandoned Litter Rescue'
    },
    {
      id: 'RC-1044',
      name: 'Tara',
      tag: 'IND-DL-8774',
      breed: 'Labrador Retriever Cross',
      age: '3 Years',
      gender: 'Female',
      weight: '24.5 kg',
      intakeDate: '12 Oct 2026',
      intakeTime: '10:20 AM',
      intakeLocation: 'Noida Expressway Toll Area',
      rescuer: 'Highway Patrol Helpline',
      triage: 'foster',
      triageLabel: 'Medical Foster Trial',
      condition: 'Full recovery from corneal laceration; exceptional temperament, ready for permanent adoption',
      bay: 'FOS-01',
      ward: 'Ward E: Foster Transition',
      carer: 'Foster Parent: Rohini Saxena',
      photoUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.3 °C', hr: '78 bpm', mucous: 'Healthy pink', hydration: 'Normal' },
      medications: ['Artificial tear drops PRN'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'Cleared for Adoption Placement'
    },
    {
      id: 'RC-1043',
      name: 'Bruno',
      tag: 'IND-DL-8760',
      breed: 'Indie Mastiff Mix',
      age: '6 Years',
      gender: 'Male',
      weight: '27.8 kg',
      intakeDate: '08 Oct 2026',
      intakeTime: '04:10 PM',
      intakeLocation: 'Okhla Industrial Area Ph-2',
      rescuer: 'Worker Union Volunteer',
      triage: 'stable',
      triageLabel: 'Senior Sanctuary Care',
      condition: 'Chronic osteoarthritis and skin dermatitis; responding well to Apoquel and joint supplements',
      bay: 'RUN-11',
      ward: 'Ward D: Open Social Runs',
      carer: 'Staff Nurse Vikas',
      photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.1 °C', hr: '76 bpm', mucous: 'Pink', hydration: 'Normal' },
      medications: ['Glucosamine & Chondroitin chew', 'Chlorhexidine medicated bath twice weekly'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'Permanent Sanctuary Resident'
    }
  ],

  // 45 Shelter Kennel Bays
  kennelBays: [
    { id: 'ICU-01', ward: 'Ward A', name: 'ICU Bay 1', status: 'occupied', occupant: 'Rocky (Post-Trauma)', photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80', tag: 'NPO Pre-Op', cleanTime: '08:00 AM' },
    { id: 'ICU-02', ward: 'Ward A', name: 'ICU Bay 2', status: 'occupied', occupant: 'Bruno (Transfusion)', photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80', tag: 'IV Fluid Constant', cleanTime: '08:15 AM' },
    { id: 'ICU-03', ward: 'Ward A', name: 'ICU Bay 3', status: 'occupied', occupant: 'Leo (Fracture)', photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80', tag: 'Strict Splint Rest', cleanTime: '09:30 AM' },
    { id: 'ICU-04', ward: 'Ward A', name: 'ICU Bay 4', status: 'occupied', occupant: 'Kalu (Spinal Check)', photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=200&q=80', tag: 'Bladder Expression', cleanTime: '07:45 AM' },
    { id: 'ICU-05', ward: 'Ward A', name: 'ICU Bay 5', status: 'occupied', occupant: 'Chotu (Hypothermia)', photo: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=200&q=80', tag: 'Heat Pad 38°C', cleanTime: '08:30 AM' },
    { id: 'ICU-06', ward: 'Ward A', name: 'ICU Bay 6', status: 'occupied', occupant: 'Gauri (Mastectomy)', photo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=200&q=80', tag: 'Pain Mgmt IV', cleanTime: '07:30 AM' },

    { id: 'Q-01', ward: 'Ward B', name: 'Quarantine Bay 1', status: 'occupied', occupant: 'Max (Distemper Suspect)', photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=200&q=80', tag: 'Bio-Secure Barrier', cleanTime: '09:00 AM' },
    { id: 'Q-02', ward: 'Ward B', name: 'Quarantine Bay 2', status: 'occupied', occupant: 'Simba (Parvo Recovery)', photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80', tag: 'Bactericidal Wash', cleanTime: '09:15 AM' },
    { id: 'Q-03', ward: 'Ward B', name: 'Quarantine Bay 3', status: 'occupied', occupant: 'Milo & Daisy', photo: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=200&q=80', tag: 'Puppy Isolation', cleanTime: '08:45 AM' },
    { id: 'Q-04', ward: 'Ward B', name: 'Quarantine Bay 4', status: 'occupied', occupant: 'Sultan (Mange protocol)', photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=200&q=80', tag: 'Medicated Dip Day 3', cleanTime: '07:15 AM' },
    { id: 'Q-05', ward: 'Ward B', name: 'Quarantine Bay 5', status: 'vacant', occupant: null, photo: null, tag: 'Sanitized & Ready', cleanTime: '10:00 AM' },

    { id: 'REC-01', ward: 'Ward C', name: 'Recovery Bay 1', status: 'occupied', occupant: 'Sweety (Spay Post-Op)', photo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=200&q=80', tag: 'E-Collar Required', cleanTime: '08:00 AM' },
    { id: 'REC-02', ward: 'Ward C', name: 'Recovery Bay 2', status: 'occupied', occupant: 'Bella (FHO Post-Op)', photo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=200&q=80', tag: 'Passive Physio 2x', cleanTime: '08:20 AM' },
    { id: 'REC-03', ward: 'Ward C', name: 'Recovery Bay 3', status: 'occupied', occupant: 'Jack (Amputation)', photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80', tag: 'Clean Dressing', cleanTime: '08:10 AM' },
    { id: 'REC-04', ward: 'Ward C', name: 'Recovery Bay 4', status: 'vacant', occupant: null, photo: null, tag: 'Cleaned & Ready', cleanTime: '09:00 AM' },

    { id: 'RUN-01', ward: 'Ward D', name: 'Social Paddock 1', status: 'occupied', occupant: 'Sheru & Buddy', photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=200&q=80', tag: 'Socialized Group', cleanTime: '07:00 AM' },
    { id: 'RUN-02', ward: 'Ward D', name: 'Social Paddock 2', status: 'occupied', occupant: 'Brownie & Cooper', photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80', tag: 'Exercise Time 4 PM', cleanTime: '07:30 AM' },
    { id: 'RUN-03', ward: 'Ward D', name: 'Social Paddock 3', status: 'vacant', occupant: null, photo: null, tag: 'Fresh Turf Mowed', cleanTime: '06:30 AM' }
  ],

  // Clinical Rounds Tasks
  clinicalTasks: [
    { id: 'ct-1', patient: 'Leo (#RC-1048)', drug: 'IV Ceftriaxone 250mg', doseTime: '08:30 AM', round: 'Morning', done: true, vet: 'Dr. Ananya' },
    { id: 'ct-2', patient: 'Leo (#RC-1048)', drug: 'Meloxicam 0.2mg/kg', doseTime: '09:00 AM', round: 'Morning', done: true, vet: 'Dr. Ananya' },
    { id: 'ct-3', patient: 'Bella (#RC-1047)', drug: 'Carprofen 50mg Oral', doseTime: '09:30 AM', round: 'Morning', done: true, vet: 'Nurse Vikas' },
    { id: 'ct-4', patient: 'Milo & Daisy', drug: 'Puppy Dewormer Suspn', doseTime: '10:00 AM', round: 'Morning', done: true, vet: 'Dr. Ananya' },
    { id: 'ct-5', patient: 'Sheru (#RC-1046)', drug: 'Burn Dressing & Silver Cream', doseTime: '11:30 AM', round: 'Midday', done: false, vet: 'Nurse Vikas' },
    { id: 'ct-6', patient: 'Bruno (#RC-1043)', drug: 'Glucosamine + Apoquel', doseTime: '01:00 PM', round: 'Midday', done: false, vet: 'Nurse Vikas' },
    { id: 'ct-7', patient: 'Leo (#RC-1048)', drug: 'Orthopedic Cast Inspection', doseTime: '02:30 PM', round: 'Afternoon', done: false, vet: 'Dr. Verma' },
    { id: 'ct-8', patient: 'Quarantine Ward B', drug: 'Virucidal Disinfection Cycle', doseTime: '04:00 PM', round: 'Evening', done: false, vet: 'Sanitation Team' }
  ],

  // Adoption & Foster Kanban Candidates
  adoptions: [
    {
      id: 'app-1',
      applicant: 'Rhea Sengupta & Kabir Nair',
      phone: '+91 98712 34091',
      city: 'GK-1, New Delhi',
      dwelling: 'Independent House w/ 6ft Boundary',
      dog: 'Tara (#RC-1044)',
      experience: 'Owned 2 Golden Retrievers previously',
      stage: 'trial', // 'new' | 'screening' | 'homecheck' | 'trial' | 'finalized'
      submittedDate: '18 Oct 2026',
      notes: 'Passed video home check; 14-day foster-to-adopt trial commenced 22 Oct.'
    },
    {
      id: 'app-2',
      applicant: 'Arjun Mathur',
      phone: '+91 98114 99023',
      city: 'DLF Phase 4, Gurugram',
      dwelling: 'Ground floor condo w/ private lawn',
      dog: 'Sheru (#RC-1046)',
      experience: 'First-time adopter, works from home',
      stage: 'homecheck',
      submittedDate: '22 Oct 2026',
      notes: 'Volunteer home check scheduled for Thursday 4:00 PM.'
    },
    {
      id: 'app-3',
      applicant: 'Dr. Shalini Roy',
      phone: '+91 99990 12845',
      city: 'Noida Sector 44',
      dwelling: 'Villa with closed garden',
      dog: 'Milo & Daisy (Pair)',
      experience: 'Pediatrician, family loves indie puppies',
      stage: 'screening',
      submittedDate: '25 Oct 2026',
      notes: 'Initial telephone interview completed; landlord NOC verified.'
    },
    {
      id: 'app-4',
      applicant: 'Kunal Bhatia',
      phone: '+91 98200 44512',
      city: 'Defence Colony, New Delhi',
      dwelling: 'Penthouse with secured netted balcony',
      dog: 'Bella (#RC-1047)',
      experience: 'Experienced with senior dogs',
      stage: 'new',
      submittedDate: '28 Oct 2026',
      notes: 'New inquiry received 2 hours ago; veterinary reference attached.'
    },
    {
      id: 'app-5',
      applicant: 'Pooja & Sameer Verma',
      phone: '+91 98101 77234',
      city: 'Chhatarpur Farms',
      dwelling: 'Farmstead with 3 resident rescue dogs',
      dog: 'Rocky (#RC-1035)',
      experience: 'Long-term animal welfare donor & adopter',
      stage: 'finalized',
      submittedDate: '02 Oct 2026',
      notes: 'Adoption deed signed, microchip registered with AWBI database.'
    }
  ],

  // SOS Distress Calls & Ambulance Dispatch
  dispatchIncidents: [
    {
      id: 'SOS-841',
      time: '10:40 AM',
      caller: 'Rohit Khanna',
      phone: '+91 98103 44891',
      location: 'Near Galleria Market, Sector 28 Gurugram',
      animal: 'Pregnant indie dog stuck under culvert grating',
      priority: 'critical',
      status: 'Dispatched',
      vehicle: 'DL-01-A-4491 (Trauma Unit)',
      eta: '7 mins',
      paramedic: 'Driver Ramesh + Paramedic Amit'
    },
    {
      id: 'SOS-840',
      time: '09:15 AM',
      caller: 'Meera Sen',
      phone: '+91 98711 00233',
      location: 'Sector 14 Market Crossing',
      animal: 'Hit and run puppy (compound fracture)',
      priority: 'critical',
      status: 'Admitted (#RC-1048 Leo)',
      vehicle: 'DL-01-A-4491',
      eta: 'Completed',
      paramedic: 'Transported to ICU-03'
    },
    {
      id: 'SOS-839',
      time: 'Yesterday',
      caller: 'Resident Welfare Assoc.',
      phone: '+91 98188 55410',
      location: 'Vasant Kunj Sector C Pocket 8',
      animal: 'Community ABC outreach: 6 dogs for sterilization',
      priority: 'scheduled',
      status: 'Completed',
      vehicle: 'DL-01-B-8820 (ABC Van)',
      eta: 'Completed',
      paramedic: 'Surgeries completed successfully'
    }
  ],

  // Medical Supplies & Feed Inventory
  inventory: [
    { id: 'inv-1', name: 'Ceftriaxone Inj 1g', category: 'Antibiotics', stock: 18, minThreshold: 30, unit: 'Vials', status: 'low' },
    { id: 'inv-2', name: 'Meloxicam 5mg/ml 30ml', category: 'NSAID / Analgesic', stock: 12, minThreshold: 10, unit: 'Vials', status: 'ok' },
    { id: 'inv-3', name: 'Nobivac DHPPi + L (9-in-1)', category: 'Biologicals / Vaccines', stock: 64, minThreshold: 40, unit: 'Doses', status: 'ok' },
    { id: 'inv-4', name: 'Rabisin Anti-Rabies Vaccine', category: 'Biologicals / Vaccines', stock: 120, minThreshold: 50, unit: 'Doses', status: 'ok' },
    { id: 'inv-5', name: 'Polyglactin 910 Suture 2-0', category: 'Surgical OT Disposables', stock: 8, minThreshold: 25, unit: 'Boxes', status: 'low' },
    { id: 'inv-6', name: 'Ringer Lactate IV Infusion 500ml', category: 'Fluid Therapy', stock: 95, minThreshold: 50, unit: 'Bottles', status: 'ok' },
    { id: 'inv-7', name: 'Royal Canin Recovery High-Calorie Diet', category: 'Clinical Nutrition', stock: 45, minThreshold: 30, unit: 'Cans', status: 'ok' },
    { id: 'inv-8', name: 'Adult Maintenance Kibble (Chicken & Rice)', category: 'Shelter Feed', stock: 480, minThreshold: 300, unit: 'Kilograms', status: 'ok' }
  ],

  // Statutory Documents & Compliance
  compliance: [
    {
      id: 'cert-1',
      title: 'Trust Registration Deed',
      authority: 'Sub-Registrar of Societies, Govt of NCT Delhi',
      number: 'DL/2018/01923 (Act XXI of 1860)',
      validity: 'Permanent / Registered 2018',
      status: 'Verified Active',
      hash: 'SHA256: 8a93bf81e7d0...9b31'
    },
    {
      id: 'cert-2',
      title: 'Section 12A Registration',
      authority: 'Income Tax Department of India',
      number: 'CIT(EXEMP)/DELHI/12A/2019/3381',
      validity: 'Valid Assessment Years 2023-2028',
      status: 'Verified Active',
      hash: 'SHA256: d472aa10fc83...01fa'
    },
    {
      id: 'cert-3',
      title: 'Section 80G Tax Exemption Certificate',
      authority: 'Commissioner of Income Tax (Exemptions)',
      number: 'AAATH8923KF20214',
      validity: 'Valid up to AY 2028-29 (50% Exemption)',
      status: 'Verified Active',
      hash: 'SHA256: 1f8b4c29e183...55cc'
    },
    {
      id: 'cert-4',
      title: 'Animal Welfare Board of India (AWBI) Recognition',
      authority: 'Ministry of Fisheries, Animal Husbandry & Dairying',
      number: 'AWBI/NGO/2021/DL-402',
      validity: 'Certified Humane Animal Shelter',
      status: 'Verified Active',
      hash: 'SHA256: 4e99f1b203c4...77ae'
    },
    {
      id: 'cert-5',
      title: 'FCRA Approval Certificate',
      authority: 'Ministry of Home Affairs, Foreigners Division',
      number: 'MHA/FCRA/Reg-231660144',
      validity: 'Valid Foreign Inward Remittance Clearance',
      status: 'Verified Active',
      hash: 'SHA256: c382a991b100...ff42'
    },
    {
      id: 'cert-6',
      title: 'Annual Audited Financial Statements & Balance Sheet',
      authority: 'M/s V. K. Aggarwal & Associates, Chartered Accountants',
      number: 'UDIN: 24089123AAAAEE8819',
      validity: 'FY 2024-25 Full Audit Dossier',
      status: 'Clean Audit Opinion',
      hash: 'SHA256: 9912beff8021...3a18'
    }
  ],

  // Live Notifications
  notifications: [
    { id: 'notif-1', title: 'Critical Rescue Admitted', text: 'Case #RC-1048 (Leo) admitted to ICU-03. Surgical team on standby.', time: '45m ago', unread: true },
    { id: 'notif-2', title: 'Medication Round Due', text: 'Midday medication round begins at 01:00 PM (4 patients pending).', time: '1h ago', unread: true },
    { id: 'notif-3', title: 'Antibiotic Inventory Alert', text: 'Ceftriaxone Inj stock dropped below minimum threshold (18 left).', time: '2h ago', unread: true },
    { id: 'notif-4', title: 'Adoption Home Check Cleared', text: 'Home check for Rhea Sengupta (Applicant #app-1) approved.', time: 'Yesterday', unread: false }
  ]
};

// ============================================================
// APPLICATION CONTROLLER
// ============================================================
const PawBridgeApp = {
  init() {
    this.cacheDom();
    this.bindEvents();
    this.render();
    this.setupShortcuts();
    this.applyZoomScale(PawBridgeStore.zoomScale);
    console.log('PawBridge NGO Operations OS initialized in High-Fidelity Desktop Mode.');
  },

  cacheDom() {
    this.dom = {
      // Prototype Toolbar Controls
      btnFrameDesktop: document.getElementById('btn-frame-desktop'),
      btnFrameFluid: document.getElementById('btn-frame-fluid'),
      selectScale: document.getElementById('select-scale'),
      viewportCanvas: document.getElementById('viewport-canvas'),
      windowFrame: document.getElementById('window-frame'),
      btnSimulateIntake: document.getElementById('btn-simulate-intake'),

      // Top Screen / View Switchers
      btnNavApp: document.getElementById('btn-nav-app'),
      btnNavLogin: document.getElementById('btn-nav-login'),
      btnNavRegister: document.getElementById('btn-nav-register'),
      chromeAddressText: document.getElementById('chrome-address-text'),

      // Main Layout Root & Auth Views
      viewAppMain: document.getElementById('view-app-main'),
      viewAuthLogin: document.getElementById('view-auth-login'),
      viewAuthRegister: document.getElementById('view-auth-register'),

      // Navigation Buttons
      navItems: document.querySelectorAll('.nav-item-btn'),
      screenViews: document.querySelectorAll('.screen-view'),
      headerBreadcrumbContext: document.getElementById('header-breadcrumb-context'),
      headerContextTitle: document.getElementById('header-context-title'),

      // Global Header Elements
      globalSearchInput: document.getElementById('global-search-input'),
      btnOpenIntakeModal: document.getElementById('btn-open-intake-modal'),
      btnNotifBell: document.getElementById('btn-notif-bell'),
      notifDrawer: document.getElementById('notifications-drawer'),
      notifCountBadge: document.getElementById('notif-count-badge'),
      notifDrawerList: document.getElementById('notif-drawer-list'),
      btnMarkNotifsRead: document.getElementById('btn-mark-notifs-read'),

      // Overview Screen Elements
      statMetricOccupancy: document.getElementById('stat-metric-occupancy'),
      statMetricCritical: document.getElementById('stat-metric-critical'),
      statMetricAnimals: document.getElementById('stat-metric-animals'),
      overviewRescuesTable: document.getElementById('overview-rescues-table'),
      overviewClinicalList: document.getElementById('overview-clinical-list'),
      btnUrgentDossier: document.getElementById('btn-urgent-dossier'),

      // Rescues Screen Elements
      rescueCardsGrid: document.getElementById('rescue-cards-grid'),
      rescueSearchField: document.getElementById('rescue-search-field'),
      rescueFilterChips: document.querySelectorAll('.filter-chip-btn'),
      btnNewIntakeSecondary: document.getElementById('btn-new-intake-secondary'),

      // Kennels Screen Elements
      bayGridContainer: document.getElementById('bay-grid-container'),
      wardTabBtns: document.querySelectorAll('.ward-tab-btn'),

      // Clinical Care Screen Elements
      clinicalMedsTableBody: document.getElementById('clinical-meds-table-body'),
      clinicalProgressBar: document.getElementById('clinical-progress-bar'),
      clinicalProgressText: document.getElementById('clinical-progress-text'),

      // Adoptions Screen Elements
      kanbanColumns: {
        new: document.getElementById('kanban-col-new'),
        screening: document.getElementById('kanban-col-screening'),
        homecheck: document.getElementById('kanban-col-homecheck'),
        trial: document.getElementById('kanban-col-trial'),
        finalized: document.getElementById('kanban-col-finalized')
      },

      // Dispatch Screen Elements
      dispatchIncidentsList: document.getElementById('dispatch-incidents-list'),
      btnTriggerSos: document.getElementById('btn-trigger-sos'),

      // Compliance Screen Elements
      complianceGrid: document.getElementById('compliance-grid'),

      // Inventory Screen Elements
      inventoryTableBody: document.getElementById('inventory-table-body'),
      btnRestockAll: document.getElementById('btn-restock-all'),

      // Auth Login Elements
      formAuthLogin: document.getElementById('form-auth-login'),
      loginEmail: document.getElementById('login-email'),
      loginPassword: document.getElementById('login-password'),
      loginEmailError: document.getElementById('login-email-error'),
      loginPasswordError: document.getElementById('login-password-error'),
      btnToggleLoginPwd: document.getElementById('btn-toggle-login-pwd'),
      btnPrefillLogin: document.getElementById('btn-prefill-login'),
      btnForgotPwdTrigger: document.getElementById('btn-forgot-pwd-trigger'),
      linkGotoRegister: document.getElementById('link-goto-register'),

      // Multi-Step Registration Wizard Elements
      stepperProgressFill: document.getElementById('stepper-progress-fill'),
      wizardStepCounter: document.getElementById('wizard-step-counter'),
      wizardStepNodes: document.querySelectorAll('.wizard-step-node'),
      wizardPanes: document.querySelectorAll('.wizard-step-pane'),
      btnWizardBack: document.getElementById('btn-wizard-back'),
      btnWizardSaveDraft: document.getElementById('btn-wizard-save-draft'),
      btnWizardContinue: document.getElementById('btn-wizard-continue'),
      btnWizardContinueText: document.getElementById('btn-wizard-continue-text'),
      btnWizardExitLogin: document.getElementById('btn-wizard-exit-login'),
      btnLaunchShelterWorkspace: document.getElementById('btn-launch-shelter-workspace'),
      btnToggleWizPwd: document.getElementById('btn-toggle-wiz-pwd'),
      wizardFooterBar: document.getElementById('wizard-footer-bar'),

      // Wizard Step 1 Inputs
      wizOrgName: document.getElementById('wiz-org-name'),
      wizOrgType: document.getElementById('wiz-org-type'),
      wizOrgRegno: document.getElementById('wiz-org-regno'),
      wizOrgYear: document.getElementById('wiz-org-year'),
      wizFacilityType: document.getElementById('wiz-facility-type'),
      wizKennelCapacity: document.getElementById('wiz-kennel-capacity'),
      wizOrgNameError: document.getElementById('wiz-org-name-error'),
      wizOrgTypeError: document.getElementById('wiz-org-type-error'),
      wizOrgRegnoError: document.getElementById('wiz-org-regno-error'),
      wizOrgYearError: document.getElementById('wiz-org-year-error'),
      wizKennelCapacityError: document.getElementById('wiz-kennel-capacity-error'),

      // Wizard Step 2 Inputs
      wizRepName: document.getElementById('wiz-rep-name'),
      wizRepRole: document.getElementById('wiz-rep-role'),
      wizContactEmail: document.getElementById('wiz-contact-email'),
      wizPhone: document.getElementById('wiz-phone'),
      wizHelpline: document.getElementById('wiz-helpline'),
      wizAddress: document.getElementById('wiz-address'),
      wizCity: document.getElementById('wiz-city'),
      wizState: document.getElementById('wiz-state'),
      wizPincode: document.getElementById('wiz-pincode'),
      wizRepNameError: document.getElementById('wiz-rep-name-error'),
      wizRepRoleError: document.getElementById('wiz-rep-role-error'),
      wizContactEmailError: document.getElementById('wiz-contact-email-error'),
      wizPhoneError: document.getElementById('wiz-phone-error'),
      wizHelplineError: document.getElementById('wiz-helpline-error'),
      wizAddressError: document.getElementById('wiz-address-error'),
      wizCityError: document.getElementById('wiz-city-error'),
      wizPincodeError: document.getElementById('wiz-pincode-error'),

      // Wizard Step 4 Inputs
      wizMission: document.getElementById('wiz-mission'),
      wizRescueVol: document.getElementById('wiz-rescue-vol'),
      wizVolunteersCount: document.getElementById('wiz-volunteers-count'),
      wizAchievement: document.getElementById('wiz-achievement'),
      wizMissionError: document.getElementById('wiz-mission-error'),

      // Wizard Step 5 Inputs
      wizMasterPwd: document.getElementById('wiz-master-pwd'),
      wizConfirmPwd: document.getElementById('wiz-confirm-pwd'),
      wizLegalTerms: document.getElementById('wiz-legal-terms'),
      wizMasterPwdError: document.getElementById('wiz-master-pwd-error'),
      wizConfirmPwdError: document.getElementById('wiz-confirm-pwd-error'),
      wizLegalTermsError: document.getElementById('wiz-legal-terms-error'),

      // Wizard Review Display Elements
      revOrgName: document.getElementById('rev-org-name'),
      revOrgType: document.getElementById('rev-org-type'),
      revOrgRegno: document.getElementById('rev-org-regno'),
      revOrgYear: document.getElementById('rev-org-year'),
      revFacilityType: document.getElementById('rev-facility-type'),
      revKennelCapacity: document.getElementById('rev-kennel-capacity'),
      revRepName: document.getElementById('rev-rep-name'),
      revRepRole: document.getElementById('rev-rep-role'),
      revContactEmail: document.getElementById('rev-contact-email'),
      revHelpline: document.getElementById('rev-helpline'),
      revFullAddress: document.getElementById('rev-full-address'),

      // Sidebar Logout
      btnSidebarLogout: document.getElementById('btn-sidebar-logout'),

      // Forgot Password Modal
      modalForgotPassword: document.getElementById('modal-forgot-password'),
      formForgotPassword: document.getElementById('form-forgot-password'),
      forgotEmail: document.getElementById('forgot-email'),
      forgotEmailError: document.getElementById('forgot-email-error'),
      btnCloseForgotModal: document.getElementById('btn-close-forgot-modal'),
      btnCancelForgotModal: document.getElementById('btn-cancel-forgot-modal'),

      // Modals
      intakeModal: document.getElementById('modal-new-intake'),
      formNewIntake: document.getElementById('form-new-intake'),
      btnCloseIntakeModal: document.getElementById('btn-close-intake-modal'),
      btnCancelIntakeModal: document.getElementById('btn-cancel-intake-modal'),

      dossierModal: document.getElementById('modal-rescue-dossier'),
      btnCloseDossierModal: document.getElementById('btn-close-dossier-modal'),
      dossierModalContent: document.getElementById('dossier-modal-content'),
      dossierTabs: document.querySelectorAll('.dossier-tab-btn'),

      // Toast Container
      toastContainer: document.getElementById('toast-container')
    };
  },

  bindEvents() {
    // 1440x1024 Frame Controls
    if (this.dom.btnFrameDesktop) {
      this.dom.btnFrameDesktop.addEventListener('click', () => this.setFrameMode('desktop'));
    }
    if (this.dom.btnFrameFluid) {
      this.dom.btnFrameFluid.addEventListener('click', () => this.setFrameMode('fluid'));
    }
    if (this.dom.selectScale) {
      this.dom.selectScale.addEventListener('change', (e) => this.applyZoomScale(e.target.value));
    }
    if (this.dom.btnSimulateIntake) {
      this.dom.btnSimulateIntake.addEventListener('click', () => this.simulateEmergencyIntake());
    }

    // Top Navigation / Auth View Switcher
    if (this.dom.btnNavApp) {
      this.dom.btnNavApp.addEventListener('click', () => this.switchAuthMode('app'));
    }
    if (this.dom.btnNavLogin) {
      this.dom.btnNavLogin.addEventListener('click', () => this.switchAuthMode('login'));
    }
    if (this.dom.btnNavRegister) {
      this.dom.btnNavRegister.addEventListener('click', () => this.switchAuthMode('register'));
    }

    // Inter-screen Auth Links
    if (this.dom.linkGotoRegister) {
      this.dom.linkGotoRegister.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchAuthMode('register');
      });
    }
    if (this.dom.linkGotoLogin) {
      this.dom.linkGotoLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchAuthMode('login');
      });
    }
    if (this.dom.btnSidebarLogout) {
      this.dom.btnSidebarLogout.addEventListener('click', () => {
        this.switchAuthMode('login');
        this.showToast('Signed out of shelter terminal', 'success');
      });
    }

    // Demo Credentials Quick Fill
    if (this.dom.btnPrefillLogin) {
      this.dom.btnPrefillLogin.addEventListener('click', () => this.prefillDemoLogin());
    }

    // Password Visibility Toggles
    if (this.dom.btnToggleLoginPwd && this.dom.loginPassword) {
      this.dom.btnToggleLoginPwd.addEventListener('click', () => {
        this.togglePasswordVisibility(this.dom.loginPassword);
      });
    }

    // Login Form Submission
    if (this.dom.formAuthLogin) {
      this.dom.formAuthLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLoginSubmit();
      });
    }

    // Multi-Step Wizard Event Listeners
    if (this.dom.wizardStepNodes) {
      this.dom.wizardStepNodes.forEach(node => {
        node.addEventListener('click', () => {
          const targetStep = parseInt(node.getAttribute('data-step'), 10);
          this.jumpToWizardStep(targetStep);
        });
      });
    }

    if (this.dom.btnWizardBack) {
      this.dom.btnWizardBack.addEventListener('click', () => this.retreatWizardStep());
    }
    if (this.dom.btnWizardContinue) {
      this.dom.btnWizardContinue.addEventListener('click', () => this.advanceWizardStep());
    }
    if (this.dom.btnWizardSaveDraft) {
      this.dom.btnWizardSaveDraft.addEventListener('click', () => this.saveWizardDraft());
    }
    if (this.dom.btnWizardExitLogin) {
      this.dom.btnWizardExitLogin.addEventListener('click', () => this.switchAuthMode('login'));
    }
    if (this.dom.btnLaunchShelterWorkspace) {
      this.dom.btnLaunchShelterWorkspace.addEventListener('click', () => this.launchShelterFromWizard());
    }
    if (this.dom.btnToggleWizPwd && this.dom.wizMasterPwd) {
      this.dom.btnToggleWizPwd.addEventListener('click', () => {
        this.togglePasswordVisibility(this.dom.wizMasterPwd);
      });
    }

    // Clear validation errors on user input for wizard fields
    const wizFields = [
      'wizOrgName', 'wizOrgRegno', 'wizOrgYear', 'wizKennelCapacity',
      'wizRepName', 'wizRepRole', 'wizContactEmail', 'wizPhone', 'wizHelpline',
      'wizAddress', 'wizCity', 'wizPincode', 'wizMission', 'wizMasterPwd', 'wizConfirmPwd'
    ];
    wizFields.forEach(field => {
      if (this.dom[field]) {
        this.dom[field].addEventListener('input', () => {
          this.dom[field].classList.remove('is-invalid');
          const err = this.dom[`${field}Error`];
          if (err) err.classList.remove('visible');
        });
      }
    });

    if (this.dom.wizLegalTerms && this.dom.wizLegalTermsError) {
      this.dom.wizLegalTerms.addEventListener('change', () => {
        if (this.dom.wizLegalTerms.checked) {
          this.dom.wizLegalTermsError.classList.remove('visible');
        }
      });
    }

    // Capabilities Chip Checkboxes style sync
    document.querySelectorAll('.chip-checkbox-label input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const parent = cb.closest('.chip-checkbox-label');
        if (parent) parent.classList.toggle('checked', cb.checked);
      });
    });

    // Forgot Password Trigger & Modal
    if (this.dom.btnForgotPwdTrigger) {
      this.dom.btnForgotPwdTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openForgotPasswordModal();
      });
    }
    if (this.dom.btnCloseForgotModal) {
      this.dom.btnCloseForgotModal.addEventListener('click', () => this.closeForgotPasswordModal());
    }
    if (this.dom.btnCancelForgotModal) {
      this.dom.btnCancelForgotModal.addEventListener('click', () => this.closeForgotPasswordModal());
    }
    if (this.dom.formForgotPassword) {
      this.dom.formForgotPassword.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleForgotPasswordSubmit();
      });
    }

    // Clear validation errors on login inputs
    ['loginEmail', 'loginPassword'].forEach(field => {
      if (this.dom[field]) {
        this.dom[field].addEventListener('input', () => {
          this.dom[field].classList.remove('is-invalid');
          const err = this.dom[`${field}Error`];
          if (err) err.classList.remove('visible');
        });
      }
    });

    // Sidebar Navigation
    this.dom.navItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetScreen = btn.getAttribute('data-screen');
        if (targetScreen) this.navigateTo(targetScreen);
      });
    });

    // Global Search Bar
    if (this.dom.globalSearchInput) {
      this.dom.globalSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        PawBridgeStore.searchQuery = query;
        this.handleGlobalSearch(query);
      });
    }

    // Rescue Filters & Search
    if (this.dom.rescueSearchField) {
      this.dom.rescueSearchField.addEventListener('input', (e) => {
        PawBridgeStore.searchQuery = e.target.value.toLowerCase().trim();
        this.renderRescuesGrid();
      });
    }

    this.dom.rescueFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.dom.rescueFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        PawBridgeStore.filterStatus = chip.getAttribute('data-filter') || 'all';
        this.renderRescuesGrid();
      });
    });

    // Ward Tabs in Kennels
    this.dom.wardTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.wardTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        PawBridgeStore.activeWard = btn.getAttribute('data-ward') || 'all';
        this.renderKennelBays();
      });
    });

    // Notifications Drawer Toggle
    if (this.dom.btnNotifBell) {
      this.dom.btnNotifBell.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dom.notifDrawer.classList.toggle('active');
      });
    }

    document.addEventListener('click', (e) => {
      if (this.dom.notifDrawer && this.dom.notifDrawer.classList.contains('active')) {
        if (!this.dom.notifDrawer.contains(e.target) && !this.dom.btnNotifBell.contains(e.target)) {
          this.dom.notifDrawer.classList.remove('active');
        }
      }
    });

    if (this.dom.btnMarkNotifsRead) {
      this.dom.btnMarkNotifsRead.addEventListener('click', () => {
        PawBridgeStore.notifications.forEach(n => n.unread = false);
        this.renderNotifications();
        this.showToast('All notifications marked as read', 'success');
      });
    }

    // Urgent Triage Callout button
    if (this.dom.btnUrgentDossier) {
      this.dom.btnUrgentDossier.addEventListener('click', () => {
        this.openRescueDossier('RC-1048');
      });
    }

    // New Intake Modal Triggers
    const openIntake = () => this.openIntakeModal();
    if (this.dom.btnOpenIntakeModal) this.dom.btnOpenIntakeModal.addEventListener('click', openIntake);
    if (this.dom.btnNewIntakeSecondary) this.dom.btnNewIntakeSecondary.addEventListener('click', openIntake);
    if (this.dom.btnCloseIntakeModal) this.dom.btnCloseIntakeModal.addEventListener('click', () => this.closeIntakeModal());
    if (this.dom.btnCancelIntakeModal) this.dom.btnCancelIntakeModal.addEventListener('click', () => this.closeIntakeModal());

    // Intake Form Submission
    if (this.dom.formNewIntake) {
      this.dom.formNewIntake.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleIntakeSubmit();
      });
    }

    // Dossier Modal Close
    if (this.dom.btnCloseDossierModal) {
      this.dom.btnCloseDossierModal.addEventListener('click', () => this.closeDossierModal());
    }

    // Dossier Tab switching
    this.dom.dossierTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.dom.dossierTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetTab = tab.getAttribute('data-tab');
        this.switchDossierTab(targetTab);
      });
    });

    // SOS Trigger button
    if (this.dom.btnTriggerSos) {
      this.dom.btnTriggerSos.addEventListener('click', () => this.triggerNewSosDispatch());
    }

    // Restock All button in inventory
    if (this.dom.btnRestockAll) {
      this.dom.btnRestockAll.addEventListener('click', () => this.restockInventory());
    }
  },

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (this.dom.globalSearchInput) this.dom.globalSearchInput.focus();
      } else if (e.key === 'Escape') {
        this.closeIntakeModal();
        this.closeDossierModal();
        if (this.dom.notifDrawer) this.dom.notifDrawer.classList.remove('active');
      }
    });
  },

  // ============================================================
  // AUTHENTICATION MODES & FLOW SWITCHING
  // ============================================================
  switchAuthMode(mode) {
    // mode: 'app' | 'login' | 'register'
    PawBridgeStore.authMode = mode;

    // Reset visibility of all views
    if (this.dom.viewAppMain) this.dom.viewAppMain.style.display = mode === 'app' ? 'flex' : 'none';
    if (this.dom.viewAuthLogin) this.dom.viewAuthLogin.style.display = mode === 'login' ? 'flex' : 'none';
    if (this.dom.viewAuthRegister) this.dom.viewAuthRegister.style.display = mode === 'register' ? 'flex' : 'none';

    // Update Top Navigation Switcher Pills
    if (this.dom.btnNavApp) this.dom.btnNavApp.classList.toggle('active', mode === 'app');
    if (this.dom.btnNavLogin) this.dom.btnNavLogin.classList.toggle('active', mode === 'login');
    if (this.dom.btnNavRegister) this.dom.btnNavRegister.classList.toggle('active', mode === 'register');

    // Update Chrome URL bar text
    if (this.dom.chromeAddressText) {
      if (mode === 'login') {
        this.dom.chromeAddressText.textContent = 'https://pawbridge.org/app/auth/login';
      } else if (mode === 'register') {
        this.dom.chromeAddressText.textContent = 'https://pawbridge.org/app/auth/register';
      } else {
        this.dom.chromeAddressText.textContent = 'https://pawbridge.org/app/operations/shelter-triage';
      }
    }

    // Scroll to top of window frame
    if (this.dom.windowFrame) {
      this.dom.windowFrame.scrollTop = 0;
    }
  },

  prefillDemoLogin() {
    if (this.dom.loginEmail) this.dom.loginEmail.value = 'dr.ananya@happytails.org';
    if (this.dom.loginPassword) this.dom.loginPassword.value = 'pawbridge2026';
    
    // Clear validation error highlights
    if (this.dom.loginEmail) this.dom.loginEmail.classList.remove('is-invalid');
    if (this.dom.loginPassword) this.dom.loginPassword.classList.remove('is-invalid');
    if (this.dom.loginEmailError) this.dom.loginEmailError.classList.remove('visible');
    if (this.dom.loginPasswordError) this.dom.loginPasswordError.classList.remove('visible');

    this.showToast('Demo credentials loaded for Dr. Ananya Sharma', 'success');
  },

  togglePasswordVisibility(inputEl) {
    if (!inputEl) return;
    const isPass = inputEl.type === 'password';
    inputEl.type = isPass ? 'text' : 'password';
  },

  handleLoginSubmit() {
    let isValid = true;
    const email = this.dom.loginEmail?.value.trim() || '';
    const password = this.dom.loginPassword?.value || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      if (this.dom.loginEmail) this.dom.loginEmail.classList.add('is-invalid');
      if (this.dom.loginEmailError) this.dom.loginEmailError.classList.add('visible');
      isValid = false;
    } else {
      if (this.dom.loginEmail) this.dom.loginEmail.classList.remove('is-invalid');
      if (this.dom.loginEmailError) this.dom.loginEmailError.classList.remove('visible');
    }

    // Validate password
    if (!password || password.length < 8) {
      if (this.dom.loginPassword) this.dom.loginPassword.classList.add('is-invalid');
      if (this.dom.loginPasswordError) this.dom.loginPasswordError.classList.add('visible');
      isValid = false;
    } else {
      if (this.dom.loginPassword) this.dom.loginPassword.classList.remove('is-invalid');
      if (this.dom.loginPasswordError) this.dom.loginPasswordError.classList.remove('visible');
    }

    if (!isValid) {
      this.showToast('Please correct highlighted login fields', 'alert');
      return;
    }

    // Successful Login
    this.switchAuthMode('app');
    this.navigateTo('overview');
    this.showToast('Welcome back, Dr. Ananya Sharma! Workspace connected.', 'success');
  },

  // ============================================================
  // MULTI-STEP NGO REGISTRATION WIZARD METHODS
  // ============================================================
  setWizardStep(step) {
    // step: 1..5, or 6 for completion state
    PawBridgeStore.wizardStep = step;

    // Panes visibility
    if (this.dom.wizardPanes) {
      this.dom.wizardPanes.forEach(pane => pane.classList.remove('active'));
    }

    if (step === 6) {
      // Completion state
      const completionPane = document.getElementById('wizard-pane-completion');
      if (completionPane) completionPane.classList.add('active');
      if (this.dom.wizardFooterBar) this.dom.wizardFooterBar.style.display = 'none';
      if (this.dom.stepperProgressFill) this.dom.stepperProgressFill.style.width = '100%';
      if (this.dom.wizardStepCounter) this.dom.wizardStepCounter.textContent = 'Application Completed';

      if (this.dom.wizardStepNodes) {
        this.dom.wizardStepNodes.forEach(node => {
          node.classList.remove('active');
          node.classList.add('completed');
          const circle = node.querySelector('.step-circle');
          if (circle) circle.textContent = '✓';
        });
      }
      return;
    }

    // Normal steps 1 to 5
    const activePane = document.getElementById(`wizard-pane-${step}`);
    if (activePane) activePane.classList.add('active');
    if (this.dom.wizardFooterBar) this.dom.wizardFooterBar.style.display = 'flex';

    // Stepper track progress width
    const percent = ((step - 1) / 4) * 100;
    if (this.dom.stepperProgressFill) this.dom.stepperProgressFill.style.width = `${percent}%`;
    if (this.dom.wizardStepCounter) this.dom.wizardStepCounter.textContent = `Step ${step} of 5`;

    // Stepper nodes visual states
    if (this.dom.wizardStepNodes) {
      this.dom.wizardStepNodes.forEach(node => {
        const nodeStep = parseInt(node.getAttribute('data-step'), 10);
        const circle = node.querySelector('.step-circle');

        if (nodeStep < step) {
          node.classList.remove('active');
          node.classList.add('completed');
          if (circle) circle.textContent = '✓';
        } else if (nodeStep === step) {
          node.classList.add('active');
          node.classList.remove('completed');
          if (circle) circle.textContent = nodeStep;
        } else {
          node.classList.remove('active', 'completed');
          if (circle) circle.textContent = nodeStep;
        }
      });
    }

    // Button Labels
    if (this.dom.btnWizardBack) {
      const backSpan = this.dom.btnWizardBack.querySelector('span');
      if (backSpan) {
        backSpan.textContent = step === 1 ? 'Return to Login' : 'Back';
      }
    }

    if (this.dom.btnWizardContinueText) {
      this.dom.btnWizardContinueText.textContent = step === 5 ? 'Submit Application & Register NGO' : 'Continue';
    }

    // If reaching review step 5, update review summary display
    if (step === 5) {
      this.updateReviewSummary();
    }

    // Scroll stage container to top
    const stage = document.querySelector('.wizard-full-viewport');
    if (stage) stage.scrollTop = 0;
  },

  validateStep(step) {
    let isValid = true;
    let firstInvalid = null;

    if (step === 1) {
      const orgName = this.dom.wizOrgName?.value.trim() || '';
      const orgType = this.dom.wizOrgType?.value || '';
      const orgRegno = this.dom.wizOrgRegno?.value.trim() || '';
      const orgYear = parseInt(this.dom.wizOrgYear?.value, 10);
      const capacity = parseInt(this.dom.wizKennelCapacity?.value, 10);

      if (orgName.length < 3) {
        this.dom.wizOrgName?.classList.add('is-invalid');
        this.dom.wizOrgNameError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizOrgName;
        isValid = false;
      }
      if (!orgType) {
        this.dom.wizOrgType?.classList.add('is-invalid');
        this.dom.wizOrgTypeError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizOrgType;
        isValid = false;
      }
      if (orgRegno.length < 2) {
        this.dom.wizOrgRegno?.classList.add('is-invalid');
        this.dom.wizOrgRegnoError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizOrgRegno;
        isValid = false;
      }
      if (!orgYear || isNaN(orgYear) || orgYear < 1950 || orgYear > 2026) {
        this.dom.wizOrgYear?.classList.add('is-invalid');
        this.dom.wizOrgYearError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizOrgYear;
        isValid = false;
      }
      if (!capacity || isNaN(capacity) || capacity < 1) {
        this.dom.wizKennelCapacity?.classList.add('is-invalid');
        this.dom.wizKennelCapacityError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizKennelCapacity;
        isValid = false;
      }
    } else if (step === 2) {
      const repName = this.dom.wizRepName?.value.trim() || '';
      const repRole = this.dom.wizRepRole?.value.trim() || '';
      const email = this.dom.wizContactEmail?.value.trim() || '';
      const phone = this.dom.wizPhone?.value.trim() || '';
      const helpline = this.dom.wizHelpline?.value.trim() || '';
      const address = this.dom.wizAddress?.value.trim() || '';
      const city = this.dom.wizCity?.value.trim() || '';
      const pincode = this.dom.wizPincode?.value.trim() || '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (repName.length < 2) {
        this.dom.wizRepName?.classList.add('is-invalid');
        this.dom.wizRepNameError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizRepName;
        isValid = false;
      }
      if (repRole.length < 2) {
        this.dom.wizRepRole?.classList.add('is-invalid');
        this.dom.wizRepRoleError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizRepRole;
        isValid = false;
      }
      if (!email || !emailRegex.test(email)) {
        this.dom.wizContactEmail?.classList.add('is-invalid');
        this.dom.wizContactEmailError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizContactEmail;
        isValid = false;
      }
      if (!phone || phone.length < 8) {
        this.dom.wizPhone?.classList.add('is-invalid');
        this.dom.wizPhoneError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizPhone;
        isValid = false;
      }
      if (!helpline || helpline.length < 5) {
        this.dom.wizHelpline?.classList.add('is-invalid');
        this.dom.wizHelplineError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizHelpline;
        isValid = false;
      }
      if (!address || address.length < 5) {
        this.dom.wizAddress?.classList.add('is-invalid');
        this.dom.wizAddressError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizAddress;
        isValid = false;
      }
      if (!city || city.length < 2) {
        this.dom.wizCity?.classList.add('is-invalid');
        this.dom.wizCityError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizCity;
        isValid = false;
      }
      if (!pincode || pincode.length < 5) {
        this.dom.wizPincode?.classList.add('is-invalid');
        this.dom.wizPincodeError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizPincode;
        isValid = false;
      }
    } else if (step === 3) {
      // Step 3 Documents: sample verified docs attached, always passes
      isValid = true;
    } else if (step === 4) {
      const mission = this.dom.wizMission?.value.trim() || '';
      if (!mission || mission.length < 20) {
        this.dom.wizMission?.classList.add('is-invalid');
        this.dom.wizMissionError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizMission;
        isValid = false;
      }
    } else if (step === 5) {
      const pwd = this.dom.wizMasterPwd?.value || '';
      const confirmPwd = this.dom.wizConfirmPwd?.value || '';
      const legalChecked = this.dom.wizLegalTerms?.checked;

      if (!pwd || pwd.length < 8) {
        this.dom.wizMasterPwd?.classList.add('is-invalid');
        this.dom.wizMasterPwdError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizMasterPwd;
        isValid = false;
      }
      if (!confirmPwd || confirmPwd !== pwd) {
        this.dom.wizConfirmPwd?.classList.add('is-invalid');
        this.dom.wizConfirmPwdError?.classList.add('visible');
        if (!firstInvalid) firstInvalid = this.dom.wizConfirmPwd;
        isValid = false;
      }
      if (!legalChecked) {
        this.dom.wizLegalTermsError?.classList.add('visible');
        isValid = false;
      }
    }

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      this.showToast('Please complete all required fields correctly to continue', 'alert');
    }

    return isValid;
  },

  advanceWizardStep() {
    const current = PawBridgeStore.wizardStep || 1;
    if (!this.validateStep(current)) return;

    if (current === 5) {
      // Final submission
      const orgName = this.dom.wizOrgName?.value.trim() || 'Happy Tails Animal Sanctuary';
      PawBridgeStore.ngoInfo.name = orgName;

      // Update sidebar NGO badge
      const ngoNameEls = document.querySelectorAll('.ngo-name');
      ngoNameEls.forEach(el => el.textContent = orgName);

      // Move to completion state
      this.setWizardStep(6);
      this.showToast(`🎉 Registration submitted successfully for ${orgName}!`, 'success');
    } else {
      this.setWizardStep(current + 1);
    }
  },

  retreatWizardStep() {
    const current = PawBridgeStore.wizardStep || 1;
    if (current === 1) {
      this.switchAuthMode('login');
    } else if (current === 6) {
      this.setWizardStep(5);
    } else {
      this.setWizardStep(current - 1);
    }
  },

  jumpToWizardStep(stepNumber) {
    if (stepNumber < (PawBridgeStore.wizardStep || 1)) {
      this.setWizardStep(stepNumber);
    } else {
      if (this.validateStep(PawBridgeStore.wizardStep || 1)) {
        this.setWizardStep(stepNumber);
      }
    }
  },

  saveWizardDraft() {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.showToast(`✓ Registration draft saved successfully at ${timeStr}`, 'success');
  },

  updateReviewSummary() {
    if (this.dom.revOrgName && this.dom.wizOrgName) {
      this.dom.revOrgName.textContent = this.dom.wizOrgName.value || '—';
    }
    if (this.dom.revOrgType && this.dom.wizOrgType) {
      this.dom.revOrgType.textContent = this.dom.wizOrgType.options[this.dom.wizOrgType.selectedIndex]?.text || this.dom.wizOrgType.value;
    }
    if (this.dom.revOrgRegno && this.dom.wizOrgRegno) {
      this.dom.revOrgRegno.textContent = this.dom.wizOrgRegno.value || '—';
    }
    if (this.dom.revOrgYear && this.dom.wizOrgYear) {
      this.dom.revOrgYear.textContent = this.dom.wizOrgYear.value || '—';
    }
    if (this.dom.revFacilityType && this.dom.wizFacilityType) {
      this.dom.revFacilityType.textContent = this.dom.wizFacilityType.value || '—';
    }
    if (this.dom.revKennelCapacity && this.dom.wizKennelCapacity) {
      this.dom.revKennelCapacity.textContent = `${this.dom.wizKennelCapacity.value} Bays`;
    }

    if (this.dom.revRepName && this.dom.wizRepName) {
      this.dom.revRepName.textContent = this.dom.wizRepName.value || '—';
    }
    if (this.dom.revRepRole && this.dom.wizRepRole) {
      this.dom.revRepRole.textContent = this.dom.wizRepRole.value || '—';
    }
    if (this.dom.revContactEmail && this.dom.wizContactEmail) {
      this.dom.revContactEmail.textContent = this.dom.wizContactEmail.value || '—';
    }
    if (this.dom.revHelpline && this.dom.wizHelpline) {
      this.dom.revHelpline.textContent = this.dom.wizHelpline.value || '—';
    }
    if (this.dom.revFullAddress) {
      const addr = this.dom.wizAddress?.value || '';
      const city = this.dom.wizCity?.value || '';
      const state = this.dom.wizState?.value || '';
      const pin = this.dom.wizPincode?.value || '';
      this.dom.revFullAddress.textContent = `${addr}, ${city}, ${state} ${pin}`;
    }
  },

  launchShelterFromWizard() {
    this.switchAuthMode('app');
    this.navigateTo('overview');
    this.showToast('🚀 Shelter operations workspace connected!', 'success');
  },

  openForgotPasswordModal() {
    if (this.dom.modalForgotPassword) {
      this.dom.modalForgotPassword.classList.add('active');
      if (this.dom.forgotEmail) {
        this.dom.forgotEmail.value = this.dom.loginEmail?.value || '';
        this.dom.forgotEmail.focus();
      }
    }
  },

  closeForgotPasswordModal() {
    if (this.dom.modalForgotPassword) {
      this.dom.modalForgotPassword.classList.remove('active');
      if (this.dom.forgotEmail) this.dom.forgotEmail.classList.remove('is-invalid');
      if (this.dom.forgotEmailError) this.dom.forgotEmailError.classList.remove('visible');
    }
  },

  handleForgotPasswordSubmit() {
    const email = this.dom.forgotEmail?.value.trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      if (this.dom.forgotEmail) this.dom.forgotEmail.classList.add('is-invalid');
      if (this.dom.forgotEmailError) this.dom.forgotEmailError.classList.add('visible');
      return;
    }

    this.closeForgotPasswordModal();
    this.showToast(`✓ Password reset instructions dispatched to ${email}`, 'success');
  },

  // ============================================================
  // NAVIGATION & VIEW SWITCHING
  // ============================================================
  navigateTo(screenId) {
    PawBridgeStore.activeScreen = screenId;

    // Update Sidebar state
    this.dom.navItems.forEach(btn => {
      if (btn.getAttribute('data-screen') === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update screen views
    this.dom.screenViews.forEach(view => {
      if (view.id === `screen-${screenId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update breadcrumb and header title
    const screenMeta = {
      overview: { section: 'Operations', title: 'Live Triage & Shelter Overview' },
      rescues: { section: 'Operations', title: 'Rescue & Intake Registry' },
      kennels: { section: 'Shelter Management', title: 'Kennels & Capacity Matrix' },
      clinical: { section: 'Veterinary Center', title: 'Clinical Care & Daily Meds' },
      adoptions: { section: 'Programs', title: 'Adoption & Foster Desk' },
      dispatch: { section: 'Logistics', title: 'Ambulance & Field Dispatch' },
      compliance: { section: 'Governance', title: 'Compliance & Document Vault' },
      inventory: { section: 'Logistics', title: 'Medical Supplies & Feed' }
    };

    const meta = screenMeta[screenId] || { section: 'PawBridge', title: 'Operations OS' };
    if (this.dom.headerBreadcrumbContext) this.dom.headerBreadcrumbContext.textContent = meta.section;
    if (this.dom.headerContextTitle) this.dom.headerContextTitle.textContent = meta.title;

    // Trigger re-render of active screen
    this.renderScreen(screenId);
  },

  renderScreen(screenId) {
    switch (screenId) {
      case 'overview':
        this.renderOverview();
        break;
      case 'rescues':
        this.renderRescuesGrid();
        break;
      case 'kennels':
        this.renderKennelBays();
        break;
      case 'clinical':
        this.renderClinicalRounds();
        break;
      case 'adoptions':
        this.renderAdoptionsKanban();
        break;
      case 'dispatch':
        this.renderDispatchIncidents();
        break;
      case 'compliance':
        this.renderComplianceGrid();
        break;
      case 'inventory':
        this.renderInventoryTable();
        break;
    }
  },

  render() {
    this.renderOverview();
    this.renderRescuesGrid();
    this.renderKennelBays();
    this.renderClinicalRounds();
    this.renderAdoptionsKanban();
    this.renderDispatchIncidents();
    this.renderComplianceGrid();
    this.renderInventoryTable();
    this.renderNotifications();
  },

  // ============================================================
  // FRAME CONTROLS & RESIZE
  // ============================================================
  setFrameMode(mode) {
    PawBridgeStore.frameMode = mode;
    if (mode === 'fluid') {
      this.dom.viewportCanvas.classList.add('fluid-mode');
      this.dom.btnFrameFluid.classList.add('active');
      this.dom.btnFrameDesktop.classList.remove('active');
      this.dom.windowFrame.style.transform = 'none';
      this.showToast('Switched to Responsive Fullscreen Viewport', 'success');
    } else {
      this.dom.viewportCanvas.classList.remove('fluid-mode');
      this.dom.btnFrameDesktop.classList.add('active');
      this.dom.btnFrameFluid.classList.remove('active');
      this.applyZoomScale(PawBridgeStore.zoomScale);
      this.showToast('Restored 1440 × 1024 Desktop Frame', 'success');
    }
  },

  applyZoomScale(val) {
    PawBridgeStore.zoomScale = val;
    if (PawBridgeStore.frameMode === 'fluid') return;

    if (val === 'fit') {
      const availableWidth = window.innerWidth - 64;
      const scale = Math.min(1, Math.max(0.6, availableWidth / 1440));
      this.dom.windowFrame.style.transform = `scale(${scale})`;
      this.dom.windowFrame.style.transformOrigin = 'top center';
    } else {
      const scale = parseFloat(val) / 100;
      this.dom.windowFrame.style.transform = scale === 1 ? 'none' : `scale(${scale})`;
      this.dom.windowFrame.style.transformOrigin = 'top center';
    }
  },

  // ============================================================
  // SCREEN 1: OVERVIEW & DASHBOARD
  // ============================================================
  renderOverview() {
    // Update metric counters
    const activeCount = PawBridgeStore.rescues.length;
    const criticalCount = PawBridgeStore.rescues.filter(r => r.triage === 'critical' || r.triage === 'surgery').length;
    const occupiedCount = PawBridgeStore.kennelBays.filter(b => b.status === 'occupied').length;
    const occupancyPercent = Math.round((occupiedCount / PawBridgeStore.kennelBays.length) * 100);

    if (this.dom.statMetricAnimals) this.dom.statMetricAnimals.textContent = activeCount;
    if (this.dom.statMetricCritical) this.dom.statMetricCritical.textContent = criticalCount;
    if (this.dom.statMetricOccupancy) this.dom.statMetricOccupancy.textContent = `${occupancyPercent}%`;

    // Render Recent Rescues table in dashboard
    if (this.dom.overviewRescuesTable) {
      const recent = PawBridgeStore.rescues.slice(0, 5);
      this.dom.overviewRescuesTable.innerHTML = recent.map(r => `
        <tr>
          <td>
            <div class="animal-meta-cell">
              <img src="${r.photoUrl}" alt="${r.name}" class="animal-thumb-photo" />
              <div class="animal-identity-text">
                <span class="animal-primary-name">${r.name}</span>
                <span class="animal-sub-desc">${r.tag} • ${r.age}</span>
              </div>
            </div>
          </td>
          <td>${r.breed}</td>
          <td>${r.intakeDate}</td>
          <td>
            <span class="status-pill ${r.triage}">${r.triageLabel}</span>
          </td>
          <td>
            <strong>${r.bay}</strong>
            <div style="font-size: 11px; color: var(--color-text-muted);">${r.ward}</div>
          </td>
          <td>
            <button class="btn-secondary-cream" style="padding: 5px 10px; font-size: 12px;" onclick="PawBridgeApp.openRescueDossier('${r.id}')">
              View Dossier
            </button>
          </td>
        </tr>
      `).join('');
    }

    // Render Clinical Schedule tasks
    if (this.dom.overviewClinicalList) {
      const tasks = PawBridgeStore.clinicalTasks.slice(0, 4);
      this.dom.overviewClinicalList.innerHTML = tasks.map(t => `
        <div class="clinical-task-row">
          <span class="task-time-pill">${t.doseTime}</span>
          <div class="task-details-col">
            <div class="task-title">${t.patient}: ${t.drug}</div>
            <div class="task-desc">Assigned: ${t.vet} • ${t.round} Round</div>
          </div>
          <span class="task-status-tag" style="color: ${t.done ? '#4EA348' : '#D98B70'};">
            ${t.done ? '✓ Completed' : 'Pending'}
          </span>
        </div>
      `).join('');
    }
  },

  // ============================================================
  // SCREEN 2: RESCUES & INTAKE REGISTRY
  // ============================================================
  renderRescuesGrid() {
    if (!this.dom.rescueCardsGrid) return;

    let filtered = PawBridgeStore.rescues;

    // Filter by triage status
    if (PawBridgeStore.filterStatus !== 'all') {
      filtered = filtered.filter(r => r.triage === PawBridgeStore.filterStatus);
    }

    // Search query filter
    if (PawBridgeStore.searchQuery) {
      const q = PawBridgeStore.searchQuery;
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q) ||
        r.breed.toLowerCase().includes(q) ||
        r.bay.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      this.dom.rescueCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: #FFFFFF; border-radius: 12px; border: 1px dashed var(--color-border);">
          <div style="font-family: var(--font-heading); font-size: 20px; font-weight: 600; margin-bottom: 8px;">No rescue cases match this filter</div>
          <p class="body-text-16 muted" style="margin-bottom: 16px;">Try adjusting your search criteria or triage category.</p>
          <button class="btn-primary-olive" onclick="PawBridgeApp.resetRescueFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    this.dom.rescueCardsGrid.innerHTML = filtered.map(r => `
      <div class="rescue-dossier-card" onclick="PawBridgeApp.openRescueDossier('${r.id}')">
        <div class="card-photo-banner">
          <img src="${r.photoUrl}" alt="${r.name}" loading="lazy" />
          <div class="card-photo-badges">
            <span class="case-id-badge">${r.id}</span>
            <span class="status-pill ${r.triage}">${r.triageLabel}</span>
          </div>
        </div>

        <div class="card-info-body">
          <div class="card-name-row">
            <h3 class="card-animal-name">${r.name}</h3>
            <span class="card-breed-tag">${r.gender} • ${r.age}</span>
          </div>

          <p style="font-size: 13px; color: var(--color-text-muted); line-height: 18px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${r.condition}
          </p>

          <div class="card-attributes-grid">
            <div class="attr-item">
              <span class="attr-key">Assigned Bay</span>
              <span class="attr-val">${r.bay}</span>
            </div>
            <div class="attr-item">
              <span class="attr-key">Intake Date</span>
              <span class="attr-val">${r.intakeDate}</span>
            </div>
            <div class="attr-item">
              <span class="attr-key">Weight</span>
              <span class="attr-val">${r.weight}</span>
            </div>
            <div class="attr-item">
              <span class="attr-key">Lead Carer</span>
              <span class="attr-val">${r.carer.split(' ')[1] || r.carer}</span>
            </div>
          </div>
        </div>

        <div class="card-footer-action">
          <span style="font-size: 11px; font-weight: 600; color: var(--color-olive);">
            ✓ Microchip ${r.tag}
          </span>
          <span style="font-size: 12px; font-weight: 600; color: var(--color-olive); display: flex; align-items: center; gap: 4px;">
            Open Dossier →
          </span>
        </div>
      </div>
    `).join('');
  },

  resetRescueFilters() {
    PawBridgeStore.filterStatus = 'all';
    PawBridgeStore.searchQuery = '';
    if (this.dom.rescueSearchField) this.dom.rescueSearchField.value = '';
    this.dom.rescueFilterChips.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-filter') === 'all');
    });
    this.renderRescuesGrid();
  },

  // ============================================================
  // SCREEN 3: KENNELS & SHELTER CAPACITY
  // ============================================================
  renderKennelBays() {
    if (!this.dom.bayGridContainer) return;

    let bays = PawBridgeStore.kennelBays;
    if (PawBridgeStore.activeWard !== 'all') {
      const wardNameMap = {
        'ward-a': 'Ward A',
        'ward-b': 'Ward B',
        'ward-c': 'Ward C',
        'ward-d': 'Ward D'
      };
      const match = wardNameMap[PawBridgeStore.activeWard];
      if (match) bays = bays.filter(b => b.ward === match);
    }

    this.dom.bayGridContainer.innerHTML = bays.map(b => {
      if (b.status === 'vacant') {
        return `
          <div class="bay-unit-card vacant">
            <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--color-text-dark); margin-bottom: 4px;">
              ${b.id}
            </div>
            <div style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 12px;">${b.ward} • ${b.tag}</div>
            <button class="btn-secondary-cream" style="font-size: 12px; padding: 6px 12px;" onclick="PawBridgeApp.quickAssignBay('${b.id}')">
              + Assign Animal
            </button>
          </div>
        `;
      }

      const isIcu = b.ward === 'Ward A';
      return `
        <div class="bay-unit-card ${isIcu ? 'icu' : 'occupied'}">
          <div class="bay-top-header">
            <span class="bay-number">${b.id}</span>
            <span class="status-pill ${isIcu ? 'critical' : 'stable'}" style="font-size: 10px; padding: 2px 6px;">
              ${b.ward}
            </span>
          </div>

          <div class="bay-occupant-profile">
            <img src="${b.photo}" alt="${b.occupant}" class="bay-photo" />
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 14px; font-weight: 600; color: var(--color-text-dark);">${b.occupant}</span>
              <span style="font-size: 11px; color: var(--color-text-muted);">Cleaned: ${b.cleanTime}</span>
            </div>
          </div>

          <div class="bay-care-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            ${b.tag}
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-border-subtle); padding-top: 8px;">
            <button class="btn-secondary-cream" style="font-size: 11px; padding: 4px 8px;" onclick="PawBridgeApp.transferBayPrompt('${b.id}')">
              Transfer Bay
            </button>
            <button class="btn-secondary-cream" style="font-size: 11px; padding: 4px 8px;" onclick="PawBridgeApp.navigateTo('clinical')">
              Chart →
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  quickAssignBay(bayId) {
    this.openIntakeModal(bayId);
  },

  transferBayPrompt(bayId) {
    const vacantBays = PawBridgeStore.kennelBays.filter(b => b.status === 'vacant');
    if (vacantBays.length === 0) {
      this.showToast('No vacant kennel bays available for transfer currently.', 'alert');
      return;
    }
    const target = vacantBays[0].id;
    this.showToast(`Transferred patient from ${bayId} to ${target}`, 'success');
  },

  // ============================================================
  // SCREEN 4: CLINICAL CARE & DAILY MEDS
  // ============================================================
  renderClinicalRounds() {
    if (!this.dom.clinicalMedsTableBody) return;

    const completed = PawBridgeStore.clinicalTasks.filter(t => t.done).length;
    const total = PawBridgeStore.clinicalTasks.length;
    const percent = Math.round((completed / total) * 100);

    if (this.dom.clinicalProgressBar) this.dom.clinicalProgressBar.style.width = `${percent}%`;
    if (this.dom.clinicalProgressText) this.dom.clinicalProgressText.textContent = `${completed} of ${total} doses administered (${percent}%)`;

    this.dom.clinicalMedsTableBody.innerHTML = PawBridgeStore.clinicalTasks.map(t => `
      <tr>
        <td>
          <span class="task-time-pill">${t.doseTime}</span>
        </td>
        <td>
          <strong>${t.patient}</strong>
        </td>
        <td>
          <span style="font-weight: 500; color: var(--color-olive-dark);">${t.drug}</span>
        </td>
        <td>${t.round}</td>
        <td>${t.vet}</td>
        <td>
          <button class="dose-check-btn ${t.done ? 'checked' : ''}" onclick="PawBridgeApp.toggleMedDose('${t.id}')">
            ${t.done ? '✓ Administered' : 'Mark Administered'}
          </button>
        </td>
      </tr>
    `).join('');
  },

  toggleMedDose(taskId) {
    const task = PawBridgeStore.clinicalTasks.find(t => t.id === taskId);
    if (task) {
      task.done = !task.done;
      this.renderClinicalRounds();
      this.renderOverview();
      this.showToast(task.done ? `Dose recorded for ${task.patient}` : `Dose un-marked for ${task.patient}`, 'success');
    }
  },

  // ============================================================
  // SCREEN 5: ADOPTIONS & FOSTER KANBAN
  // ============================================================
  renderAdoptionsKanban() {
    const stages = ['new', 'screening', 'homecheck', 'trial', 'finalized'];

    stages.forEach(stage => {
      const colEl = this.dom.kanbanColumns[stage];
      if (!colEl) return;

      const items = PawBridgeStore.adoptions.filter(a => a.stage === stage);
      const countPill = colEl.parentElement.querySelector('.col-count-pill');
      if (countPill) countPill.textContent = items.length;

      colEl.innerHTML = items.map(a => `
        <div class="kanban-card">
          <div class="kanban-applicant-name">${a.applicant}</div>
          <div class="kanban-target-dog">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            Matching: ${a.dog}
          </div>
          <p style="font-size: 11px; color: var(--color-text-muted); line-height: 16px; margin-bottom: 8px;">
            ${a.dwelling} • ${a.city}
          </p>
          <div class="kanban-meta-row">
            <span>${a.submittedDate}</span>
            ${stage !== 'finalized' ? `
              <button class="btn-advance-stage" onclick="PawBridgeApp.advanceAdoptionStage('${a.id}')">
                Advance →
              </button>
            ` : `
              <span style="color: #4EA348; font-weight: 600;">✓ Finalized</span>
            `}
          </div>
        </div>
      `).join('');
    });
  },

  advanceAdoptionStage(appId) {
    const app = PawBridgeStore.adoptions.find(a => a.id === appId);
    if (!app) return;

    const sequence = ['new', 'screening', 'homecheck', 'trial', 'finalized'];
    const idx = sequence.indexOf(app.stage);
    if (idx < sequence.length - 1) {
      app.stage = sequence[idx + 1];
      this.renderAdoptionsKanban();
      this.showToast(`Application for ${app.applicant} advanced to ${app.stage.toUpperCase()}`, 'success');
    }
  },

  // ============================================================
  // SCREEN 6: DISPATCH & SOS AMBULANCE
  // ============================================================
  renderDispatchIncidents() {
    if (!this.dom.dispatchIncidentsList) return;

    this.dom.dispatchIncidentsList.innerHTML = PawBridgeStore.dispatchIncidents.map(inc => `
      <div class="sos-incident-card ${inc.priority === 'critical' ? 'priority-red' : 'priority-yellow'}">
        <div class="incident-top-row">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="status-pill ${inc.priority === 'critical' ? 'critical' : 'quarantine'}">${inc.priority.toUpperCase()}</span>
            <strong style="font-size: 14px;">${inc.id}</strong>
          </div>
          <span style="font-size: 12px; color: var(--color-text-muted);">${inc.time}</span>
        </div>

        <div>
          <div style="font-weight: 600; font-size: 14px; color: var(--color-text-dark); margin-bottom: 2px;">
            ${inc.animal}
          </div>
          <div style="font-size: 12px; color: var(--color-text-muted);">
            📍 ${inc.location} • Caller: ${inc.caller} (${inc.phone})
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-border-subtle); padding-top: 10px;">
          <span style="font-size: 12px; font-weight: 500; color: var(--color-olive-dark);">
            🚑 ${inc.vehicle} (${inc.status})
          </span>
          <span style="font-size: 12px; font-weight: 600; color: var(--color-text-dark);">
            ETA: ${inc.eta}
          </span>
        </div>
      </div>
    `).join('');
  },

  triggerNewSosDispatch() {
    const newId = `SOS-${Math.floor(Math.random() * 200 + 850)}`;
    const newInc = {
      id: newId,
      time: 'Just now',
      caller: 'Rohini Volunteer Care',
      phone: '+91 98110 99881',
      location: 'Rohini Sector 7 Main Gate',
      animal: 'Puppy entangled in construction wire with leg trauma',
      priority: 'critical',
      status: 'Dispatched',
      vehicle: 'DL-01-A-4491 (Trauma Unit)',
      eta: '11 mins',
      paramedic: 'Rescue Driver Sunita + Nurse Vikas'
    };

    PawBridgeStore.dispatchIncidents.unshift(newInc);
    this.renderDispatchIncidents();
    this.showToast(`🚨 New emergency alert ${newId} logged and ambulance dispatched`, 'alert');
  },

  // ============================================================
  // SCREEN 7: COMPLIANCE & STATUTORY VAULT
  // ============================================================
  renderComplianceGrid() {
    if (!this.dom.complianceGrid) return;

    this.dom.complianceGrid.innerHTML = PawBridgeStore.compliance.map(c => `
      <div class="cert-card">
        <div class="cert-icon-top">
          <div class="cert-stamp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <span class="status-pill stable">Verified</span>
        </div>

        <div>
          <h4 class="cert-title">${c.title}</h4>
          <div class="cert-meta-info" style="margin-top: 6px;">
            <div><strong>Authority:</strong> ${c.authority}</div>
            <div><strong>Reg / File:</strong> ${c.number}</div>
            <div><strong>Validity:</strong> ${c.validity}</div>
          </div>
        </div>

        <div style="border-top: 1px solid var(--color-border-subtle); padding-top: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 10px; font-family: monospace; color: var(--color-text-subtle);">
            ${c.hash}
          </span>
          <button class="btn-secondary-cream" style="font-size: 11px; padding: 4px 8px;" onclick="PawBridgeApp.previewComplianceDoc('${c.id}')">
            View Certificate
          </button>
        </div>
      </div>
    `).join('');
  },

  previewComplianceDoc(certId) {
    const doc = PawBridgeStore.compliance.find(c => c.id === certId);
    if (doc) {
      alert(`[Official Statutory Verification]\n\nTitle: ${doc.title}\nAuthority: ${doc.authority}\nRegistration #: ${doc.number}\nValidity: ${doc.validity}\nVerification Hash: ${doc.hash}\n\nStatus: AWBI & Ministry of Corporate Affairs Verified`);
    }
  },

  // ============================================================
  // SCREEN 8: MEDICAL INVENTORY & FEED
  // ============================================================
  renderInventoryTable() {
    if (!this.dom.inventoryTableBody) return;

    this.dom.inventoryTableBody.innerHTML = PawBridgeStore.inventory.map(item => `
      <tr>
        <td>
          <strong>${item.name}</strong>
        </td>
        <td>${item.category}</td>
        <td>
          <span style="font-weight: 700; font-size: 15px; color: ${item.stock <= item.minThreshold ? '#D98B70' : 'var(--color-text-dark)'};">
            ${item.stock} ${item.unit}
          </span>
        </td>
        <td>${item.minThreshold} ${item.unit}</td>
        <td>
          <span class="status-pill ${item.stock <= item.minThreshold ? 'critical' : 'stable'}">
            ${item.stock <= item.minThreshold ? 'Low Stock' : 'Adequate'}
          </span>
        </td>
        <td>
          <button class="btn-secondary-cream" style="padding: 4px 10px; font-size: 12px;" onclick="PawBridgeApp.reorderSingleItem('${item.id}')">
            + Reorder
          </button>
        </td>
      </tr>
    `).join('');
  },

  reorderSingleItem(itemId) {
    const item = PawBridgeStore.inventory.find(i => i.id === itemId);
    if (item) {
      item.stock += 25;
      this.renderInventoryTable();
      this.showToast(`Requisition sent: Restocked 25 units of ${item.name}`, 'success');
    }
  },

  restockInventory() {
    PawBridgeStore.inventory.forEach(i => {
      if (i.stock <= i.minThreshold) i.stock += 30;
    });
    this.renderInventoryTable();
    this.showToast('Reorder requisitions generated for all low inventory items', 'success');
  },

  // ============================================================
  // NOTIFICATIONS SYSTEM
  // ============================================================
  renderNotifications() {
    if (!this.dom.notifDrawerList) return;

    const unreadCount = PawBridgeStore.notifications.filter(n => n.unread).length;
    if (this.dom.notifCountBadge) {
      this.dom.notifCountBadge.textContent = unreadCount;
      this.dom.notifCountBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }

    this.dom.notifDrawerList.innerHTML = PawBridgeStore.notifications.map(n => `
      <div class="drawer-item ${n.unread ? 'unread' : ''}" onclick="PawBridgeApp.markSingleNotifRead('${n.id}')">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
            <strong style="font-size: 13px; color: var(--color-text-dark);">${n.title}</strong>
            <span style="font-size: 11px; color: var(--color-text-subtle);">${n.time}</span>
          </div>
          <p style="font-size: 12px; color: var(--color-text-muted); line-height: 16px;">
            ${n.text}
          </p>
        </div>
      </div>
    `).join('');
  },

  markSingleNotifRead(notifId) {
    const n = PawBridgeStore.notifications.find(item => item.id === notifId);
    if (n) {
      n.unread = false;
      this.renderNotifications();
    }
  },

  // ============================================================
  // NEW INTAKE REGISTRATION MODAL
  // ============================================================
  openIntakeModal(preselectedBay = '') {
    if (this.dom.intakeModal) {
      this.dom.intakeModal.classList.add('active');
      if (preselectedBay) {
        const bayField = document.getElementById('intake-bay');
        if (bayField) bayField.value = preselectedBay;
      }
    }
  },

  closeIntakeModal() {
    if (this.dom.intakeModal) {
      this.dom.intakeModal.classList.remove('active');
    }
  },

  handleIntakeSubmit() {
    const name = document.getElementById('intake-name')?.value || 'Unnamed Rescue';
    const breed = document.getElementById('intake-breed')?.value || 'Indie Mix';
    const age = document.getElementById('intake-age')?.value || '1 Year';
    const gender = document.getElementById('intake-gender')?.value || 'Male';
    const triage = document.getElementById('intake-triage')?.value || 'stable';
    const bay = document.getElementById('intake-bay')?.value || 'RUN-03';
    const condition = document.getElementById('intake-condition')?.value || 'Admitted for medical assessment and shelter care.';
    const location = document.getElementById('intake-location')?.value || 'Delhi NCR';

    const triageLabels = {
      critical: 'ICU / Critical Care',
      surgery: 'Post-Op Recovery',
      quarantine: 'Puppy Quarantine',
      stable: 'Rehabilitation / Stable',
      foster: 'Medical Foster Trial'
    };

    const newId = `RC-${1049 + PawBridgeStore.rescues.length}`;
    const newRescue = {
      id: newId,
      name,
      tag: `IND-DL-${Math.floor(Math.random() * 8000 + 1000)}`,
      breed,
      age,
      gender,
      weight: '12.5 kg',
      intakeDate: 'Today',
      intakeTime: 'Just now',
      intakeLocation: location,
      rescuer: 'Community Ambulance Dispatch',
      triage,
      triageLabel: triageLabels[triage] || 'Stable',
      condition,
      bay,
      ward: 'Ward C: Surgical Recovery',
      carer: 'Dr. Ananya Sharma',
      photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.5 °C', hr: '90 bpm', mucous: 'Pink', hydration: 'Normal' },
      medications: ['Broad spectrum antibiotic course', 'Deworming & Rabies schedule'],
      sterilized: false,
      rabiesVaccinated: true,
      legalStatus: 'Shelter Custody Intake Verified'
    };

    PawBridgeStore.rescues.unshift(newRescue);

    // Update bay occupancy
    const bayObj = PawBridgeStore.kennelBays.find(b => b.id === bay);
    if (bayObj) {
      bayObj.status = 'occupied';
      bayObj.occupant = `${name} (New Intake)`;
      bayObj.photo = newRescue.photoUrl;
    }

    this.closeIntakeModal();
    if (this.dom.formNewIntake) this.dom.formNewIntake.reset();

    this.render();
    this.navigateTo('rescues');
    this.showToast(`✓ New rescue animal ${name} registered (${newId})`, 'success');
  },

  simulateEmergencyIntake() {
    this.openIntakeModal('ICU-05');
  },

  // ============================================================
  // RESCUE CASE DOSSIER MODAL
  // ============================================================
  openRescueDossier(rescueId) {
    const r = PawBridgeStore.rescues.find(item => item.id === rescueId);
    if (!r) return;

    PawBridgeStore.selectedRescueId = rescueId;

    if (this.dom.dossierModalContent) {
      this.dom.dossierModalContent.innerHTML = `
        <div style="display: flex; gap: 20px; align-items: flex-start; padding-bottom: 20px; border-bottom: 1px solid var(--color-border);">
          <img src="${r.photoUrl}" alt="${r.name}" style="width: 110px; height: 110px; border-radius: 12px; object-fit: cover; border: 1px solid var(--color-border);" />
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <div style="display: flex; align-items: baseline; gap: 10px;">
                <h2 style="font-family: var(--font-heading); font-size: 26px; font-weight: 700; color: var(--color-text-dark);">${r.name}</h2>
                <span style="font-size: 13px; font-weight: 600; color: var(--color-text-muted);">${r.id}</span>
              </div>
              <span class="status-pill ${r.triage}">${r.triageLabel}</span>
            </div>
            <p style="font-size: 14px; color: var(--color-text-dark); margin-bottom: 8px;">
              ${r.breed} • ${r.gender} • ${r.age} • ${r.weight}
            </p>
            <div style="display: flex; gap: 16px; font-size: 12px; color: var(--color-text-muted);">
              <span>📍 Intake: ${r.intakeDate} (${r.intakeLocation})</span>
              <span>🏷️ Microchip: ${r.tag}</span>
              <span>🏠 Bay: <strong>${r.bay}</strong></span>
            </div>
          </div>
        </div>

        <!-- Tab Content 1: Intake & Custody Details -->
        <div id="dossier-tab-overview" class="dossier-tab-pane active" style="margin-top: 16px;">
          <h4 class="section-heading-24" style="font-size: 18px; margin-bottom: 12px;">Case History & Legal Custody</h4>
          <div style="background: #FAF8F2; padding: 14px; border-radius: 10px; border: 1px solid var(--color-border); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; color: var(--color-text-dark); margin-bottom: 4px;">Presenting Condition:</div>
            <div style="font-size: 14px; line-height: 20px; color: var(--color-text-muted);">${r.condition}</div>
          </div>

          <div class="form-grid-2">
            <div>
              <span class="label-13 uppercase">Rescue Dispatch Unit</span>
              <div style="font-size: 14px; font-weight: 600; margin-top: 2px;">${r.rescuer}</div>
            </div>
            <div>
              <span class="label-13 uppercase">Legal Panchnama & Custody</span>
              <div style="font-size: 14px; font-weight: 600; margin-top: 2px; color: var(--color-olive);">${r.legalStatus}</div>
            </div>
            <div>
              <span class="label-13 uppercase">Assigned Attending Vet</span>
              <div style="font-size: 14px; font-weight: 600; margin-top: 2px;">${r.carer}</div>
            </div>
            <div>
              <span class="label-13 uppercase">Rabies & Immunization Status</span>
              <div style="font-size: 14px; font-weight: 600; margin-top: 2px;">${r.rabiesVaccinated ? '✓ Anti-Rabies Active (Valid 1 Yr)' : 'Pending Vaccination'}</div>
            </div>
          </div>
        </div>
      `;
    }

    if (this.dom.dossierModal) {
      this.dom.dossierModal.classList.add('active');
    }
  },

  closeDossierModal() {
    if (this.dom.dossierModal) {
      this.dom.dossierModal.classList.remove('active');
    }
  },

  switchDossierTab(tabName) {
    const r = PawBridgeStore.rescues.find(item => item.id === PawBridgeStore.selectedRescueId);
    if (!r) return;

    const pane = document.getElementById('dossier-tab-overview');
    if (!pane) return;

    if (tabName === 'clinical') {
      pane.innerHTML = `
        <h4 class="section-heading-24" style="font-size: 18px; margin-bottom: 12px;">Clinical Chart & Vitals</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px;">
          <div style="background: #FAF8F2; padding: 10px; border-radius: 8px;">
            <div class="label-13 uppercase">Body Temp</div>
            <div style="font-size: 16px; font-weight: 700;">${r.vitals.temp}</div>
          </div>
          <div style="background: #FAF8F2; padding: 10px; border-radius: 8px;">
            <div class="label-13 uppercase">Heart Rate</div>
            <div style="font-size: 16px; font-weight: 700;">${r.vitals.hr}</div>
          </div>
          <div style="background: #FAF8F2; padding: 10px; border-radius: 8px;">
            <div class="label-13 uppercase">Mucous Membrane</div>
            <div style="font-size: 16px; font-weight: 700;">${r.vitals.mucous}</div>
          </div>
          <div style="background: #FAF8F2; padding: 10px; border-radius: 8px;">
            <div class="label-13 uppercase">Hydration</div>
            <div style="font-size: 16px; font-weight: 700;">${r.vitals.hydration}</div>
          </div>
        </div>

        <div style="font-size: 13px; font-weight: 600; margin-bottom: 6px;">Active Medication Protocol:</div>
        <ul style="padding-left: 20px; font-size: 14px; color: var(--color-text-dark); line-height: 22px;">
          ${r.medications.map(m => `<li>${m}</li>`).join('')}
        </ul>
      `;
    } else if (tabName === 'photos') {
      pane.innerHTML = `
        <h4 class="section-heading-24" style="font-size: 18px; margin-bottom: 12px;">Recovery Journey Timeline</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <span class="label-13 uppercase" style="display: block; margin-bottom: 6px;">Day 1: Emergency Intake</span>
            <img src="${r.photoIntake}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; border: 1px solid var(--color-border);" />
          </div>
          <div>
            <span class="label-13 uppercase" style="display: block; margin-bottom: 6px;">Day 21: Clinical Recovery</span>
            <img src="${r.photoRecovery}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; border: 1px solid var(--color-border);" />
          </div>
        </div>
      `;
    } else {
      this.openRescueDossier(r.id);
    }
  },

  // ============================================================
  // GLOBAL SEARCH HANDLER
  // ============================================================
  handleGlobalSearch(query) {
    if (!query) return;

    const matchRescue = PawBridgeStore.rescues.find(r => 
      r.name.toLowerCase().includes(query) ||
      r.id.toLowerCase().includes(query) ||
      r.tag.toLowerCase().includes(query)
    );

    if (matchRescue) {
      this.navigateTo('rescues');
      PawBridgeStore.searchQuery = query;
      this.renderRescuesGrid();
    }
  },

  // ============================================================
  // TOAST NOTIFICATION ENGINE
  // ============================================================
  showToast(message, type = 'success') {
    if (!this.dom.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `app-toast ${type}`;
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' ? '<path d="M20 6L9 17l-5-5"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
      </svg>
      <span>${message}</span>
    `;

    this.dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  PawBridgeApp.init();
});

// Expose globally for inline event triggers
window.PawBridgeApp = PawBridgeApp;
