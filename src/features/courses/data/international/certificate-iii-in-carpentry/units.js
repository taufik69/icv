import { intlCopy } from '../shared'

const split = (list) => list.map((u) => [u.slice(0, u.indexOf(' ')), u.slice(u.indexOf(' ') + 1)])

// Format and packaging rules + unit list for CPC30220 (icv.edu.au), verbatim.
export const units = {
  title: 'Format and Packaging Rules',
  parts: [
    'To achieve this qualification, the candidate must demonstrate competency in:',
    { list: ['34 units of competency', '27 core units', '7 elective units.'] },
    'Some units in this qualification may have prerequisite requirements, which must be met when packaging the qualification.',
    intlCopy.prereqNote,
  ],
  core: split([
    'CPCCCA2002* Use carpentry tools and equipment', 'CPCCCA2011* Handle carpentry materials', 'CPCCCA3001* Carry out general demolition of minor building structures',
    'CPCCCA3002* Carry out setting out', 'CPCCOM3006 Carry out levelling operations', 'CPCCOM1012 Work effectively and sustainably in the construction industry',
    'CPCCOM3001 Perform construction calculations to determine carpentry material requirements', 'CPCCOM1014 Conduct workplace communication',
    'CPCCOM1015 Carry out measurements and calculations', 'CPCCCA3025* Read and interpret plans, specifications and drawings for carpentry work',
    'CPCCCM2008* Erect and dismantle restricted height scaffolding', 'CPCCCM2012* Work safely at heights', 'CPCCCO2013* Carry out concreting to simple forms',
    'CPCCWHS2001 Apply WHS requirements, policies and procedures in the construction industry', 'CPCCCA3003* Install flooring systems',
    'CPCCCA3004* Construct and erect wall frames', 'CPCCCA3005* Construct ceiling frames', 'CPCCCA3006* Erect roof trusses', 'CPCCCA3007* Construct pitched roofs',
    'CPCCCA3008* Construct eaves', 'CPCCCA3010* Install windows and doors', 'CPCCCA3016* Construct, assemble and install timber external stairs',
    'CPCCCA3017* Install exterior cladding', 'CPCCCA3024* Install lining, panelling and moulding', 'CPCCCA3028* Erect and dismantle formwork for footings and slabs on ground',
    'CPCCCM2006 Apply basic levelling procedures', 'CPCWHS3001 Identify construction work hazards and select risk control strategies',
  ]),
  elective: split([
    'CPCCCA3012* Frame and fit wet area fixtures', 'CPCCCA3014* Construct and install bulkheads', 'CPCCCA3009** Construct advanced roofs',
    'CPCCCM2002* Carry out hand excavation', 'CPCCCA3027* Set up, operate and maintain indirect action powder-actuated power tools',
    'CPCCOM1013 Plan and organise', 'CPCCCA3026* Assemble partitions',
  ]),
}
