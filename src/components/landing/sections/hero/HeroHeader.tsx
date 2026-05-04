import { Link, useLocation } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Logo from '@/assets/nnarks-logo.svg?react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { cn } from '@/shared/lib/utils'
import { navigationStructure, DesktopDropdown } from '@/components/landing/nav/NavBar'

export function HeroHeader() {
    const { t } = useTranslation(['common', 'landing'])
    const location = useLocation()
    const pathname = location.pathname

    const isLinkActive = (href: string) => {
        if (href === '/' || href === '/#') return pathname === '/'
        if (href.startsWith('/#')) return false
        return pathname === href
    }



    return (
        <div className="hidden md:flex items-center justify-between h-20 flex-shrink-0 pt-2 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-20">
            <div className="flex items-center gap-12">
                <Link to="/" className="flex items-center gap-2 group">
                    {/* <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"> */}
                        <Logo className="h-8 w-auto bg-background text-primary" />
                    {/* </div> */}
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
                                    "relative py-1 text-sm font-semibold transition-colors",
                                    active ? 'text-foreground' : 'text-foreground/50 hover:text-foreground'
                                )}
                            >
                                {(t as any)(`landing:navMenu.${item.labelKey}`)}
                                {active && (
                                    <motion.div
                                        layoutId="hero-nav-underline"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <LanguageSwitcher />
                <Link
                    to="/login"
                    className="text-sm font-semibold text-foreground/60 hover:text-foreground transition-colors"
                >
                    {t('common:auth.login')}
                </Link>
            </div>
        </div>
    )
}
