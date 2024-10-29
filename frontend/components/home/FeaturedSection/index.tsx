/* * */

import FeaturedSectionCard from '@/components/home/FeaturedSectionCard';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { ImagesHome } from '@/settings/assets.settings';

/* * */

export function FeaturedSection() {
	return (
		<Surface>
			<Section heading="Destaques" withPadding>
				<Grid columns="abc" withGap>
					<FeaturedSectionCard coverImageSrc={ImagesHome.DRIVERS} href="https://www.carrismetropolitana.pt/motoristas/" target="_blank" title="Recrutamento" />
					<FeaturedSectionCard coverImageSrc={ImagesHome.CASO_DE_ESTUDO_LOURES} href="https://cmet.pt/news/19913" target="_blank" title="Estudo de Caso" />
					<FeaturedSectionCard coverImageSrc="/assets/featured/participe.png" href="https://www.carrismetropolitana.pt/participe" target="_blank" title="Participe" />
				</Grid>
			</Section>
		</Surface>
	);
}
