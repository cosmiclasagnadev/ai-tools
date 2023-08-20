import {NavLinkProps} from "@/components/NavLink";
import {BoxSelect, Flame, CircleDollarSign} from "lucide-react";

export const NAVIGATION_LINKS: NavLinkProps[] = [
  {
    href: "/free",
    title: "Free",
    Icon: Flame,
  },
  {
    href: "/paid",
    title: "Paid",
    Icon: CircleDollarSign,
  },
  {
    href: "/categories",
    title: "Categories",
    Icon: BoxSelect,
  },
];
