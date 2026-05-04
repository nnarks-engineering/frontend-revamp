import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X, ChevronDown, ShieldCheck, MapPin, Users, FileCheck, Shield, Building2, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/shared/lib/utils'
import Logo from '@/assets/nnarks-logo-sm.svg?react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { LinkPreview } from '@/components/ui/link-preview'
import EngineerImage from "@/assets/landing/nnarks-engineer.webp";

export interface NavSubItem {
    labelKey: string
    descriptionKey?: string
    href: string
    icon: React.ElementType
}

export interface NavMainItem {
    labelKey: string
    href?: string
    items?: NavSubItem[]
}

export const navigationStructure: NavMainItem[] = [
    {
        labelKey: 'home.label',
        href: '/'
    },
    {
        labelKey: 'modules.label',
        items: [
            { labelKey: 'modules.items.escrow.label', descriptionKey: 'modules.items.escrow.description', href: '/modules', icon: ShieldCheck },
            { labelKey: 'modules.items.supervision.label', descriptionKey: 'modules.items.supervision.description', href: '/modules', icon: MapPin },
            { labelKey: 'modules.items.contributions.label', descriptionKey: 'modules.items.contributions.description', href: '/modules', icon: Users },
        ]
    },
    {
        labelKey: 'features.label',
        items: [
            { labelKey: 'features.items.evidence.label', descriptionKey: 'features.items.evidence.description', href: '/features', icon: FileCheck },
            { labelKey: 'features.items.identity.label', descriptionKey: 'features.items.identity.description', href: '/features', icon: Shield },
        ]
    },
    {
        labelKey: 'company.label',
        items: [
            { labelKey: 'company.items.about.label', descriptionKey: 'company.items.about.description', href: '/about', icon: Building2 },
            { labelKey: 'company.items.contact.label', descriptionKey: 'company.items.contact.description', href: '/contact', icon: Phone },
        ]
    },
    { labelKey: 'pricing.label', href: '/financials' },
    { labelKey: 'faqs.label', href: '/faqs' },
]

const HERO_PAGES = ['/']

export interface NavbarProps {
    signInText?: string
    ctaText?: string
}

