import { MailIcon, MessengerIcon, PhoneIcon, WhatsappIcon, MapPinIcon } from '@/shared/components/icons'

// Floating contact menu items (order = position along the arc, from left to top).
export const contactActions = [
  { label: 'Call us', href: 'tel:0399421836', Icon: PhoneIcon },
  { label: 'WhatsApp', href: 'https://wa.me/61481338352', Icon: WhatsappIcon, external: true },
  { label: 'Messenger', href: 'https://m.me/internationalcollegeofvic', Icon: MessengerIcon, external: true },
  { label: 'Email', href: 'mailto:info@icv.edu.au', Icon: MailIcon },
  { label: 'Find us', href: 'https://maps.google.com/?cid=8709777154652596728', Icon: MapPinIcon, external: true },
]
