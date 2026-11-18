export interface NavDropdownItem {
  label: string;
  href: string;
  desc?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavDropdownItem[];
}

export const NAV: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Vision & Mission', href: '/about#vision', desc: 'Impact lives with God’s love' },
      { label: 'Structure & Leadership', href: '/about#leadership', desc: 'Bishop Andrew & Dr. Ruth Ouma' },
      { label: 'Our Branches', href: '/about#branches', desc: 'Kibera, Ndhiwa, Pala, Jamhuri & beyond' },
      { label: 'Core Values & Beliefs', href: '/about#beliefs', desc: 'What we believe and teach' },
      { label: 'Location & Sanctuary', href: '/visit', desc: 'Directions, services and map' },
    ],
  },
  {
    label: 'Ministries',
    href: '/ministries',
    children: [
      { label: 'Children’s Ministry', href: '/ministries#children', desc: 'Joyful, safe discipleship for kids' },
      { label: 'Teens & Youth', href: '/ministries#youth', desc: 'Raising a godly generation' },
      { label: 'Alabaster Ladies', href: '/ministries#women', desc: 'Women of prayer, worship and impact' },
      { label: 'Men’s Fellowship', href: '/ministries#men', desc: 'Equipping men of purpose & integrity' },
      { label: 'Uzima Choir & Worship', href: '/ministries#worship', desc: 'Leading the church into God’s presence' },
      { label: 'Intercessors', href: '/ministries#prayer', desc: 'Standing in the gap in prayer' },
    ],
  },
  {
    label: 'Missions & Outreach',
    href: '/about#outreach',
    children: [
      { label: 'Giving Life to the City', href: '/about#outreach', desc: 'Community food, relief and prayer' },
      { label: 'Jesus Film Evangelism', href: '/about#jesus-film', desc: 'Spreading the Gospel across Kenya' },
      { label: 'Feeding Programmes', href: '/about#feeding', desc: 'Monthly meals for over 800 children' },
      { label: 'Kibera Saints FC', href: '/about#kibera-saints', desc: 'Youth soccer and life mentorship' },
      { label: 'Hope Community School', href: '/about#school', desc: 'Education and daily nutrition' },
      { label: 'Church Planting & Partnerships', href: '/about#partnerships', desc: 'Planting assemblies nationwide' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
    children: [
      { label: 'Weekly Services & Kesha', href: '/events#weekly', desc: 'Sunday services & Friday overnight prayer' },
      { label: 'Upcoming Conferences', href: '/events#conferences', desc: 'Believers Conference & Feast of the Word' },
      { label: 'Church Calendar', href: '/events', desc: 'Upcoming dates and gatherings' },
      { label: 'Sermons & Messages', href: '/messages', desc: 'Watch recent preachings online' },
    ],
  },
  {
    label: 'Contact Us',
    href: '/contact',
    children: [
      { label: 'Get in Touch', href: '/contact', desc: 'Office phone, WhatsApp & email' },
      { label: 'Prayer Request', href: '/prayer', desc: 'Share your burden with our prayer team' },
      { label: 'Directions & Sanctuary', href: '/visit', desc: 'How to get to ICA Kibera' },
    ],
  },
];
