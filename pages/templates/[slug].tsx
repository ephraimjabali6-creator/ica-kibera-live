import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { TEMPLATES, TemplateMeta } from '../../content/templates';
import { TemplateSwitcher } from '../../components/TemplateSwitcher';
import { ContextCursor } from '../../components/experience/ContextCursor';
import { EasterEggs } from '../../components/experience/EasterEggs';
import { BrandedPreloader } from '../../components/experience/BrandedPreloader';

// Template Components
import { SanctuaryEditorialTemplate } from '../../components/templates/SanctuaryEditorialTemplate';
import FellowshipArchTemplate from '../../components/templates/FellowshipArchTemplate';
import HouseKineticTemplate from '../../components/templates/HouseKineticTemplate';
import PromiseEditorialTemplate from '../../components/templates/PromiseEditorialTemplate';
import MercyBentoTemplate from '../../components/templates/MercyBentoTemplate';
import HeritageClassicTemplate from '../../components/templates/HeritageClassicTemplate';
import CowplainRibbonTemplate from '../../components/templates/CowplainRibbonTemplate';
import GracePointeTemplate from '../../components/templates/GracePointeTemplate';
import { BrutalistApostolicTemplate } from '../../components/templates/BrutalistApostolicTemplate';
import { HorizontalFilmstripTemplate } from '../../components/templates/HorizontalFilmstripTemplate';
import { SpatialBlueprintTemplate } from '../../components/templates/SpatialBlueprintTemplate';
import { AmbientSanctuaryTemplate } from '../../components/templates/AmbientSanctuaryTemplate';
import { NewspaperBroadsideTemplate } from '../../components/templates/NewspaperBroadsideTemplate';
import { SplitNarrativeTemplate } from '../../components/templates/SplitNarrativeTemplate';
import { TimelineOdysseyTemplate } from '../../components/templates/TimelineOdysseyTemplate';
import { TactileCardsTemplate } from '../../components/templates/TactileCardsTemplate';
import { CommandCenterTemplate } from '../../components/templates/CommandCenterTemplate';
import { VisualExhibitionTemplate } from '../../components/templates/VisualExhibitionTemplate';
import { TheologicalCompendiumTemplate } from '../../components/templates/TheologicalCompendiumTemplate';
import { KingdomPartnerTemplate } from '../../components/templates/KingdomPartnerTemplate';
import TrinityAnglicanTemplate from '../../components/templates/TrinityAnglicanTemplate';

interface Props {
  template: TemplateMeta;
}

export default function TemplatePage({ template }: Props) {
  if (!template) return null;

  const renderTemplateComponent = () => {
    switch (template.slug) {
      case 'sanctuary-editorial':
        return <SanctuaryEditorialTemplate />;
      case 'fellowship-arch':
        return <FellowshipArchTemplate />;
      case 'house-kinetic':
        return <HouseKineticTemplate />;
      case 'promise-editorial':
        return <PromiseEditorialTemplate />;
      case 'mercy-bento':
        return <MercyBentoTemplate />;
      case 'heritage-classic':
        return <HeritageClassicTemplate />;
      case 'cowplain-ribbon':
        return <CowplainRibbonTemplate />;
      case 'gracepointe-community':
        return <GracePointeTemplate />;
      case 'brutalist-apostolic':
        return <BrutalistApostolicTemplate />;
      case 'horizontal-filmstrip':
        return <HorizontalFilmstripTemplate />;
      case 'spatial-blueprint':
        return <SpatialBlueprintTemplate />;
      case 'ambient-sanctuary':
        return <AmbientSanctuaryTemplate />;
      case 'newspaper-broadside':
        return <NewspaperBroadsideTemplate />;
      case 'split-narrative':
        return <SplitNarrativeTemplate />;
      case 'timeline-odyssey':
        return <TimelineOdysseyTemplate />;
      case 'tactile-cards':
        return <TactileCardsTemplate />;
      case 'command-center':
        return <CommandCenterTemplate />;
      case 'visual-exhibition':
        return <VisualExhibitionTemplate />;
      case 'theological-compendium':
        return <TheologicalCompendiumTemplate />;
      case 'kingdom-partner':
        return <KingdomPartnerTemplate />;
      case 'ica-sanctuary':
      case 'trinity-anglican':
        return <TrinityAnglicanTemplate />;
      default:
        return <SanctuaryEditorialTemplate />;
    }
  };

  return (
    <>
      <Head>
        <title>{template.name} — ICA Kibera Template #{template.number}</title>
        <meta
          name="description"
          content={`${template.name}: ${template.tagline}. High-craft bespoke church frontend for International Christian Assemblies Kibera, Nairobi.`}
        />
      </Head>

      {/* Global Interactive UX Layer */}
      <BrandedPreloader />
      <ContextCursor />
      <EasterEggs />

      {/* Template View */}
      {renderTemplateComponent()}


    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = TEMPLATES.map((t) => ({
    params: { slug: t.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const template = TEMPLATES.find((t) => t.slug === slug);

  if (!template) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      template,
    },
  };
};
