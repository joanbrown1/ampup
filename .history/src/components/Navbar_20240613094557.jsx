import { Disclosure } from '@headlessui/react'
import menu from "../assets/menu.png"
import close from "../assets/close.png"
import Logo from "../assets/ampup.png"
import { Link } from 'react-router-dom'

const navigation = [
  { name: ' ', href: '/', current: false },
  { name: 'Buy Electricity', href: '/login', current: false },
  { name: 'Contact Us', href: '/contactus', current: false },
  { name: 'FAQ', href: '/faq', current: false },
  { name: 'Get Started', href: '/login', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="py-4 mt-[45px]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <img src={close} className='h-6 w-6'/>
                  ) : (
                    <img src={menu} className='h-8 w-8'/>
                  )}
                </Disclosure.Button>
              </div>
              <Link to="/">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block w-24 lg:hidden ml-2"
                    src={Logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden w-28 lg:block"
                    src={Logo}
                    alt="Your Company"
                  />
                </div>
                </div>
              </Link>
                
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? ' bg-[#7B0323] text-white' : 'text-black hover:bg-[#7b0323d8] hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-normal '
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-[#7b0323e5] text-white' : 'text-black hover:bg-[#7b0323d8] hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
