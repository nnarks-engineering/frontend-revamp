
import WorldMap from "@/components/ui/world-map"
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AssetsSvg from './AssetsSvg'
import HeroIllustration from './hero-illustration'
import HeroCharacters from "./Herocharacters"
import { HeroHeader } from './HeroHeader'
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    const { t } = useTranslation(['landing', 'common'])

    return (
        <section
            id="hero"
            className="relative font-sans text-foreground w-full overflow-hidden min-h-[600px] h-dvh max-h-[1000px] flex flex-col items-center"
        >
            {/* ── World Map background ── */}

            <div
                className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
                aria-hidden="true"
            >
                <WorldMap
                    lineColor="var(--color-primary-100)"

                    // dots={[
                    //     { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: -33.8688, lng: 151.2093 } },
                    //     { start: { lat: -1.2921, lng: 36.8219 }, end: { lat: -15.7975, lng: -47.8919 } },
                    //     { start: { lat: -26.2041, lng: 28.0473 }, end: { lat: -1.2921, lng: 36.8219 } },
                    //     { start: { lat: -33.8688, lng: 151.2093 }, end: { lat: -36.8485, lng: 174.7633 } },
                    //     { start: { lat: -12.0464, lng: -77.0428 }, end: { lat: -34.6037, lng: -58.3816 } },
                    //     { start: { lat: -1.2921, lng: 36.8219 }, end: { lat: -26.2041, lng: 28.0473 } },
                    // ]}
                />
            </div>

            {/* ── Illustration layer ── */}
            <div
                className="absolute top-20 opacity-90 inset-0 z-0 pointer-events-none"
                aria-hidden="true"
            >
                <HeroIllustration />
            </div>

            {/* ── Construction assets SVG ── */}
            <div
                className="absolute bottom-0 max-w-4xl w-full z-20 pointer-events-none"
                aria-hidden="true"
            >
                <AssetsSvg />
            </div>

            {/* ── Foreground: header + grid(text | cards) ── */}
            <div className="relative z-10 w-full flex flex-col flex-1 min-h-0">

                <HeroHeader />

                {/*
                  Two-row grid:
                  - Row 1 (text): takes up remaining space above cards, centers content
                  - Row 2 (cards): sized to its natural content height
                  On mobile (< md) the grid stacks and cards sit below text naturally
                */}
                <div className="flex-1 min-h-0 grid grid-rows-[1fr_auto]">

                    {/* ── Row 1: Hero text — always vertically centered in its row ── */}
                    <div className="flex items-center justify-center px-4 md:px-6 lg:px-8 py-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-3xl text-center"
                        >
                            <h1 className="text-3xl sm:text-4xl lg:text-[66px] lg:mt-6 font-millik  font-clash-display  font-black mb-2 md:mb-3 leading-[1.05] text-foreground">
                                {t('landing:hero.headline').split(',')[0]}
                                {t('landing:hero.headline').includes(',') && (
                                    <span className="text-primary">
                                        {' '}{t('landing:hero.headline').split(',')[1]}
                                    </span>
                                )}
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto text-primary-100/80">
                                {t('landing:hero.description')}{" "}
                                <Link to="/about" hash="story" className="text-primary-700 dark:text-primary-600 italic  hover:underline inline-flex items-center gap-1 group/link cursor-pointer">
                                    why we care
                                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                            </p>
                            <Link to="/register">
                                <div
                                    className="bg-primary w-56 mx-auto hover:bg-primary/90 px-6 py-3.5 text-sm font-bold text-white transition-all active:scale-95 shadow-lg shadow-primary/20 dark:bg-primary-700"
                                >
                                    {t('common:auth.getStarted')}
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── Row 2: Character cards ── */}
                    <div className="flex items-end">
                        <HeroCharacters />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection
