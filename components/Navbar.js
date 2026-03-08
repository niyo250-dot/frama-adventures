import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/home' },
  {
    label: 'About Us',
    href: '/about',
    dropdown: [
      { label: 'Who We Are', href: '/about/who-we-are' },
      { label: 'Our Team', href: '/about/our-team' },
    ],
  },
  { label: 'Rooms & Accommodation', href: '/rooms' },
  { label: 'Tours & Activities', href: '/activities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="text-xl font-bold">
              FRAMA Eco-Lodge
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link href={item.href} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                    {item.label}
                </Link>
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.dropdown.map((sub) => (
                      <Link href={sub.href} key={sub.label} className="block px-4 py-2 text-sm hover:bg-gray-100">
                          {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/book" className="ml-4 inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-500">
                Book Now
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={toggleMobile} className="p-2 rounded-md focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="md:hidden bg-white shadow-md"
        >
          {navItems.map((item) => (
            <div key={item.label} className="border-b">
              <Link href={item.href} className="block px-4 py-2 text-base font-medium" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              {item.dropdown && (
                <div className="pl-4">
                  {item.dropdown.map((sub) => (
                    <Link href={sub.href} key={sub.label} className="block px-4 py-2 text-sm" onClick={() => setMobileOpen(false)}>
                        {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/book" className="block mt-2 mx-4 px-4 py-2 bg-accent text-white text-center rounded-md">
              Book Now
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
