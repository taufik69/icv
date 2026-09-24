import { pageHero } from './hero'

// Copy from icv.edu.au/rpl/ (overview; the four process steps are in rplSteps.js).
export const rplHero = pageHero('', 'RPL')

export const rplOverview = {
  id: 'rpl',
  title: 'RPL',
  lead: 'RPL is the way you receive recognition for your current skills and knowledge, obtained either from having completed in-house training courses, on the job experience or from your life’s experiences.',
  text: 'If RPL process is applicable, there are a number of options from which you can choose, but it all starts with a simple RPL self-assessment process which, once completed, will tell you if RPL is appropriate for you.',
  qualitiesTitle: 'The Victoria RPL process is robust and fair and is one that:',
  qualities: [
    'Is a supportive process',
    'Minimises unnecessary paperwork',
    'Is interview, observation and targeted evidence driven',
    'Is candidate empowering',
    'Generates evidence relevant to the process',
  ],
  principlesTitle: 'The competency decision is based on the following principles:',
  principles: [
    { label: 'Principles of assessment', text: 'The assessment method must be Fair, Flexible, Valid and Reliable to ensure quality outcomes.' },
    { label: 'Rules of evidence', text: 'Valid, Sufficient, Authentic and Current to provide guidance on the collection of evidence' },
  ],
}

export const rplGuide = {
  id: 'evidence-guide',
  title: 'RPL Self-Evaluation Evidence Guide',
  intro: 'Is a guide for both assessors and candidates as to the types of documentation that should be sighted and collected during the RPL process. This guide is given to the Candidate to indicate the sort of evidence the assessor will be seeking in the process. Again, this list is meant to be a guide only and not to exclude any form of evidence, comment or other forms of valid evidence that a Candidate may have that is not listed.',
}

export const rplFees = {
  id: 'rpl-fees',
  title: 'RPL Fees',
  // "Fees Schedule" links to the Fee Schedule page.
  text: ['RPL fees can vary depending on the qualification, please refer to the ', 'Fees Schedule', ' for further information.'],
}
