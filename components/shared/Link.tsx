/* eslint-disable react/prop-types */
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';


interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
  Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];

}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(
  props,
  ref
) {
  // eslint-disable-next-line react/prop-types
  const { to, linkAs, replace, scroll, passHref, shallow, prefetch, locale, ...other } = props;

  return (
    (<NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
      ref={ref}
      {...other}>

    </NextLink>)
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'>

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    // eslint-disable-next-line react/prop-types
    activeClassName = 'active',
    // eslint-disable-next-line react/prop-types
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,

    ...other
  } = props;

  const router = useRouter();
  const pathname = href ? (typeof href === 'string' ? href : href.pathname) : '';
  //console.log({ pathname });
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <a className={className} href={href as string} ref={ref} {...other} />;
    }

    return <Link className={className} href={href as string} ref={ref} {...other} />;
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
  }

  return <Link component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...other} />;
});

export default Link;
