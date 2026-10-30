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

  // Rescue Records View State
  rescueViewMode: 'hybrid', // 'hybrid' | 'grid'
  rescueStatusTab: 'all',
  rescueMedicalFilter: 'all',
  rescueOutcomeFilter: 'all',

  // Support Requests View State & Filter
  requestTab: 'all', // 'all' | 'active' | 'fulfilled' | 'closed'
  requestCategory: 'all',
  requestUrgency: 'all',
  requestSearchQuery: '',
  selectedRequestId: null,

  // Shelter Support & Aid Requisitions Dataset
  supportRequests: [
    {
      id: 'REQ-101',
      title: 'Emergency Trauma Surgery & Orthopedic Implants for Hit-and-Run Case #RC-1048 (Leo)',
      category: 'funding',
      categoryLabel: 'Funding & Surgery Grants',
      categoryIcon: '💰',
      urgency: 'critical',
      urgencyLabel: 'Critical / Emergency (< 48h)',
      status: 'active',
      statusLabel: 'Active Requisition',
      targetVal: 85000,
      currentVal: 58000,
      targetDisplay: '₹85,000 for Surgical Reduction & Pins',
      progressDisplay: '₹58,000 raised of ₹85,000 target',
      percent: 68,
      unit: '₹',
      deadline: '2026-10-31',
      deadlineDisplay: '31 Oct 2026 (3 days left)',
      isUrgentDeadline: true,
      linkedCase: 'Case #RC-1048 Leo (ICU-03)',
      author: 'Dr. Ananya Sharma (Lead Vet)',
      createdDate: '26 Oct 2026',
      description: 'Open compound tibia-fibula fracture from vehicular collision. Requires titanium bone plates, fixator pins, 5 days continuous IV analgesics, and orthopedic operating theater time.',
      photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Vet_Trauma_Prescription_RC1048.pdf', size: '1.8 MB', authority: 'Apollo Vet Ortho Center', hash: 'SHA256: 8f10bc44...9921' },
        { name: 'Titanium_Implants_Quotation.pdf', size: '840 KB', authority: 'Surgical Med Supplies', hash: 'SHA256: 3d12aa88...012a' }
      ],
      fulfillment: null
    },
    {
      id: 'REQ-102',
      title: '350 kg Gastrointestinal Puppy Starter Kibble & Milk Replacer for Yamuna Flood Litters',
      category: 'food',
      categoryLabel: 'Dog Food & Nutrition',
      categoryIcon: '🥣',
      urgency: 'critical',
      urgencyLabel: 'Critical / Emergency (< 48h)',
      status: 'active',
      statusLabel: 'Active Requisition',
      targetVal: 350,
      currentVal: 220,
      targetDisplay: '350 kg Starter Kibble + 40 Tins Milk Formula',
      progressDisplay: '220 kg pledged of 350 kg target',
      percent: 62,
      unit: 'kg',
      deadline: '2026-11-02',
      deadlineDisplay: '02 Nov 2026 (5 days left)',
      isUrgentDeadline: true,
      linkedCase: 'Ward B: Puppy Quarantine (14 Orphaned Pups)',
      author: 'Nurse Vikas (Diet Coordinator)',
      createdDate: '25 Oct 2026',
      description: '14 unweaned puppies rescued from flooded storm culverts in lowlands. Recovering from severe hypothermia; high-digestibility protein starter kibble and probiotic milk formula required to prevent gut stasis.',
      photo: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Puppy_Quarantine_Nutrition_Prescription.pdf', size: '1.2 MB', authority: 'PawBridge Clinical Diet Team', hash: 'SHA256: 77a1bc99...44fe' },
        { name: 'Weekly_Feed_Depletion_Audit.pdf', size: '620 KB', authority: 'Shelter Stores Manager', hash: 'SHA256: b201ca77...1128' }
      ],
      fulfillment: null
    },
    {
      id: 'REQ-103',
      title: 'Cold-Chain Anti-Rabies Biologicals & Injectable Antibiotics Emergency Buffer',
      category: 'medicines',
      categoryLabel: 'Medicines & Consumables',
      categoryIcon: '💊',
      urgency: 'high',
      urgencyLabel: 'High Priority (< 7 Days)',
      status: 'active',
      statusLabel: 'Active Requisition',
      targetVal: 150,
      currentVal: 90,
      targetDisplay: '150 Doses Rabisin + 60 Vials Ceftriaxone 1g',
      progressDisplay: '90 doses & 45 vials received of 150 target',
      percent: 60,
      unit: 'doses',
      deadline: '2026-11-05',
      deadlineDisplay: '05 Nov 2026 (8 days left)',
      isUrgentDeadline: false,
      linkedCase: 'Central Shelter Dispensary & Outreach Ambulance',
      author: 'Dr. Rajesh Verma (Pharmacist)',
      createdDate: '24 Oct 2026',
      description: 'Critical reserve replenishment of rabies vaccines and broad-spectrum ceftriaxone ahead of the South Delhi municipal outreach drive. Stock is logged directly into the digital cold-chain vault.',
      photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Shelter_Pharmacy_Requisition_Order_Oct26.pdf', size: '2.4 MB', authority: 'Chief Pharmacist Sign-Off', hash: 'SHA256: 4410aa99...882c' }
      ],
      fulfillment: null
    },
    {
      id: 'REQ-104',
      title: 'High-Pressure Autoclave Sterilizer Unit (35L) for ABC Surgical Theater',
      category: 'equipment',
      categoryLabel: 'Medical Equipment',
      categoryIcon: '🔬',
      urgency: 'high',
      urgencyLabel: 'High Priority (< 7 Days)',
      status: 'active',
      statusLabel: 'Active Requisition',
      targetVal: 42000,
      currentVal: 31500,
      targetDisplay: '1 Stainless Steel Autoclave Unit (₹42,000)',
      progressDisplay: '₹31,500 raised of ₹42,000 target',
      percent: 75,
      unit: '₹',
      deadline: '2026-11-10',
      deadlineDisplay: '10 Nov 2026 (13 days left)',
      isUrgentDeadline: false,
      linkedCase: 'Operating Theater 1 & Trauma Suite',
      author: 'Dr. Ananya Sharma (Lead Vet)',
      createdDate: '22 Oct 2026',
      description: 'Our secondary autoclave heating element broke down, limiting surgical kit turnover to 10 packs/day. A new 35L stainless steel autoclave is required to safely meet daily AWBI sterilization quotas without cross-contamination.',
      photo: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Surgical_Equipment_Proforma_Invoice.pdf', size: '1.5 MB', authority: 'BioMedics India Ltd.', hash: 'SHA256: 9912bc33...007f' },
        { name: 'AWBI_Sterilization_Standards_Checklist.pdf', size: '980 KB', authority: 'AWBI Monitoring Panel', hash: 'SHA256: 1209ef44...9981' }
      ],
      fulfillment: null
    },
    {
      id: 'REQ-105',
      title: 'Emergency Patient Ambulance Hydraulic Stretcher Ramp Overhaul (Van DL-01)',
      category: 'transport',
      categoryLabel: 'Patient Transport & Fleet',
      categoryIcon: '🚐',
      urgency: 'routine',
      urgencyLabel: 'Routine / Sustained',
      status: 'fulfilled',
      statusLabel: 'Fulfilled & Sealed',
      targetVal: 24000,
      currentVal: 24000,
      targetDisplay: '₹24,000 / 1 Hydraulic Ramp Overhaul',
      progressDisplay: '₹24,000 of ₹24,000 fulfilled (100%)',
      percent: 100,
      unit: '₹',
      deadline: '2026-10-24',
      deadlineDisplay: 'Completed 24 Oct 2026',
      isUrgentDeadline: false,
      linkedCase: 'Trauma Ambulance DL-01-A-4491',
      author: 'Transport Lead Driver Ramesh',
      createdDate: '18 Oct 2026',
      description: 'Hydraulic lift valve overhaul completed to safely board recumbent spine injury canines without spinal deflection.',
      photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Ambulance_Mechanic_Jobcard_881.pdf', size: '1.1 MB', authority: 'Delhi Auto Hydraulics', hash: 'SHA256: a882bc11...6610' },
        { name: 'Donation_Receipt_80G_Rotary.pdf', size: '720 KB', authority: 'Happy Tails Accounts Dept', hash: 'SHA256: 5519fe22...0019' }
      ],
      fulfillment: {
        sponsor: 'Rotary Club Delhi Central',
        date: '24 Oct 2026',
        receiptNo: 'GIN-TR-9918',
        deliveredVal: '₹24,000 (100% Direct Workshop Payment)',
        allocation: 'Fleet Maintenance Bay • Ambulance DL-01-A-4491',
        notes: 'Invoice paid directly to certified hydraulic workshop. Ramp load tested with 80kg weight and recertified.'
      }
    },
    {
      id: 'REQ-106',
      title: 'Weekend Shelter Canine Socialization, Leash Training & Gentle Bathing Volunteers',
      category: 'volunteers',
      categoryLabel: 'Volunteers & Manpower',
      categoryIcon: '🤝',
      urgency: 'high',
      urgencyLabel: 'High Priority (< 7 Days)',
      status: 'active',
      statusLabel: 'Active Requisition',
      targetVal: 12,
      currentVal: 8,
      targetDisplay: '12 Adult Volunteers (Weekend Shift)',
      progressDisplay: '8 of 12 volunteers confirmed',
      percent: 66,
      unit: 'volunteers',
      deadline: '2026-10-31',
      deadlineDisplay: '31 Oct 2026 (3 days left)',
      isUrgentDeadline: true,
      linkedCase: 'Ward D: Open Social Runs (28 Canines)',
      author: 'Meera Sen (Volunteer Coordinator)',
      createdDate: '24 Oct 2026',
      description: 'Seeking compassionate dog-friendly volunteers to assist shelter attendants with positive reinforcement sensory walks, gentle herbal tick-baths, and brushing for hospitalized animals awaiting adoption.',
      photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Volunteer_Safety_Handbook_PawBridge.pdf', size: '3.1 MB', authority: 'PawBridge Welfare Council', hash: 'SHA256: c992a011...4401' },
        { name: 'Shelter_Indemnity_Form_DL402.pdf', size: '420 KB', authority: 'Legal Trustee Board', hash: 'SHA256: 1109bc88...7719' }
      ],
      fulfillment: null
    },
    {
      id: 'REQ-107',
      title: 'Quiet, Ground-Floor Medical Foster Home for Post-Surgical Golden Mix Bella',
      category: 'foster',
      categoryLabel: 'Medical Foster Support',
      categoryIcon: '🏡',
      urgency: 'critical',
      urgencyLabel: 'Critical / Emergency (< 48h)',
      status: 'fulfilled',
      statusLabel: 'Fulfilled & Placed',
      targetVal: 1,
      currentVal: 1,
      targetDisplay: '1 Ground-Floor Foster Home (4 Weeks Duration)',
      progressDisplay: '1 of 1 Placed (100%)',
      percent: 100,
      unit: 'homes',
      deadline: '2026-10-26',
      deadlineDisplay: 'Completed 26 Oct 2026',
      isUrgentDeadline: false,
      linkedCase: 'Case #RC-1047 Bella (Ward C Surgical Recovery)',
      author: 'Rohit Verma (Adoption Desk)',
      createdDate: '20 Oct 2026',
      description: 'Bella underwent successful femoral head ostectomy surgery and needed a calm home environment without slippery tiles or steps for passive physical therapy.',
      photo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Veterinary_Foster_Protocol_Orthopedic.pdf', size: '1.4 MB', authority: 'Chief Orthopedic Surgeon', hash: 'SHA256: 77a100bc...9912' },
        { name: 'Signed_Foster_Custody_Deed_DL.pdf', size: '890 KB', authority: 'Legal Adoption Bureau', hash: 'SHA256: cc0119aa...5510' }
      ],
      fulfillment: {
        sponsor: 'Foster Carer Rohini Saxena',
        date: '26 Oct 2026',
        receiptNo: 'FOS-DL-1102',
        deliveredVal: '1 Dedicated Medical Foster Home (Chhatarpur)',
        allocation: 'Home Care Transition • Case #RC-1047 Bella',
        notes: 'Home inspection verified rubber matting and lawn access. Weekly vet check scheduled every Saturday.'
      }
    },
    {
      id: 'REQ-108',
      title: 'Heavy-Duty Winter Tarpaulin Sheeting & Thermal Bedding for Outdoor Bays',
      category: 'funding',
      categoryLabel: 'Funding & Surgery Grants',
      categoryIcon: '💰',
      urgency: 'routine',
      urgencyLabel: 'Routine / Sustained',
      status: 'closed',
      statusLabel: 'Closed & Archived',
      targetVal: 18000,
      currentVal: 0,
      targetDisplay: '₹18,000 for 12 Heavy-Duty Tarpaulins',
      progressDisplay: 'Archived into Annual Winterization Budget',
      percent: 0,
      unit: '₹',
      deadline: '2026-10-15',
      deadlineDisplay: 'Closed 15 Oct 2026',
      isUrgentDeadline: false,
      linkedCase: 'Ward D & Outer Social Paddock Runs',
      author: 'Shelter Supervisor Vikas',
      createdDate: '10 Oct 2026',
      description: 'Pre-winter shelter weatherproofing requirement. Requisition closed as capital requirement was merged into the comprehensive institutional grant.',
      photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
      documents: [
        { name: 'Winterization_Budget_Revision_2026.pdf', size: '1.6 MB', authority: 'Shelter Executive Committee', hash: 'SHA256: 339100aa...1100' }
      ],
      fulfillment: {
        sponsor: 'Shelter Internal Capital Vault',
        date: '15 Oct 2026',
        receiptNo: 'ARCH-2026-04',
        deliveredVal: 'Consolidated into Annual Capital Grant',
        allocation: 'Shelter Infrastructure Budget FY 25-26',
        notes: 'Closed without external public solicitation.'
      }
    }
  ],

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
      outcome: 'in_care',
      outcomeLabel: 'In Shelter Treatment',
      expenses: { spent: 6400, donor: 'Emergency Trauma Fund' },
      rescueStory: 'Reported by local shopkeepers as a victim of hit-and-run at 08:30 AM. Found trapped under divider railing with open compound tibia fracture and heavy shock. Stabilized with Thomas splint on site.',
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
      outcome: 'foster',
      outcomeLabel: 'Foster-to-Adopt Trial',
      expenses: { spent: 8200, donor: 'Foster Angel Grant' },
      rescueStory: 'Found abandoned tied to a park bench in heavy rain with bilateral hip dysplasia. Admitted for emergency femoral head ostectomy. Gentle and cooperative temperament during physical therapy.',
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
      outcome: 'released',
      outcomeLabel: 'Community ABC Release',
      expenses: { spent: 3500, donor: 'Community Feeders NCR' },
      rescueStory: 'Sustained extensive contact burns from roadside garbage incineration. Community feeders alerted PawBridge SOS helpline. Underwent daily debridement and silver dressing with 80% tissue granulation achieved.',
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
      outcome: 'in_care',
      outcomeLabel: 'In Shelter Treatment',
      expenses: { spent: 2800, donor: 'Puppy Emergency Fund' },
      rescueStory: 'Rescued from stormwater culvert after heavy rain. Maternal abandonment confirmed. Initial hypothermia managed with warming blankets and continuous puppy glucose oral hydration.',
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
      outcome: 'adopted',
      outcomeLabel: 'Adoption Finalized',
      expenses: { spent: 4300, donor: 'Rhea Sengupta Family' },
      rescueStory: 'Recovered from highway divider with infected corneal laceration. Successfully managed with ophthalmic drops and supportive antibiotic therapy. Cleared behavioral checks and finalized for adoption.',
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
      outcome: 'sanctuary',
      outcomeLabel: 'Permanent Sanctuary',
      expenses: { spent: 9600, donor: 'Senior Dog Sanctuary Trust' },
      rescueStory: 'Guard dog abandoned following factory decommissioning. Found dehydrated with chronic bilateral stifle osteoarthritis and allergic dermatitis. Now enjoying permanent palliative sanctuary care.',
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
    },
    {
      id: 'RC-1042',
      name: 'Ruby',
      tag: 'IND-DL-8744',
      breed: 'Beagle Hound Cross',
      age: '1.5 Years',
      gender: 'Female',
      weight: '11.8 kg',
      intakeDate: '03 Oct 2026',
      intakeTime: '01:15 PM',
      intakeLocation: 'Najafgarh Rural By-Lane',
      rescuer: 'Animal Protection Squad',
      triage: 'stable',
      triageLabel: 'Dermatology Rehab',
      outcome: 'foster',
      outcomeLabel: 'Foster-to-Adopt Trial',
      expenses: { spent: 5100, donor: 'Anti-Breeding Campaign' },
      rescueStory: 'Rescued from an unauthorized backyard breeder with full-body demodectic mange and severe anemia. Haircoat has regrown 90% after weekly medicated dips and high-protein diet.',
      condition: 'Demodectic mange resolving; skin scraped negative; energetic and affectionate',
      bay: 'REC-05',
      ward: 'Ward C: Surgical Recovery',
      carer: 'Dr. Ananya Sharma',
      photoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.5 °C', hr: '88 bpm', mucous: 'Pink', hydration: 'Normal' },
      medications: ['Nexgard Spectra monthly', 'Fish oil oral liquid'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'Seized Welfare Case #AWBI-91'
    },
    {
      id: 'RC-1041',
      name: 'Rocky',
      tag: 'IND-DL-8729',
      breed: 'Indie Desi Hound',
      age: '3.5 Years',
      gender: 'Male',
      weight: '18.6 kg',
      intakeDate: '28 Sep 2026',
      intakeTime: '08:40 AM',
      intakeLocation: 'Mayapuri Industrial Yard',
      rescuer: 'Feeder Helpline Team',
      triage: 'stable',
      triageLabel: 'Territory Released',
      outcome: 'released',
      outcomeLabel: 'Community ABC Released',
      expenses: { spent: 3900, donor: 'ABC Sterilization Grant' },
      rescueStory: 'Suffered severe bite puncture wounds in territorial dogfight. Admitted for wound flushing, drain placement, and surgical sterilization under the municipal ABC protocol. Fully healed.',
      condition: 'Deep neck punctures healed; anti-rabies booster administered; released to home territory',
      bay: 'RUN-06',
      ward: 'Ward D: Open Social Runs',
      carer: 'Staff Nurse Vikas',
      photoUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.2 °C', hr: '80 bpm', mucous: 'Pink', hydration: 'Normal' },
      medications: ['Amoxicillin-clavulanic acid completed'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'ABC Rule 2023 Municipal Release'
    },
    {
      id: 'RC-1040',
      name: 'Kaalu',
      tag: 'IND-DL-8711',
      breed: 'Indie Black Labrador Mix',
      age: '5 Years',
      gender: 'Male',
      weight: '21.0 kg',
      intakeDate: '15 Sep 2026',
      intakeTime: '06:20 PM',
      intakeLocation: 'Dwarka Expressway Pillar 42',
      rescuer: 'Dwarka Citizens SOS Helpline',
      triage: 'stable',
      triageLabel: 'Wheelchair Mobility Care',
      outcome: 'sanctuary',
      outcomeLabel: 'Permanent Sanctuary',
      expenses: { spent: 14500, donor: 'Special Needs Wheelchair Fund' },
      rescueStory: 'Hit by speeding vehicle causing T12-L1 spinal trauma and posterior paralysis. Fitted with a custom two-wheel mobility cart. Expressive, friendly, and thriving in the sanctuary paddock.',
      condition: 'Paraplegic with excellent upper body strength; assisted bladder expression twice daily; uses wheelchair cart',
      bay: 'RUN-08',
      ward: 'Ward D: Open Social Runs',
      carer: 'Dr. Ananya Sharma',
      photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.4 °C', hr: '84 bpm', mucous: 'Pink', hydration: 'Normal' },
      medications: ['Neurobion Forte injection weekly', 'Cranberry extract for bladder health'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'Permanent Sanctuary Lifelong Custody'
    },
    {
      id: 'RC-1039',
      name: 'Lucy',
      tag: 'IND-DL-8698',
      breed: 'Cocker Spaniel Cross',
      age: '4 Years',
      gender: 'Female',
      weight: '12.4 kg',
      intakeDate: '01 Sep 2026',
      intakeTime: '03:10 PM',
      intakeLocation: 'Ghaziabad Border Crossing',
      rescuer: 'Anti-Cruelty Police Raid',
      triage: 'foster',
      triageLabel: 'Adoption Finalized',
      outcome: 'adopted',
      outcomeLabel: 'Adoption Finalized',
      expenses: { spent: 7200, donor: 'Rescue Rehome Circle' },
      rescueStory: 'Confiscated during illegal breeding crackdown. Treated for bilateral ear hematomas and dental tartar. Successfully adopted by a certified family in South Delhi after two-week trial.',
      condition: 'Full clinical recovery; vaccinated, microchipped, spayed, and transitioned to permanent home',
      bay: 'FOS-03',
      ward: 'Ward E: Foster Transition',
      carer: 'Dr. Rajesh Verma',
      photoUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      photoIntake: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      photoRecovery: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      vitals: { temp: '38.3 °C', hr: '78 bpm', mucous: 'Pink', hydration: 'Normal' },
      medications: ['Ear cleanser solution weekly'],
      sterilized: true,
      rabiesVaccinated: true,
      legalStatus: 'Adoption Deed Registered #DL-AD-2026-19'
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

  // Statutory Document Verification & Audit State
  ngoVerificationStatus: 'provisional', // 'provisional' | 'verified'
  auditorMode: true,
  activeDocFilter: 'all',
  selectedDocId: null,
  activeReplaceDocId: null,

  verificationDocuments: [
    {
      id: 'doc-reg',
      category: 'Legal Entity Identification',
      title: 'Trust Registration Deed / Society Certificate',
      mandatory: true,
      fileName: 'society_reg_deed_dl_act_xxi_2018.pdf',
      fileSize: '3.4 MB',
      uploadDate: '14 Oct 2026, 10:45 AM',
      uploadedBy: 'Trustee Dr. Ananya Sharma',
      uploadProgress: 100,
      status: 'verified', // 'draft' | 'pending' | 'verified' | 'needs_changes' | 'rejected'
      isSensitive: true,
      maskedId: 'DL/2018/****923',
      authority: 'Sub-Registrar of Societies, Govt of NCT Delhi',
      hash: 'SHA256: 8a93bf81e7d0...9b31',
      reviewDate: '16 Oct 2026',
      auditorNotes: 'Verified against Registrar of Societies NCT Delhi gazette records. Registered entity name and registered office address authenticated.',
      auditorName: 'Adv. Vikramaditya Sen (Senior Legal Auditor)'
    },
    {
      id: 'doc-pan',
      category: 'Tax Identity & Clearance',
      title: 'Permanent Account Number (PAN) Card & NGO Darpan UID',
      mandatory: true,
      fileName: 'ngo_pan_card_incorporation_dl.pdf',
      fileSize: '1.2 MB',
      uploadDate: '14 Oct 2026, 11:15 AM',
      uploadedBy: 'Finance Officer R. Saxena',
      uploadProgress: 100,
      status: 'verified',
      isSensitive: true,
      maskedId: 'AAATP****K',
      authority: 'Income Tax Department & NITI Aayog NGO Darpan',
      hash: 'SHA256: 3d71ff90c421...889e',
      reviewDate: '16 Oct 2026',
      auditorNotes: 'Entity PAN matched on Income Tax Department CBDT database. NITI Aayog NGO Darpan UID #DL/2019/021948 verified active.',
      auditorName: 'Adv. Vikramaditya Sen (Senior Legal Auditor)'
    },
    {
      id: 'doc-12a80g',
      category: 'Non-Profit Tax Exemption',
      title: 'Section 12A & 80G Approval Orders (Form 10AC)',
      mandatory: true,
      fileName: 'form_10ac_provisional_ay2024_2029.pdf',
      fileSize: '2.8 MB',
      uploadDate: 'Yesterday at 04:30 PM',
      uploadedBy: 'Trustee Dr. Ananya Sharma',
      uploadProgress: 100,
      status: 'pending',
      isSensitive: true,
      maskedId: 'CIT(EXEMP)/DELHI/****3381',
      authority: 'Commissioner of Income Tax (Exemptions), New Delhi',
      hash: 'SHA256: d472aa10fc83...01fa',
      reviewDate: 'Queued in Desk 2',
      auditorNotes: 'Document uploaded and queued for Section 80G validity audit. Compliance desk currently validating 5-year provisional order compliance.',
      auditorName: 'Under Scrutiny by CA R. K. Bhasin'
    },
    {
      id: 'doc-mou',
      category: 'Operational Authorization',
      title: 'Municipal Stray Animal Birth Control (ABC) MOU',
      mandatory: true,
      fileName: 'mcd_delhi_abc_arv_tender_agreement_2025.pdf',
      fileSize: '5.1 MB',
      uploadDate: '3 days ago',
      uploadedBy: 'Operations Head Vikas',
      uploadProgress: 100,
      status: 'needs_changes',
      isSensitive: true,
      maskedId: 'MCD/VET/2025/****401',
      authority: 'Municipal Corporation of Delhi (Veterinary Services)',
      hash: 'SHA256: 7f33bb19a12c...a024',
      reviewDate: '26 Oct 2026',
      auditorNotes: 'Auditor Remark: Page 6 of the Municipal bilateral agreement is missing the Executive Veterinary Officer municipal counter-stamp. Please re-upload the fully executed 7-page bilateral MOU.',
      auditorName: 'Dr. Suniti Rao (Municipal Liaison Officer)'
    },
    {
      id: 'doc-audit',
      category: 'Humane Shelter Standards',
      title: 'Veterinary Council of India (VCI) Shelter Ground Audit',
      mandatory: false,
      fileName: 'vci_shelter_inspection_audit_q3_2026.pdf',
      fileSize: '4.6 MB',
      uploadDate: 'Staged on Local Workstation',
      uploadedBy: 'Draft by Vikas',
      uploadProgress: 45,
      status: 'draft',
      isSensitive: true,
      maskedId: 'VCI/INSP/2026/****12',
      authority: 'Veterinary Council of India State Inspection Committee',
      hash: 'SHA256: Pending upload completion',
      reviewDate: 'Draft Staged',
      auditorNotes: 'Draft staged locally. Click "Replace / Finalize Upload" to transfer to encrypted statutory vault and queue for compliance review.',
      auditorName: 'Unassigned (Draft State)'
    },
    {
      id: 'doc-fcra',
      category: 'Cross-Border Giving Compliance',
      title: 'Foreign Contribution Regulation Act (FCRA) License',
      mandatory: false,
      fileName: 'fcra_renewal_mha_notice_2024.pdf',
      fileSize: '1.9 MB',
      uploadDate: '15 Oct 2026',
      uploadedBy: 'Finance Officer R. Saxena',
      uploadProgress: 100,
      status: 'rejected',
      isSensitive: true,
      maskedId: 'MHA/FCRA/Reg-****0144',
      authority: 'Ministry of Home Affairs, Foreigners Division',
      hash: 'SHA256: c382a991b100...ff42',
      reviewDate: '18 Oct 2026',
      auditorNotes: 'Disapproved: Certificate validity lapsed on 31 March 2024. The Ministry of Home Affairs validity extension notification or renewed Form FC-3R acknowledgement must be provided.',
      auditorName: 'Adv. Vikramaditya Sen (Senior Legal Auditor)'
    }
  ],

  // Live Notifications
  notifications: [
    { id: 'notif-1', title: 'Critical Rescue Admitted', text: 'Case #RC-1048 (Leo) admitted to ICU-03. Surgical team on standby.', time: '45m ago', unread: true },
    { id: 'notif-2', title: 'Medication Round Due', text: 'Midday medication round begins at 01:00 PM (4 patients pending).', time: '1h ago', unread: true },
    { id: 'notif-3', title: 'Antibiotic Inventory Alert', text: 'Ceftriaxone Inj stock dropped below minimum threshold (18 left).', time: '2h ago', unread: true },
    { id: 'notif-4', title: 'Adoption Home Check Cleared', text: 'Home check for Rhea Sengupta (Applicant #app-1) approved.', time: 'Yesterday', unread: false }
  ],

  // Impact Reports & Statutory State
  impactState: {
    activePeriodId: 'fy-2025-26',
    activeSeries: 'all', // 'all' | 'rescues' | 'treated' | 'rehabbed' | 'adopted'
    activeEvidenceCategory: 'all',
    customDateStart: '2025-04-01',
    customDateEnd: '2026-10-28',
    periods: [
      {
        id: 'fy-2025-26',
        title: 'FY 2025–26 (YTD Current)',
        type: 'annual',
        dateRange: '01 Apr 2025 – 28 Oct 2026',
        startDate: '2025-04-01',
        endDate: '2026-10-28',
        status: 'reported', // 'reported' | 'verified'
        statusLabel: 'Organisation-Reported (Unverified)',
        auditNote: 'Audit Scrutiny: Pending Annual Statutory Audit by External Chartered Accountants',
        figures: {
          rescued: 1428,
          treated: 1382,
          rehabilitated: 1195,
          adopted: 342,
          abcSterilized: 618,
          communityReleased: 853,
          mortalityRate: '3.2%'
        },
        breakdowns: {
          rescued: '1,180 Street Indies • 248 Abandoned Pedigrees',
          treated: '412 Ortho/Trauma • 580 Medical/OPD • 390 ABC',
          rehabbed: 'Avg Stay: 24 Days • 0% Premature Release',
          adopted: '318 Domestic Homes • 24 Permanent Sanctuary'
        },
        trends: {
          rescued: '▲ +14.2%',
          treated: '96.8% intake rate',
          rehabbed: '83.7% healed',
          adopted: '▲ +22.0%'
        },
        lastUpdated: '28 Oct 2026 by Dr. Ananya Sharma',
        revisionHistory: [
          { date: '28 Oct 2026', user: 'Dr. Ananya Sharma (Lead Vet)', note: 'Reconciled October casualty intake from physical OPD registers.' },
          { date: '30 Sep 2026', user: 'R. Mehta (Shelter Admin)', note: 'Q2 closing figures synchronized with ambulance GPS field logs.' }
        ]
      },
      {
        id: 'q3-2026',
        title: 'Q3 2026 (Oct–Dec 2026)',
        type: 'quarterly',
        dateRange: '01 Oct 2026 – 31 Dec 2026',
        startDate: '2026-10-01',
        endDate: '2026-12-31',
        status: 'reported',
        statusLabel: 'Organisation-Reported (Unverified)',
        auditNote: 'Audit Scrutiny: Mid-quarter shelter intake records • Desk scrutiny active',
        figures: {
          rescued: 184,
          treated: 176,
          rehabilitated: 148,
          adopted: 46,
          abcSterilized: 88,
          communityReleased: 102,
          mortalityRate: '2.7%'
        },
        breakdowns: {
          rescued: '154 Street Indies • 30 Abandoned Breeds',
          treated: '48 Trauma Surgeries • 76 OPD • 52 ABC',
          rehabbed: 'Avg Stay: 19 Days • 0% Premature Release',
          adopted: '42 Family Adoptions • 4 Long-Term Sanctuary'
        },
        trends: {
          rescued: '▲ +8.5%',
          treated: '95.6% intake rate',
          rehabbed: '84.1% healed',
          adopted: '▲ +15.0%'
        },
        lastUpdated: '28 Oct 2026 by Dr. Ananya Sharma',
        revisionHistory: [
          { date: '28 Oct 2026', user: 'Dr. Ananya Sharma', note: 'Mid-quarter log sync and ICU discharge updates.' }
        ]
      },
      {
        id: 'q2-2026',
        title: 'Q2 2026 (Jul–Sep 2026)',
        type: 'quarterly',
        dateRange: '01 Jul 2026 – 30 Sep 2026',
        startDate: '2026-07-01',
        endDate: '2026-09-30',
        status: 'reported',
        statusLabel: 'Organisation-Reported (Desk Review)',
        auditNote: 'Audit Scrutiny: Municipal ABC log verification under desk review by AWBI officer',
        figures: {
          rescued: 492,
          treated: 476,
          rehabilitated: 414,
          adopted: 117,
          abcSterilized: 210,
          communityReleased: 284,
          mortalityRate: '3.4%'
        },
        breakdowns: {
          rescued: '410 Street Indies • 82 Abandoned Breeds',
          treated: '136 Ortho • 190 Medical • 150 ABC',
          rehabbed: 'Avg Stay: 26 Days • 100% Protocol Compliance',
          adopted: '110 Family Homes • 7 Sanctuary'
        },
        trends: {
          rescued: '▲ +11.0%',
          treated: '96.7% intake rate',
          rehabbed: '86.9% healed',
          adopted: '▲ +18.4%'
        },
        lastUpdated: '05 Oct 2026 by Dr. Rajesh Verma',
        revisionHistory: [
          { date: '05 Oct 2026', user: 'Dr. Rajesh Verma', note: 'Finalized Q2 closing dossier and Municipal ABC cross-checks.' }
        ]
      },
      {
        id: 'fy-2024-25',
        title: 'FY 2024–25 (Audited Final)',
        type: 'annual',
        dateRange: '01 Apr 2024 – 31 Mar 2025',
        startDate: '2024-04-01',
        endDate: '2025-03-31',
        status: 'verified',
        statusLabel: 'Audited & Verified (CA Certified)',
        auditNote: 'Audit Scrutiny: Statutorily Verified & Certified by Mehra & Kapadia LLP, Chartered Accountants',
        figures: {
          rescued: 1892,
          treated: 1840,
          rehabilitated: 1560,
          adopted: 418,
          abcSterilized: 920,
          communityReleased: 1142,
          mortalityRate: '3.8%'
        },
        breakdowns: {
          rescued: '1,580 Street Indies • 312 Pedigree Surrenders',
          treated: '560 Orthopedic • 740 OPD • 540 ABC Surgeries',
          rehabbed: 'Avg Stay: 25 Days • Audited Medical Discharge',
          adopted: '394 Family Homes • 24 Permanent Sanctuary'
        },
        trends: {
          rescued: 'Benchmark Year',
          treated: '97.2% intake rate',
          rehabbed: '84.8% healed',
          adopted: 'Benchmark Year'
        },
        lastUpdated: '15 Jun 2025 by Mehra & Kapadia LLP',
        revisionHistory: [
          { date: '15 Jun 2025', user: 'Mehra & Kapadia LLP (Auditors)', note: 'Statutory audit completed and certified without qualification.' }
        ]
      }
    ],

    // Monthly activity throughput
    monthlyActivity: [
      { month: 'Nov 25', rescues: 115, treated: 110, rehabbed: 96, adopted: 28 },
      { month: 'Dec 25', rescues: 128, treated: 122, rehabbed: 104, adopted: 34 },
      { month: 'Jan 26', rescues: 142, treated: 136, rehabbed: 118, adopted: 31 },
      { month: 'Feb 26', rescues: 120, treated: 118, rehabbed: 102, adopted: 29 },
      { month: 'Mar 26', rescues: 135, treated: 130, rehabbed: 114, adopted: 38 },
      { month: 'Apr 26', rescues: 148, treated: 144, rehabbed: 125, adopted: 36 },
      { month: 'May 26', rescues: 162, treated: 158, rehabbed: 138, adopted: 42 },
      { month: 'Jun 26', rescues: 154, treated: 150, rehabbed: 130, adopted: 35 },
      { month: 'Jul 26', rescues: 170, treated: 164, rehabbed: 144, adopted: 40 },
      { month: 'Aug 26', rescues: 165, treated: 160, rehabbed: 140, adopted: 38 },
      { month: 'Sep 26', rescues: 158, treated: 152, rehabbed: 134, adopted: 39 },
      { month: 'Oct 26', rescues: 184, treated: 176, rehabbed: 148, adopted: 46 }
    ],

    // Recent impact updates
    impactUpdates: [
      {
        id: 'iu-1',
        title: 'Case #RC-1048: Leo Overcame Compound Fracture & Finalized for Rehoming',
        date: '28 Oct 2026',
        category: 'Orthopedic Rehabilitation',
        summary: 'After 38 days in Trauma ICU-03, Indie pup Leo underwent open surgical reduction, splint removal, and complete tissue granulation. Now fully cleared and handed over to verified adoptive parents.',
        photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
        metrics: '38 Days in ICU • ₹6,400 Treatment Fund • 1 Life Saved'
      },
      {
        id: 'iu-2',
        title: 'South Delhi ABC Outreach: 180 Community Canines Sterilized and Vaccinated',
        date: '22 Oct 2026',
        category: 'Animal Birth Control (ABC)',
        summary: 'Conducted a 5-day community humane outreach across Chhatarpur and Mehrauli sectors. 180 street dogs received laparoscopic sterilization, Rabies vaccination, and right-ear notch per AWBI guidelines.',
        photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
        metrics: '180 Dogs Sterilized • 100% Post-op Recovery • Panchnama Logged'
      },
      {
        id: 'iu-3',
        title: 'Bella Discharged from Surgical Bay REC-02 to Dedicated Medical Foster',
        date: '16 Oct 2026',
        category: 'Foster Placement',
        summary: 'Femoral head ostectomy surgical incision completely healed. Gentle Golden mix Bella transitioned from clinic ward to experienced foster parent Rohini Saxena for hydrotherapy and rehoming.',
        photo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80',
        metrics: '14 Days Recovery • Sutures Cleared • Foster Signed'
      },
      {
        id: 'iu-4',
        title: 'Emergency Flood SOS: 14 Stranded Pups Rescued from Yamuna Riverbanks',
        date: '08 Oct 2026',
        category: 'Disaster SOS',
        summary: 'PawBridge Ambulance Units 1 and 2 responded to flash flooding distress alerts. 14 hypothermic pups extracted, admitted to Quarantine Bay Q-03, stabilized, and vaccinated.',
        photo: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
        metrics: '14 Pups Saved • 0 Casualties • 100% Negative Parvo Screen'
      }
    ],

    // Supporting evidence documents
    evidenceDocs: [
      {
        id: 'ev-1',
        title: 'Daily Veterinary Inpatient & Casualty Register (Oct 2026)',
        periodId: 'q3-2026',
        category: 'veterinary',
        categoryLabel: 'Veterinary OPD Register',
        fileName: 'HappyTails_OPD_Casualty_Oct2026.pdf',
        fileSize: '4.8 MB',
        uploadDate: '28 Oct 2026',
        uploadedBy: 'Dr. Ananya Sharma (Lead Vet)',
        status: 'reported',
        statusLabel: 'Organisation-Reported (Pending Audit)',
        checksum: 'SHA-256: d8f2a9e104b988f0012c4b77a1e0...9921',
        description: 'Physical OPD intake logs, temperature charts, attending vet signatures, and daily drug dispensation sheets.'
      },
      {
        id: 'ev-2',
        title: 'Municipal Corporation ABC Sterilization & Ear-Notch Certificate Log',
        periodId: 'q2-2026',
        category: 'sterilization',
        categoryLabel: 'AWBI ABC Certificate',
        fileName: 'MCD_ABC_Sterilization_Q2_2026.pdf',
        fileSize: '3.2 MB',
        uploadDate: '04 Oct 2026',
        uploadedBy: 'Dr. Rajesh Verma',
        status: 'reported',
        statusLabel: 'Organisation-Reported (Desk Review)',
        checksum: 'SHA-256: 4e91bc772188fa0014e210bc9901...331a',
        description: 'Government municipal monitoring committee counter-signed summary of 210 street dogs sterilized.'
      },
      {
        id: 'ev-3',
        title: 'Adoption Custody Deeds & Microchip Registry (Jul–Sep 2026)',
        periodId: 'q2-2026',
        category: 'adoption',
        categoryLabel: 'Adoption Legal Deeds',
        fileName: 'Adoption_Deeds_Q2_Rehomed.pdf',
        fileSize: '8.1 MB',
        uploadDate: '02 Oct 2026',
        uploadedBy: 'Adoption Desk Lead',
        status: 'verified',
        statusLabel: 'Audited & Verified',
        checksum: 'SHA-256: a12c0098f413bc77821041ee8902...77fe',
        description: '112 Signed statutory adoption agreements with adopter government photo IDs and microchip records.'
      },
      {
        id: 'ev-4',
        title: 'Annual Statutory Audit Report FY 2024–25 (CA Certified)',
        periodId: 'fy-2024-25',
        category: 'audit',
        categoryLabel: 'Independent Audit Report',
        fileName: 'Chartered_Accountant_Statutory_Audit_2024_25.pdf',
        fileSize: '6.4 MB',
        uploadDate: '15 Jun 2025',
        uploadedBy: 'Mehra & Kapadia LLP',
        status: 'verified',
        statusLabel: 'Statutorily Verified & Sealed',
        checksum: 'SHA-256: 9b88220194bc0013ca981042aa12...004d',
        description: 'Independent external audit certifying 1,892 animal rescues, hospital expenditures, and 12A/80G books.'
      }
    ]
  }
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
      btnNavVerification: document.getElementById('btn-nav-verification'),
      btnNavLogin: document.getElementById('btn-nav-login'),
      btnNavRegister: document.getElementById('btn-nav-register'),
      btnNavProfile: document.getElementById('btn-nav-profile'),
      chromeAddressText: document.getElementById('chrome-address-text'),

      // Main Layout Root & Auth Views
      viewAppMain: document.getElementById('view-app-main'),
      viewAuthLogin: document.getElementById('view-auth-login'),
      viewAuthRegister: document.getElementById('view-auth-register'),
      viewPublicProfile: document.getElementById('view-public-profile'),
      btnHeaderViewProfile: document.getElementById('btn-header-view-profile'),
      btnPubSwitchAdmin: document.getElementById('btn-pub-switch-admin'),
      btnWizardGotoVerification: document.getElementById('btn-wizard-goto-verification'),

      // Public Profile Modals
      modalPublicDonate: document.getElementById('modal-public-donate'),
      formPublicDonate: document.getElementById('form-public-donate'),
      btnClosePublicDonate: document.getElementById('btn-close-public-donate'),
      btnCancelPublicDonate: document.getElementById('btn-cancel-public-donate'),
      pubDonateAmount: document.getElementById('pub-donate-amount'),
      donateTiersGrid: document.getElementById('donate-tiers-grid'),

      modalPublicVolunteer: document.getElementById('modal-public-volunteer'),
      formPublicVolunteer: document.getElementById('form-public-volunteer'),
      btnClosePublicVolunteer: document.getElementById('btn-close-public-volunteer'),
      btnCancelPublicVolunteer: document.getElementById('btn-cancel-public-volunteer'),

      modalPublicShare: document.getElementById('modal-public-share'),
      btnClosePublicShare: document.getElementById('btn-close-public-share'),
      btnDismissPublicShare: document.getElementById('btn-dismiss-public-share'),
      btnCopyShareUrl: document.getElementById('btn-copy-share-url'),
      shareUrlInput: document.getElementById('share-url-input'),

      modalPublicCaseJourney: document.getElementById('modal-public-case-journey'),
      btnCloseCaseJourney: document.getElementById('btn-close-case-journey'),
      btnDismissCaseJourney: document.getElementById('btn-dismiss-case-journey'),
      caseJourneyModalBody: document.getElementById('case-journey-modal-body'),

      modalPublicDocInspector: document.getElementById('modal-public-doc-inspector'),
      btnClosePubDoc: document.getElementById('btn-close-pub-doc'),
      btnDismissPubDoc: document.getElementById('btn-dismiss-pub-doc'),
      pubDocModalBody: document.getElementById('pub-doc-modal-body'),

      modalGenericConfirm: document.getElementById('modal-generic-confirm'),
      confirmDialogTitle: document.getElementById('confirm-dialog-title'),
      confirmDialogMsg: document.getElementById('confirm-dialog-msg'),
      confirmDialogIcon: document.getElementById('confirm-dialog-icon'),
      btnConfirmCancel: document.getElementById('btn-confirm-cancel'),
      btnConfirmProceed: document.getElementById('btn-confirm-proceed'),

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
      rescueHybridContainer: document.getElementById('rescue-hybrid-container'),
      rescueHybridList: document.getElementById('rescue-hybrid-list'),
      rescueSearchField: document.getElementById('rescue-search-field'),
      rescueStatusTabsRow: document.getElementById('rescue-status-tabs-row'),
      rescueFilterMedical: document.getElementById('rescue-filter-medical'),
      rescueFilterOutcome: document.getElementById('rescue-filter-outcome'),
      btnViewHybrid: document.getElementById('btn-view-hybrid'),
      btnViewGrid: document.getElementById('btn-view-grid'),
      btnResetRescueFilters: document.getElementById('btn-reset-rescue-filters'),
      btnOpenAddRescueModal: document.getElementById('btn-open-add-rescue-modal'),
      btnExportRescuesCsv: document.getElementById('btn-export-rescues-csv'),
      btnNewIntakeSecondary: document.getElementById('btn-new-intake-secondary'),

      // Add / Edit Rescue Modal Elements
      modalAddRescue: document.getElementById('modal-add-rescue'),
      formAddRescue: document.getElementById('form-add-rescue'),
      btnCloseAddRescueModal: document.getElementById('btn-close-add-rescue-modal'),
      btnCancelAddRescueModal: document.getElementById('btn-cancel-add-rescue-modal'),
      btnSaveDraftRescue: document.getElementById('btn-save-draft-rescue'),
      btnPublishRescueUpdate: document.getElementById('btn-publish-rescue-update'),
      btnDemoFillRescue: document.getElementById('btn-demo-fill-rescue'),
      photoPresetsContainer: document.getElementById('photo-presets-container'),

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

      // Document Verification Screen Elements
      btnNavVerification: document.getElementById('btn-nav-verification'),
      screenVerification: document.getElementById('screen-verification'),
      verificationDocsGrid: document.getElementById('verification-docs-grid'),
      checklistItemsContainer: document.getElementById('checklist-items-container'),
      checklistPercentage: document.getElementById('checklist-percentage'),
      checklistCounts: document.getElementById('checklist-counts'),
      checklistStatusBadge: document.getElementById('checklist-status-badge'),
      ngoStatusPill: document.getElementById('ngo-status-pill'),
      safeguardProgressText: document.getElementById('safeguard-progress-text'),
      safeguardProgressFill: document.getElementById('safeguard-progress-fill'),
      btnToggleAuditorMode: document.getElementById('btn-toggle-auditor-mode'),
      auditorModeLabel: document.getElementById('auditor-mode-label'),
      btnRequestFinalSignoff: document.getElementById('btn-request-final-signoff'),
      btnUploadAdditionalEvidence: document.getElementById('btn-upload-additional-evidence'),
      filterChipsContainer: document.getElementById('verification-filter-chips'),

      // Auditor Console Simulation Triggers
      btnSimNeedsChangesFix: document.getElementById('btn-sim-needs-changes-fix'),
      btnSimApproveAllMandatory: document.getElementById('btn-sim-approve-all-mandatory'),
      btnSimResetDocs: document.getElementById('btn-sim-reset-docs'),

      // Secure Doc Viewer Modal Elements
      modalSecureDocViewer: document.getElementById('modal-secure-doc-viewer'),
      btnCloseDocViewer: document.getElementById('btn-close-doc-viewer'),
      viewerDocTitle: document.getElementById('viewer-doc-title'),
      viewerDocCategory: document.getElementById('viewer-doc-category'),
      viewerStatusPill: document.getElementById('viewer-status-pill'),
      viewerReviewDate: document.getElementById('viewer-review-date'),
      viewerStatusSelect: document.getElementById('viewer-status-select'),
      viewerAuditorNotes: document.getElementById('viewer-auditor-notes'),
      viewerFileSize: document.getElementById('viewer-file-size'),
      viewerFileHash: document.getElementById('viewer-file-hash'),
      viewerUploadedBy: document.getElementById('viewer-uploaded-by'),
      viewerPaperInner: document.getElementById('viewer-paper-inner'),
      btnViewerSaveStatus: document.getElementById('btn-viewer-save-status'),
      btnViewerDownloadMock: document.getElementById('btn-viewer-download-mock'),

      // Replace / Upload Document Modal Elements
      modalReplaceDocument: document.getElementById('modal-replace-document'),
      btnCloseReplaceModal: document.getElementById('btn-close-replace-modal'),
      btnCancelReplaceModal: document.getElementById('btn-cancel-replace-modal'),
      replaceDropzone: document.getElementById('replace-dropzone'),
      replaceFileInput: document.getElementById('replace-file-input'),
      replaceProgressContainer: document.getElementById('replace-progress-container'),
      replaceProgressBar: document.getElementById('replace-progress-bar'),
      replacePercentText: document.getElementById('replace-percent-text'),
      replaceSelectedFilename: document.getElementById('replace-selected-filename'),
      replaceStatusHint: document.getElementById('replace-status-hint'),
      replaceBytesHint: document.getElementById('replace-bytes-hint'),
      btnStartSimulatedUpload: document.getElementById('btn-start-simulated-upload'),
      replaceModalTitle: document.getElementById('replace-modal-title'),
      replaceModalSubtitle: document.getElementById('replace-modal-subtitle'),

      // Auditor Sign-off Modal Elements
      modalAuditorApproval: document.getElementById('modal-auditor-approval'),
      btnCloseApprovalModal: document.getElementById('btn-close-approval-modal'),
      btnCancelApprovalModal: document.getElementById('btn-cancel-approval-modal'),
      btnConfirmFinalApproval: document.getElementById('btn-confirm-final-approval'),
      approvalModalContent: document.getElementById('approval-modal-content'),
      approvalModalFooter: document.getElementById('approval-modal-footer'),

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

      // Impact Reports Screen Elements
      screenImpact: document.getElementById('screen-impact'),
      impactPeriodSelect: document.getElementById('impact-period-select'),
      impactPeriodAuditBadge: document.getElementById('impact-period-audit-badge'),
      impactHeaderStatusPill: document.getElementById('impact-header-status-pill'),
      impactSafeguardBanner: document.getElementById('impact-safeguard-banner'),
      btnSimPeriodAudit: document.getElementById('btn-sim-period-audit'),
      btnSimAuditText: document.getElementById('btn-sim-audit-text'),
      periodChipBtns: document.querySelectorAll('.period-chip-btn'),
      impactDateStart: document.getElementById('impact-date-start'),
      impactDateEnd: document.getElementById('impact-date-end'),
      btnApplyCustomDates: document.getElementById('btn-apply-custom-dates'),
      impactPeriodMetaTag: document.getElementById('impact-period-meta-tag'),
      impactPeriodAuditNote: document.getElementById('impact-period-audit-note'),

      // Impact Stat Display & Edit Buttons
      impactStatRescued: document.getElementById('impact-stat-rescued'),
      impactBadgeRescued: document.getElementById('impact-badge-rescued'),
      impactRescuedBreakdown: document.getElementById('impact-rescued-breakdown'),
      btnEditRescued: document.getElementById('btn-edit-rescued'),

      impactStatTreated: document.getElementById('impact-stat-treated'),
      impactBadgeTreated: document.getElementById('impact-badge-treated'),
      impactTreatedBreakdown: document.getElementById('impact-treated-breakdown'),
      btnEditTreated: document.getElementById('btn-edit-treated'),

      impactStatRehabbed: document.getElementById('impact-stat-rehabbed'),
      impactBadgeRehabbed: document.getElementById('impact-badge-rehabbed'),
      impactRehabbedBreakdown: document.getElementById('impact-rehabbed-breakdown'),
      btnEditRehabbed: document.getElementById('btn-edit-rehabbed'),

      impactStatAdopted: document.getElementById('impact-stat-adopted'),
      impactBadgeAdopted: document.getElementById('impact-badge-adopted'),
      impactAdoptedBreakdown: document.getElementById('impact-adopted-breakdown'),
      btnEditAdopted: document.getElementById('btn-edit-adopted'),

      impactStatAbc: document.getElementById('impact-stat-abc'),
      impactStatReleased: document.getElementById('impact-stat-released'),
      impactStatMortality: document.getElementById('impact-stat-mortality'),
      impactStatLock: document.getElementById('impact-stat-lock'),

      // Monthly Chart Elements
      impactChartSvgWrap: document.getElementById('impact-chart-svg-wrap'),
      chartSeriesBtns: document.querySelectorAll('.chart-series-btn'),

      // Impact Updates List & Post Button
      impactUpdatesList: document.getElementById('impact-updates-list'),
      impactUpdatesCountBadge: document.getElementById('impact-updates-count-badge'),
      btnOpenAddImpactStoryModal: document.getElementById('btn-open-add-impact-story-modal'),

      // Evidence Documents List & Upload Buttons
      impactEvidenceList: document.getElementById('impact-evidence-list'),
      impactEvidenceCountBadge: document.getElementById('impact-evidence-count-badge'),
      evidenceFilterTabs: document.querySelectorAll('.evidence-tab'),
      btnOpenUploadEvidenceModal: document.getElementById('btn-open-upload-evidence-modal'),
      btnOpenUploadEvidenceModalSec: document.getElementById('btn-open-upload-evidence-modal-sec'),

      // Revision History
      impactRevisionHistory: document.getElementById('impact-revision-history'),

      // Modals
      btnOpenAddPeriodModal: document.getElementById('btn-open-add-period-modal'),
      modalAddPeriod: document.getElementById('modal-add-period'),
      formAddPeriod: document.getElementById('form-add-period'),
      btnCloseAddPeriodModal: document.getElementById('btn-close-add-period-modal'),
      btnCancelAddPeriodModal: document.getElementById('btn-cancel-add-period-modal'),

      btnOpenEditFiguresModal: document.getElementById('btn-open-edit-figures-modal'),
      modalEditFigures: document.getElementById('modal-edit-figures'),
      formEditFigures: document.getElementById('form-edit-figures'),
      btnCloseEditFiguresModal: document.getElementById('btn-close-edit-figures-modal'),
      btnCancelEditFiguresModal: document.getElementById('btn-cancel-edit-figures-modal'),
      editFiguresActivePeriodName: document.getElementById('edit-figures-active-period-name'),
      editFiguresActiveStatus: document.getElementById('edit-figures-active-status'),
      editFigRescued: document.getElementById('edit-fig-rescued'),
      editFigTreated: document.getElementById('edit-fig-treated'),
      editFigRehabbed: document.getElementById('edit-fig-rehabbed'),
      editFigAdopted: document.getElementById('edit-fig-adopted'),
      editFigAbc: document.getElementById('edit-fig-abc'),
      editFigReleased: document.getElementById('edit-fig-released'),
      editFigReasonPreset: document.getElementById('edit-fig-reason-preset'),
      editFigNotes: document.getElementById('edit-fig-notes'),

      modalUploadEvidence: document.getElementById('modal-upload-evidence'),
      formUploadEvidence: document.getElementById('form-upload-evidence'),
      btnCloseUploadEvidenceModal: document.getElementById('btn-close-upload-evidence-modal'),
      btnCancelUploadEvidenceModal: document.getElementById('btn-cancel-upload-evidence-modal'),
      evidencePeriodSelect: document.getElementById('evidence-period-select'),
      evidenceDropzone: document.getElementById('evidence-dropzone'),
      evidenceFileInput: document.getElementById('evidence-file-input'),
      dropzoneFileName: document.getElementById('dropzone-file-name'),
      evidenceUploadProgressWrap: document.getElementById('evidence-upload-progress-wrap'),
      evidenceDocTitle: document.getElementById('evidence-doc-title'),
      evidenceCategorySelect: document.getElementById('evidence-category-select'),
      evidenceDocDesc: document.getElementById('evidence-doc-desc'),

      modalAddImpactStory: document.getElementById('modal-add-impact-story'),
      formAddImpactStory: document.getElementById('form-add-impact-story'),
      btnCloseAddImpactStoryModal: document.getElementById('btn-close-add-impact-story-modal'),
      btnCancelAddImpactStoryModal: document.getElementById('btn-cancel-add-impact-story-modal'),

      // Support Requests Screen Elements
      screenRequests: document.getElementById('screen-requests'),
      requestsCardsGrid: document.getElementById('requests-cards-grid'),
      requestsEmptyState: document.getElementById('requests-empty-state'),
      requestsSearchInput: document.getElementById('requests-search-input'),
      requestsFilterCategory: document.getElementById('requests-filter-category'),
      requestsFilterUrgency: document.getElementById('requests-filter-urgency'),
      requestsStatusTabsRow: document.getElementById('requests-status-tabs-row'),
      btnResetRequestsFilters: document.getElementById('btn-reset-requests-filters'),
      btnExportRequestsCsv: document.getElementById('btn-export-requests-csv'),
      btnOpenCreateRequestModal: document.getElementById('btn-open-create-request-modal'),

      // Counters & Summary
      statActiveRequestsCount: document.getElementById('stat-active-requests-count'),
      statFulfilledRequestsCount: document.getElementById('stat-fulfilled-requests-count'),
      navCountRequests: document.getElementById('nav-count-requests'),
      reqTabCountAll: document.getElementById('req-tab-count-all'),
      reqTabCountActive: document.getElementById('req-tab-count-active'),
      reqTabCountFulfilled: document.getElementById('req-tab-count-fulfilled'),
      reqTabCountClosed: document.getElementById('req-tab-count-closed'),

      // Create Request Modal Elements
      modalCreateRequest: document.getElementById('modal-create-request'),
      formCreateRequest: document.getElementById('form-create-request'),
      btnCloseCreateRequestModal: document.getElementById('btn-close-create-request-modal'),
      btnCancelCreateRequestModal: document.getElementById('btn-cancel-create-request-modal'),
      btnSaveDraftRequest: document.getElementById('btn-save-draft-request'),
      reqPhotoPresets: document.getElementById('req-photo-presets'),

      // Edit Request Modal Elements
      modalEditRequest: document.getElementById('modal-edit-request'),
      formEditRequest: document.getElementById('form-edit-request'),
      btnCloseEditRequestModal: document.getElementById('btn-close-edit-request-modal'),
      btnCancelEditRequestModal: document.getElementById('btn-cancel-edit-request-modal'),
      editReqId: document.getElementById('edit-req-id'),
      editReqTitle: document.getElementById('edit-req-title'),
      editReqCategory: document.getElementById('edit-req-category'),
      editReqUrgency: document.getElementById('edit-req-urgency'),
      editReqTargetLabel: document.getElementById('edit-req-target-label'),
      editReqDeadline: document.getElementById('edit-req-deadline'),
      editReqDesc: document.getElementById('edit-req-desc'),
      editReqRevisionReason: document.getElementById('edit-req-revision-reason'),

      // Mark Fulfilled Modal Elements
      modalMarkFulfilled: document.getElementById('modal-mark-fulfilled'),
      formMarkFulfilled: document.getElementById('form-mark-fulfilled'),
      btnCloseMarkFulfilledModal: document.getElementById('btn-close-mark-fulfilled-modal'),
      btnCancelMarkFulfilledModal: document.getElementById('btn-cancel-mark-fulfilled-modal'),
      fulfillReqId: document.getElementById('fulfill-req-id'),
      fulfillReqTitleDisplay: document.getElementById('fulfill-req-title-display'),
      fulfillReqTargetDisplay: document.getElementById('fulfill-req-target-display'),
      fulfillSponsor: document.getElementById('fulfill-sponsor'),
      fulfillDate: document.getElementById('fulfill-date'),
      fulfillReceiptNo: document.getElementById('fulfill-receipt-no'),
      fulfillFinalVal: document.getElementById('fulfill-final-val'),
      fulfillAllocation: document.getElementById('fulfill-allocation'),
      fulfillNotes: document.getElementById('fulfill-notes'),

      // Contribute Aid Modal Elements
      modalContributeAid: document.getElementById('modal-contribute-aid'),
      formContributeAid: document.getElementById('form-contribute-aid'),
      btnCloseContributeModal: document.getElementById('btn-close-contribute-modal'),
      btnCancelContributeModal: document.getElementById('btn-cancel-contribute-modal'),
      pledgeReqId: document.getElementById('pledge-req-id'),
      pledgeReqTitleDisplay: document.getElementById('pledge-req-title-display'),
      pledgeReqCurrentDisplay: document.getElementById('pledge-req-current-display'),
      pledgeContributor: document.getElementById('pledge-contributor'),
      pledgeAmountVal: document.getElementById('pledge-amount-val'),
      pledgeNotes: document.getElementById('pledge-notes'),

      // View Document Modal Elements
      modalViewRequestDoc: document.getElementById('modal-view-request-doc'),
      viewDocModalBody: document.getElementById('view-doc-modal-body'),
      btnCloseViewDocModal: document.getElementById('btn-close-view-doc-modal'),
      btnDismissViewDocModal: document.getElementById('btn-dismiss-view-doc-modal'),

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
    if (this.dom.btnNavProfile) {
      this.dom.btnNavProfile.addEventListener('click', () => this.switchAuthMode('profile'));
    }
    if (this.dom.btnNavVerification) {
      this.dom.btnNavVerification.addEventListener('click', () => {
        this.switchAuthMode('app');
        this.navigateTo('verification');
      });
    }
    if (this.dom.btnHeaderViewProfile) {
      this.dom.btnHeaderViewProfile.addEventListener('click', () => this.switchAuthMode('profile'));
    }
    if (this.dom.btnPubSwitchAdmin) {
      this.dom.btnPubSwitchAdmin.addEventListener('click', () => this.switchAuthMode('app'));
    }
    if (this.dom.btnWizardGotoVerification) {
      this.dom.btnWizardGotoVerification.addEventListener('click', () => {
        this.switchAuthMode('app');
        this.navigateTo('verification');
        this.showToast('Navigated to Document Verification & Audit Desk', 'success');
      });
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

    // Rescue Filters, Status Tabs, Views & Search
    if (this.dom.rescueSearchField) {
      this.dom.rescueSearchField.addEventListener('input', (e) => {
        PawBridgeStore.searchQuery = e.target.value.toLowerCase().trim();
        this.renderRescuesGrid();
      });
    }

    if (this.dom.rescueStatusTabsRow) {
      this.dom.rescueStatusTabsRow.querySelectorAll('.rescue-tab-chip').forEach(tab => {
        tab.addEventListener('click', () => {
          this.dom.rescueStatusTabsRow.querySelectorAll('.rescue-tab-chip').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          PawBridgeStore.rescueStatusTab = tab.getAttribute('data-status-tab') || 'all';
          this.renderRescuesGrid();
        });
      });
    }

    if (this.dom.rescueFilterMedical) {
      this.dom.rescueFilterMedical.addEventListener('change', (e) => {
        PawBridgeStore.rescueMedicalFilter = e.target.value;
        this.renderRescuesGrid();
      });
    }

    if (this.dom.rescueFilterOutcome) {
      this.dom.rescueFilterOutcome.addEventListener('change', (e) => {
        PawBridgeStore.rescueOutcomeFilter = e.target.value;
        this.renderRescuesGrid();
      });
    }

    if (this.dom.btnViewHybrid) {
      this.dom.btnViewHybrid.addEventListener('click', () => {
        PawBridgeStore.rescueViewMode = 'hybrid';
        this.dom.btnViewHybrid.classList.add('active');
        if (this.dom.btnViewGrid) this.dom.btnViewGrid.classList.remove('active');
        this.renderRescuesGrid();
      });
    }

    if (this.dom.btnViewGrid) {
      this.dom.btnViewGrid.addEventListener('click', () => {
        PawBridgeStore.rescueViewMode = 'grid';
        this.dom.btnViewGrid.classList.add('active');
        if (this.dom.btnViewHybrid) this.dom.btnViewHybrid.classList.remove('active');
        this.renderRescuesGrid();
      });
    }

    if (this.dom.btnResetRescueFilters) {
      this.dom.btnResetRescueFilters.addEventListener('click', () => this.resetRescueFilters());
    }

    if (this.dom.btnExportRescuesCsv) {
      this.dom.btnExportRescuesCsv.addEventListener('click', () => this.exportRescuesCsv());
    }

    // Add Rescue Modal Triggers
    if (this.dom.btnOpenAddRescueModal) {
      this.dom.btnOpenAddRescueModal.addEventListener('click', () => this.openAddRescueModal());
    }
    if (this.dom.btnOpenIntakeModal) {
      this.dom.btnOpenIntakeModal.addEventListener('click', () => this.openAddRescueModal());
    }
    if (this.dom.btnNewIntakeSecondary) {
      this.dom.btnNewIntakeSecondary.addEventListener('click', () => this.openAddRescueModal());
    }
    if (this.dom.btnCloseAddRescueModal) {
      this.dom.btnCloseAddRescueModal.addEventListener('click', () => this.closeAddRescueModal());
    }
    if (this.dom.btnCancelAddRescueModal) {
      this.dom.btnCancelAddRescueModal.addEventListener('click', () => this.closeAddRescueModal());
    }
    if (this.dom.btnDemoFillRescue) {
      this.dom.btnDemoFillRescue.addEventListener('click', () => this.prefillDemoRescue());
    }
    if (this.dom.btnSaveDraftRescue) {
      this.dom.btnSaveDraftRescue.addEventListener('click', () => this.saveRescueDraft());
    }
    if (this.dom.formAddRescue) {
      this.dom.formAddRescue.addEventListener('submit', (e) => {
        e.preventDefault();
        this.publishRescueUpdate();
      });
    }

    // Photo Preset Selector Chips in Add Rescue Modal
    if (this.dom.photoPresetsContainer) {
      this.dom.photoPresetsContainer.querySelectorAll('.photo-preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          this.dom.photoPresetsContainer.querySelectorAll('.photo-preset-chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          const photoUrl = chip.getAttribute('data-url');
          const photoInput = document.getElementById('new-rescue-photo');
          if (photoInput) photoInput.value = photoUrl;
        });
      });
    }

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

    // ============================================================
    // DOCUMENT VERIFICATION & STATUTORY AUDIT EVENT LISTENERS
    // ============================================================
    if (this.dom.btnToggleAuditorMode) {
      this.dom.btnToggleAuditorMode.addEventListener('click', () => this.toggleAuditorMode());
    }

    if (this.dom.btnRequestFinalSignoff) {
      this.dom.btnRequestFinalSignoff.addEventListener('click', () => this.openAuditorApprovalModal());
    }

    if (this.dom.btnUploadAdditionalEvidence) {
      this.dom.btnUploadAdditionalEvidence.addEventListener('click', () => this.openReplaceModal('doc-audit'));
    }

    // Filter Chips
    if (this.dom.filterChipsContainer) {
      this.dom.filterChipsContainer.querySelectorAll('.verification-filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          this.dom.filterChipsContainer.querySelectorAll('.verification-filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          PawBridgeStore.activeDocFilter = chip.getAttribute('data-filter') || 'all';
          this.renderVerificationScreen();
        });
      });
    }

    // Auditor Console Simulations
    if (this.dom.btnSimNeedsChangesFix) {
      this.dom.btnSimNeedsChangesFix.addEventListener('click', () => this.simulateReuploadFix());
    }
    if (this.dom.btnSimApproveAllMandatory) {
      this.dom.btnSimApproveAllMandatory.addEventListener('click', () => this.approveAllMandatoryDocs());
    }
    if (this.dom.btnSimResetDocs) {
      this.dom.btnSimResetDocs.addEventListener('click', () => this.resetDocsState());
    }

    // Secure Document Viewer Modal
    if (this.dom.btnCloseDocViewer) {
      this.dom.btnCloseDocViewer.addEventListener('click', () => this.closeDocViewer());
    }
    if (this.dom.btnViewerSaveStatus) {
      this.dom.btnViewerSaveStatus.addEventListener('click', () => this.saveViewerStatus());
    }
    if (this.dom.btnViewerDownloadMock) {
      this.dom.btnViewerDownloadMock.addEventListener('click', () => {
        this.showToast('Encrypted document copy downloaded (AES-256 watermarked)', 'success');
      });
    }

    // Replace / Upload Modal
    if (this.dom.btnCloseReplaceModal) {
      this.dom.btnCloseReplaceModal.addEventListener('click', () => this.closeReplaceModal());
    }
    if (this.dom.btnCancelReplaceModal) {
      this.dom.btnCancelReplaceModal.addEventListener('click', () => this.closeReplaceModal());
    }
    if (this.dom.replaceDropzone) {
      this.dom.replaceDropzone.addEventListener('click', () => {
        if (this.dom.replaceFileInput) this.dom.replaceFileInput.click();
      });
    }
    if (this.dom.replaceFileInput) {
      this.dom.replaceFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && this.dom.replaceSelectedFilename && this.dom.replaceProgressContainer) {
          this.dom.replaceSelectedFilename.textContent = file.name;
          this.dom.replaceProgressContainer.style.display = 'block';
          if (this.dom.replaceBytesHint) this.dom.replaceBytesHint.textContent = `0 MB / ${(file.size / (1024*1024)).toFixed(1)} MB`;
        }
      });
    }
    if (this.dom.btnStartSimulatedUpload) {
      this.dom.btnStartSimulatedUpload.addEventListener('click', () => this.startSimulatedUpload());
    }

    // Auditor Approval Sign-Off Modal
    if (this.dom.btnCloseApprovalModal) {
      this.dom.btnCloseApprovalModal.addEventListener('click', () => this.closeAuditorApprovalModal());
    }
    if (this.dom.btnCancelApprovalModal) {
      this.dom.btnCancelApprovalModal.addEventListener('click', () => this.closeAuditorApprovalModal());
    }
    if (this.dom.btnConfirmFinalApproval) {
      this.dom.btnConfirmFinalApproval.addEventListener('click', () => this.confirmFinalApproval());
    }

    // Impact Reports & Statutory Disclosures Event Listeners
    this.bindImpactEvents();

    // Support Requests Event Listeners
    this.bindSupportRequestsEvents();
  },

  bindImpactEvents() {
    // Period Dropdown Selector
    if (this.dom.impactPeriodSelect) {
      this.dom.impactPeriodSelect.addEventListener('change', (e) => {
        this.switchImpactPeriod(e.target.value);
      });
    }

    // Quick Period Chips
    this.dom.periodChipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const periodId = btn.getAttribute('data-period');
        if (periodId) this.switchImpactPeriod(periodId);
      });
    });

    // Custom Date Range
    if (this.dom.btnApplyCustomDates) {
      this.dom.btnApplyCustomDates.addEventListener('click', () => {
        const start = this.dom.impactDateStart?.value;
        const end = this.dom.impactDateEnd?.value;
        if (start && end) {
          PawBridgeStore.impactState.customDateStart = start;
          PawBridgeStore.impactState.customDateEnd = end;
          if (this.dom.impactPeriodMetaTag) {
            this.dom.impactPeriodMetaTag.innerHTML = `Custom Range: <strong>${start} – ${end}</strong> • Synchronized from daily shelter logs`;
          }
          this.showToast(`Applied custom date range: ${start} to ${end}`, 'success');
        }
      });
    }

    // Simulate Auditor Review / Sign-Off Toggle
    if (this.dom.btnSimPeriodAudit) {
      this.dom.btnSimPeriodAudit.addEventListener('click', () => {
        this.togglePeriodAuditStatus();
      });
    }

    // Monthly Chart Series Toggles
    this.dom.chartSeriesBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.chartSeriesBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        PawBridgeStore.impactState.activeSeries = btn.getAttribute('data-series') || 'all';
        this.renderMonthlyChart();
      });
    });

    // Evidence Category Tabs
    this.dom.evidenceFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.dom.evidenceFilterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        PawBridgeStore.impactState.activeEvidenceCategory = tab.getAttribute('data-category') || 'all';
        this.renderEvidenceDocs();
      });
    });

    // Edit Figures Modal Openers
    [
      this.dom.btnOpenEditFiguresModal,
      this.dom.btnEditRescued,
      this.dom.btnEditTreated,
      this.dom.btnEditRehabbed,
      this.dom.btnEditAdopted
    ].forEach(btn => {
      if (btn) btn.addEventListener('click', () => this.openEditFiguresModal());
    });

    // Edit Figures Modal Close & Submit
    if (this.dom.btnCloseEditFiguresModal) {
      this.dom.btnCloseEditFiguresModal.addEventListener('click', () => this.closeEditFiguresModal());
    }
    if (this.dom.btnCancelEditFiguresModal) {
      this.dom.btnCancelEditFiguresModal.addEventListener('click', () => this.closeEditFiguresModal());
    }
    if (this.dom.formEditFigures) {
      this.dom.formEditFigures.addEventListener('submit', (e) => {
        e.preventDefault();
        this.savePeriodFigures();
      });
    }

    // Add Reporting Period Modal Openers, Close & Submit
    if (this.dom.btnOpenAddPeriodModal) {
      this.dom.btnOpenAddPeriodModal.addEventListener('click', () => this.openAddPeriodModal());
    }
    if (this.dom.btnCloseAddPeriodModal) {
      this.dom.btnCloseAddPeriodModal.addEventListener('click', () => this.closeAddPeriodModal());
    }
    if (this.dom.btnCancelAddPeriodModal) {
      this.dom.btnCancelAddPeriodModal.addEventListener('click', () => this.closeAddPeriodModal());
    }
    if (this.dom.formAddPeriod) {
      this.dom.formAddPeriod.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveNewReportingPeriod();
      });
    }

    // Upload Evidence Modal Openers, Dropzone, Close & Submit
    [this.dom.btnOpenUploadEvidenceModal, this.dom.btnOpenUploadEvidenceModalSec].forEach(btn => {
      if (btn) btn.addEventListener('click', () => this.openUploadEvidenceModal());
    });

    if (this.dom.evidenceDropzone && this.dom.evidenceFileInput) {
      this.dom.evidenceDropzone.addEventListener('click', () => {
        this.dom.evidenceFileInput.click();
      });

      this.dom.evidenceFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          if (this.dom.dropzoneFileName) {
            this.dom.dropzoneFileName.textContent = `✓ Selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
          }
          if (this.dom.evidenceUploadProgressWrap) {
            this.dom.evidenceUploadProgressWrap.style.display = 'block';
          }
        }
      });
    }

    if (this.dom.btnCloseUploadEvidenceModal) {
      this.dom.btnCloseUploadEvidenceModal.addEventListener('click', () => this.closeUploadEvidenceModal());
    }
    if (this.dom.btnCancelUploadEvidenceModal) {
      this.dom.btnCancelUploadEvidenceModal.addEventListener('click', () => this.closeUploadEvidenceModal());
    }
    if (this.dom.formUploadEvidence) {
      this.dom.formUploadEvidence.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveEvidenceUpload();
      });
    }

    // Add Impact Story Modal Openers, Close & Submit
    if (this.dom.btnOpenAddImpactStoryModal) {
      this.dom.btnOpenAddImpactStoryModal.addEventListener('click', () => this.openAddImpactStoryModal());
    }
    if (this.dom.btnCloseAddImpactStoryModal) {
      this.dom.btnCloseAddImpactStoryModal.addEventListener('click', () => this.closeAddImpactStoryModal());
    }
    if (this.dom.btnCancelAddImpactStoryModal) {
      this.dom.btnCancelAddImpactStoryModal.addEventListener('click', () => this.closeAddImpactStoryModal());
    }
    if (this.dom.formAddImpactStory) {
      this.dom.formAddImpactStory.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveNewImpactStory();
      });
    }
  },

  bindSupportRequestsEvents() {
    // Status Tabs
    if (this.dom.requestsStatusTabsRow) {
      this.dom.requestsStatusTabsRow.querySelectorAll('.req-tab-chip').forEach(tab => {
        tab.addEventListener('click', () => {
          this.dom.requestsStatusTabsRow.querySelectorAll('.req-tab-chip').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          PawBridgeStore.requestTab = tab.getAttribute('data-tab') || 'all';
          this.renderSupportRequests();
        });
      });
    }

    // Search Field
    if (this.dom.requestsSearchInput) {
      this.dom.requestsSearchInput.addEventListener('input', (e) => {
        PawBridgeStore.requestSearchQuery = e.target.value.toLowerCase().trim();
        this.renderSupportRequests();
      });
    }

    // Category Filter Dropdown
    if (this.dom.requestsFilterCategory) {
      this.dom.requestsFilterCategory.addEventListener('change', (e) => {
        PawBridgeStore.requestCategory = e.target.value;
        this.renderSupportRequests();
      });
    }

    // Urgency Filter Dropdown
    if (this.dom.requestsFilterUrgency) {
      this.dom.requestsFilterUrgency.addEventListener('change', (e) => {
        PawBridgeStore.requestUrgency = e.target.value;
        this.renderSupportRequests();
      });
    }

    // Reset Filters Button
    if (this.dom.btnResetRequestsFilters) {
      this.dom.btnResetRequestsFilters.addEventListener('click', () => this.resetRequestsFilters());
    }

    // Export CSV
    if (this.dom.btnExportRequestsCsv) {
      this.dom.btnExportRequestsCsv.addEventListener('click', () => this.exportRequestsCsv());
    }

    // Create Request Modal Triggers, Preset Chips & Submit
    if (this.dom.btnOpenCreateRequestModal) {
      this.dom.btnOpenCreateRequestModal.addEventListener('click', () => this.openCreateRequestModal());
    }
    if (this.dom.btnCloseCreateRequestModal) {
      this.dom.btnCloseCreateRequestModal.addEventListener('click', () => this.closeCreateRequestModal());
    }
    if (this.dom.btnCancelCreateRequestModal) {
      this.dom.btnCancelCreateRequestModal.addEventListener('click', () => this.closeCreateRequestModal());
    }
    if (this.dom.btnSaveDraftRequest) {
      this.dom.btnSaveDraftRequest.addEventListener('click', () => this.saveDraftSupportRequest());
    }
    if (this.dom.formCreateRequest) {
      this.dom.formCreateRequest.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveNewSupportRequest();
      });
    }

    // Photo preset chips in create modal
    if (this.dom.reqPhotoPresets) {
      this.dom.reqPhotoPresets.querySelectorAll('.photo-preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          this.dom.reqPhotoPresets.querySelectorAll('.photo-preset-chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          const url = chip.getAttribute('data-url');
          const input = document.getElementById('new-req-photo');
          if (input) input.value = url;
        });
      });
    }

    // Edit Request Modal Close & Submit
    if (this.dom.btnCloseEditRequestModal) {
      this.dom.btnCloseEditRequestModal.addEventListener('click', () => this.closeEditRequestModal());
    }
    if (this.dom.btnCancelEditRequestModal) {
      this.dom.btnCancelEditRequestModal.addEventListener('click', () => this.closeEditRequestModal());
    }
    if (this.dom.formEditRequest) {
      this.dom.formEditRequest.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveEditedSupportRequest();
      });
    }

    // Mark Fulfilled Modal Close & Submit
    if (this.dom.btnCloseMarkFulfilledModal) {
      this.dom.btnCloseMarkFulfilledModal.addEventListener('click', () => this.closeMarkFulfilledModal());
    }
    if (this.dom.btnCancelMarkFulfilledModal) {
      this.dom.btnCancelMarkFulfilledModal.addEventListener('click', () => this.closeMarkFulfilledModal());
    }
    if (this.dom.formMarkFulfilled) {
      this.dom.formMarkFulfilled.addEventListener('submit', (e) => {
        e.preventDefault();
        this.confirmMarkFulfilled();
      });
    }

    // Contribute Aid Modal Close & Submit
    if (this.dom.btnCloseContributeModal) {
      this.dom.btnCloseContributeModal.addEventListener('click', () => this.closeContributeAidModal());
    }
    if (this.dom.btnCancelContributeModal) {
      this.dom.btnCancelContributeModal.addEventListener('click', () => this.closeContributeAidModal());
    }
    if (this.dom.formContributeAid) {
      this.dom.formContributeAid.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitContributeAid();
      });
    }

    // View Doc Modal Close
    if (this.dom.btnCloseViewDocModal) {
      this.dom.btnCloseViewDocModal.addEventListener('click', () => this.closeViewDocModal());
    }
    if (this.dom.btnDismissViewDocModal) {
      this.dom.btnDismissViewDocModal.addEventListener('click', () => this.closeViewDocModal());
    }

    // Public Profile & Trust Action Event Listeners
    this.bindPublicProfileEvents();
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
    // mode: 'app' | 'login' | 'register' | 'profile'
    PawBridgeStore.authMode = mode;

    // Reset visibility of all views
    if (this.dom.viewAppMain) this.dom.viewAppMain.style.display = mode === 'app' ? 'flex' : 'none';
    if (this.dom.viewAuthLogin) this.dom.viewAuthLogin.style.display = mode === 'login' ? 'flex' : 'none';
    if (this.dom.viewAuthRegister) this.dom.viewAuthRegister.style.display = mode === 'register' ? 'flex' : 'none';
    if (this.dom.viewPublicProfile) this.dom.viewPublicProfile.style.display = mode === 'profile' ? 'flex' : 'none';

    // Update Top Navigation Switcher Pills
    if (this.dom.btnNavApp) this.dom.btnNavApp.classList.toggle('active', mode === 'app');
    if (this.dom.btnNavLogin) this.dom.btnNavLogin.classList.toggle('active', mode === 'login');
    if (this.dom.btnNavRegister) this.dom.btnNavRegister.classList.toggle('active', mode === 'register');
    if (this.dom.btnNavProfile) this.dom.btnNavProfile.classList.toggle('active', mode === 'profile');

    // Update Chrome URL bar text
    if (this.dom.chromeAddressText) {
      if (mode === 'login') {
        this.dom.chromeAddressText.textContent = 'https://pawbridge.org/app/auth/login';
      } else if (mode === 'register') {
        this.dom.chromeAddressText.textContent = 'https://pawbridge.org/app/auth/register';
      } else if (mode === 'profile') {
        this.dom.chromeAddressText.textContent = 'https://pawbridge.org/public/happy-tails-sanctuary';
      } else {
        const urlMap = {
          overview: 'https://pawbridge.org/app/operations/shelter-triage',
          rescues: 'https://pawbridge.org/app/operations/rescue-registry',
          kennels: 'https://pawbridge.org/app/shelter/kennel-matrix',
          clinical: 'https://pawbridge.org/app/clinical/veterinary-rounds',
          adoptions: 'https://pawbridge.org/app/programs/adoptions-kanban',
          dispatch: 'https://pawbridge.org/app/logistics/ambulance-dispatch',
          inventory: 'https://pawbridge.org/app/logistics/medical-supplies',
          requests: 'https://pawbridge.org/app/programs/support-requests',
          impact: 'https://pawbridge.org/app/governance/impact-reports',
          verification: 'https://pawbridge.org/app/governance/document-verification',
          compliance: 'https://pawbridge.org/app/governance/compliance-vault'
        };
        this.dom.chromeAddressText.textContent = urlMap[PawBridgeStore.activeScreen] || 'https://pawbridge.org/app/operations/shelter-triage';
      }
    }

    // When switching to profile, render dynamic components
    if (mode === 'profile') {
      this.renderPublicProfile();
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
    if (screenId === 'profile') {
      this.switchAuthMode('profile');
      return;
    }

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
      verification: { section: 'Governance', title: 'Document Verification & Audit' },
      compliance: { section: 'Governance', title: 'Compliance & Document Vault' },
      impact: { section: 'Governance & Trust', title: 'Impact Reports & Statutory Outcomes' },
      requests: { section: 'Programs & Logistics', title: 'Shelter Support & Aid Requisitions' },
      inventory: { section: 'Logistics', title: 'Medical Supplies & Feed' },
      profile: { section: 'Public Registry', title: 'Public NGO Profile & Transparency Registry' }
    };

    const meta = screenMeta[screenId] || { section: 'PawBridge', title: 'Operations OS' };
    if (this.dom.headerBreadcrumbContext) this.dom.headerBreadcrumbContext.textContent = meta.section;
    if (this.dom.headerContextTitle) this.dom.headerContextTitle.textContent = meta.title;

    // Update Chrome URL bar text
    if (this.dom.chromeAddressText && PawBridgeStore.authMode === 'app') {
      const urlMap = {
        overview: 'https://pawbridge.org/app/operations/shelter-triage',
        rescues: 'https://pawbridge.org/app/operations/rescue-registry',
        kennels: 'https://pawbridge.org/app/shelter/kennel-matrix',
        clinical: 'https://pawbridge.org/app/clinical/veterinary-rounds',
        adoptions: 'https://pawbridge.org/app/programs/adoptions-kanban',
        dispatch: 'https://pawbridge.org/app/logistics/ambulance-dispatch',
        inventory: 'https://pawbridge.org/app/logistics/medical-supplies',
        requests: 'https://pawbridge.org/app/programs/support-requests',
        impact: 'https://pawbridge.org/app/governance/impact-reports',
        verification: 'https://pawbridge.org/app/governance/document-verification',
        compliance: 'https://pawbridge.org/app/governance/compliance-vault'
      };
      if (urlMap[screenId]) {
        this.dom.chromeAddressText.textContent = urlMap[screenId];
      }
    }

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
      case 'verification':
        this.renderVerificationScreen();
        break;
      case 'compliance':
        this.renderComplianceGrid();
        break;
      case 'impact':
        this.renderImpactScreen();
        break;
      case 'requests':
        this.renderSupportRequests();
        break;
      case 'inventory':
        this.renderInventoryTable();
        break;
      case 'profile':
        this.renderPublicProfile();
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
    this.renderVerificationScreen();
    this.renderComplianceGrid();
    this.renderImpactScreen();
    this.renderSupportRequests();
    this.renderInventoryTable();
    this.renderPublicProfile();
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
  // SCREEN 2: RESCUE & INTAKE REGISTRY (TABLE/CARD HYBRID & GRID)
  // ============================================================
  renderRescuesGrid() {
    const allRescues = PawBridgeStore.rescues;

    // Update dynamic tab counts
    const tabCounts = {
      all: allRescues.length,
      in_care: allRescues.filter(r => r.outcome === 'in_care' || r.outcome === 'foster' || !r.outcome).length,
      critical: allRescues.filter(r => r.triage === 'critical').length,
      surgery: allRescues.filter(r => r.triage === 'surgery').length,
      quarantine: allRescues.filter(r => r.triage === 'quarantine').length,
      adopted: allRescues.filter(r => r.outcome === 'adopted').length,
      released: allRescues.filter(r => r.outcome === 'released').length,
      sanctuary: allRescues.filter(r => r.outcome === 'sanctuary').length
    };

    const countAllEl = document.getElementById('tab-count-all');
    const countInCareEl = document.getElementById('tab-count-in-care');
    const countCriticalEl = document.getElementById('tab-count-critical');
    const countSurgeryEl = document.getElementById('tab-count-surgery');
    const countQuarantineEl = document.getElementById('tab-count-quarantine');
    const countAdoptedEl = document.getElementById('tab-count-adopted');
    const countReleasedEl = document.getElementById('tab-count-released');
    const countSanctuaryEl = document.getElementById('tab-count-sanctuary');

    if (countAllEl) countAllEl.textContent = tabCounts.all;
    if (countInCareEl) countInCareEl.textContent = tabCounts.in_care;
    if (countCriticalEl) countCriticalEl.textContent = tabCounts.critical;
    if (countSurgeryEl) countSurgeryEl.textContent = tabCounts.surgery;
    if (countQuarantineEl) countQuarantineEl.textContent = tabCounts.quarantine;
    if (countAdoptedEl) countAdoptedEl.textContent = tabCounts.adopted;
    if (countReleasedEl) countReleasedEl.textContent = tabCounts.released;
    if (countSanctuaryEl) countSanctuaryEl.textContent = tabCounts.sanctuary;

    let filtered = allRescues;

    // Filter 1: Status Tab
    const activeTab = PawBridgeStore.rescueStatusTab || 'all';
    if (activeTab === 'in_care') {
      filtered = filtered.filter(r => r.outcome === 'in_care' || r.outcome === 'foster' || !r.outcome);
    } else if (activeTab === 'critical') {
      filtered = filtered.filter(r => r.triage === 'critical');
    } else if (activeTab === 'surgery') {
      filtered = filtered.filter(r => r.triage === 'surgery');
    } else if (activeTab === 'quarantine') {
      filtered = filtered.filter(r => r.triage === 'quarantine');
    } else if (activeTab === 'adopted') {
      filtered = filtered.filter(r => r.outcome === 'adopted');
    } else if (activeTab === 'released') {
      filtered = filtered.filter(r => r.outcome === 'released');
    } else if (activeTab === 'sanctuary') {
      filtered = filtered.filter(r => r.outcome === 'sanctuary');
    }

    // Filter 2: Medical Status Select
    const medFilter = PawBridgeStore.rescueMedicalFilter || 'all';
    if (medFilter !== 'all') {
      filtered = filtered.filter(r => r.triage === medFilter);
    }

    // Filter 3: Outcome Select
    const outcomeFilter = PawBridgeStore.rescueOutcomeFilter || 'all';
    if (outcomeFilter !== 'all') {
      filtered = filtered.filter(r => (r.outcome || 'in_care') === outcomeFilter);
    }

    // Filter 4: Live Search Query
    if (PawBridgeStore.searchQuery) {
      const q = PawBridgeStore.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q) ||
        r.breed.toLowerCase().includes(q) ||
        r.intakeLocation.toLowerCase().includes(q) ||
        r.bay.toLowerCase().includes(q) ||
        r.condition.toLowerCase().includes(q) ||
        (r.carer && r.carer.toLowerCase().includes(q))
      );
    }

    const isHybridView = (PawBridgeStore.rescueViewMode || 'hybrid') === 'hybrid';
    const hybridContainer = this.dom.rescueHybridContainer;
    const hybridList = this.dom.rescueHybridList;
    const gridContainer = this.dom.rescueCardsGrid;

    if (isHybridView) {
      if (hybridContainer) hybridContainer.style.display = 'flex';
      if (gridContainer) gridContainer.style.display = 'none';

      if (hybridList) {
        if (filtered.length === 0) {
          hybridList.innerHTML = `
            <div style="padding: 48px 24px; text-align: center; background: #FFFFFF; border-radius: 12px; border: 1px dashed var(--color-border); margin-top: 8px;">
              <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 600; margin-bottom: 6px;">No rescue records match this filter</div>
              <p class="body-text-16 muted" style="font-size: 14px; margin-bottom: 16px;">Try adjusting your search criteria, medical status, or outcome category.</p>
              <button type="button" class="btn-primary-olive" onclick="PawBridgeApp.resetRescueFilters()">Reset Filters</button>
            </div>
          `;
        } else {
          hybridList.innerHTML = filtered.map(r => this.generateHybridRow(r)).join('');
        }
      }
    } else {
      if (hybridContainer) hybridContainer.style.display = 'none';
      if (gridContainer) {
        gridContainer.style.display = 'grid';
        if (filtered.length === 0) {
          gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: #FFFFFF; border-radius: 12px; border: 1px dashed var(--color-border);">
              <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 600; margin-bottom: 6px;">No rescue records match this filter</div>
              <p class="body-text-16 muted" style="font-size: 14px; margin-bottom: 16px;">Try adjusting your search criteria or triage category.</p>
              <button type="button" class="btn-primary-olive" onclick="PawBridgeApp.resetRescueFilters()">Reset Filters</button>
            </div>
          `;
        } else {
          gridContainer.innerHTML = filtered.map(r => this.generateCardDossier(r)).join('');
        }
      }
    }
  },

  generateHybridRow(r) {
    const outcomeClasses = {
      in_care: 'in-care',
      foster: 'foster',
      adopted: 'adopted',
      released: 'released',
      sanctuary: 'sanctuary',
      draft: 'draft'
    };

    const outcomeLabels = {
      in_care: 'In Shelter Treatment',
      foster: 'Foster-to-Adopt Trial',
      adopted: 'Adoption Finalized',
      released: 'Community Released',
      sanctuary: 'Permanent Sanctuary',
      draft: 'Draft Record'
    };

    const outcomeKey = r.outcome || 'in_care';
    const spentAmount = r.expenses?.spent ? `₹${Number(r.expenses.spent).toLocaleString('en-IN')}` : '₹3,500';
    const donorName = r.expenses?.donor || 'General Rescue Fund';

    return `
      <div class="rescue-hybrid-card-row" onclick="PawBridgeApp.openRescueDossier('${r.id}')">
        <!-- 1. Patient & Case ID -->
        <div class="hybrid-col-patient">
          <img src="${r.photoUrl}" alt="${r.name}" class="hybrid-patient-thumb" />
          <div class="hybrid-patient-info">
            <div class="hybrid-dog-name">
              <span>${r.name}</span>
              ${r.sterilized ? '<span style="font-size: 10px; color: var(--color-olive); font-weight: normal;" title="Sterilized">✂</span>' : ''}
            </div>
            <div class="hybrid-dog-meta">${r.breed} • ${r.gender} (${r.age})</div>
            <span class="hybrid-case-chip">${r.id} • ${r.tag}</span>
          </div>
        </div>

        <!-- 2. Rescue Date & Location -->
        <div class="hybrid-col-date-loc">
          <div class="hybrid-date-text">${r.intakeDate}</div>
          <div class="hybrid-loc-text" title="${r.intakeLocation}">📍 ${r.intakeLocation}</div>
          <span style="font-size: 11px; color: var(--color-text-subtle);">Unit: ${r.rescuer.split('(')[0].trim()}</span>
        </div>

        <!-- 3. Medical Status & Presenting Condition -->
        <div class="hybrid-col-medical">
          <div>
            <span class="status-pill ${r.triage}">${r.triageLabel || r.triage}</span>
          </div>
          <div class="hybrid-condition-snippet" title="${r.condition}">
            ${r.condition}
          </div>
          ${r.vitals?.temp ? `<span style="font-size: 11px; color: var(--color-text-subtle);">🌡️ ${r.vitals.temp} • ${r.vitals.hr}</span>` : ''}
        </div>

        <!-- 4. Bay & Attending Vet -->
        <div class="hybrid-col-carer-bay">
          <div class="hybrid-bay-tag">🏠 ${r.bay}</div>
          <div style="font-size: 11px; color: var(--color-text-subtle);">${r.ward ? r.ward.split(':')[0] : 'Ward'}</div>
          <div class="hybrid-carer-text">👨‍⚕️ ${r.carer}</div>
        </div>

        <!-- 5. Expenses -->
        <div class="hybrid-col-expenses">
          <div class="hybrid-amount-spent">${spentAmount}</div>
          <div class="hybrid-donor-label" title="${donorName}">Fund: ${donorName}</div>
        </div>

        <!-- 6. Outcome -->
        <div class="hybrid-col-outcome">
          <span class="outcome-pill ${outcomeClasses[outcomeKey] || 'in-care'}">
            ${outcomeLabels[outcomeKey] || r.outcomeLabel || 'In Shelter Care'}
          </span>
          <span style="font-size: 11px; color: var(--color-text-subtle);">${r.legalStatus ? r.legalStatus.split('#')[0].trim() : 'Active Care'}</span>
        </div>

        <!-- 7. Actions -->
        <div class="hybrid-col-actions" onclick="event.stopPropagation();">
          <button type="button" class="btn-secondary-cream" style="padding: 5px 10px; font-size: 12px;" onclick="PawBridgeApp.openRescueDossier('${r.id}')" title="Inspect clinical dossier">
            Dossier
          </button>
        </div>
      </div>
    `;
  },

  generateCardDossier(r) {
    const outcomeClasses = {
      in_care: 'in-care',
      foster: 'foster',
      adopted: 'adopted',
      released: 'released',
      sanctuary: 'sanctuary',
      draft: 'draft'
    };

    const outcomeLabels = {
      in_care: 'In Shelter Treatment',
      foster: 'Foster-to-Adopt Trial',
      adopted: 'Adoption Finalized',
      released: 'Community Released',
      sanctuary: 'Permanent Sanctuary',
      draft: 'Draft Record'
    };

    const outcomeKey = r.outcome || 'in_care';
    const spentAmount = r.expenses?.spent ? `₹${Number(r.expenses.spent).toLocaleString('en-IN')}` : '₹3,500';

    return `
      <div class="rescue-dossier-card" onclick="PawBridgeApp.openRescueDossier('${r.id}')">
        <div class="card-photo-banner">
          <img src="${r.photoUrl}" alt="${r.name}" loading="lazy" />
          <div class="card-photo-badges">
            <span class="case-id-badge">${r.id}</span>
            <span class="status-pill ${r.triage}">${r.triageLabel || r.triage}</span>
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
              <span class="attr-key">Rescue Location</span>
              <span class="attr-val" style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${r.intakeLocation}</span>
            </div>
            <div class="attr-item">
              <span class="attr-key">Assigned Bay</span>
              <span class="attr-val">${r.bay}</span>
            </div>
            <div class="attr-item">
              <span class="attr-key">Expenses Spent</span>
              <span class="attr-val" style="color: var(--color-olive);">${spentAmount}</span>
            </div>
            <div class="attr-item">
              <span class="attr-key">Lead Carer</span>
              <span class="attr-val">${r.carer ? (r.carer.split(' ')[1] || r.carer) : 'Staff'}</span>
            </div>
          </div>

          <div style="margin-top: 4px;">
            <span class="outcome-pill ${outcomeClasses[outcomeKey] || 'in-care'}" style="font-size: 11px;">
              ${outcomeLabels[outcomeKey] || r.outcomeLabel || 'In Shelter Care'}
            </span>
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
    `;
  },

  resetRescueFilters() {
    PawBridgeStore.rescueStatusTab = 'all';
    PawBridgeStore.rescueMedicalFilter = 'all';
    PawBridgeStore.rescueOutcomeFilter = 'all';
    PawBridgeStore.searchQuery = '';

    if (this.dom.rescueSearchField) this.dom.rescueSearchField.value = '';
    if (this.dom.rescueFilterMedical) this.dom.rescueFilterMedical.value = 'all';
    if (this.dom.rescueFilterOutcome) this.dom.rescueFilterOutcome.value = 'all';

    if (this.dom.rescueStatusTabsRow) {
      this.dom.rescueStatusTabsRow.querySelectorAll('.rescue-tab-chip').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-status-tab') === 'all');
      });
    }

    this.renderRescuesGrid();
    this.showToast('Rescue records search and filters reset', 'success');
  },

  // ============================================================
  // ADD RESCUE MODAL & LIFECYCLE ACTIONS
  // ============================================================
  openAddRescueModal(preselectedBay = '') {
    if (this.dom.modalAddRescue) {
      this.dom.modalAddRescue.classList.add('active');

      // Populate default date and time if empty
      const dateField = document.getElementById('new-rescue-date');
      const timeField = document.getElementById('new-rescue-time');
      const bayField = document.getElementById('new-rescue-bay');

      if (dateField && !dateField.value) {
        const today = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dateField.value = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
      }

      if (timeField && !timeField.value) {
        timeField.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }

      if (bayField && preselectedBay) {
        bayField.value = preselectedBay;
      }
    }
  },

  closeAddRescueModal() {
    if (this.dom.modalAddRescue) {
      this.dom.modalAddRescue.classList.remove('active');
    }
  },

  prefillDemoRescue() {
    const fields = {
      'new-rescue-name': 'Sultan',
      'new-rescue-tag': 'IND-DL-8835',
      'new-rescue-breed': 'Indie Mastiff Shepherd Mix',
      'new-rescue-gender': 'Male',
      'new-rescue-sterilized': 'false',
      'new-rescue-age': '2 Years',
      'new-rescue-weight': '24.2 kg',
      'new-rescue-date': '29 Oct 2026',
      'new-rescue-time': '10:30 AM',
      'new-rescue-location': 'Sector 21 Metro Station Underpass, Dwarka',
      'new-rescue-rescuer': 'Dwarka Patrol Helpline (Ambulance Unit 2)',
      'new-rescue-legal': 'Police Panchnama #DL-528 filed',
      'new-rescue-story': 'Reported by morning metro commuters after being pinned under construction scaffolding during storm. Sustained deep pelvic contusions, lacerations along right flank, and moderate shock. Field unit administered sedation, immobilized patient with vacuum mattress, and transferred immediately to PawBridge ICU.',
      'new-rescue-photo': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      'new-rescue-recovery-photo': 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
      'new-rescue-triage': 'critical',
      'new-rescue-carer': 'Dr. Ananya Sharma',
      'new-rescue-condition': 'Pelvic soft-tissue contusions with hematoma; right flank 8cm laceration debrided and sutured; vitals stabilizing under IV fluid resuscitation',
      'new-rescue-meds': 'IV Ceftriaxone 1g, Meloxicam 0.2mg/kg, Tramadol IV, Ringer Lactate 500ml',
      'new-rescue-vitals': 'Temp: 39.1 °C • HR: 124 bpm • Mucous: Pale pink • Hydration: 6% deficit',
      'new-rescue-spent': '5400',
      'new-rescue-donor': 'Emergency Trauma Fund',
      'new-rescue-bay': 'ICU-03',
      'new-rescue-outcome': 'in_care'
    };

    Object.keys(fields).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = fields[id];
    });

    this.showToast('⚡ Prefilled form with realistic Delhi trauma rescue incident', 'success');
  },

  saveRescueDraft() {
    const name = document.getElementById('new-rescue-name')?.value.trim() || 'Untitled Draft Rescue';
    const breed = document.getElementById('new-rescue-breed')?.value.trim() || 'Indie Mix';
    const location = document.getElementById('new-rescue-location')?.value.trim() || 'Shelter Intake Area';
    const date = document.getElementById('new-rescue-date')?.value.trim() || 'Today';
    const time = document.getElementById('new-rescue-time')?.value.trim() || 'Just now';
    const condition = document.getElementById('new-rescue-condition')?.value.trim() || 'Draft clinical assessment pending review.';
    const photo = document.getElementById('new-rescue-photo')?.value.trim() || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80';
    const spent = Number(document.getElementById('new-rescue-spent')?.value) || 0;
    const donor = document.getElementById('new-rescue-donor')?.value.trim() || 'Unallocated Draft';

    const newId = `RC-${1049 + PawBridgeStore.rescues.length}`;
    const draftRescue = {
      id: newId,
      name: `${name} (Draft)`,
      tag: `IND-DL-${Math.floor(Math.random() * 8000 + 1000)}`,
      breed,
      age: document.getElementById('new-rescue-age')?.value.trim() || '1 Year',
      gender: document.getElementById('new-rescue-gender')?.value || 'Male',
      weight: document.getElementById('new-rescue-weight')?.value.trim() || '12 kg',
      intakeDate: date,
      intakeTime: time,
      intakeLocation: location,
      rescuer: document.getElementById('new-rescue-rescuer')?.value.trim() || 'Field Volunteer',
      triage: 'stable',
      triageLabel: 'Draft Staged',
      outcome: 'draft',
      outcomeLabel: 'Draft Record',
      expenses: { spent, donor },
      rescueStory: document.getElementById('new-rescue-story')?.value.trim() || 'Draft intake record saved without publishing.',
      condition,
      bay: 'REC-04',
      ward: 'Ward C: Surgical Recovery',
      carer: document.getElementById('new-rescue-carer')?.value.trim() || 'Pending Assignment',
      photoUrl: photo,
      photoIntake: photo,
      photoRecovery: photo,
      vitals: { temp: '38.5 °C', hr: '90 bpm', mucous: 'Normal', hydration: 'Normal' },
      medications: ['Draft protocol pending clinical approval'],
      sterilized: false,
      rabiesVaccinated: false,
      legalStatus: 'Draft Intake Pending Verification'
    };

    PawBridgeStore.rescues.unshift(draftRescue);
    this.closeAddRescueModal();
    if (this.dom.formAddRescue) this.dom.formAddRescue.reset();

    this.render();
    this.showToast(`✓ Saved draft rescue record for ${name} (${newId})`, 'success');
  },

  publishRescueUpdate() {
    const name = document.getElementById('new-rescue-name')?.value.trim();
    const breed = document.getElementById('new-rescue-breed')?.value.trim();
    const location = document.getElementById('new-rescue-location')?.value.trim();
    const condition = document.getElementById('new-rescue-condition')?.value.trim();

    if (!name || !breed || !location || !condition) {
      this.showToast('Please complete all required fields (Name, Breed, Location, Condition)', 'alert');
      return;
    }

    const tag = document.getElementById('new-rescue-tag')?.value.trim() || `IND-DL-${Math.floor(Math.random() * 8000 + 1000)}`;
    const age = document.getElementById('new-rescue-age')?.value.trim() || '1.5 Years';
    const gender = document.getElementById('new-rescue-gender')?.value || 'Male';
    const weight = document.getElementById('new-rescue-weight')?.value.trim() || '15.0 kg';
    const date = document.getElementById('new-rescue-date')?.value.trim() || 'Today';
    const time = document.getElementById('new-rescue-time')?.value.trim() || 'Just now';
    const rescuer = document.getElementById('new-rescue-rescuer')?.value.trim() || 'Field Ambulance Unit 1';
    const legal = document.getElementById('new-rescue-legal')?.value.trim() || 'Shelter Intake Custody Verified';
    const story = document.getElementById('new-rescue-story')?.value.trim() || 'Direct rescue admission from field dispatch.';
    const photo = document.getElementById('new-rescue-photo')?.value.trim() || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80';
    const recoveryPhoto = document.getElementById('new-rescue-recovery-photo')?.value.trim() || photo;
    const triage = document.getElementById('new-rescue-triage')?.value || 'stable';
    const carer = document.getElementById('new-rescue-carer')?.value.trim() || 'Dr. Ananya Sharma';
    const medsRaw = document.getElementById('new-rescue-meds')?.value.trim() || 'Standard antibiotic & anti-inflammatory course';
    const vitalsRaw = document.getElementById('new-rescue-vitals')?.value.trim() || 'Temp: 38.6 °C • HR: 92 bpm • Normal hydration';
    const spent = Number(document.getElementById('new-rescue-spent')?.value) || 3800;
    const donor = document.getElementById('new-rescue-donor')?.value.trim() || 'General Rescue Fund';
    const bay = document.getElementById('new-rescue-bay')?.value || 'REC-04';
    const outcome = document.getElementById('new-rescue-outcome')?.value || 'in_care';
    const sterilized = document.getElementById('new-rescue-sterilized')?.value === 'true';

    const triageLabels = {
      critical: 'ICU / Critical Care',
      surgery: 'Post-Op Recovery',
      quarantine: 'Puppy Quarantine',
      stable: 'Rehabilitation / Stable',
      foster: 'Medical Foster Trial'
    };

    const outcomeLabels = {
      in_care: 'In Shelter Treatment',
      foster: 'Foster-to-Adopt Trial',
      adopted: 'Adoption Finalized',
      released: 'Community ABC Released',
      sanctuary: 'Permanent Sanctuary',
      draft: 'Draft Record'
    };

    const wardMap = {
      'ICU-01': 'Ward A: Trauma ICU', 'ICU-02': 'Ward A: Trauma ICU', 'ICU-03': 'Ward A: Trauma ICU',
      'ICU-04': 'Ward A: Trauma ICU', 'ICU-05': 'Ward A: Trauma ICU', 'ICU-06': 'Ward A: Trauma ICU',
      'Q-01': 'Ward B: Quarantine', 'Q-02': 'Ward B: Quarantine', 'Q-03': 'Ward B: Quarantine', 'Q-04': 'Ward B: Quarantine', 'Q-05': 'Ward B: Quarantine',
      'REC-01': 'Ward C: Surgical Recovery', 'REC-02': 'Ward C: Surgical Recovery', 'REC-03': 'Ward C: Surgical Recovery', 'REC-04': 'Ward C: Surgical Recovery', 'REC-05': 'Ward C: Surgical Recovery',
      'RUN-01': 'Ward D: Open Runs', 'RUN-02': 'Ward D: Open Runs', 'RUN-03': 'Ward D: Open Runs', 'RUN-05': 'Ward D: Open Runs', 'RUN-06': 'Ward D: Open Runs',
      'FOS-01': 'Ward E: Foster Care', 'FOS-02': 'Ward E: Foster Care', 'FOS-03': 'Ward E: Foster Care'
    };

    const newId = `RC-${1049 + PawBridgeStore.rescues.length}`;

    const newRescue = {
      id: newId,
      name,
      tag,
      breed,
      age,
      gender,
      weight,
      intakeDate: date,
      intakeTime: time,
      intakeLocation: location,
      rescuer,
      triage,
      triageLabel: triageLabels[triage] || 'Stable',
      outcome,
      outcomeLabel: outcomeLabels[outcome] || 'In Shelter Care',
      expenses: { spent, donor },
      rescueStory: story,
      condition,
      bay,
      ward: wardMap[bay] || 'Ward C: Surgical Recovery',
      carer,
      photoUrl: photo,
      photoIntake: photo,
      photoRecovery: recoveryPhoto,
      vitals: { temp: '38.8 °C', hr: '110 bpm', mucous: 'Healthy pink', hydration: 'Normal' },
      medications: medsRaw.split(',').map(m => m.trim()),
      sterilized,
      rabiesVaccinated: true,
      legalStatus: legal
    };

    PawBridgeStore.rescues.unshift(newRescue);

    // Update bay occupancy in store
    const bayObj = PawBridgeStore.kennelBays.find(b => b.id === bay);
    if (bayObj) {
      bayObj.status = 'occupied';
      bayObj.occupant = `${name} (${newId})`;
      bayObj.photo = photo;
    }

    // Add live notification
    PawBridgeStore.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `New Rescue Admitted: ${name}`,
      text: `Case #${newId} admitted from ${location}. Assigned to Bay ${bay} under ${carer}.`,
      time: 'Just now',
      unread: true
    });

    this.closeAddRescueModal();
    if (this.dom.formAddRescue) this.dom.formAddRescue.reset();

    this.render();
    this.showToast(`🎉 Rescue record published! Assigned Case ID: ${newId}`, 'success');
  },

  exportRescuesCsv() {
    const rescues = PawBridgeStore.rescues;
    const headers = ['Case ID', 'Name', 'Tag', 'Breed', 'Gender', 'Age', 'Weight', 'Intake Date', 'Intake Location', 'Triage Medical Status', 'Bay', 'Lead Carer', 'Expenses Spent (INR)', 'Donor Fund', 'Outcome'];

    const rows = rescues.map(r => [
      `"${r.id}"`,
      `"${r.name}"`,
      `"${r.tag}"`,
      `"${r.breed}"`,
      `"${r.gender}"`,
      `"${r.age}"`,
      `"${r.weight}"`,
      `"${r.intakeDate}"`,
      `"${r.intakeLocation.replace(/"/g, '""')}"`,
      `"${r.triageLabel || r.triage}"`,
      `"${r.bay}"`,
      `"${r.carer}"`,
      `"${r.expenses?.spent || 3500}"`,
      `"${r.expenses?.donor || 'General'}"`,
      `"${r.outcomeLabel || r.outcome || 'In Care'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pawbridge_rescues_registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast(`✓ Exported ${rescues.length} rescue records to CSV`, 'success');
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
  // DOCUMENT VERIFICATION & STATUTORY AUDIT ENGINE
  // ============================================================
  renderVerificationScreen() {
    if (!this.dom.verificationDocsGrid) return;

    const docs = PawBridgeStore.verificationDocuments;
    const mandatoryDocs = docs.filter(d => d.mandatory);
    const mandatoryCount = mandatoryDocs.length;
    const verifiedMandatoryCount = mandatoryDocs.filter(d => d.status === 'verified').length;
    const compliancePercent = Math.round((verifiedMandatoryCount / mandatoryCount) * 100);

    // Filter counts update
    const counts = {
      all: docs.length,
      pending: docs.filter(d => d.status === 'pending').length,
      needs_changes: docs.filter(d => d.status === 'needs_changes').length,
      verified: docs.filter(d => d.status === 'verified').length,
      draft: docs.filter(d => d.status === 'draft').length,
      rejected: docs.filter(d => d.status === 'rejected').length
    };

    const countAllEl = document.getElementById('count-filter-all');
    const countPendingEl = document.getElementById('count-filter-pending');
    const countNeedsChangesEl = document.getElementById('count-filter-needs-changes');
    const countVerifiedEl = document.getElementById('count-filter-verified');
    const countDraftEl = document.getElementById('count-filter-draft');
    const countRejectedEl = document.getElementById('count-filter-rejected');

    if (countAllEl) countAllEl.textContent = counts.all;
    if (countPendingEl) countPendingEl.textContent = counts.pending;
    if (countNeedsChangesEl) countNeedsChangesEl.textContent = counts.needs_changes;
    if (countVerifiedEl) countVerifiedEl.textContent = counts.verified;
    if (countDraftEl) countDraftEl.textContent = counts.draft;
    if (countRejectedEl) countRejectedEl.textContent = counts.rejected;

    // Safeguard Progress update
    if (this.dom.safeguardProgressText) {
      this.dom.safeguardProgressText.textContent = `${verifiedMandatoryCount} of ${mandatoryCount} Cleared (${compliancePercent}%)`;
    }
    if (this.dom.safeguardProgressFill) {
      this.dom.safeguardProgressFill.style.width = `${compliancePercent}%`;
    }
    if (this.dom.checklistPercentage) {
      this.dom.checklistPercentage.textContent = `${compliancePercent}%`;
    }
    if (this.dom.checklistCounts) {
      this.dom.checklistCounts.textContent = `${verifiedMandatoryCount} / ${mandatoryCount} Mandatory`;
    }

    // Gatekeeping Rule: Do not mark an NGO verified before approval
    const isFullyApproved = verifiedMandatoryCount === mandatoryCount && PawBridgeStore.ngoVerificationStatus === 'verified';

    if (this.dom.ngoStatusPill) {
      if (isFullyApproved) {
        this.dom.ngoStatusPill.className = 'status-pill status-verified';
        this.dom.ngoStatusPill.textContent = '✓ Verified Tier-1 Non-Profit Trust';
      } else if (verifiedMandatoryCount === mandatoryCount) {
        this.dom.ngoStatusPill.className = 'status-pill status-pending';
        this.dom.ngoStatusPill.textContent = 'Mandatory Criteria Met • Ready for Auditor Sign-Off';
      } else {
        this.dom.ngoStatusPill.className = 'status-pill status-pending';
        this.dom.ngoStatusPill.textContent = 'Provisional Tier-1 • Clearance Incomplete';
      }
    }

    if (this.dom.checklistStatusBadge) {
      if (isFullyApproved) {
        this.dom.checklistStatusBadge.className = 'status-pill status-verified';
        this.dom.checklistStatusBadge.textContent = 'Verified Active';
      } else if (verifiedMandatoryCount === mandatoryCount) {
        this.dom.checklistStatusBadge.className = 'status-pill status-pending';
        this.dom.checklistStatusBadge.textContent = 'Ready for Sign-Off';
      } else {
        this.dom.checklistStatusBadge.className = 'status-pill status-pending';
        this.dom.checklistStatusBadge.textContent = 'In Progress';
      }
    }

    // Render Checklist Items
    if (this.dom.checklistItemsContainer) {
      this.dom.checklistItemsContainer.innerHTML = docs.map(d => {
        const bullets = {
          verified: '✓',
          pending: '⏳',
          needs_changes: '⚠️',
          rejected: '✕',
          draft: '📄'
        };
        const statusLabels = {
          verified: 'Verified',
          pending: 'Pending Review',
          needs_changes: 'Needs Changes',
          rejected: 'Rejected',
          draft: 'Draft Staged'
        };
        return `
          <div class="checklist-item ${d.status}">
            <div class="checklist-item-bullet">${bullets[d.status]}</div>
            <div class="checklist-item-content">
              <div class="checklist-item-name">${d.title}</div>
              <div class="checklist-item-sub">
                ${d.mandatory ? '<strong>Mandatory</strong> • ' : 'Supporting • '}
                <span class="status-pill status-${d.status.replace('_', '-')}" style="font-size: 10px; padding: 1px 6px;">
                  ${statusLabels[d.status]}
                </span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Filter documents
    const filter = PawBridgeStore.activeDocFilter || 'all';
    const filteredDocs = filter === 'all' ? docs : docs.filter(d => d.status === filter);

    // Render Document Upload Cards
    this.dom.verificationDocsGrid.innerHTML = filteredDocs.map(d => this.generateDocCardMarkup(d)).join('');
  },

  generateDocCardMarkup(d) {
    const statusClasses = {
      draft: 'status-draft',
      pending: 'status-pending',
      verified: 'status-verified',
      needs_changes: 'status-needs-changes',
      rejected: 'status-rejected'
    };

    const statusLabels = {
      draft: 'Draft',
      pending: 'Pending review',
      verified: 'Verified',
      needs_changes: 'Needs changes',
      rejected: 'Rejected'
    };

    const isNeedsChanges = d.status === 'needs_changes';
    const isRejected = d.status === 'rejected';

    return `
      <div class="verification-doc-card ${d.mandatory ? 'mandatory-card' : ''} ${isNeedsChanges ? 'needs-changes-card' : ''} ${isRejected ? 'rejected-card' : ''}">
        <!-- Card Top Header -->
        <div class="doc-card-header">
          <div>
            <div class="doc-card-category">${d.category}</div>
            <h3 class="doc-card-title">${d.title}</h3>
          </div>
          <span class="status-pill ${statusClasses[d.status]}">
            ${statusLabels[d.status]}
          </span>
        </div>

        <!-- Privacy & Protection Shields -->
        <div class="doc-card-badges-row">
          ${d.mandatory ? '<span class="privacy-shield-tag" style="background: rgba(83, 103, 71, 0.12); color: var(--color-olive-dark); font-weight: 600;">★ Mandatory Statutory Item</span>' : '<span class="privacy-shield-tag">Supporting Evidence</span>'}
          <span class="privacy-shield-tag" title="Restricted to certified legal auditors">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>AES-256 Confidential</span>
          </span>
          <span class="doc-masked-id" title="Statutory Identity / Tax ID">${d.maskedId}</span>
        </div>

        <!-- Attached File Info Box -->
        <div class="doc-file-info-box">
          <div class="doc-file-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div class="doc-file-meta">
            <div class="doc-file-name" title="${d.fileName}">${d.fileName}</div>
            <div class="doc-file-subtext">
              <span>${d.fileSize}</span>
              <span>•</span>
              <span>${d.uploadDate}</span>
              <span>•</span>
              <span>${d.uploadedBy}</span>
            </div>
          </div>
        </div>

        <!-- Upload Progress Component -->
        <div class="doc-upload-progress-wrap">
          <div class="doc-progress-label-row">
            <span>Upload Progress</span>
            <strong>${d.uploadProgress}% ${d.uploadProgress === 100 ? 'Uploaded' : 'Staged'}</strong>
          </div>
          <div class="doc-progress-track">
            <div class="doc-progress-fill status-${d.status.replace('_', '-')}" style="width: ${d.uploadProgress}%;"></div>
          </div>
        </div>

        <!-- Auditor Remark & Feedback Box -->
        <div class="doc-auditor-alert ${d.status}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 1px;">
            ${d.status === 'verified' ? '<polyline points="20 6 9 17 4 12"/>' : (d.status === 'needs_changes' ? '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>')}
          </svg>
          <div>
            <strong>${d.status === 'verified' ? 'Auditor Attestation: ' : (d.status === 'needs_changes' ? 'Action Required: ' : (d.status === 'rejected' ? 'Rejection Reason: ' : 'Status Remark: '))}</strong>
            <span>${d.auditorNotes}</span>
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="doc-card-actions">
          <div class="doc-card-actions-left">
            <button type="button" class="btn-card-action" onclick="PawBridgeApp.openDocViewer('${d.id}')" title="Inspect official document in encrypted viewer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>Preview</span>
            </button>
            <button type="button" class="btn-card-action" onclick="PawBridgeApp.openReplaceModal('${d.id}')" title="Upload revised or replacement file">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span>Replace</span>
            </button>
            <button type="button" class="btn-card-action danger" onclick="PawBridgeApp.removeDocFile('${d.id}')" title="Remove document and reset to Draft">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Remove</span>
            </button>
          </div>

          <!-- Auditor Fast Status Select -->
          <div style="display: flex; align-items: center; gap: 4px;">
            <label style="font-size: 11px; color: var(--color-text-subtle);">Auditor:</label>
            <select class="auditor-status-select" onchange="PawBridgeApp.quickChangeDocStatus('${d.id}', this.value)" title="Change document status directly">
              <option value="draft" ${d.status === 'draft' ? 'selected' : ''}>Draft</option>
              <option value="pending" ${d.status === 'pending' ? 'selected' : ''}>Pending review</option>
              <option value="verified" ${d.status === 'verified' ? 'selected' : ''}>Verified</option>
              <option value="needs_changes" ${d.status === 'needs_changes' ? 'selected' : ''}>Needs changes</option>
              <option value="rejected" ${d.status === 'rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </div>
        </div>
      </div>
    `;
  },

  openDocViewer(docId) {
    const doc = PawBridgeStore.verificationDocuments.find(d => d.id === docId);
    if (!doc) return;

    PawBridgeStore.selectedDocId = docId;

    if (this.dom.viewerDocTitle) this.dom.viewerDocTitle.textContent = doc.title;
    if (this.dom.viewerDocCategory) this.dom.viewerDocCategory.textContent = doc.category;
    if (this.dom.viewerReviewDate) this.dom.viewerReviewDate.textContent = doc.reviewDate;
    if (this.dom.viewerFileSize) this.dom.viewerFileSize.textContent = doc.fileSize;
    if (this.dom.viewerFileHash) this.dom.viewerFileHash.textContent = doc.hash;
    if (this.dom.viewerUploadedBy) this.dom.viewerUploadedBy.textContent = doc.uploadedBy;
    if (this.dom.viewerAuditorNotes) this.dom.viewerAuditorNotes.value = doc.auditorNotes;

    const statusClasses = {
      draft: 'status-draft',
      pending: 'status-pending',
      verified: 'status-verified',
      needs_changes: 'status-needs-changes',
      rejected: 'status-rejected'
    };
    const statusLabels = {
      draft: 'Draft Staged',
      pending: 'Pending Review',
      verified: 'Verified Active',
      needs_changes: 'Needs Changes',
      rejected: 'Rejected'
    };

    if (this.dom.viewerStatusPill) {
      this.dom.viewerStatusPill.className = `status-pill ${statusClasses[doc.status]}`;
      this.dom.viewerStatusPill.textContent = statusLabels[doc.status];
    }
    if (this.dom.viewerStatusSelect) {
      this.dom.viewerStatusSelect.value = doc.status;
    }

    // Official Document Paper Simulation Inner Markup
    if (this.dom.viewerPaperInner) {
      this.dom.viewerPaperInner.innerHTML = `
        <div style="border-bottom: 2px solid #29352B; padding-bottom: 14px; margin-bottom: 20px; text-align: center;">
          <div style="font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; color: #536747;">
            GOVERNMENT OF NATIONAL CAPITAL TERRITORY OF DELHI
          </div>
          <div style="font-size: 10px; color: #666; margin-top: 2px;">
            OFFICIAL STATUTORY RECORD • ANIMAL WELFARE RECOGNITION ENCLAVE
          </div>
          <h2 style="font-size: 18px; margin: 12px 0 4px; font-weight: 700; color: #1E281F; font-family: serif;">
            ${doc.title.toUpperCase()}
          </h2>
          <div style="font-size: 11px; font-family: monospace; color: #444;">
            REGISTRATION IDENTIFIER: <span style="background: #FFF9E6; padding: 2px 6px; border: 1px solid #E5B95C; font-weight: bold;">${doc.maskedId}</span>
          </div>
        </div>

        <div style="font-size: 13px; line-height: 22px; color: #2A362B; font-family: serif; margin-bottom: 24px;">
          <p style="margin-bottom: 12px;">
            This is to certify that <strong>HAPPY TAILS ANIMAL SANCTUARY TRUST</strong> has deposited and verified the aforementioned instrument pursuant to the applicable animal protection statutes and charity registration regulations.
          </p>
          <div style="background: #F8F6F0; border-left: 3px solid #536747; padding: 10px 14px; margin: 12px 0; font-size: 12px; font-family: sans-serif;">
            <div><strong>Statutory Authority:</strong> ${doc.authority}</div>
            <div><strong>Attested Officer:</strong> ${doc.auditorName}</div>
            <div><strong>Cryptographic Hash:</strong> <span style="font-family: monospace; font-size: 11px;">${doc.hash}</span></div>
            <div><strong>Privacy Redaction:</strong> Non-public trustee identifiers masked per PawBridge Security Enclave.</div>
          </div>
          <p>
            The organization is maintained on active clinical registry and remains subject to periodic veterinary board inspection.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 36px; padding-top: 14px; border-top: 1px dashed #CCC; font-family: sans-serif;">
          <div>
            <div style="font-size: 10px; text-transform: uppercase; color: #777;">Digital Signature</div>
            <div style="font-family: monospace; font-size: 11px; color: #536747; font-weight: bold;">✓ CRYPTO-SIGNED (AWBI-2026)</div>
            <div style="font-size: 10px; color: #999;">Hash: ${doc.hash.slice(0, 22)}...</div>
          </div>
          <div style="text-align: right;">
            <div style="width: 64px; height: 64px; border: 2px solid #536747; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; text-transform: uppercase; font-weight: bold; color: #536747; text-align: center; line-height: 11px; margin-left: auto;">
              SEAL OF<br>TRUST<br>VERIFIED
            </div>
          </div>
        </div>
      `;
    }

    if (this.dom.modalSecureDocViewer) {
      this.dom.modalSecureDocViewer.classList.add('active');
    }
  },

  closeDocViewer() {
    if (this.dom.modalSecureDocViewer) {
      this.dom.modalSecureDocViewer.classList.remove('active');
    }
  },

  saveViewerStatus() {
    const docId = PawBridgeStore.selectedDocId;
    if (!docId) return;

    const doc = PawBridgeStore.verificationDocuments.find(d => d.id === docId);
    if (!doc) return;

    const newStatus = this.dom.viewerStatusSelect?.value || doc.status;
    const newNotes = this.dom.viewerAuditorNotes?.value.trim() || doc.auditorNotes;

    doc.status = newStatus;
    doc.auditorNotes = newNotes;
    doc.reviewDate = 'Today (Auditor Update)';

    this.closeDocViewer();
    this.renderVerificationScreen();
    this.showToast(`Updated audit status for ${doc.title}: ${newStatus.toUpperCase()}`, 'success');
  },

  openReplaceModal(docId) {
    const doc = PawBridgeStore.verificationDocuments.find(d => d.id === docId);
    if (!doc) return;

    PawBridgeStore.activeReplaceDocId = docId;

    if (this.dom.replaceModalTitle) this.dom.replaceModalTitle.textContent = `Upload / Replace ${doc.title}`;
    if (this.dom.replaceModalSubtitle) this.dom.replaceModalSubtitle.textContent = `Replacing current file: ${doc.fileName}`;

    if (this.dom.replaceProgressContainer) this.dom.replaceProgressContainer.style.display = 'none';
    if (this.dom.replaceProgressBar) this.dom.replaceProgressBar.style.width = '0%';
    if (this.dom.replacePercentText) this.dom.replacePercentText.textContent = '0%';
    if (this.dom.replaceSelectedFilename) this.dom.replaceSelectedFilename.textContent = `revised_${doc.id}_certified.pdf`;

    if (this.dom.modalReplaceDocument) {
      this.dom.modalReplaceDocument.classList.add('active');
    }
  },

  closeReplaceModal() {
    if (this.dom.modalReplaceDocument) {
      this.dom.modalReplaceDocument.classList.remove('active');
    }
  },

  startSimulatedUpload() {
    const docId = PawBridgeStore.activeReplaceDocId;
    const doc = PawBridgeStore.verificationDocuments.find(d => d.id === docId);
    if (!doc) return;

    if (this.dom.replaceProgressContainer) this.dom.replaceProgressContainer.style.display = 'block';

    const bar = this.dom.replaceProgressBar;
    const percent = this.dom.replacePercentText;
    const hint = this.dom.replaceStatusHint;
    const bytes = this.dom.replaceBytesHint;
    const btn = this.dom.btnStartSimulatedUpload;

    if (btn) btn.disabled = true;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (bar) bar.style.width = `${progress}%`;
      if (percent) percent.textContent = `${progress}%`;

      if (progress === 25) {
        if (hint) hint.textContent = 'Encrypting document payload with AES-256-GCM...';
        if (bytes) bytes.textContent = '1.1 MB / 4.2 MB';
      } else if (progress === 50) {
        if (hint) hint.textContent = 'Computing SHA-256 cryptographic digest...';
        if (bytes) bytes.textContent = '2.4 MB / 4.2 MB';
      } else if (progress === 75) {
        if (hint) hint.textContent = 'Transferring to PawBridge statutory vault...';
        if (bytes) bytes.textContent = '3.5 MB / 4.2 MB';
      } else if (progress >= 100) {
        clearInterval(interval);
        if (hint) hint.textContent = 'Upload complete! Attached to verification pipeline.';
        if (bytes) bytes.textContent = '4.2 MB / 4.2 MB';

        setTimeout(() => {
          doc.fileName = this.dom.replaceSelectedFilename?.textContent || `revised_${doc.id}_final.pdf`;
          doc.fileSize = '4.2 MB';
          doc.uploadDate = 'Just now';
          doc.uploadedBy = 'Trustee Dr. Ananya Sharma';
          doc.uploadProgress = 100;
          doc.status = 'pending';
          doc.auditorNotes = 'Revised document uploaded. Queued for certified legal officer scrutiny.';

          if (btn) btn.disabled = false;
          this.closeReplaceModal();
          this.renderVerificationScreen();
          this.showToast(`✓ Revised ${doc.title} uploaded and queued for review`, 'success');
        }, 500);
      }
    }, 280);
  },

  removeDocFile(docId) {
    const doc = PawBridgeStore.verificationDocuments.find(d => d.id === docId);
    if (!doc) return;

    if (confirm(`Remove "${doc.fileName}"? This document will be cleared and reset to Draft state awaiting re-upload.`)) {
      doc.fileName = 'No file attached - Staged draft';
      doc.fileSize = '0 MB';
      doc.uploadProgress = 0;
      doc.status = 'draft';
      doc.auditorNotes = 'Document removed by trustee. Re-upload required to enter verification queue.';

      this.renderVerificationScreen();
      this.showToast(`Document file removed and status reset to Draft`, 'alert');
    }
  },

  quickChangeDocStatus(docId, newStatus) {
    const doc = PawBridgeStore.verificationDocuments.find(d => d.id === docId);
    if (!doc) return;

    doc.status = newStatus;
    if (newStatus === 'verified') {
      doc.uploadProgress = 100;
      doc.auditorNotes = 'Approved: Document verified against official gazette records by compliance panel.';
    } else if (newStatus === 'needs_changes') {
      doc.auditorNotes = 'Action Required: Page 6 requires executive authority counter-signature. Please re-upload.';
    } else if (newStatus === 'rejected') {
      doc.auditorNotes = 'Disapproved: Instrument expired or registration name mismatch.';
    } else if (newStatus === 'pending') {
      doc.uploadProgress = 100;
      doc.auditorNotes = 'Queued in Desk 2. Under scrutiny by statutory legal auditor.';
    } else if (newStatus === 'draft') {
      doc.uploadProgress = 40;
      doc.auditorNotes = 'Draft file staged on local workstation. Click Replace/Upload to finalize.';
    }

    this.renderVerificationScreen();
    this.showToast(`[Auditor Mode] Set ${doc.title} to ${newStatus.toUpperCase()}`, 'success');
  },

  openAuditorApprovalModal() {
    const docs = PawBridgeStore.verificationDocuments;
    const mandatoryDocs = docs.filter(d => d.mandatory);
    const unverifiedMandatory = mandatoryDocs.filter(d => d.status !== 'verified');
    const isReady = unverifiedMandatory.length === 0;

    const content = this.dom.approvalModalContent;
    const footer = this.dom.approvalModalFooter;

    if (!isReady) {
      if (content) {
        content.innerHTML = `
          <div style="background: #FDF1ED; border: 1px solid var(--color-terracotta-border); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-terracotta); flex-shrink: 0; margin-top: 2px;">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <strong style="font-size: 14px; color: var(--color-terracotta-dark);">Verification Approval Blocked</strong>
                <p style="font-size: 13px; line-height: 19px; color: #7B3E2C; margin-top: 4px;">
                  Per PawBridge statutory guidelines, an NGO cannot be marked as verified prior to formal legal clearance of <strong>all mandatory documents</strong>.
                </p>
              </div>
            </div>
          </div>

          <div style="font-size: 13px; font-weight: 600; color: var(--color-text-dark); margin-bottom: 8px;">
            Unresolved Mandatory Documents (${unverifiedMandatory.length}):
          </div>
          <ul style="padding-left: 20px; font-size: 13px; color: var(--color-text-muted); line-height: 22px; margin-bottom: 16px;">
            ${unverifiedMandatory.map(d => `<li><strong>${d.title}</strong> — Current status: <span class="status-pill status-${d.status.replace('_', '-')}" style="font-size: 11px; padding: 1px 6px;">${d.status.toUpperCase()}</span></li>`).join('')}
          </ul>

          <p style="font-size: 12px; color: var(--color-text-subtle); line-height: 18px;">
            Tip: You can use the "Approve All Mandatory Documents" trigger in the Auditor Simulation Console on the right to test the successful verification state.
          </p>
        `;
      }
      if (this.dom.btnConfirmFinalApproval) {
        this.dom.btnConfirmFinalApproval.style.display = 'none';
      }
    } else {
      if (content) {
        content.innerHTML = `
          <div style="background: #F3F7F0; border: 1px solid #C8DEC2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--color-olive); flex-shrink: 0; margin-top: 2px;">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <strong style="font-size: 14px; color: var(--color-olive-dark);">All Mandatory Compliance Clearances Verified</strong>
                <p style="font-size: 13px; line-height: 19px; color: #354E2C; margin-top: 4px;">
                  Happy Tails Animal Sanctuary Trust has cleared all 4 mandatory legal prerequisites. You are authorized to affix the cryptographic compliance key.
                </p>
              </div>
            </div>
          </div>

          <div style="background: #FAF8F2; border: 1px solid var(--color-border); border-radius: 8px; padding: 14px; margin-bottom: 16px; font-size: 12px; line-height: 20px;">
            <div><strong>Entity:</strong> Happy Tails Animal Sanctuary Trust (#DL-402)</div>
            <div><strong>Auditor:</strong> Adv. Vikramaditya Sen, Senior Compliance Panel</div>
            <div><strong>Cryptographic Key:</strong> <span style="font-family: monospace;">RSA-4096: 9b23-ac44-f810-77a1</span></div>
            <div><strong>Audit Stamp:</strong> AWBI & MCA Section 80G Attestation</div>
          </div>

          <label class="custom-checkbox-wrap" style="font-size: 13px;">
            <input type="checkbox" id="chk-auditor-affirmation" checked />
            <span>I confirm that all uploaded documents have been inspected against sovereign registries and declare this shelter Tier-1 Verified.</span>
          </label>
        `;
      }
      if (this.dom.btnConfirmFinalApproval) {
        this.dom.btnConfirmFinalApproval.style.display = 'inline-flex';
      }
    }

    if (this.dom.modalAuditorApproval) {
      this.dom.modalAuditorApproval.classList.add('active');
    }
  },

  closeAuditorApprovalModal() {
    if (this.dom.modalAuditorApproval) {
      this.dom.modalAuditorApproval.classList.remove('active');
    }
  },

  confirmFinalApproval() {
    PawBridgeStore.ngoVerificationStatus = 'verified';
    this.closeAuditorApprovalModal();
    this.renderVerificationScreen();
    this.showToast('🎉 Official NGO Verification Approved! Tier-1 Trust Seal and public trust features unlocked.', 'success');
  },

  simulateReuploadFix() {
    const mou = PawBridgeStore.verificationDocuments.find(d => d.id === 'doc-mou');
    if (mou) {
      mou.status = 'pending';
      mou.fileName = 'mcd_delhi_abc_agreement_signed_page6_fixed.pdf';
      mou.uploadDate = 'Just now (Resubmitted)';
      mou.uploadProgress = 100;
      mou.auditorNotes = 'Revised bilateral agreement with page 6 municipal stamp received. Under re-scrutiny.';
      this.renderVerificationScreen();
      this.showToast('✓ Simulated resubmission of Municipal ABC Agreement (Status -> Pending review)', 'success');
    }
  },

  approveAllMandatoryDocs() {
    PawBridgeStore.verificationDocuments.forEach(d => {
      if (d.mandatory) {
        d.status = 'verified';
        d.uploadProgress = 100;
        d.auditorNotes = 'Verified Active: Sovereign registration and tax records confirmed by compliance board.';
      }
    });
    this.renderVerificationScreen();
    this.showToast('✓ All mandatory documents set to Verified. You may now trigger final Auditor Sign-Off.', 'success');
  },

  resetDocsState() {
    PawBridgeStore.ngoVerificationStatus = 'provisional';
    PawBridgeStore.verificationDocuments = [
      {
        id: 'doc-reg',
        category: 'Legal Entity Identification',
        title: 'Trust Registration Deed / Society Certificate',
        mandatory: true,
        fileName: 'society_reg_deed_dl_act_xxi_2018.pdf',
        fileSize: '3.4 MB',
        uploadDate: '14 Oct 2026, 10:45 AM',
        uploadedBy: 'Trustee Dr. Ananya Sharma',
        uploadProgress: 100,
        status: 'verified',
        isSensitive: true,
        maskedId: 'DL/2018/****923',
        authority: 'Sub-Registrar of Societies, Govt of NCT Delhi',
        hash: 'SHA256: 8a93bf81e7d0...9b31',
        reviewDate: '16 Oct 2026',
        auditorNotes: 'Verified against Registrar of Societies NCT Delhi gazette records. Registered entity name and registered office address authenticated.',
        auditorName: 'Adv. Vikramaditya Sen (Senior Legal Auditor)'
      },
      {
        id: 'doc-pan',
        category: 'Tax Identity & Clearance',
        title: 'Permanent Account Number (PAN) Card & NGO Darpan UID',
        mandatory: true,
        fileName: 'ngo_pan_card_incorporation_dl.pdf',
        fileSize: '1.2 MB',
        uploadDate: '14 Oct 2026, 11:15 AM',
        uploadedBy: 'Finance Officer R. Saxena',
        uploadProgress: 100,
        status: 'verified',
        isSensitive: true,
        maskedId: 'AAATP****K',
        authority: 'Income Tax Department & NITI Aayog NGO Darpan',
        hash: 'SHA256: 3d71ff90c421...889e',
        reviewDate: '16 Oct 2026',
        auditorNotes: 'Entity PAN matched on Income Tax Department CBDT database. NITI Aayog NGO Darpan UID #DL/2019/021948 verified active.',
        auditorName: 'Adv. Vikramaditya Sen (Senior Legal Auditor)'
      },
      {
        id: 'doc-12a80g',
        category: 'Non-Profit Tax Exemption',
        title: 'Section 12A & 80G Approval Orders (Form 10AC)',
        mandatory: true,
        fileName: 'form_10ac_provisional_ay2024_2029.pdf',
        fileSize: '2.8 MB',
        uploadDate: 'Yesterday at 04:30 PM',
        uploadedBy: 'Trustee Dr. Ananya Sharma',
        uploadProgress: 100,
        status: 'pending',
        isSensitive: true,
        maskedId: 'CIT(EXEMP)/DELHI/****3381',
        authority: 'Commissioner of Income Tax (Exemptions), New Delhi',
        hash: 'SHA256: d472aa10fc83...01fa',
        reviewDate: 'Queued in Desk 2',
        auditorNotes: 'Document uploaded and queued for Section 80G validity audit. Compliance desk currently validating 5-year provisional order compliance.',
        auditorName: 'Under Scrutiny by CA R. K. Bhasin'
      },
      {
        id: 'doc-mou',
        category: 'Operational Authorization',
        title: 'Municipal Stray Animal Birth Control (ABC) MOU',
        mandatory: true,
        fileName: 'mcd_delhi_abc_arv_tender_agreement_2025.pdf',
        fileSize: '5.1 MB',
        uploadDate: '3 days ago',
        uploadedBy: 'Operations Head Vikas',
        uploadProgress: 100,
        status: 'needs_changes',
        isSensitive: true,
        maskedId: 'MCD/VET/2025/****401',
        authority: 'Municipal Corporation of Delhi (Veterinary Services)',
        hash: 'SHA256: 7f33bb19a12c...a024',
        reviewDate: '26 Oct 2026',
        auditorNotes: 'Auditor Remark: Page 6 of the Municipal bilateral agreement is missing the Executive Veterinary Officer municipal counter-stamp. Please re-upload the fully executed 7-page bilateral MOU.',
        auditorName: 'Dr. Suniti Rao (Municipal Liaison Officer)'
      },
      {
        id: 'doc-audit',
        category: 'Humane Shelter Standards',
        title: 'Veterinary Council of India (VCI) Shelter Ground Audit',
        mandatory: false,
        fileName: 'vci_shelter_inspection_audit_q3_2026.pdf',
        fileSize: '4.6 MB',
        uploadDate: 'Staged on Local Workstation',
        uploadedBy: 'Draft by Vikas',
        uploadProgress: 45,
        status: 'draft',
        isSensitive: true,
        maskedId: 'VCI/INSP/2026/****12',
        authority: 'Veterinary Council of India State Inspection Committee',
        hash: 'SHA256: Pending upload completion',
        reviewDate: 'Draft Staged',
        auditorNotes: 'Draft staged locally. Click "Replace / Finalize Upload" to transfer to encrypted statutory vault and queue for compliance review.',
        auditorName: 'Unassigned (Draft State)'
      },
      {
        id: 'doc-fcra',
        category: 'Cross-Border Giving Compliance',
        title: 'Foreign Contribution Regulation Act (FCRA) License',
        mandatory: false,
        fileName: 'fcra_renewal_mha_notice_2024.pdf',
        fileSize: '1.9 MB',
        uploadDate: '15 Oct 2026',
        uploadedBy: 'Finance Officer R. Saxena',
        uploadProgress: 100,
        status: 'rejected',
        isSensitive: true,
        maskedId: 'MHA/FCRA/Reg-****0144',
        authority: 'Ministry of Home Affairs, Foreigners Division',
        hash: 'SHA256: c382a991b100...ff42',
        reviewDate: '18 Oct 2026',
        auditorNotes: 'Disapproved: Certificate validity lapsed on 31 March 2024. The Ministry of Home Affairs validity extension notification or renewed Form FC-3R acknowledgement must be provided.',
        auditorName: 'Adv. Vikramaditya Sen (Senior Legal Auditor)'
      }
    ];
    this.renderVerificationScreen();
    this.showToast('Reset documents state to initial demonstration scenario', 'success');
  },

  toggleAuditorMode() {
    PawBridgeStore.auditorMode = !PawBridgeStore.auditorMode;
    if (this.dom.auditorModeLabel) {
      this.dom.auditorModeLabel.textContent = `Auditor Mode: ${PawBridgeStore.auditorMode ? 'Active' : 'Inactive'}`;
    }
    this.renderVerificationScreen();
    this.showToast(`Auditor Review Mode ${PawBridgeStore.auditorMode ? 'Enabled' : 'Disabled'}`, 'success');
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
  // SCREEN 9: IMPACT REPORTS & STATUTORY OUTCOMES CONTROLLER
  // ============================================================
  switchImpactPeriod(periodId) {
    PawBridgeStore.impactState.activePeriodId = periodId;
    if (this.dom.impactPeriodSelect) {
      this.dom.impactPeriodSelect.value = periodId;
    }
    this.dom.periodChipBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-period') === periodId);
    });
    this.renderImpactScreen();
    const period = PawBridgeStore.impactState.periods.find(p => p.id === periodId);
    if (period) {
      this.showToast(`Active reporting period: ${period.title}`, 'success');
    }
  },

  togglePeriodAuditStatus() {
    const period = PawBridgeStore.impactState.periods.find(p => p.id === PawBridgeStore.impactState.activePeriodId);
    if (!period) return;

    if (period.status === 'reported') {
      period.status = 'verified';
      period.statusLabel = 'Audited & Verified (CA Certified)';
      period.auditNote = 'Statutorily Verified & Audited by External Chartered Accountants';
      period.revisionHistory.unshift({
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        user: 'External Statutory Auditor (CA Panel)',
        note: 'Desk review completed. All reported intake, clinical, and rehoming records certified.'
      });
      this.showToast(`✓ Period ${period.title} statutorily verified & locked by independent audit!`, 'success');
    } else {
      period.status = 'reported';
      period.statusLabel = 'Organisation-Reported (Unverified)';
      period.auditNote = 'Audit Scrutiny: Self-reported shelter intake • Third-party desk scrutiny active';
      period.revisionHistory.unshift({
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        user: 'Dr. Ananya Sharma (Lead Vet)',
        note: 'Reverted audit seal for subsequent clinical figure amendments.'
      });
      this.showToast(`Reverted ${period.title} to Organisation-Reported status`, 'alert');
    }

    this.renderImpactScreen();
  },

  renderImpactScreen() {
    this.renderImpactPeriodSelect();
    this.renderImpactStats();
    this.renderMonthlyChart();
    this.renderImpactUpdates();
    this.renderEvidenceDocs();
    this.renderRevisionHistory();
  },

  renderImpactPeriodSelect() {
    if (!this.dom.impactPeriodSelect) return;
    this.dom.impactPeriodSelect.innerHTML = PawBridgeStore.impactState.periods.map(p => `
      <option value="${p.id}" ${p.id === PawBridgeStore.impactState.activePeriodId ? 'selected' : ''}>
        ${p.title} • ${p.status === 'verified' ? '✓ Audited' : 'Organisation-Reported'}
      </option>
    `).join('');

    // Also update evidence upload modal period dropdown
    if (this.dom.evidencePeriodSelect) {
      this.dom.evidencePeriodSelect.innerHTML = PawBridgeStore.impactState.periods.map(p => `
        <option value="${p.id}" ${p.id === PawBridgeStore.impactState.activePeriodId ? 'selected' : ''}>
          ${p.title}
        </option>
      `).join('');
    }
  },

  renderImpactStats() {
    const period = PawBridgeStore.impactState.periods.find(p => p.id === PawBridgeStore.impactState.activePeriodId) || PawBridgeStore.impactState.periods[0];
    if (!period) return;

    const isVerified = period.status === 'verified';

    // Numbers
    if (this.dom.impactStatRescued) this.dom.impactStatRescued.textContent = period.figures.rescued.toLocaleString();
    if (this.dom.impactStatTreated) this.dom.impactStatTreated.textContent = period.figures.treated.toLocaleString();
    if (this.dom.impactStatRehabbed) this.dom.impactStatRehabbed.textContent = period.figures.rehabilitated.toLocaleString();
    if (this.dom.impactStatAdopted) this.dom.impactStatAdopted.textContent = period.figures.adopted.toLocaleString();

    // Mandatory Transparency Badges: Label all numbers as organisation-reported until reviewed
    const badgeText = isVerified ? '✓ Audited & Verified' : 'Organisation-reported';
    const badgeClass = isVerified ? 'report-badge verified' : 'report-badge reported';

    ['impactBadgeRescued', 'impactBadgeTreated', 'impactBadgeRehabbed', 'impactBadgeAdopted'].forEach(badgeKey => {
      const el = this.dom[badgeKey];
      if (el) {
        el.className = badgeClass;
        el.textContent = badgeText;
      }
    });

    // Micro-breakdowns
    if (this.dom.impactRescuedBreakdown && period.breakdowns) this.dom.impactRescuedBreakdown.innerHTML = period.breakdowns.rescued;
    if (this.dom.impactTreatedBreakdown && period.breakdowns) this.dom.impactTreatedBreakdown.innerHTML = period.breakdowns.treated;
    if (this.dom.impactRehabbedBreakdown && period.breakdowns) this.dom.impactRehabbedBreakdown.innerHTML = period.breakdowns.rehabbed;
    if (this.dom.impactAdoptedBreakdown && period.breakdowns) this.dom.impactAdoptedBreakdown.innerHTML = period.breakdowns.adopted;

    // Secondary Summary Strip
    if (this.dom.impactStatAbc) this.dom.impactStatAbc.textContent = `${period.figures.abcSterilized.toLocaleString()} Canines`;
    if (this.dom.impactStatReleased) this.dom.impactStatReleased.textContent = `${period.figures.communityReleased.toLocaleString()} Canines`;
    if (this.dom.impactStatMortality) this.dom.impactStatMortality.textContent = period.figures.mortalityRate;
    if (this.dom.impactStatLock) {
      this.dom.impactStatLock.textContent = isVerified ? '✓ Audited & Locked' : 'Organisation-Reported';
      this.dom.impactStatLock.style.color = isVerified ? '#2E6B28' : 'var(--color-terracotta)';
    }

    // Top status pill & Safeguard banner
    if (this.dom.impactHeaderStatusPill) {
      this.dom.impactHeaderStatusPill.className = `report-audit-pill ${isVerified ? 'verified' : 'reported'}`;
      this.dom.impactHeaderStatusPill.textContent = isVerified ? '✓ Audited & Statutorily Sealed' : 'Organisation-Reported • Desk Review Pending';
    }

    if (this.dom.impactPeriodAuditBadge) {
      this.dom.impactPeriodAuditBadge.className = `report-badge ${isVerified ? 'verified' : 'reported'}`;
      this.dom.impactPeriodAuditBadge.textContent = isVerified ? '✓ Audited & Verified (CA Certified)' : 'Organisation-Reported (Unverified)';
    }

    if (this.dom.btnSimAuditText) {
      this.dom.btnSimAuditText.textContent = isVerified ? 'Revert to Unverified' : 'Simulate Auditor Sign-Off';
    }

    if (this.dom.impactSafeguardBanner) {
      this.dom.impactSafeguardBanner.classList.toggle('audited', isVerified);
    }

    if (this.dom.impactPeriodMetaTag) {
      this.dom.impactPeriodMetaTag.innerHTML = `Period: <strong>${period.dateRange}</strong> • Last updated <strong>${period.lastUpdated}</strong>`;
    }

    if (this.dom.impactPeriodAuditNote) {
      this.dom.impactPeriodAuditNote.textContent = period.auditNote;
    }
  },

  renderMonthlyChart() {
    if (!this.dom.impactChartSvgWrap) return;

    const data = PawBridgeStore.impactState.monthlyActivity;
    const series = PawBridgeStore.impactState.activeSeries; // 'all' | 'rescues' | 'treated' | 'rehabbed' | 'adopted'

    // Chart dimensions
    const width = 920;
    const height = 230;
    const padLeft = 45;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 35;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;
    const maxVal = 200;

    // Y-axis grid levels: 0, 50, 100, 150, 200
    const gridLevels = [0, 50, 100, 150, 200];
    let gridLinesSvg = '';
    gridLevels.forEach(val => {
      const y = padTop + chartH - (val / maxVal) * chartH;
      gridLinesSvg += `
        <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#E2DDD1" stroke-dasharray="${val === 0 ? 'none' : '3,3'}" stroke-width="${val === 0 ? '1.5' : '1'}" />
        <text x="${padLeft - 8}" y="${y + 4}" font-size="11" font-family="Inter, sans-serif" fill="#88978A" text-anchor="end">${val}</text>
      `;
    });

    // Month bars
    const colWidth = chartW / data.length;
    let barsSvg = '';

    data.forEach((d, i) => {
      const colX = padLeft + (i * colWidth);
      const centerX = colX + (colWidth / 2);

      // Month label
      const monthLabel = `
        <text x="${centerX}" y="${height - 12}" font-size="11" font-family="Inter, sans-serif" fill="#5F6D61" font-weight="500" text-anchor="middle">${d.month}</text>
      `;

      let monthBars = '';

      if (series === 'all') {
        // 4 bars grouped
        const barW = 8.5;
        const barGap = 2;
        const totalGroupW = (4 * barW) + (3 * barGap);
        const startX = centerX - (totalGroupW / 2);

        const seriesList = [
          { key: 'rescues', val: d.rescues, color: '#536747' },
          { key: 'treated', val: d.treated, color: '#E5B95C' },
          { key: 'rehabbed', val: d.rehabbed, color: '#8CA77F' },
          { key: 'adopted', val: d.adopted, color: '#D98B70' }
        ];

        seriesList.forEach((s, sIdx) => {
          const barH = (s.val / maxVal) * chartH;
          const barX = startX + (sIdx * (barW + barGap));
          const barY = padTop + chartH - barH;
          monthBars += `
            <rect class="chart-bar-rect" x="${barX}" y="${barY}" width="${barW}" height="${barH}" fill="${s.color}" rx="2" ry="2" data-month="${d.month}" data-val="${s.val}" data-series="${s.key}">
              <title>${d.month} • ${s.key.toUpperCase()}: ${s.val} (Organisation-reported)</title>
            </rect>
          `;
        });
      } else {
        // Single series active
        const val = d[series];
        const barW = 28;
        const barH = (val / maxVal) * chartH;
        const barX = centerX - (barW / 2);
        const barY = padTop + chartH - barH;
        const colors = {
          rescues: '#536747',
          treated: '#E5B95C',
          rehabbed: '#8CA77F',
          adopted: '#D98B70'
        };
        const color = colors[series] || '#536747';

        monthBars += `
          <rect class="chart-bar-rect" x="${barX}" y="${barY}" width="${barW}" height="${barH}" fill="${color}" rx="3" ry="3" data-month="${d.month}" data-val="${val}" data-series="${series}">
            <title>${d.month} • ${series.toUpperCase()}: ${val} (Organisation-reported)</title>
          </rect>
          <text x="${centerX}" y="${barY - 5}" font-size="10" font-family="Inter, sans-serif" font-weight="600" fill="#29352B" text-anchor="middle">${val}</text>
        `;
      }

      // Invisible hover column target for tooltip
      const hitBox = `
        <rect x="${colX}" y="${padTop}" width="${colWidth}" height="${chartH}" fill="transparent" class="chart-col-hitbox" data-idx="${i}" style="cursor: pointer;">
          <title>${d.month}: ${d.rescues} Rescues, ${d.treated} Treated, ${d.rehabbed} Rehabbed, ${d.adopted} Adopted (Organisation-reported)</title>
        </rect>
      `;

      barsSvg += monthBars + monthLabel + hitBox;
    });

    this.dom.impactChartSvgWrap.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="12-Month Animal Operations Chart">
        ${gridLinesSvg}
        ${barsSvg}
      </svg>
    `;
  },

  renderImpactUpdates() {
    if (!this.dom.impactUpdatesList) return;

    const updates = PawBridgeStore.impactState.impactUpdates;
    if (this.dom.impactUpdatesCountBadge) {
      this.dom.impactUpdatesCountBadge.textContent = `${updates.length} Updates`;
    }

    this.dom.impactUpdatesList.innerHTML = updates.map(u => `
      <div class="impact-update-card">
        <div class="update-photo-wrap">
          <img src="${u.photo}" alt="${u.title}" loading="lazy" />
        </div>
        <div class="update-content">
          <div>
            <div class="update-header">
              <h4 class="update-title">${u.title}</h4>
              <span class="update-date">${u.date}</span>
            </div>
            <p class="update-summary">${u.summary}</p>
          </div>
          <div class="update-footer">
            <span class="update-metrics-badge">${u.metrics}</span>
            <span class="report-badge reported small">Organisation-reported</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderEvidenceDocs() {
    if (!this.dom.impactEvidenceList) return;

    const category = PawBridgeStore.impactState.activeEvidenceCategory;
    let docs = PawBridgeStore.impactState.evidenceDocs;

    if (category !== 'all') {
      docs = docs.filter(d => d.category === category);
    }

    if (this.dom.impactEvidenceCountBadge) {
      this.dom.impactEvidenceCountBadge.textContent = `${docs.length} Documents`;
    }

    if (docs.length === 0) {
      this.dom.impactEvidenceList.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--color-text-muted); font-size: 13px;">
          No evidence documents uploaded in this category. Click <strong>Upload File</strong> above to attach verifiable logs.
        </div>
      `;
      return;
    }

    this.dom.impactEvidenceList.innerHTML = docs.map(d => `
      <div class="evidence-item-card">
        <div class="evidence-card-top">
          <strong class="evidence-title">${d.title}</strong>
          <span class="report-badge ${d.status === 'verified' ? 'verified' : 'reported'} small">${d.status === 'verified' ? '✓ Audited' : 'Organisation-reported'}</span>
        </div>
        <div class="evidence-meta-row">
          <span>📄 ${d.fileName}</span>
          <span>•</span>
          <span>${d.fileSize}</span>
          <span>•</span>
          <span>Uploaded ${d.uploadDate}</span>
        </div>
        <p style="font-size: 11px; line-height: 16px; color: var(--color-text-muted); margin-bottom: 8px;">
          ${d.description}
        </p>
        <div class="evidence-card-bottom">
          <span class="checksum-tag" title="Cryptographic SHA-256 Hash">${d.checksum}</span>
          <button type="button" class="btn-file-action" onclick="PawBridgeApp.previewEvidenceDoc('${d.id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>View Proof</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  previewEvidenceDoc(docId) {
    const doc = PawBridgeStore.impactState.evidenceDocs.find(d => d.id === docId);
    if (doc) {
      alert(`[Verifiable Evidence Proof]\n\nDocument: ${doc.title}\nCategory: ${doc.categoryLabel}\nFile: ${doc.fileName} (${doc.fileSize})\nUpload Date: ${doc.uploadDate} by ${doc.uploadedBy}\nCryptographic Checksum: ${doc.checksum}\n\nStatus: ${doc.status === 'verified' ? 'Verified by External Statutory Auditor' : 'Self-Reported by Shelter Administration (Pending Desk Scrutiny)'}\n\nScope: ${doc.description}`);
    }
  },

  renderRevisionHistory() {
    if (!this.dom.impactRevisionHistory) return;

    const period = PawBridgeStore.impactState.periods.find(p => p.id === PawBridgeStore.impactState.activePeriodId) || PawBridgeStore.impactState.periods[0];
    const history = period.revisionHistory || [];

    if (history.length === 0) {
      this.dom.impactRevisionHistory.innerHTML = `
        <div style="font-size: 12px; color: var(--color-text-muted); padding: 8px 0;">No revisions recorded for this period.</div>
      `;
      return;
    }

    this.dom.impactRevisionHistory.innerHTML = history.map(item => `
      <div class="revision-history-item">
        <div class="rev-date-user">
          <strong>${item.user}</strong>
          <span>${item.date}</span>
        </div>
        <div class="rev-note">${item.note}</div>
      </div>
    `).join('');
  },

  // Edit Figures Modal
  openEditFiguresModal() {
    const period = PawBridgeStore.impactState.periods.find(p => p.id === PawBridgeStore.impactState.activePeriodId);
    if (!period) return;

    if (this.dom.editFiguresActivePeriodName) this.dom.editFiguresActivePeriodName.textContent = period.title;
    if (this.dom.editFiguresActiveStatus) {
      this.dom.editFiguresActiveStatus.textContent = period.status === 'verified' ? '✓ Audited & Verified' : 'Organisation-Reported';
      this.dom.editFiguresActiveStatus.className = `report-badge ${period.status === 'verified' ? 'verified' : 'reported'}`;
    }

    if (this.dom.editFigRescued) this.dom.editFigRescued.value = period.figures.rescued;
    if (this.dom.editFigTreated) this.dom.editFigTreated.value = period.figures.treated;
    if (this.dom.editFigRehabbed) this.dom.editFigRehabbed.value = period.figures.rehabilitated;
    if (this.dom.editFigAdopted) this.dom.editFigAdopted.value = period.figures.adopted;
    if (this.dom.editFigAbc) this.dom.editFigAbc.value = period.figures.abcSterilized;
    if (this.dom.editFigReleased) this.dom.editFigReleased.value = period.figures.communityReleased;

    if (this.dom.modalEditFigures) {
      this.dom.modalEditFigures.classList.add('active');
    }
  },

  closeEditFiguresModal() {
    if (this.dom.modalEditFigures) {
      this.dom.modalEditFigures.classList.remove('active');
    }
  },

  savePeriodFigures() {
    const period = PawBridgeStore.impactState.periods.find(p => p.id === PawBridgeStore.impactState.activePeriodId);
    if (!period) return;

    const rescued = parseInt(this.dom.editFigRescued?.value || period.figures.rescued, 10);
    const treated = parseInt(this.dom.editFigTreated?.value || period.figures.treated, 10);
    const rehabbed = parseInt(this.dom.editFigRehabbed?.value || period.figures.rehabilitated, 10);
    const adopted = parseInt(this.dom.editFigAdopted?.value || period.figures.adopted, 10);
    const abc = parseInt(this.dom.editFigAbc?.value || period.figures.abcSterilized, 10);
    const released = parseInt(this.dom.editFigReleased?.value || period.figures.communityReleased, 10);
    const reasonPreset = this.dom.editFigReasonPreset?.value || 'Administrative figure revision';
    const notes = this.dom.editFigNotes?.value.trim() || '';

    // Update numbers
    period.figures.rescued = rescued;
    period.figures.treated = treated;
    period.figures.rehabilitated = rehabbed;
    period.figures.adopted = adopted;
    period.figures.abcSterilized = abc;
    period.figures.communityReleased = released;

    // Label as organisation-reported (unverified until audit)
    period.status = 'reported';
    period.statusLabel = 'Organisation-Reported (Revised)';
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    period.lastUpdated = `${todayStr} by Dr. Ananya Sharma`;

    // Append to revision history
    const logNote = notes ? `${reasonPreset} (${notes})` : reasonPreset;
    period.revisionHistory.unshift({
      date: todayStr,
      user: 'Dr. Ananya Sharma (Lead Vet)',
      note: `Revised counts: ${rescued} Rescued, ${treated} Treated, ${rehabbed} Rehabbed, ${adopted} Adopted. Reason: ${logNote}`
    });

    this.closeEditFiguresModal();
    this.renderImpactScreen();
    this.showToast(`✓ Figures updated for ${period.title} & logged in audit history`, 'success');
  },

  // Add Reporting Period Modal
  openAddPeriodModal() {
    if (this.dom.modalAddPeriod) {
      this.dom.modalAddPeriod.classList.add('active');
    }
  },

  closeAddPeriodModal() {
    if (this.dom.modalAddPeriod) {
      this.dom.modalAddPeriod.classList.remove('active');
    }
  },

  saveNewReportingPeriod() {
    const title = document.getElementById('new-period-title')?.value.trim() || 'New Reporting Cycle';
    const type = document.getElementById('new-period-type')?.value || 'quarterly';
    const start = document.getElementById('new-period-start')?.value || '2027-01-01';
    const end = document.getElementById('new-period-end')?.value || '2027-03-31';
    const rescued = parseInt(document.getElementById('new-period-rescued')?.value || 0, 10);
    const treated = parseInt(document.getElementById('new-period-treated')?.value || 0, 10);
    const rehabbed = parseInt(document.getElementById('new-period-rehabbed')?.value || 0, 10);
    const adopted = parseInt(document.getElementById('new-period-adopted')?.value || 0, 10);
    const notes = document.getElementById('new-period-notes')?.value.trim() || 'Initial period baseline setup';

    const newPeriodId = `period-${Date.now()}`;
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newPeriod = {
      id: newPeriodId,
      title,
      type,
      dateRange: `${start} – ${end}`,
      startDate: start,
      endDate: end,
      status: 'reported',
      statusLabel: 'Organisation-Reported (Unverified)',
      auditNote: 'Audit Scrutiny: Self-reported shelter intake • Third-party desk scrutiny active',
      figures: {
        rescued,
        treated,
        rehabilitated: rehabbed,
        adopted,
        abcSterilized: Math.round(rescued * 0.4),
        communityReleased: Math.round(rehabbed * 0.7),
        mortalityRate: '2.5%'
      },
      breakdowns: {
        rescued: `${Math.round(rescued * 0.85)} Street Indies • ${Math.round(rescued * 0.15)} Abandoned Breeds`,
        treated: `${Math.round(treated * 0.3)} Ortho • ${Math.round(treated * 0.45)} OPD • ${Math.round(treated * 0.25)} ABC`,
        rehabbed: 'Avg Stay: 21 Days • Protocol Compliant',
        adopted: `${Math.round(adopted * 0.9)} Family Homes • ${Math.round(adopted * 0.1)} Sanctuary`
      },
      lastUpdated: `${todayStr} by Shelter Administration`,
      revisionHistory: [
        { date: todayStr, user: 'Dr. Ananya Sharma', note: `Created reporting period with initial counts. Methodology: ${notes}` }
      ]
    };

    PawBridgeStore.impactState.periods.push(newPeriod);
    PawBridgeStore.impactState.activePeriodId = newPeriodId;

    this.closeAddPeriodModal();
    if (this.dom.formAddPeriod) this.dom.formAddPeriod.reset();
    this.renderImpactScreen();
    this.showToast(`🎉 Reporting period "${title}" created and activated!`, 'success');
  },

  // Upload Evidence Modal
  openUploadEvidenceModal() {
    this.renderImpactPeriodSelect();
    if (this.dom.evidenceUploadProgressWrap) {
      this.dom.evidenceUploadProgressWrap.style.display = 'none';
    }
    if (this.dom.dropzoneFileName) {
      this.dom.dropzoneFileName.textContent = 'Click to browse or drop file here';
    }
    if (this.dom.modalUploadEvidence) {
      this.dom.modalUploadEvidence.classList.add('active');
    }
  },

  closeUploadEvidenceModal() {
    if (this.dom.modalUploadEvidence) {
      this.dom.modalUploadEvidence.classList.remove('active');
    }
  },

  saveEvidenceUpload() {
    const title = this.dom.evidenceDocTitle?.value.trim() || 'Verifiable Intake Proof';
    const category = this.dom.evidenceCategorySelect?.value || 'veterinary';
    const periodId = this.dom.evidencePeriodSelect?.value || PawBridgeStore.impactState.activePeriodId;
    const desc = this.dom.evidenceDocDesc?.value.trim() || 'Attested clinical case logs and registration registers.';
    const file = this.dom.evidenceFileInput?.files[0];
    const fileName = file ? file.name : `evidence_log_${Date.now().toString().slice(-4)}.pdf`;
    const fileSize = file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '3.6 MB';

    const categoryLabels = {
      veterinary: 'Veterinary Clinical Register',
      sterilization: 'AWBI ABC Sterilization Certificate',
      adoption: 'Adoption Legal Deed',
      audit: 'Independent Statutory Audit Report',
      panchnama: 'Ambulance SOS & Panchnama Log'
    };

    const hashSample = `SHA-256: ${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newDoc = {
      id: `ev-${Date.now()}`,
      title,
      periodId,
      category,
      categoryLabel: categoryLabels[category] || 'Supporting Evidence',
      fileName,
      fileSize,
      uploadDate: todayStr,
      uploadedBy: 'Dr. Ananya Sharma (Lead Vet)',
      status: 'reported',
      statusLabel: 'Organisation-Reported (Pending Audit)',
      checksum: hashSample,
      description: desc
    };

    PawBridgeStore.impactState.evidenceDocs.unshift(newDoc);

    this.closeUploadEvidenceModal();
    if (this.dom.formUploadEvidence) this.dom.formUploadEvidence.reset();
    this.renderEvidenceDocs();
    this.showToast(`✓ Document "${title}" uploaded & sealed with cryptographic checksum`, 'success');
  },

  // Add Impact Story Modal
  openAddImpactStoryModal() {
    if (this.dom.modalAddImpactStory) {
      this.dom.modalAddImpactStory.classList.add('active');
    }
  },

  closeAddImpactStoryModal() {
    if (this.dom.modalAddImpactStory) {
      this.dom.modalAddImpactStory.classList.remove('active');
    }
  },

  saveNewImpactStory() {
    const title = document.getElementById('impact-story-title')?.value.trim() || 'New Milestone Handover';
    const category = document.getElementById('impact-story-category')?.value || 'Orthopedic Rehabilitation';
    const dateInput = document.getElementById('impact-story-date')?.value || '2026-10-28';
    const metrics = document.getElementById('impact-story-metrics')?.value.trim() || '1 Life Saved • Healed';
    const photo = document.getElementById('impact-story-photo')?.value.trim() || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80';
    const summary = document.getElementById('impact-story-summary')?.value.trim() || 'Successful rehabilitation outcome delivered under PawBridge clinical protocol.';

    const formattedDate = new Date(dateInput).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newStory = {
      id: `iu-${Date.now()}`,
      title,
      date: formattedDate,
      category,
      summary,
      photo,
      metrics
    };

    PawBridgeStore.impactState.impactUpdates.unshift(newStory);

    this.closeAddImpactStoryModal();
    if (this.dom.formAddImpactStory) this.dom.formAddImpactStory.reset();
    this.renderImpactUpdates();
    this.showToast(`✓ Impact update "${title}" published to public feed`, 'success');
  },

  // ============================================================
  // SCREEN 10: SUPPORT & AID REQUISITIONS CONTROLLER
  // ============================================================
  renderSupportRequests() {
    if (!this.dom.requestsCardsGrid) return;

    const allRequests = PawBridgeStore.supportRequests || [];
    const activeTab = PawBridgeStore.requestTab || 'all';
    const activeCategory = PawBridgeStore.requestCategory || 'all';
    const activeUrgency = PawBridgeStore.requestUrgency || 'all';
    const query = PawBridgeStore.requestSearchQuery || '';

    // Update Counts
    const countAll = allRequests.length;
    const countActive = allRequests.filter(r => r.status === 'active').length;
    const countFulfilled = allRequests.filter(r => r.status === 'fulfilled').length;
    const countClosed = allRequests.filter(r => r.status === 'closed').length;

    if (this.dom.reqTabCountAll) this.dom.reqTabCountAll.textContent = countAll;
    if (this.dom.reqTabCountActive) this.dom.reqTabCountActive.textContent = countActive;
    if (this.dom.reqTabCountFulfilled) this.dom.reqTabCountFulfilled.textContent = countFulfilled;
    if (this.dom.reqTabCountClosed) this.dom.reqTabCountClosed.textContent = countClosed;

    if (this.dom.statActiveRequestsCount) this.dom.statActiveRequestsCount.textContent = countActive;
    if (this.dom.statFulfilledRequestsCount) this.dom.statFulfilledRequestsCount.textContent = countFulfilled;
    if (this.dom.navCountRequests) this.dom.navCountRequests.textContent = `${countActive} Active`;

    // Filter Items
    let filtered = allRequests.filter(r => {
      // Status Tab filter
      if (activeTab === 'active' && r.status !== 'active') return false;
      if (activeTab === 'fulfilled' && r.status !== 'fulfilled') return false;
      if (activeTab === 'closed' && r.status !== 'closed') return false;

      // Category filter
      if (activeCategory !== 'all' && r.category !== activeCategory) return false;

      // Urgency filter
      if (activeUrgency !== 'all' && r.urgency !== activeUrgency) return false;

      // Search query
      if (query) {
        const matchTitle = r.title.toLowerCase().includes(query);
        const matchDesc = r.description.toLowerCase().includes(query);
        const matchLinked = r.linkedCase && r.linkedCase.toLowerCase().includes(query);
        const matchAuthor = r.author.toLowerCase().includes(query);
        const matchTarget = r.targetDisplay.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchLinked || matchAuthor || matchTarget;
      }

      return true;
    });

    if (filtered.length === 0) {
      this.dom.requestsCardsGrid.style.display = 'none';
      if (this.dom.requestsEmptyState) this.dom.requestsEmptyState.style.display = 'flex';
      return;
    }

    this.dom.requestsCardsGrid.style.display = 'flex';
    if (this.dom.requestsEmptyState) this.dom.requestsEmptyState.style.display = 'none';

    this.dom.requestsCardsGrid.innerHTML = filtered.map(r => this.generateRequestCard(r)).join('');
  },

  generateRequestCard(r) {
    const isFulfilled = r.status === 'fulfilled';
    const isClosed = r.status === 'closed';
    const isActive = r.status === 'active';

    // Status pill
    let statusPillHtml = '';
    if (isActive) {
      statusPillHtml = `<span class="status-pill active"><span class="status-live-pulse" style="width:6px; height:6px;"></span> Active Aid Request</span>`;
    } else if (isFulfilled) {
      statusPillHtml = `<span class="status-pill fulfilled">✓ Fulfilled & Verified</span>`;
    } else {
      statusPillHtml = `<span class="status-pill closed">Closed / Archived</span>`;
    }

    // Urgency pill
    const urgencyLabels = {
      critical: '🚨 Critical / Emergency (< 48h)',
      high: '⚡ High Priority (< 7 Days)',
      routine: '📋 Routine Operational Need'
    };
    const urgencyHtml = `<span class="urgency-pill ${r.urgency}">${urgencyLabels[r.urgency] || r.urgency}</span>`;

    // Category tag
    const categoryHtml = `<span class="category-tag ${r.category}">${r.categoryIcon} ${r.categoryLabel}</span>`;

    // Deadline pill
    let deadlineHtml = '';
    if (isFulfilled) {
      deadlineHtml = `<span class="deadline-pill" style="color: #2E6B28; background: #F3F7F0; border-color: #C8DEC2;">✓ Fulfilled on ${r.fulfillment?.date || r.deadline}</span>`;
    } else if (isClosed) {
      deadlineHtml = `<span class="deadline-pill">Closed ${r.deadline}</span>`;
    } else {
      deadlineHtml = `<span class="deadline-pill ${r.isUrgentDeadline ? 'urgent' : ''}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${r.deadlineDisplay}</span>`;
    }

    // Progress bar percent
    const percentClamped = Math.min(100, Math.max(0, r.percent || 0));

    // Supporting docs pills
    const docsHtml = (r.documents && r.documents.length > 0)
      ? r.documents.map(d => `
          <button type="button" class="doc-pill-chip" onclick="PawBridgeApp.viewRequestDocument('${d.name}', '${r.id}')" title="Click to view verified proof document and cryptographic seal">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            <span>${d.name} (${d.size})</span>
          </button>
        `).join('')
      : '<span style="font-size: 11px; color: var(--color-text-subtle);">Direct shelter requisition (No external quote required)</span>';

    // Fulfillment Stamp Banner
    let fulfillmentBannerHtml = '';
    if (isFulfilled && r.fulfillment) {
      fulfillmentBannerHtml = `
        <div class="fulfillment-stamp-banner">
          <div class="fulfillment-stamp-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Goods Inward Verified: Sponsored by ${r.fulfillment.sponsor} • Disbursed to: ${r.fulfillment.allocation}</span>
          </div>
          <span class="fulfillment-receipt-tag">${r.fulfillment.receiptNo}</span>
        </div>
      `;
    }

    // Actions
    let actionButtonsHtml = '';
    if (isActive) {
      actionButtonsHtml = `
        <button type="button" class="btn-secondary-cream" style="font-size: 12px; padding: 6px 12px;" onclick="PawBridgeApp.openEditRequestModal('${r.id}')" title="Edit figures, deadline, or description">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Edit</span>
        </button>
        <button type="button" class="btn-secondary-cream" style="font-size: 12px; padding: 6px 12px;" onclick="PawBridgeApp.openContributeAidModal('${r.id}')" title="Record donor aid, kibble delivery, or volunteer confirmation">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>Record Aid</span>
        </button>
        <button type="button" class="btn-primary-olive" style="font-size: 12px; padding: 6px 14px;" onclick="PawBridgeApp.openMarkFulfilledModal('${r.id}')" title="Record receipt & mark fulfilled">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Mark as Fulfilled</span>
        </button>
      `;
    } else if (isFulfilled) {
      actionButtonsHtml = `
        <button type="button" class="btn-secondary-cream" style="font-size: 12px; padding: 6px 12px;" onclick="PawBridgeApp.viewTransparencyReceipt('${r.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>View Inward Receipt</span>
        </button>
        <button type="button" class="btn-secondary-cream" style="font-size: 12px; padding: 6px 12px;" onclick="PawBridgeApp.openEditRequestModal('${r.id}')">
          <span>Edit Notes</span>
        </button>
      `;
    } else {
      actionButtonsHtml = `
        <button type="button" class="btn-secondary-cream" style="font-size: 12px; padding: 6px 12px;" onclick="PawBridgeApp.reopenSupportRequest('${r.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1" 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          <span>Re-Open Requisition</span>
        </button>
      `;
    }

    return `
      <div class="request-card ${isFulfilled ? 'fulfilled' : ''} ${isClosed ? 'closed' : ''}" id="card-${r.id}">
        <!-- Top Badges Row -->
        <div class="request-card-top">
          <div class="request-badges-left">
            ${categoryHtml}
            ${urgencyHtml}
            ${statusPillHtml}
          </div>
          <div class="request-badges-right">
            ${deadlineHtml}
          </div>
        </div>

        <!-- Main Body -->
        <div class="request-card-body">
          <div class="request-photo-thumb">
            <img src="${r.photo}" alt="${r.title}" loading="lazy" />
          </div>

          <div class="request-main-content">
            <div class="request-title-row">
              <h3 class="request-title">${r.title}</h3>
              ${r.linkedCase ? `<span class="patient-case-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>${r.linkedCase}</span>` : ''}
            </div>

            <p class="request-desc">${r.description}</p>

            <!-- Target & Progress Strip -->
            <div class="request-target-strip">
              <div class="target-header-line">
                <span class="target-val-label">
                  <strong>Target:</strong> ${r.targetDisplay}
                </span>
                <span class="target-percent-badge">
                  ${r.progressDisplay} (${percentClamped}%)
                </span>
              </div>
              <div class="request-progress-bar">
                <div class="request-progress-fill ${percentClamped >= 100 ? 'full' : ''}" style="width: ${percentClamped}%;"></div>
              </div>
            </div>

            <!-- Supporting Documents -->
            <div class="supporting-docs-row">
              <span class="supporting-docs-label">Supporting Evidence:</span>
              ${docsHtml}
            </div>

            ${fulfillmentBannerHtml}
          </div>
        </div>

        <!-- Footer Actions Row -->
        <div class="request-card-footer">
          <div class="request-footer-left">
            <span>Posted: <strong>${r.createdDate}</strong></span>
            <span>•</span>
            <span>Requested by: <strong>${r.author}</strong></span>
          </div>
          <div class="request-footer-actions">
            ${actionButtonsHtml}
          </div>
        </div>
      </div>
    `;
  },

  resetRequestsFilters() {
    PawBridgeStore.requestTab = 'all';
    PawBridgeStore.requestCategory = 'all';
    PawBridgeStore.requestUrgency = 'all';
    PawBridgeStore.requestSearchQuery = '';

    if (this.dom.requestsSearchInput) this.dom.requestsSearchInput.value = '';
    if (this.dom.requestsFilterCategory) this.dom.requestsFilterCategory.value = 'all';
    if (this.dom.requestsFilterUrgency) this.dom.requestsFilterUrgency.value = 'all';

    if (this.dom.requestsStatusTabsRow) {
      this.dom.requestsStatusTabsRow.querySelectorAll('.req-tab-chip').forEach(t => t.classList.remove('active'));
      const allTab = this.dom.requestsStatusTabsRow.querySelector('[data-tab="all"]');
      if (allTab) allTab.classList.add('active');
    }

    this.renderSupportRequests();
    this.showToast('Reset all support request filters', 'success');
  },

  exportRequestsCsv() {
    const list = PawBridgeStore.supportRequests || [];
    const headers = ['Request ID', 'Title', 'Category', 'Urgency', 'Status', 'Target Goal', 'Progress Amount', 'Percent Fulfilled', 'Deadline', 'Linked Patient/Ward', 'Author', 'Created Date'];
    const rows = list.map(r => [
      `"${r.id}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.categoryLabel}"`,
      `"${r.urgency}"`,
      `"${r.status}"`,
      `"${r.targetDisplay.replace(/"/g, '""')}"`,
      `"${r.currentVal}"`,
      `"${r.percent}%"`,
      `"${r.deadline}"`,
      `"${(r.linkedCase || '').replace(/"/g, '""')}"`,
      `"${r.author}"`,
      `"${r.createdDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PawBridge_Support_Requisitions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Downloaded support requisitions CSV ledger', 'success');
  },

  // Create Request Modal Handlers
  openCreateRequestModal() {
    if (this.dom.modalCreateRequest) {
      this.dom.modalCreateRequest.classList.add('active');
    }
  },

  closeCreateRequestModal() {
    if (this.dom.modalCreateRequest) {
      this.dom.modalCreateRequest.classList.remove('active');
    }
  },

  saveDraftSupportRequest() {
    const title = document.getElementById('new-req-title')?.value.trim();
    if (!title) {
      this.showToast('Please enter at least a title to save a draft requisition', 'alert');
      return;
    }
    this.closeCreateRequestModal();
    this.showToast(`Draft requisition "${title}" saved to local shelter storage`, 'success');
  },

  saveNewSupportRequest() {
    const title = document.getElementById('new-req-title')?.value.trim();
    const category = document.getElementById('new-req-category')?.value || 'funding';
    const urgency = document.getElementById('new-req-urgency')?.value || 'critical';
    const targetLabel = document.getElementById('new-req-target-label')?.value.trim() || '₹50,000';
    const deadline = document.getElementById('new-req-deadline')?.value || '2026-11-05';
    const linkedCase = document.getElementById('new-req-linked-case')?.value.trim() || 'General Shelter Hospital';
    const attendingVet = document.getElementById('new-req-attending-vet')?.value.trim() || 'Dr. Ananya Sharma';
    const desc = document.getElementById('new-req-desc')?.value.trim() || 'Shelter clinical support requirement.';
    const photo = document.getElementById('new-req-photo')?.value.trim() || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80';
    const docName = document.getElementById('new-req-doc')?.value.trim() || 'Clinical_Requisition_Order.pdf';

    const categoryMeta = {
      funding: { label: 'Funding & Surgery Grants', icon: '💰' },
      food: { label: 'Dog Food & Nutrition', icon: '🥣' },
      medicines: { label: 'Medicines & Consumables', icon: '💊' },
      equipment: { label: 'Medical Equipment', icon: '🔬' },
      transport: { label: 'Patient Transport & Fleet', icon: '🚐' },
      volunteers: { label: 'Volunteers & Manpower', icon: '🤝' },
      foster: { label: 'Medical Foster Support', icon: '🏡' }
    };

    const newId = `REQ-${100 + PawBridgeStore.supportRequests.length + 1}`;
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedDeadline = new Date(deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newReq = {
      id: newId,
      title,
      category,
      categoryLabel: categoryMeta[category].label,
      categoryIcon: categoryMeta[category].icon,
      urgency,
      urgencyLabel: urgency === 'critical' ? 'Critical / Emergency (< 48h)' : (urgency === 'high' ? 'High Priority (< 7 Days)' : 'Routine Operational Need'),
      status: 'active',
      statusLabel: 'Active Requisition',
      targetVal: 100,
      currentVal: 0,
      targetDisplay: targetLabel,
      progressDisplay: `0 of ${targetLabel} pledged`,
      percent: 0,
      unit: '',
      deadline,
      deadlineDisplay: `${formattedDeadline} (Active)`,
      isUrgentDeadline: urgency === 'critical',
      linkedCase,
      author: attendingVet,
      createdDate: todayStr,
      description: desc,
      photo,
      documents: [
        { name: docName, size: '1.4 MB', authority: attendingVet, hash: `SHA256: ${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}` }
      ],
      fulfillment: null
    };

    PawBridgeStore.supportRequests.unshift(newReq);

    this.closeCreateRequestModal();
    if (this.dom.formCreateRequest) this.dom.formCreateRequest.reset();
    this.renderSupportRequests();
    this.showToast(`🎉 Support request "${title}" published successfully!`, 'success');
  },

  // Edit Request Modal Handlers
  openEditRequestModal(requestId) {
    const r = PawBridgeStore.supportRequests.find(item => item.id === requestId);
    if (!r) return;

    PawBridgeStore.selectedRequestId = requestId;

    if (this.dom.editReqId) this.dom.editReqId.value = r.id;
    if (this.dom.editReqTitle) this.dom.editReqTitle.value = r.title;
    if (this.dom.editReqCategory) this.dom.editReqCategory.value = r.category;
    if (this.dom.editReqUrgency) this.dom.editReqUrgency.value = r.urgency;
    if (this.dom.editReqTargetLabel) this.dom.editReqTargetLabel.value = r.targetDisplay;
    if (this.dom.editReqDeadline) this.dom.editReqDeadline.value = r.deadline;
    if (this.dom.editReqDesc) this.dom.editReqDesc.value = r.description;

    if (this.dom.modalEditRequest) {
      this.dom.modalEditRequest.classList.add('active');
    }
  },

  closeEditRequestModal() {
    if (this.dom.modalEditRequest) {
      this.dom.modalEditRequest.classList.remove('active');
    }
  },

  saveEditedSupportRequest() {
    const id = this.dom.editReqId?.value || PawBridgeStore.selectedRequestId;
    const r = PawBridgeStore.supportRequests.find(item => item.id === id);
    if (!r) return;

    r.title = this.dom.editReqTitle?.value.trim() || r.title;
    r.category = this.dom.editReqCategory?.value || r.category;
    r.urgency = this.dom.editReqUrgency?.value || r.urgency;
    r.targetDisplay = this.dom.editReqTargetLabel?.value.trim() || r.targetDisplay;
    r.deadline = this.dom.editReqDeadline?.value || r.deadline;
    r.description = this.dom.editReqDesc?.value.trim() || r.description;

    const formattedDeadline = new Date(r.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    r.deadlineDisplay = `${formattedDeadline}`;

    this.closeEditRequestModal();
    this.renderSupportRequests();
    this.showToast(`✓ Requisition "${r.title}" updated`, 'success');
  },

  // Mark Fulfilled Modal Handlers
  openMarkFulfilledModal(requestId) {
    const r = PawBridgeStore.supportRequests.find(item => item.id === requestId);
    if (!r) return;

    PawBridgeStore.selectedRequestId = requestId;

    if (this.dom.fulfillReqId) this.dom.fulfillReqId.value = r.id;
    if (this.dom.fulfillReqTitleDisplay) this.dom.fulfillReqTitleDisplay.textContent = r.title;
    if (this.dom.fulfillReqTargetDisplay) this.dom.fulfillReqTargetDisplay.textContent = `Target: ${r.targetDisplay}`;
    if (this.dom.fulfillFinalVal) this.dom.fulfillFinalVal.value = r.targetDisplay;
    if (this.dom.fulfillDate) this.dom.fulfillDate.value = new Date().toISOString().slice(0, 10);
    if (this.dom.fulfillReceiptNo) this.dom.fulfillReceiptNo.value = `GIN-${new Date().getFullYear()}-${Math.floor(Math.random() * 800 + 100)}`;

    if (this.dom.modalMarkFulfilled) {
      this.dom.modalMarkFulfilled.classList.add('active');
    }
  },

  closeMarkFulfilledModal() {
    if (this.dom.modalMarkFulfilled) {
      this.dom.modalMarkFulfilled.classList.remove('active');
    }
  },

  confirmMarkFulfilled() {
    const id = this.dom.fulfillReqId?.value || PawBridgeStore.selectedRequestId;
    const r = PawBridgeStore.supportRequests.find(item => item.id === id);
    if (!r) return;

    const sponsor = this.dom.fulfillSponsor?.value.trim() || 'Verified Aid Partner';
    const dateInput = this.dom.fulfillDate?.value || new Date().toISOString().slice(0, 10);
    const receiptNo = this.dom.fulfillReceiptNo?.value.trim() || 'GIN-2026-885';
    const finalVal = this.dom.fulfillFinalVal?.value.trim() || r.targetDisplay;
    const allocation = this.dom.fulfillAllocation?.value.trim() || 'Allocated to Shelter Animal Care';
    const notes = this.dom.fulfillNotes?.value.trim() || 'Goods Inward inspected and verified in full.';

    const formattedDate = new Date(dateInput).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    r.status = 'fulfilled';
    r.statusLabel = 'Fulfilled & Sealed';
    r.percent = 100;
    r.progressDisplay = `${finalVal} (100% Fulfilled)`;
    r.fulfillment = {
      sponsor,
      date: formattedDate,
      receiptNo,
      deliveredVal: finalVal,
      allocation,
      notes
    };

    this.closeMarkFulfilledModal();
    this.renderSupportRequests();
    this.showToast(`🎉 Requisition "${r.title}" marked as FULFILLED! Receipt ${receiptNo} logged.`, 'success');
  },

  // Contribute Aid Modal Handlers
  openContributeAidModal(requestId) {
    const r = PawBridgeStore.supportRequests.find(item => item.id === requestId);
    if (!r) return;

    PawBridgeStore.selectedRequestId = requestId;

    if (this.dom.pledgeReqId) this.dom.pledgeReqId.value = r.id;
    if (this.dom.pledgeReqTitleDisplay) this.dom.pledgeReqTitleDisplay.textContent = r.title;
    if (this.dom.pledgeReqCurrentDisplay) this.dom.pledgeReqCurrentDisplay.textContent = `Current Progress: ${r.progressDisplay} (${r.percent}%)`;

    if (this.dom.modalContributeAid) {
      this.dom.modalContributeAid.classList.add('active');
    }
  },

  closeContributeAidModal() {
    if (this.dom.modalContributeAid) {
      this.dom.modalContributeAid.classList.remove('active');
    }
  },

  submitContributeAid() {
    const id = this.dom.pledgeReqId?.value || PawBridgeStore.selectedRequestId;
    const r = PawBridgeStore.supportRequests.find(item => item.id === id);
    if (!r) return;

    const donor = this.dom.pledgeContributor?.value.trim() || 'Community Benefactor';
    const amountVal = parseInt(this.dom.pledgeAmountVal?.value || 0, 10);

    if (amountVal <= 0) {
      this.showToast('Please enter a positive pledge amount or quantity', 'alert');
      return;
    }

    r.currentVal = (r.currentVal || 0) + amountVal;
    if (r.targetVal > 0) {
      r.percent = Math.min(100, Math.round((r.currentVal / r.targetVal) * 100));
    } else {
      r.percent = Math.min(100, (r.percent || 0) + 20);
    }

    if (r.unit === '₹') {
      r.progressDisplay = `₹${r.currentVal.toLocaleString()} raised of ₹${r.targetVal.toLocaleString()}`;
    } else if (r.unit) {
      r.progressDisplay = `${r.currentVal} ${r.unit} received of ${r.targetVal} ${r.unit}`;
    } else {
      r.progressDisplay = `${r.percent}% fulfilled`;
    }

    this.closeContributeAidModal();
    if (this.dom.formContributeAid) this.dom.formContributeAid.reset();

    // Check if target reached
    if (r.percent >= 100) {
      this.renderSupportRequests();
      this.showToast(`🎯 Goal reached 100% for "${r.title}"! Please verify receipt.`, 'success');
      setTimeout(() => this.openMarkFulfilledModal(r.id), 400);
    } else {
      this.renderSupportRequests();
      this.showToast(`✓ Aid contribution of ${amountVal} recorded from ${donor}`, 'success');
    }
  },

  viewRequestDocument(docName, reqId) {
    const r = PawBridgeStore.supportRequests.find(item => item.id === reqId);
    const doc = r ? (r.documents || []).find(d => d.name === docName) : null;

    if (!doc || !this.dom.viewDocModalBody) return;

    this.dom.viewDocModalBody.innerHTML = `
      <div style="background: #FAF8F2; border: 1px solid var(--color-border); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div>
            <span class="label-13 uppercase" style="color: var(--color-text-subtle);">Verified Document</span>
            <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--color-text-dark); margin-top: 2px;">${doc.name}</h4>
          </div>
          <span class="report-badge verified">✓ Verified Authenticity</span>
        </div>
        <div style="font-size: 12px; color: var(--color-text-muted); line-height: 18px;">
          <div><strong>Requisition:</strong> ${r ? r.title : 'Shelter Aid Request'}</div>
          <div><strong>Authority / Issuer:</strong> ${doc.authority}</div>
          <div><strong>File Size:</strong> ${doc.size}</div>
          <div><strong>Cryptographic Hash:</strong> <span style="font-family: monospace;">${doc.hash}</span></div>
        </div>
      </div>

      <div style="border: 1px dashed var(--color-border); border-radius: 8px; padding: 18px; text-align: center; background: #FFFFFF; font-size: 13px; color: var(--color-text-dark); line-height: 20px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color: var(--color-olive); margin-bottom: 8px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>
        <div><strong>Previewing Attested Verification Record</strong></div>
        <p style="font-size: 12px; color: var(--color-text-muted); margin-top: 4px;">
          This document verifies the clinical justification, supplier quotation, or veterinary dosage protocol. All disbursements are audit-locked and registered under Happy Tails Sanctuary Trust AWBI Compliance #DL-402.
        </p>
      </div>
    `;

    if (this.dom.modalViewRequestDoc) {
      this.dom.modalViewRequestDoc.classList.add('active');
    }
  },

  viewTransparencyReceipt(reqId) {
    const r = PawBridgeStore.supportRequests.find(item => item.id === reqId);
    if (!r || !r.fulfillment || !this.dom.viewDocModalBody) return;

    this.dom.viewDocModalBody.innerHTML = `
      <div style="background: #F3F7F0; border: 1px solid #C8DEC2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span class="label-13 uppercase" style="color: var(--color-olive-dark); font-weight: 700;">Statutory Goods Inward Note</span>
            <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--color-text-dark); margin-top: 2px;">${r.fulfillment.receiptNo}</h4>
          </div>
          <span class="report-badge verified">✓ 100% Fulfilled & Audited</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; color: var(--color-text-dark); line-height: 18px;">
          <div><strong>Sponsor / Donor:</strong> ${r.fulfillment.sponsor}</div>
          <div><strong>Date Received:</strong> ${r.fulfillment.date}</div>
          <div><strong>Delivered Value / Qty:</strong> ${r.fulfillment.deliveredVal}</div>
          <div><strong>Shelter Beneficiary:</strong> ${r.fulfillment.allocation}</div>
        </div>
      </div>

      <div style="background: #FAF8F2; border: 1px solid var(--color-border); border-radius: 8px; padding: 14px; font-size: 12px; line-height: 18px;">
        <strong>Audit Verification Note:</strong>
        <p style="color: var(--color-text-muted); margin-top: 4px;">${r.fulfillment.notes}</p>
        <div style="font-family: monospace; font-size: 11px; color: var(--color-text-subtle); margin-top: 8px;">
          Attestation Hash: SHA256: 9b10cc77fa00124b88e1009a
        </div>
      </div>
    `;

    if (this.dom.modalViewRequestDoc) {
      this.dom.modalViewRequestDoc.classList.add('active');
    }
  },

  reopenSupportRequest(reqId) {
    const r = PawBridgeStore.supportRequests.find(item => item.id === reqId);
    if (!r) return;

    r.status = 'active';
    r.statusLabel = 'Active Requisition';
    this.renderSupportRequests();
    this.showToast(`Re-opened requisition "${r.title}" to active status`, 'success');
  },

  closeViewDocModal() {
    if (this.dom.modalViewRequestDoc) {
      this.dom.modalViewRequestDoc.classList.remove('active');
    }
  },

  // ============================================================
  // PUBLIC NGO PROFILE CONTROLLER & TRUST ACTIONS
  // ============================================================
  bindPublicProfileEvents() {
    // Header & Hero CTA Buttons
    const btnPubOpenDonate = document.getElementById('btn-pub-open-donate');
    if (btnPubOpenDonate) btnPubOpenDonate.addEventListener('click', () => this.openPublicDonateModal());

    const btnHeroDonate = document.getElementById('btn-hero-donate');
    if (btnHeroDonate) btnHeroDonate.addEventListener('click', () => this.openPublicDonateModal());

    const btnPubOpenVolunteer = document.getElementById('btn-pub-open-volunteer');
    if (btnPubOpenVolunteer) btnPubOpenVolunteer.addEventListener('click', () => this.openPublicVolunteerModal());

    const btnHeroVolunteer = document.getElementById('btn-hero-volunteer');
    if (btnHeroVolunteer) btnHeroVolunteer.addEventListener('click', () => this.openPublicVolunteerModal());

    const btnPubOpenShare = document.getElementById('btn-pub-open-share');
    if (btnPubOpenShare) btnPubOpenShare.addEventListener('click', () => this.openPublicShareModal());

    const btnHeroShare = document.getElementById('btn-hero-share');
    if (btnHeroShare) btnHeroShare.addEventListener('click', () => this.openPublicShareModal());

    const btnPubOpenContact = document.getElementById('btn-pub-open-contact');
    if (btnPubOpenContact) {
      btnPubOpenContact.addEventListener('click', () => {
        const target = document.getElementById('pub-contact-section');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnHeroContact = document.getElementById('btn-hero-contact');
    if (btnHeroContact) {
      btnHeroContact.addEventListener('click', () => {
        const target = document.getElementById('pub-contact-section');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnContactInquiryCta = document.getElementById('btn-contact-inquiry-cta');
    if (btnContactInquiryCta) {
      btnContactInquiryCta.addEventListener('click', () => {
        const inp = document.getElementById('pub-quick-name');
        if (inp) inp.focus();
      });
    }

    const btnContactVolunteerCta = document.getElementById('btn-contact-volunteer-cta');
    if (btnContactVolunteerCta) {
      btnContactVolunteerCta.addEventListener('click', () => this.openPublicVolunteerModal());
    }

    const btnContactDirectionsCta = document.getElementById('btn-contact-directions-cta');
    if (btnContactDirectionsCta) {
      btnContactDirectionsCta.addEventListener('click', () => {
        this.showToast('📍 Campus Directions: Plot 12, Farm Road, Chhatarpur (Open Mon-Sat 10 AM - 5 PM by appointment)', 'success');
      });
    }

    const btnPubViewAllCases = document.getElementById('btn-pub-view-all-cases');
    if (btnPubViewAllCases) {
      btnPubViewAllCases.addEventListener('click', () => {
        this.switchAuthMode('app');
        this.navigateTo('rescues');
      });
    }

    // Donation Modal Events
    if (this.dom.btnClosePublicDonate) {
      this.dom.btnClosePublicDonate.addEventListener('click', () => this.closePublicDonateModal());
    }
    if (this.dom.btnCancelPublicDonate) {
      this.dom.btnCancelPublicDonate.addEventListener('click', () => this.closePublicDonateModal());
    }
    if (this.dom.formPublicDonate) {
      this.dom.formPublicDonate.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePublicDonateSubmit(e);
      });
    }

    // Donation Tiers Selector
    if (this.dom.donateTiersGrid) {
      this.dom.donateTiersGrid.addEventListener('click', (e) => {
        const chip = e.target.closest('.donate-tier-chip');
        if (!chip) return;
        const amt = chip.getAttribute('data-amount');
        if (this.dom.pubDonateAmount) this.dom.pubDonateAmount.value = amt;

        this.dom.donateTiersGrid.querySelectorAll('.donate-tier-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    }

    if (this.dom.pubDonateAmount) {
      this.dom.pubDonateAmount.addEventListener('input', (e) => {
        const val = e.target.value;
        if (this.dom.donateTiersGrid) {
          this.dom.donateTiersGrid.querySelectorAll('.donate-tier-chip').forEach(chip => {
            chip.classList.toggle('active', chip.getAttribute('data-amount') === val);
          });
        }
      });
    }

    // Volunteer Modal Events
    if (this.dom.btnClosePublicVolunteer) {
      this.dom.btnClosePublicVolunteer.addEventListener('click', () => this.closePublicVolunteerModal());
    }
    if (this.dom.btnCancelPublicVolunteer) {
      this.dom.btnCancelPublicVolunteer.addEventListener('click', () => this.closePublicVolunteerModal());
    }
    if (this.dom.formPublicVolunteer) {
      this.dom.formPublicVolunteer.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePublicVolunteerSubmit(e);
      });
    }

    // Share Modal Events
    if (this.dom.btnClosePublicShare) {
      this.dom.btnClosePublicShare.addEventListener('click', () => this.closePublicShareModal());
    }
    if (this.dom.btnDismissPublicShare) {
      this.dom.btnDismissPublicShare.addEventListener('click', () => this.closePublicShareModal());
    }
    if (this.dom.btnCopyShareUrl) {
      this.dom.btnCopyShareUrl.addEventListener('click', () => this.copyShareUrl());
    }

    const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
    if (btnShareWhatsapp) {
      btnShareWhatsapp.addEventListener('click', () => {
        const text = encodeURIComponent('Check out Happy Tails Animal Sanctuary on PawBridge Verified Registry: https://pawbridge.org/public/happy-tails-sanctuary');
        window.open(`https://wa.me/?text=${text}`, '_blank');
      });
    }

    const btnShareTwitter = document.getElementById('btn-share-twitter');
    if (btnShareTwitter) {
      btnShareTwitter.addEventListener('click', () => {
        const text = encodeURIComponent('Verified Animal Welfare Shelter: Happy Tails Sanctuary • Audited Impact & 80G Tax Relief on PawBridge:');
        const url = encodeURIComponent('https://pawbridge.org/public/happy-tails-sanctuary');
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
      });
    }

    const btnShareEmail = document.getElementById('btn-share-email');
    if (btnShareEmail) {
      btnShareEmail.addEventListener('click', () => {
        const sub = encodeURIComponent('Happy Tails Animal Sanctuary - PawBridge Verified Non-Profit');
        const body = encodeURIComponent('Inspect Happy Tails Animal Sanctuary verified credentials, hospital facilities, and emergency aid requisitions here: https://pawbridge.org/public/happy-tails-sanctuary');
        window.location.href = `mailto:?subject=${sub}&body=${body}`;
      });
    }

    const btnDownloadQr = document.getElementById('btn-download-qr-card');
    if (btnDownloadQr) {
      btnDownloadQr.addEventListener('click', () => {
        this.showToast('📥 Downloading high-resolution PawBridge Verified Trust Badge QR card (PDF)...', 'success');
        setTimeout(() => window.print(), 300);
      });
    }

    // Patient Case Journey Modal Events
    if (this.dom.btnCloseCaseJourney) {
      this.dom.btnCloseCaseJourney.addEventListener('click', () => this.closePublicCaseJourney());
    }
    if (this.dom.btnDismissCaseJourney) {
      this.dom.btnDismissCaseJourney.addEventListener('click', () => this.closePublicCaseJourney());
    }

    // Public Doc Inspector Modal Events
    if (this.dom.btnClosePubDoc) {
      this.dom.btnClosePubDoc.addEventListener('click', () => this.closePublicDocInspector());
    }
    if (this.dom.btnDismissPubDoc) {
      this.dom.btnDismissPubDoc.addEventListener('click', () => this.closePublicDocInspector());
    }

    // Quick Contact Form
    const formPubContact = document.getElementById('form-pub-quick-contact');
    if (formPubContact) {
      formPubContact.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePublicQuickContactSubmit(e);
      });
    }

    // Generic Confirm Modal Cancel
    if (this.dom.btnConfirmCancel) {
      this.dom.btnConfirmCancel.addEventListener('click', () => {
        if (this.dom.modalGenericConfirm) this.dom.modalGenericConfirm.classList.remove('active');
      });
    }

    // Public Nav Anchor Smooth Scroll
    const pubNavLinks = document.querySelectorAll('.pub-nav-link');
    pubNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            pubNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    });
  },

  renderPublicProfile() {
    const orgNameEl = document.getElementById('pub-org-name');
    if (orgNameEl) orgNameEl.textContent = PawBridgeStore.ngoInfo?.name || 'Happy Tails Animal Sanctuary';

    // Populate Live Support Needs
    const gridEl = document.getElementById('pub-needs-grid');
    if (!gridEl) return;

    const activeReqs = PawBridgeStore.supportRequests.filter(r => r.status === 'active');
    if (activeReqs.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; background: #FFFFFF; border: 1px dashed var(--color-border); border-radius: 10px; padding: 36px; text-align: center;">
          <div style="font-size: 28px; margin-bottom: 8px;">🎉</div>
          <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--color-text-dark); margin-bottom: 4px;">All Operational Requisitions Fulfilled</h4>
          <p style="font-size: 13px; color: var(--color-text-muted); margin: 0;">The shelter currently has zero unfulfilled critical deficits. You may still contribute general clinical emergency aid below.</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = activeReqs.map(r => `
      <div class="pub-need-card">
        <div class="pub-need-card-header">
          <div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span class="category-tag ${r.category}" style="font-size: 11px; padding: 2px 7px;">
                ${r.categoryIcon} ${r.categoryLabel}
              </span>
              <span class="urgency-pill ${r.urgency}" style="font-size: 10px; padding: 2px 6px;">
                ${r.urgency === 'critical' ? '🚨 Urgent < 48h' : r.urgency === 'high' ? '⚡ High' : 'Routine'}
              </span>
            </div>
            <h4 class="pub-need-title">${r.title}</h4>
            <span class="pub-need-linked-case">📍 Linked: ${r.linkedCase}</span>
          </div>
        </div>

        <div class="pub-need-body">
          <p class="pub-need-desc">${r.description}</p>
          
          <div class="pub-need-progress-wrap">
            <div class="pub-need-progress-label">
              <span>Progress: <strong>${r.progressDisplay}</strong></span>
              <span style="color: var(--color-olive-dark);">${r.percent}%</span>
            </div>
            <div class="request-progress-bar" style="height: 7px;">
              <div class="request-progress-fill" style="width: ${r.percent}%;"></div>
            </div>
          </div>

          <div style="font-size: 11px; color: var(--color-text-subtle); display: flex; align-items: center; gap: 4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Target Deadline: ${r.deadlineDisplay}</span>
          </div>
        </div>

        <div class="pub-need-footer">
          <button type="button" class="btn-cred-view" onclick="PawBridgeApp.viewRequestDocument('${r.documents?.[0]?.name || 'Vet_Prescription.pdf'}', '${r.id}')" title="Inspect clinical evidence">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Inspect Evidence</span>
          </button>

          <button type="button" class="btn-primary-olive" onclick="PawBridgeApp.openPublicDonateModal('${r.id}')" style="font-size: 12px; padding: 6px 14px; gap: 5px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>Contribute Aid</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  openPublicDonateModal(reqId = null) {
    PawBridgeStore.activePublicDonateReqId = reqId;

    const titleEl = document.getElementById('public-donate-title');
    if (reqId) {
      const r = PawBridgeStore.supportRequests.find(item => item.id === reqId);
      if (r && titleEl) {
        titleEl.textContent = `Contribute to ${r.linkedCase}`;
      }
    } else if (titleEl) {
      titleEl.textContent = 'Support Happy Tails Animal Sanctuary';
    }

    if (this.dom.modalPublicDonate) {
      this.dom.modalPublicDonate.classList.add('active');
      if (this.dom.pubDonateAmount) this.dom.pubDonateAmount.focus();
    }
  },

  closePublicDonateModal() {
    if (this.dom.modalPublicDonate) {
      this.dom.modalPublicDonate.classList.remove('active');
    }
    PawBridgeStore.activePublicDonateReqId = null;
  },

  handlePublicDonateSubmit(e) {
    const amtInput = document.getElementById('pub-donate-amount');
    const nameInput = document.getElementById('pub-donor-name');
    const emailInput = document.getElementById('pub-donor-email');
    const panInput = document.getElementById('pub-donor-pan');
    const submitBtn = document.getElementById('btn-submit-public-donate');

    const amt = parseInt(amtInput?.value, 10) || 0;
    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const pan = panInput?.value.trim().toUpperCase() || 'NOT_PROVIDED';

    if (amt < 100) {
      this.showToast('Please enter a minimum contribution of ₹100', 'alert');
      return;
    }
    if (!name || !email) {
      this.showToast('Please provide your name and email for 80G tax receipt issuance', 'alert');
      return;
    }

    if (submitBtn) {
      submitBtn.classList.add('btn-is-loading');
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove('btn-is-loading');
        submitBtn.disabled = false;
      }

      // Update linked requisition if applicable
      const reqId = PawBridgeStore.activePublicDonateReqId;
      if (reqId) {
        const r = PawBridgeStore.supportRequests.find(item => item.id === reqId);
        if (r) {
          r.currentVal += amt;
          r.percent = Math.min(100, Math.round((r.currentVal / r.targetVal) * 100));
          if (r.unit === '₹') {
            r.progressDisplay = `₹${r.currentVal.toLocaleString('en-IN')} raised of ₹${r.targetVal.toLocaleString('en-IN')} target`;
          } else {
            r.progressDisplay = `${r.currentVal} ${r.unit} received of ${r.targetVal} ${r.unit} target`;
          }
          if (r.percent >= 100) {
            r.status = 'fulfilled';
            r.statusLabel = '100% Fulfilled';
            r.fulfillment = {
              sponsor: `${name} (Public Aid)`,
              date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              receiptNo: `GIN-2026-PB${Math.floor(Math.random() * 800 + 100)}`,
              deliveredVal: `₹${r.currentVal.toLocaleString('en-IN')}`,
              allocation: r.linkedCase,
              notes: 'Reconciled via PawBridge Section 80G digital gateway.'
            };
          }
        }
      }

      const receiptId = `PB-80G-2026-${Math.floor(Math.random() * 8999 + 1000)}`;
      this.closePublicDonateModal();
      this.showToast(`🎉 Tax-deductible donation of ₹${amt.toLocaleString('en-IN')} confirmed! Digital receipt ${receiptId} issued to ${email}`, 'success');

      this.renderPublicProfile();
      this.renderSupportRequests();
      this.renderOverview();
    }, 600);
  },

  openPublicVolunteerModal() {
    if (this.dom.modalPublicVolunteer) {
      this.dom.modalPublicVolunteer.classList.add('active');
      const nameInput = document.getElementById('vol-name');
      if (nameInput) nameInput.focus();
    }
  },

  closePublicVolunteerModal() {
    if (this.dom.modalPublicVolunteer) {
      this.dom.modalPublicVolunteer.classList.remove('active');
    }
  },

  handlePublicVolunteerSubmit(e) {
    const name = document.getElementById('vol-name')?.value.trim();
    const phone = document.getElementById('vol-phone')?.value.trim();
    const email = document.getElementById('vol-email')?.value.trim();
    const role = document.getElementById('vol-role')?.value;

    if (!name || !phone || !email) {
      this.showToast('Please fill all required volunteer contact details', 'alert');
      return;
    }

    const ticketNo = `VOL-2026-${Math.floor(Math.random() * 800 + 100)}`;
    this.closePublicVolunteerModal();
    this.showToast(`📋 Volunteer application received (Ticket #${ticketNo})! Shelter coordinator will contact you.`, 'success');
  },

  openPublicShareModal() {
    if (this.dom.modalPublicShare) {
      this.dom.modalPublicShare.classList.add('active');
    }
  },

  closePublicShareModal() {
    if (this.dom.modalPublicShare) {
      this.dom.modalPublicShare.classList.remove('active');
    }
  },

  copyShareUrl() {
    const input = document.getElementById('share-url-input');
    if (input) {
      input.select();
      navigator.clipboard?.writeText(input.value);
      this.showToast('📋 Verified shelter registry link copied to clipboard!', 'success');
    }
  },

  openPublicCaseJourney(caseId) {
    const caseData = {
      'RC-1048': {
        name: 'Leo',
        id: '#RC-1048',
        breed: 'Desi / Indie Mix • Male • 2 Years',
        photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
        date: '24 Oct 2026',
        location: 'Mehrauli-Badarpur Highway, Delhi',
        ward: 'ICU-03 Trauma Recovery Bay',
        vet: 'Dr. Ananya Sharma, BVSc & AH (Lead Vet)',
        microchip: '985 141 002 918 201',
        status: 'Rehabilitated / Physical Therapy',
        story: 'Leo was admitted with an open compound fracture of the right tibia and fibula following a vehicular hit-and-run on the highway. Emergency trauma stabilization was performed immediately.',
        timeline: [
          { time: '24 Oct 2026 14:15', title: 'Admitted in Shock', desc: 'IV crystalloids, multimodal analgesia, and wound debridement under sterile field.' },
          { time: '25 Oct 2026 09:30', title: 'Orthopedic Surgery Completed', desc: '3.5-hour surgical plate reduction with 6-hole titanium dynamic compression plate.' },
          { time: '27 Oct 2026 11:00', title: 'Post-Op Callus Formation', desc: 'Post-operative radiographs verify anatomic bone alignment. Commenced passive range-of-motion therapy.' },
          { time: '28 Oct 2026 16:00', title: 'Weight-Bearing Rehabilitation', desc: 'Bearing 60% body weight on limb. Eating well with normal clinical vitals.' }
        ]
      },
      'RC-1049': {
        name: 'Bella',
        id: '#RC-1049',
        breed: 'Desi Indie • Female • 1.5 Years',
        photo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80',
        date: '22 Oct 2026',
        location: 'South Extension Storm Drain',
        ward: 'Supervised Medical Foster (South Ext)',
        vet: 'Dr. Rajiv Nanda, BVSc',
        microchip: '985 141 002 918 202',
        status: 'In Supervised Medical Foster',
        story: 'Rescued from deep storm drain culvert with acute septic tissue necrosis on forepaw. Stabilized with targeted antibiotics and moved to quiet home foster care.',
        timeline: [
          { time: '22 Oct 2026 18:30', title: 'Culvert Rescue Intake', desc: 'Severe hypothermia and septic puncture wounds on paw pad. Cleaned under local block.' },
          { time: '24 Oct 2026 10:00', title: 'Infection Controlled', desc: 'Wound granulated well under silver sulfadiazine dressing and oral cephalosporin.' },
          { time: '26 Oct 2026 15:00', title: 'Placed in Foster Care', desc: 'Transferred to approved medical foster family for 6-week quiet rehabilitation.' }
        ]
      },
      'RC-1050': {
        name: 'Bruno',
        id: '#RC-1050',
        breed: 'Labrador-Desi Cross • Male • 3 Years',
        photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
        date: '10 Oct 2026',
        location: 'Okhla Industrial Area',
        ward: 'Adoption Bay A-04',
        vet: 'Dr. Ananya Sharma',
        microchip: '985 141 002 918 203',
        status: 'Healed & Ready for Adoption',
        story: 'Abandoned with severe generalized demodectic mange covering 80% body surface and acute emaciation. Fully healed with glistening fur and playful demeanor.',
        timeline: [
          { time: '10 Oct 2026', title: 'Severe Dermatitis Intake', desc: 'Skin scrapings positive for Demodex canis. Commenced isoxazoline therapy & sulfur baths.' },
          { time: '18 Oct 2026', title: 'Skin Epithelial Healing', desc: 'Secondary bacterial pyoderma completely resolved. Gained 4.2 kg weight.' },
          { time: '27 Oct 2026', title: 'Certified Fit for Adoption', desc: 'Negative scrapings. Neutered, microchipped, fully vaccinated with rabies & DHPPi.' }
        ]
      },
      'RC-1051': {
        name: 'Toby & Culvert Litters',
        id: '#RC-1051',
        breed: 'Indie Puppies • 8 Weeks Old (14 Pups)',
        photo: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
        date: '18 Oct 2026',
        location: 'Yamuna Flood Plains Lowlands',
        ward: 'Ward B: Quarantine Neonatal Bay',
        vet: 'Nurse Vikas & Dr. Sharma',
        microchip: 'Litter Group Chip #985-002-LIT',
        status: 'Puppy Starter Nutrition Care',
        story: '14 unweaned puppies rescued from inundated storm culverts during Yamuna monsoon floods. Successfully stabilized through neonatal incubators and digestive formula.',
        timeline: [
          { time: '18 Oct 2026', title: 'Flood Emergency Intake', desc: 'Hypothermic body temp 97.4°F. Warmed with heating pads and fed warm probiotic milk.' },
          { time: '22 Oct 2026', title: 'Starter Kibble Weaning', desc: 'Transitioned successfully to gastrointestinal puppy starter kibble.' },
          { time: '28 Oct 2026', title: 'Primary Immunization', desc: '1st DHPPi vaccine administered. Active, alert, and gaining steady weight.' }
        ]
      }
    };

    const c = caseData[caseId] || caseData['RC-1048'];
    const bodyEl = document.getElementById('case-journey-modal-body');
    if (!bodyEl) return;

    bodyEl.innerHTML = `
      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px; margin-bottom: 20px;">
        <div style="height: 180px; border-radius: 10px; overflow: hidden; border: 1px solid var(--color-border);">
          <img src="${c.photo}" alt="${c.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 700; color: var(--color-text-dark); margin: 0;">${c.name}</h3>
              <span style="font-size: 12px; color: var(--color-text-muted);">${c.breed}</span>
            </div>
            <span class="status-pill verified" style="font-size: 11px;">${c.id}</span>
          </div>
          <div style="background: var(--color-cream-surface); border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 10px 12px; margin: 10px 0; font-size: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            <div><strong>Admitted:</strong> ${c.date}</div>
            <div><strong>Location:</strong> ${c.location}</div>
            <div><strong>Attending Vet:</strong> ${c.vet}</div>
            <div><strong>Ward:</strong> ${c.ward}</div>
            <div style="grid-column: span 2;"><strong>Microchip ID:</strong> <code>${c.microchip}</code></div>
          </div>
          <p style="font-size: 13px; line-height: 1.5; color: var(--color-text-muted); margin: 0;">${c.story}</p>
        </div>
      </div>

      <div style="border-top: 1px solid var(--color-border-subtle); padding-top: 16px;">
        <h4 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-dark); margin: 0 0 12px 0;">
          Verified Clinical Event Chronology
        </h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${c.timeline.map(t => `
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="color: var(--color-olive); font-weight: 700; font-size: 14px; margin-top: 2px;">●</span>
              <div style="flex: 1; background: #FFFFFF; border: 1px solid var(--color-border); border-radius: 8px; padding: 10px 14px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                  <strong style="font-size: 13px; color: var(--color-text-dark);">${t.title}</strong>
                  <span style="font-size: 11px; color: var(--color-text-subtle);">${t.time}</span>
                </div>
                <p style="font-size: 12px; color: var(--color-text-muted); margin: 0; line-height: 1.45;">${t.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (this.dom.modalPublicCaseJourney) {
      this.dom.modalPublicCaseJourney.classList.add('active');
    }
  },

  closePublicCaseJourney() {
    if (this.dom.modalPublicCaseJourney) {
      this.dom.modalPublicCaseJourney.classList.remove('active');
    }
  },

  viewPublicDocument(docKey) {
    const docs = {
      society_reg_deed: {
        title: 'Trust Registration Deed & Society Incorporation',
        issuer: 'Sub-Registrar of Societies, Govt of NCT Delhi',
        regId: 'DL/2018/****923 (Masked for Security)',
        date: '14 Oct 2018 (Verified Active 2026)',
        hash: 'SHA256: 8a93bf81e7d042bb88a109923847f9b31',
        auditor: 'Adv. Vikramaditya Sen (Senior Legal Auditor)',
        type: 'Verified Statutory Document',
        notes: 'Charter documents authenticated against NCT Delhi gazette records. Registered entity name, trust objectives, and governing body confirmed.'
      },
      form_10ac_80g: {
        title: 'Section 12A & 80G Tax Exemption (Form 10AC)',
        issuer: 'Commissioner of Income Tax (Exemptions), New Delhi',
        regId: 'CIT(EXEMP)/DELHI/****3381',
        date: 'Valid AY 2024–2029',
        hash: 'SHA256: d472aa10fc831190bc7710aa984701fa',
        auditor: 'CA R. K. Bhasin (Statutory Auditor)',
        type: 'Approved Income Tax Order',
        notes: 'Indian citizen contributions eligible for 50% tax deduction under Section 80G of Income Tax Act 1961. Digital certificates auto-generated.'
      },
      awbi_recognition: {
        title: 'Animal Welfare Board of India (AWBI) Recognition',
        issuer: 'Animal Welfare Board of India, Ministry of Fisheries & Animal Husbandry',
        regId: 'AWBI/2021/DL-402',
        date: 'Renewed June 2025 (Valid to 2028)',
        hash: 'SHA256: ee0488f21901ab880199447712ee991a',
        auditor: 'PawBridge National NGO Review Desk',
        type: 'Accredited Animal Welfare Organization',
        notes: 'Verified compliance with Prevention of Cruelty to Animals Act 1960 and Animal Birth Control (Dogs) Rules.'
      },
      ca_audit_summary: {
        title: 'Audited Financial Statements & Utilization Return (FY 2025–26)',
        issuer: 'M/s Bhasin & Co. Chartered Accountants',
        regId: 'FRN 014920N / CA Reg #089124',
        date: 'Audited 30 June 2026',
        hash: 'SHA256: 12ab990144f2887cdd102944cc45aa01',
        auditor: 'CA Rajesh Bhasin, FCA',
        type: 'Independent Financial Audit',
        notes: '91.4% of total public expenditure allocated to medical treatments, veterinary staffing, and shelter nutrition. Administrative overhead at 8.6%.'
      },
      abc_self_report: {
        title: 'Community Sterilization & Outreach Self-Report (Q3 2026)',
        issuer: 'Happy Tails Operations Desk (Self-Reported Submission)',
        regId: 'INT-SR-2026-Q3',
        date: 'Submitted 15 Oct 2026',
        hash: 'SHA256: 77a1bb90cf1244e881029471182490cc',
        auditor: 'Pending Next Municipal Audit Cycle',
        type: 'Organisation-Reported Submission',
        notes: 'Self-reported quarterly internal operational log submitted by shelter field team. Disclosed transparently as uncertified until municipal reconciliation.'
      }
    };

    const d = docs[docKey] || docs.society_reg_deed;
    const bodyEl = document.getElementById('pub-doc-modal-body');
    if (!bodyEl) return;

    bodyEl.innerHTML = `
      <div style="background: ${docKey === 'abc_self_report' ? '#FFF7E6' : '#F3F7F0'}; border: 1px solid ${docKey === 'abc_self_report' ? '#FFE0A3' : '#C8DEC2'}; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span class="label-13 uppercase" style="color: ${docKey === 'abc_self_report' ? '#9A6700' : 'var(--color-olive-dark)'}; font-weight: 700;">${d.type}</span>
            <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--color-text-dark); margin: 2px 0 0 0;">${d.title}</h4>
          </div>
          <span class="status-pill ${docKey === 'abc_self_report' ? 'quarantine' : 'verified'}">${docKey === 'abc_self_report' ? '⚠️ Self-Reported' : '✓ Verified Active'}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; color: var(--color-text-dark); margin-top: 10px;">
          <div><strong>Authority:</strong> ${d.issuer}</div>
          <div><strong>Registration / Order ID:</strong> ${d.regId}</div>
          <div><strong>Validity / Date:</strong> ${d.date}</div>
          <div><strong>Reviewing Auditor:</strong> ${d.auditor}</div>
        </div>
      </div>

      <div style="background: var(--color-cream-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
        <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--color-text-muted);">Auditor Summary & Verification Rationale</span>
        <p style="font-size: 13px; color: var(--color-text-dark); line-height: 1.5; margin: 4px 0 0 0;">${d.notes}</p>
      </div>

      <div style="background: #FAF8F2; border: 1px dashed var(--color-border); border-radius: 6px; padding: 10px 12px; font-family: monospace; font-size: 11px; color: var(--color-text-muted); display: flex; justify-content: space-between; align-items: center;">
        <span>Cryptographic Audit Seal: ${d.hash}</span>
        <span style="color: var(--color-olive); font-weight: 600;">PawBridge Ledger</span>
      </div>
    `;

    if (this.dom.modalPublicDocInspector) {
      this.dom.modalPublicDocInspector.classList.add('active');
    }
  },

  closePublicDocInspector() {
    if (this.dom.modalPublicDocInspector) {
      this.dom.modalPublicDocInspector.classList.remove('active');
    }
  },

  handlePublicQuickContactSubmit(e) {
    const name = document.getElementById('pub-quick-name')?.value.trim();
    const email = document.getElementById('pub-quick-email')?.value.trim();
    const topic = document.getElementById('pub-quick-topic')?.value;
    const msg = document.getElementById('pub-quick-message')?.value.trim();

    if (!name || !email || !msg) {
      this.showToast('Please fill all required message fields', 'alert');
      return;
    }

    const form = document.getElementById('form-pub-quick-contact');
    if (form) form.reset();

    this.showToast(`✉️ Inquiry received from ${name}. Operations desk will reply to ${email} within 24 hours.`, 'success');
  },

  openConfirmDialog({ title, message, iconType = 'warning', confirmText = 'Proceed', cancelText = 'Cancel', onConfirm }) {
    if (this.dom.confirmDialogTitle) this.dom.confirmDialogTitle.textContent = title;
    if (this.dom.confirmDialogMsg) this.dom.confirmDialogMsg.textContent = message;
    if (this.dom.btnConfirmProceed) this.dom.btnConfirmProceed.textContent = confirmText;
    if (this.dom.btnConfirmCancel) this.dom.btnConfirmCancel.textContent = cancelText;

    if (this.dom.confirmDialogIcon) {
      this.dom.confirmDialogIcon.className = `confirm-icon-wrap ${iconType}`;
    }

    if (this.dom.btnConfirmProceed) {
      // Clone to remove previous event listeners cleanly
      const newBtn = this.dom.btnConfirmProceed.cloneNode(true);
      this.dom.btnConfirmProceed.parentNode.replaceChild(newBtn, this.dom.btnConfirmProceed);
      this.dom.btnConfirmProceed = newBtn;

      this.dom.btnConfirmProceed.addEventListener('click', () => {
        if (this.dom.modalGenericConfirm) this.dom.modalGenericConfirm.classList.remove('active');
        if (typeof onConfirm === 'function') onConfirm();
      });
    }

    if (this.dom.modalGenericConfirm) {
      this.dom.modalGenericConfirm.classList.add('active');
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
