import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';

const Hero = () => {
	return (
		<HeroSection>
			<HeroVideo src="./assets/hero.mp4" autoPlay muted />
			<Container>
				<MainHeading>One cloud Marketplace. Infinite growth.</MainHeading>
				<HeroText>
				Buy, sell, and manage cloud solutions with the Marketplace that fuels your business.
				</HeroText>
				<ButtonWrapper>
					<Link to="signup">
						<Button>Get Started</Button>
					</Link>
					<HeroButton>Find More</HeroButton>
				</ButtonWrapper>
			</Container>
		</HeroSection>
	);
};

export default Hero;
