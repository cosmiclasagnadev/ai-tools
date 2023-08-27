import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import LogoLink from "./LogoLink"
import {Brain} from "lucide-react"
import {NAVIGATION_LINKS} from "@/constants/Navigation"
import NavLink from "./NavLink"
import Search from "./Search"
import {Separator} from "./ui/separator"
import {capitalizeAndRemoveHyphen} from "@/lib/utils"
import {ScrollArea} from "./ui/scroll-area"

export function MobileMenuSlideOut({categories}: any) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="outline-none mobile-menu-button bg-transparent hover:bg-transparent">
                    <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <div className="group flex gap-2 items-center">
                            <Brain size="24" className="text-emerald-600" />
                            <span className=" font-bold text-lg text-white">AITools</span>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <div className="my-5">
                    <nav className="my-5">
                        <ul>
                            {NAVIGATION_LINKS.map((link) => (
                                <li key={link.title}>
                                    <NavLink Icon={link.Icon} href={link.href} title={link.title} />
                                </li>
                            ))
                            }
                        </ul>
                    </nav>
                    <Search />

                    <Separator className="bg-stone-700 bg-opacity-75 mt-5 mb-5" />
                    <span className="font-bold px-4 py-2 mb-4 text-stone-100 text-sm">Categories</span>
                    <nav className="border-b border-solid border-stone-700/75 md:border-b-0">
                        <ul className="mt-2">
                            <ScrollArea className="h-72 border-0">
                                {categories?.map((category: any) => (
                                    <li key={category.unnest}>
                                        <NavLink href={`/categories/${category.category}`} title={capitalizeAndRemoveHyphen(category.category)} count={category.count} />
                                    </li>
                                ))}
                            </ScrollArea>
                        </ul>
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    )
}
