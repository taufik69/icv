import { intlCopy } from '../shared'

const TGA = 'https://training.gov.au/training/details/'
// Core units link to training.gov.au on the live page; electives do not.
const linked = (rows) => rows.map(([code, title]) => [code, title, TGA + code.replace(/\*/g, '')])

// Format and packaging rules + unit list for CPC32320 (icv.edu.au), verbatim.
export const units = {
  title: 'Format and Packaging Rules',
  coreLabel: 'Core Units',
  electiveLabel: 'Electives',
  parts: [
    'To achieve this qualification, the candidate must demonstrate competency in:',
    { list: ['30 units of competency', '21 core units', '9 elective units.'] },
    'Some units in this qualification may have prerequisite requirements, which must be met when packaging the qualification. Users are referred to the list of CPC units with prerequisite unit requirements available in this Training Package for this purpose.',
    intlCopy.prereqNote,
  ],
  core: linked([
    ['CPCCCA3002*', 'Carry out setting out'], ['CPCCCM2006', 'Apply basic levelling procedures'], ['CPCCCM2008*', 'Erect and dismantle restricted height scaffolding'],
    ['CPCCCM2012*', 'Work safely at heights'], ['CPCCOM1012', 'Work effectively and sustainably in the construction industry'], ['CPCCOM1013', 'Plan and organise work'],
    ['CPCCOM1014', 'Conduct workplace communication'], ['CPCCOM1015', 'Carry out measurements and calculations'], ['CPCCOM2001*', 'Read and interpret plans and specifications'],
    ['CPCCST2003*', 'Finish stone'], ['CPCCST2004*', 'Lay stone'], ['CPCCST2006*', 'Identify and use stone products'], ['CPCCST2007*', 'Use stonemasonry tools, plant and equipment'],
    ['CPCCST3001*', 'Dress and mould stone'], ['CPCCST3002*', 'Shape solid stone'], ['CPCCST3003*', 'Split stone manually'], ['CPCCST3004*', 'Dress stone manually'],
    ['CPCCST3006*', 'Machine stone'], ['CPCCST3010*', 'Set out and cut letters in stone'], ['CPCCST3022*', 'Carry out profile work'],
    ['CPCCWHS2001', 'Apply WHS requirements, policies and procedures in the construction industry'],
  ]),
  elective: [
    ['CPCCST2001', 'Prepare for stonemasonry construction process'], ['CPCCSST3023', 'Apply drawing principles to stonemasonry'], ['CPCCST3017', 'Construct stone arches'],
    ['CPCCBL3016', 'Construct battered masonry walls and piers'], ['CPCCBL3017', 'Carry out tuck pointing and repointing to masonry'], ['CPCCST3021', 'Restore stonework'],
    ['CPCCST3024', 'Apply conservation principles and practices to heritage stonework'], ['CPCCST3019', 'Lay stonemasonry stairs'], ['CPCCST3025', 'Carry out basic stonemasonry demolition'],
  ],
  note: 'Clients with no formal qualification, although have experience in the Construction Industry is an advantage.',
}