export function DesktopDropdown({ item, isLinkActive }: { item: NavMainItem, isLinkActive: (href: string) => boolean }) {
    const { t } = useTranslation(['landing'])
    const [isOpen, setIsOpen] = useState(false)
    const timeoutRef = useRef<number | null>(null)

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => setIsOpen(false), 150)
    }

    const hasActiveChild = item.items?.some(sub => isLinkActive(sub.href))

    return (
        <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className={cn(
                "flex items-center gap-1 py-1 text-sm font-medium transition-colors cursor-pointer",
                isOpen || hasActiveChild ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
            )}>
                {(t as any)(`landing:navMenu.${item.labelKey}`)}
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
                {(isOpen || hasActiveChild) && (
                    <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                )}
            </button>
            
            <AnimatePresence>
                {isOpen && item.items && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 bg-background border border-t-2 !border-t-primary border-foreground/10 shadow-xl overflow-hidden py-2"
                    >
                        {item.items.map((sub, i) => {
                            const Icon = sub.icon
                            const active = isLinkActive(sub.href)
                            return (
                                <Link
                                    key={i}
                                    to={sub.href as any}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-start gap-3 p-3 transition-colors",
                                        active ? "bg-primary/5" : "hover:bg-foreground/5"
                                    )}
                                >
                                    <div className={cn(
                                        "mt-0.5 p-2  flex-shrink-0",
                                        active ? "bg-primary/10 text-primary" : "bg-foreground/5 text-foreground/70"
                                    )}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className={cn("text-sm font-semibold", active ? "text-primary" : "text-foreground")}>
                                            {(t as any)(`landing:navMenu.${sub.labelKey}`)}
                                        </div>
                                        <div className="text-xs text-foreground/60 mt-0.5 line-clamp-2">
                                            {(t as any)(`landing:navMenu.${sub.descriptionKey}`)}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const { t } = useTranslation(['common', 'landing'])
    const signInText = t('common:auth.login')
    const ctaText = t('common:auth.register')

    const location = useLocation()
    const pathname = location.pathname
    
    const isHero = HERO_PAGES.includes(pathname)

    const [scrolledPast, setScrolledPast] = useState(!isHero)
    const [visible, setVisible] = useState(true)
    const lastScrollY = useRef(0)
    const ticking = useRef(false)

    useEffect(() => {
        const heroPage = HERO_PAGES.includes(pathname)

        if (!heroPage) {
            setScrolledPast(true)
        } else {
            setScrolledPast(window.scrollY > 80)
        }

        setVisible(true)
        lastScrollY.current = window.scrollY

        const handleScroll = () => {
            if (ticking.current) return
            ticking.current = true
            requestAnimationFrame(() => {
                const currentY = window.scrollY
                const diff = currentY - lastScrollY.current

                if (heroPage) {
                    setScrolledPast(currentY > 80)
                }

                if (currentY < 60) {
                    setVisible(true)
                } else if (diff > 6) {
                    setVisible(false)
                } else if (diff < -6) {
                    setVisible(true)
                }

                lastScrollY.current = currentY
                ticking.current = false
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    const isLinkActive = (href: string) => {
        if (href === '/' || href === '/#') return pathname === '/'
        if (href.startsWith('/#')) return false
        return pathname === href
    }

    return (
        <>
            {/* MOBILE */}
            <motion.div
                animate={{ y: visible ? 0 : '-100%' }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ pointerEvents: visible ? 'auto' : 'none' }}
                className="md:hidden fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 shadow-sm"
            >
                <MobileNav
                    signInText={signInText}
                    ctaText={ctaText}
                    isLinkActive={isLinkActive}
                />
            </motion.div>

            {/* DESKTOP */}
            <AnimatePresence>
                {(scrolledPast || !isHero) && (
                    <motion.div
                        key="desktop-nav"
                        initial={{ y: isHero ? '-100%' : 0 }}
                        animate={{ y: visible ? 0 : '-100%' }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ pointerEvents: visible ? 'auto' : 'none' }}
                        className="hidden md:block fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 shadow-sm"
                    >
                        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-20 flex items-center justify-between">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                                <Logo className="h-10 w-auto text-foreground" />
                                <span className="text-xl font-bold tracking-tight text-foreground">{t('common:platform.name')}</span>
                            </Link>

                            <nav className="flex items-center gap-8">
                                {navigationStructure.map((item, i) => {
                                    if (item.items) {
                                        return <DesktopDropdown key={i} item={item} isLinkActive={isLinkActive} />
                                    }
                                    const active = item.href ? isLinkActive(item.href) : false
                                    return (
                                        <Link
                                            key={i}
                                            to={item.href as any}
                                            className={cn(
                                                "relative py-1 text-sm font-medium transition-colors",
                                                active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                                            )}
                                        >
                                            {(t as any)(`landing:navMenu.${item.labelKey}`)}
                                            {active && (
                                                <motion.div
                                                    layoutId="nav-underline"
                                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    )
                                })}
                            </nav>

                            <div className="flex items-center gap-4">
                                <LanguageSwitcher />
                                <Link
                                    to={"/login" as any}
                                    className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                                >
                                    {signInText}
                                </Link>
                                <LinkPreview
                                    url="/register"
                                    isStatic
                                    imageSrc={EngineerImage}
                                    asChild
                                >
                                    <Link
                                        to={"/register" as any}
                                        className="bg-primary hover:bg-primary/80 text-primary-foreground text-sm font-semibold px-5 py-2.5 transition-colors duration-200 rounded-lg"
                                    >
                                        {ctaText}
                                    </Link>
                                </LinkPreview>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

function MobileNav({
    signInText,
    ctaText,
    isLinkActive,
}: {
    signInText: string
    ctaText: string
    isLinkActive: (href: string) => boolean
}) {
    const { t } = useTranslation(['common', 'landing'])
    const [isOpen, setIsOpen] = useState(false)
    const [openGroup, setOpenGroup] = useState<string | null>(null)

    return (
        <>
            <div className="h-16 px-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-auto text-foreground" />
                    <span className="font-bold text-foreground text-lg">{t('common:platform.name')}</span>
                </Link>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="bg-background border-t border-foreground/5 px-4 pb-6 max-h-[85vh] overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2 pt-4">
                            {navigationStructure.map((item, i) => {
                                if (item.items) {
                                    const isGroupOpen = openGroup === item.labelKey
                                    return (
                                        <div key={i} className="flex flex-col border-b border-foreground/5 pb-2 last:border-0">
                                            <button 
                                                onClick={() => setOpenGroup(isGroupOpen ? null : item.labelKey)}
                                                className="flex items-center justify-between py-3 text-base font-semibold text-foreground/80"
                                            >
                                                {(t as any)(`landing:navMenu.${item.labelKey}`)}
                                                <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isGroupOpen && "rotate-180")} />
                                            </button>
                                            <AnimatePresence>
                                                {isGroupOpen && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="flex flex-col gap-2 overflow-hidden"
                                                    >
                                                        {item.items.map((sub, j) => {
                                                            const Icon = sub.icon
                                                            const active = isLinkActive(sub.href)
                                                            return (
                                                                <Link
                                                                    key={j}
                                                                    to={sub.href as any}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className={cn(
                                                                        "flex items-center gap-3 py-2 px-3 rounded-md transition-colors",
                                                                        active ? "bg-primary/10 text-primary" : "text-foreground/70"
                                                                    )}
                                                                >
                                                                    <Icon className="w-4 h-4" />
                                                                    <span className="text-sm font-medium">{(t as any)(`landing:navMenu.${sub.labelKey}`)}</span>
                                                                </Link>
                                                            )
                                                        })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )
                                }
                                
                                return (
                                    <Link
                                        key={i}
                                        to={item.href as any}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "py-3 text-base font-semibold transition-colors border-b border-foreground/5 last:border-0",
                                            item.href && isLinkActive(item.href)
                                                ? 'text-primary'
                                                : 'text-foreground/80 hover:text-foreground'
                                        )}
                                    >
                                        {(t as any)(`landing:navMenu.${item.labelKey}`)}
                                    </Link>
                                )
                            })}
                            
                            <div className="flex flex-col gap-2 pt-5 mt-2">
                                <div className="flex justify-center pb-2">
                                    <LanguageSwitcher />
                                </div>
                                <Link
                                    to={"/login" as any}
                                    onClick={() => setIsOpen(false)}
                                    className="text-center border border-foreground/10 text-sm font-semibold py-3 hover:bg-foreground/5 transition-colors rounded-lg"
                                >
                                    {signInText}
                                </Link>
                                <Link
                                    to={"/register" as any}
                                    onClick={() => setIsOpen(false)}
                                    className="text-center bg-primary hover:bg-primary/80 text-primary-foreground text-sm font-semibold py-3 transition-colors rounded-lg"
                                >
                                    {ctaText}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

Navbar.displayName = "Navbar"
export default Navbar