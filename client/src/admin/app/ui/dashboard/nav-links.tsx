// 'use client'

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';
// import { applicationsLinks, paymentLinks, roomLinks, usersLinks } from '@/app/lib/constants';
// import { getGreenIconClassName, getGreenLinkClassName, getIconClassName, getLinkClassName, getRedIconClassName, getRedLinkClassName } from './functions';

// function NavlinksComponent({ pathname, data, title, rem, }: _INavProps) {
//   return (
//     <>
//       {/* Divider */}
//       <hr className={`md:min-w-full ${rem ? 'mt-12' : 'mt-0'}` } />
//       {/* Heading */}
//       <h6 className="md:min-w-full text-xs uppercase font-bold block pt-1 pb-4 no-underline">
//         {title}{" Information"}
//       </h6>
//       {data.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={clsx(
//               `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
//                 link.type === "red"
//                   ? getRedLinkClassName(pathname, link.href)
//                   : link.type === "green"
//                   ? getGreenLinkClassName(pathname, link.href)
//                   : getLinkClassName(pathname, link.href)
//               }`,
//               {
//                 "bg-sky-100 text-blue-600": pathname === link.href,
//               }
//             )}
//           >
//             <LinkIcon
//               className={`w-6 ${
//                 link.type === "red"
//                   ? getRedIconClassName(pathname, link.href)
//                   : link.type === "green"
//                   ? getGreenIconClassName(pathname, link.href)
//                   : getIconClassName(pathname, link.href)
//               }`}
//             />
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }

// export default function NavLinks() {
//   const pathname = usePathname();
//   return (
//     <>
//       <NavlinksComponent pathname={pathname} data={usersLinks} title="user" />
//       <NavlinksComponent
//         pathname={pathname}
//         data={applicationsLinks}
//         title="applications"
//         rem
//       />
//       <NavlinksComponent
//         pathname={pathname}
//         data={paymentLinks}
//         title="payment"
//         rem
//       />
//     </>
//   );
// }
