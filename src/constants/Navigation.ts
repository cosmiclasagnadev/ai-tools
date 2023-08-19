import {NavLinkProps} from "@/components/NavLink";
import {Send, Flame, CircleDollarSign} from "lucide-react";

export const NAVIGATION_LINKS: NavLinkProps[] = [
  {
    href: "#",
    title: "Free",
    Icon: Flame,
  },
  {
    href: "#",
    title: "Paid",
    Icon: CircleDollarSign,
  },
];
