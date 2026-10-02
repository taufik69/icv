import { emptyEnglishTest, emptyQualification } from '../data/enrolment/enrolmentOptions'
import { clearFiles } from './fileStore'

const KEY = 'icv-enrolment-draft'
const today = () => new Date().toISOString().slice(0, 10)

export const emptyEnrolment = () => ({
  course: '', courseManual: false, courseTitle: '', duration: '', applicationFee: '', tuitionFee: '', materialFee: '', year: '',
  title: '', givenNames: '', lastName: '', gender: '', dob: '', countryOfBirth: '', nationality: '',
  firstLanguage: '', passportNumber: '', passportExpiry: '',
  homeAddress: '', homeCity: '', homeCountry: '', homePostcode: '',
  auAddress: '', auSuburb: '', auState: '', auPostcode: '', phone: '', mobile: '', email: '',
  emergencyName: '', emergencyRelationship: '', emergencyNumber: '',
  hasOshc: false, oshcProvider: '', oshcType: '', oshcMembership: '', oshcExpiry: '',
  arrangeOshc: false, arrangeDuration: '', arrangeDurationOther: '', arrangeType: '',
  disability: '', disabilityTypes: [], otherMedical: '',
  qualifications: [{ ...emptyQualification }], creditTransfer: '', englishTests: [{ ...emptyEnglishTest }],
  holdsVisa: '', visaType: '', visaSubclass: '', visaExpiry: '', immigrationOffice: '', visaApplicationDate: '',
  heard: '', heardOther: '', agentCompany: '', agentName: '', agentEmail: '', agentPhone: '', agentStamp: '',
  attachments: [], attachmentOther: '', declaration: false, signature: '', signedDate: today(),
})

// The draft lives in this browser only (UI only, no backend yet); uploaded files sit in IndexedDB (`fileStore`). Storage can be blocked, so every
// access is guarded and the form still works without it.
export function loadDraft() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveDraft(draft) {
  try {
    localStorage.setItem(KEY, JSON.stringify(draft))
    return true
  } catch {
    return false
  }
}

export function clearDraft() {
  clearFiles()
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nothing stored
  }
}
